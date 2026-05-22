import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate basic fields
    if (!data.name || !data.phone || !data.bill || !data.timeline || !data.address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        bill: data.bill,
        timeline: data.timeline,
        address: data.address,
      },
    });

    // Save to NeoDove as backup
    try {
      // NeoDove usually expects a clean 10-digit mobile number
      const cleanPhone = data.phone.replace(/\D/g, '');
      const last10Digits = cleanPhone.slice(-10);
      const mobileNumber = Number(last10Digits);
      
      const neoRes = await fetch('https://6513442b-f879-45c9-be19-944f45086e60.neodove.com/integration/custom/1e376832-40d7-47df-bb80-682287d9e15a/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          mobile: mobileNumber || 0,
          email: "",
          detail1: `Bill: ${data.bill} | Timeline: ${data.timeline}`,
          detail2: `Address: ${data.address}`
        })
      });

      if (!neoRes.ok) {
        console.error('NeoDove rejected the payload:', await neoRes.text());
      } else {
        console.log('NeoDove Success:', await neoRes.text());
      }
    } catch (neodoveError) {
      console.error('NeoDove backup failed:', neodoveError);
      // We don't throw here to ensure the user still gets a success message if Supabase worked
    }

    return NextResponse.json({ success: true, quoteRequest }, { status: 201 });
  } catch (error) {
    console.error('Error saving quote request:', error);
    return NextResponse.json(
      { error: 'Failed to save quote request' },
      { status: 500 }
    );
  }
}
