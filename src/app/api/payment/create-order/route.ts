import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../config/firebase.config';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
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
      amount: amount, // Amount in paise
      currency: currency,
      receipt: receipt,
      notes: notes || {},
    });

    console.log('✅ Razorpay order created:', order.id);

    // Save order to Firestore
    await setDoc(doc(db, 'orders', order.id), {
      orderId: order.id,
      amount: amount / 100, // Store in rupees
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
      createdAt: serverTimestamp(),
    });

    console.log('✅ Order saved to Firestore');

    // Return order details
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
