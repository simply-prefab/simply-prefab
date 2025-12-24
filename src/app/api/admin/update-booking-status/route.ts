import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const adminDb = getFirestore();

export async function POST(req: NextRequest) {
  try {
    const { bookingId, status } = await req.json();

    console.log('📝 Updating booking status:', { bookingId, status });

    // Validate input
    if (!bookingId || !status) {
      return NextResponse.json(
        { error: 'Missing bookingId or status' },
        { status: 400 }
      );
    }

    // Validate status value
    const validStatuses = ['pending', 'paid', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Update booking status using Admin SDK
    await adminDb.collection('bookings').doc(bookingId).update({
      status: status,
      updatedAt: FieldValue.serverTimestamp()
    });

    console.log('✅ Booking status updated successfully');

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully'
    });

  } catch (error: any) {
    console.error('❌ Error updating booking status:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update status' },
      { status: 500 }
    );
  }
}
