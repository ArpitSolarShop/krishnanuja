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

    return NextResponse.json({ success: true, quoteRequest }, { status: 201 });
  } catch (error) {
    console.error('Error saving quote request:', error);
    return NextResponse.json(
      { error: 'Failed to save quote request' },
      { status: 500 }
    );
  }
}
