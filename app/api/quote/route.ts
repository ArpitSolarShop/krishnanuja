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
      // NeoDove expects mobile as a number in the example
      const mobileNumber = Number(data.phone.replace(/\D/g, ''));
      
      await fetch('https://6513442b-f879-45c9-be19-944f45086e60.neodove.com/integration/custom/1e376832-40d7-47df-bb80-682287d9e15a/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          mobile: isNaN(mobileNumber) ? data.phone : mobileNumber, // Send numeric if possible, else string
          email: "",
          detail1: `Bill: ${data.bill} | Timeline: ${data.timeline}`,
          detail2: `Address: ${data.address}`
        })
      });
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
