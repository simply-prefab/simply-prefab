import { adminDb } from '@/config/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

// 24 hourly slots from 00:00 to 23:00
const CONSULTATION_SLOTS = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

const CONSULTANT_ID = 'consultant-001';

export async function POST(req: NextRequest) {
  try {
    const { date } = await req.json();

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    const selectedDate = new Date(date);
    const dateString = selectedDate.toISOString().split('T')[0];

    // Query Firestore using Admin SDK
    const bookingsSnapshot = await adminDb
      .collection('bookings')
      .where('consultantId', '==', CONSULTANT_ID)
      .where('date', '==', dateString)
      .where('status', '==', 'confirmed')
      .get();

    // Get booked slots
    const bookedSlots = new Set(
      bookingsSnapshot.docs.map(doc => doc.data().timeSlot)
    );

    // Generate available slots
    const availableSlots = CONSULTATION_SLOTS.map(slot => ({
      time: slot,
      available: !bookedSlots.has(slot),
      booked: bookedSlots.has(slot)
    }));

    return NextResponse.json({
      date: dateString,
      slots: availableSlots,
      totalSlots: CONSULTATION_SLOTS.length,
      bookedCount: bookedSlots.size,
      availableCount: CONSULTATION_SLOTS.length - bookedSlots.size
    });

  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json({
      error: 'Failed to fetch available slots',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
