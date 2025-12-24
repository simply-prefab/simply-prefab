import { adminDb } from '@/config/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';

const CONSULTANT_ID = 'consultant-001';

// ✅ Accept all 24 hours (00:00 to 23:00)
const CONSULTATION_SLOTS = [
  '00:00', // 12:00 AM
  '01:00', // 1:00 AM
  '02:00', // 2:00 AM
  '03:00', // 3:00 AM
  '04:00', // 4:00 AM
  '05:00', // 5:00 AM
  '06:00', // 6:00 AM
  '07:00', // 7:00 AM
  '08:00', // 8:00 AM
  '09:00', // 9:00 AM
  '10:00', // 10:00 AM
  '11:00', // 11:00 AM
  '12:00', // 12:00 PM
  '13:00', // 1:00 PM
  '14:00', // 2:00 PM
  '15:00', // 3:00 PM
  '16:00', // 4:00 PM
  '17:00', // 5:00 PM
  '18:00', // 6:00 PM
  '19:00', // 7:00 PM
  '20:00', // 8:00 PM
  '21:00', // 9:00 PM
  '22:00', // 10:00 PM
  '23:00', // 11:00 PM
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      date,
      timeSlot,
      customerName,
      customerEmail,
      customerPhone,
      amount,
      paymentId,
      orderId,
      projectType,
      location,
      message
    } = body;

    console.log('📥 Received booking request:', { timeSlot, date });

    // Validation
    if (!date || !timeSlot || !customerEmail) {
      return NextResponse.json({
        error: 'Missing required fields: date, timeSlot, customerEmail'
      }, { status: 400 });
    }

    if (!CONSULTATION_SLOTS.includes(timeSlot)) {
      console.error('❌ Invalid time slot received:', timeSlot);
      console.error('✅ Allowed slots:', CONSULTATION_SLOTS);
      return NextResponse.json({ 
        error: 'Invalid time slot',
        received: timeSlot,
        allowed: CONSULTATION_SLOTS
      }, { status: 400 });
    }

    const dateString = new Date(date).toISOString().split('T')[0];
    const bookingId = `BOOK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.log('✅ Validation passed, creating booking:', bookingId);

    // Use Firestore transaction for concurrency control
    try {
      await adminDb.runTransaction(async (transaction) => {
        // Check if slot is already booked
        const existingBookings = await adminDb
          .collection('bookings')
          .where('consultantId', '==', CONSULTANT_ID)
          .where('date', '==', dateString)
          .where('timeSlot', '==', timeSlot)
          .where('status', '==', 'confirmed')
          .get();

        if (!existingBookings.empty) {
          throw new Error('SLOT_ALREADY_BOOKED');
        }

        // Create booking document
        const bookingRef = adminDb.collection('bookings').doc(bookingId);
        transaction.set(bookingRef, {
          bookingId,
          consultantId: CONSULTANT_ID,
          date: dateString,
          timeSlot,
          customerName,
          customerEmail,
          customerPhone,
          projectType: projectType || '',
          location: location || '',
          message: message || '',
          paymentId,
          orderId,
          amount,
          status: 'confirmed',
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
          concurrencyToken: Date.now()
        });

        console.log('✅ Booking created in transaction');
      });

      console.log('✅ Transaction completed successfully');

      return NextResponse.json({
        success: true,
        bookingId,
        message: 'Booking created successfully',
        booking: {
          bookingId,
          date: dateString,
          timeSlot,
          customerEmail,
          status: 'confirmed'
        }
      }, { status: 201 });

    } catch (transactionError) {
      console.error('❌ Transaction error:', transactionError);
      
      if (transactionError instanceof Error && transactionError.message === 'SLOT_ALREADY_BOOKED') {
        return NextResponse.json({
          error: 'SLOT_ALREADY_BOOKED',
          message: 'This time slot has been booked by another user. Please select a different slot.'
        }, { status: 409 });
      }
      throw transactionError;
    }

  } catch (error) {
    console.error('❌ Error creating booking:', error);
    return NextResponse.json({
      error: 'Failed to create booking',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
