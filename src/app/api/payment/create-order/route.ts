import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
// ❌ DON'T import client SDK
// import { db } from '../../../../config/firebase.config';

// ✅ DO import Firebase Admin SDK
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (do this at the top, outside the function)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

// Get Firestore instance from Admin SDK
const adminDb = getFirestore();

export async function POST(request: NextRequest) {
  try {
    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const body = await request.json();
    const { amount, currency, receipt, notes } = body;

    // Validate input
    if (!amount || !currency || !receipt) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, currency, receipt' },
        { status: 400 }
      );
    }

    console.log('💳 Creating Razorpay order:', { amount, currency, receipt });

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount,
      currency: currency,
      receipt: receipt,
      notes: notes || {},
    });

    console.log('✅ Razorpay order created:', order.id);

    // ✅ Save order to Firestore using ADMIN SDK
    await adminDb.collection('orders').doc(order.id).set({
      orderId: order.id,
      amount: amount / 100,
      currency: order.currency,
      status: 'created',
      receipt: order.receipt,
      customerName: notes?.customerName || '',
      customerEmail: notes?.customerEmail || '',
      customerPhone: notes?.customerPhone || '',
      consultationType: notes?.consultationType || 'expert-consultation',
      appointmentDate: notes?.appointmentDate || '',
      appointmentTime: notes?.appointmentTime || '',
      location: notes?.location || '',
      projectType: notes?.projectType || '',
      description: notes?.description || '',
      message: notes?.message || '',
      notes: notes || {},
      createdAt: FieldValue.serverTimestamp(),
    });

    console.log('✅ Order saved to Firestore');

    return NextResponse.json({
      id: order.id,
      entity: order.entity,
      amount: order.amount,
      amount_paid: order.amount_paid,
      amount_due: order.amount_due,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      created_at: order.created_at,
    });
  } catch (error: any) {
    console.error('❌ Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
