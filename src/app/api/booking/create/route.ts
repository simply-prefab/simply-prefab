import { adminDb } from '@/config/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';

const CONSULTANT_ID = 'consultant-001';
const CONSULTATION_SLOTS = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

export async function POST(req: NextRequest) {
  try {
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
    } = await req.json();

    // Validation
    if (!date || !timeSlot || !customerEmail) {
      return NextResponse.json({
        error: 'Missing required fields: date, timeSlot, customerEmail'
      }, { status: 400 });
    }

    if (!CONSULTATION_SLOTS.includes(timeSlot)) {
      return NextResponse.json({ error: 'Invalid time slot' }, { status: 400 });
    }

    const dateString = new Date(date).toISOString().split('T')[0];
    const bookingId = `BOOK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
      });

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
      if (transactionError instanceof Error && transactionError.message === 'SLOT_ALREADY_BOOKED') {
        return NextResponse.json({
          error: 'SLOT_ALREADY_BOOKED',
          message: 'This time slot has been booked by another user. Please select a different slot.'
        }, { status: 409 });
      }
      throw transactionError;
    }

  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({
      error: 'Failed to create booking',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
