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

    // Save to NeoDove as backup with Auto-Failover & Retries
    try {
      // 1. Sanitize Phone
      const cleanPhone = data.phone.replace(/\D/g, '');
      const last10Digits = cleanPhone.slice(-10);
      const mobileNumber = last10Digits.length === 10 ? Number(last10Digits) : 9999999999;
      
      const payload = {
        name: data.name || "Unknown Lead",
        mobile: mobileNumber,
        email: "no-reply@krishnanujarenewables.com", // Valid format to bypass CRM regex validation
        detail1: `Bill: ${data.bill} | Timeline: ${data.timeline}`,
        detail2: `Address: ${data.address || 'Not provided'}`
      };

      // 2. Fetch with Timeout to prevent serverless function hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      let neoRes = await fetch('https://6513442b-f879-45c9-be19-944f45086e60.neodove.com/integration/custom/1e376832-40d7-47df-bb80-682287d9e15a/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      // 3. Auto-Retry with string-based payload if rejected
      if (!neoRes.ok) {
        console.warn('NeoDove First Attempt Rejected. Retrying with String payload...', await neoRes.text());
        
        const fallbackPayload = { ...payload, mobile: String(data.phone) };
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 5000);
        
        neoRes = await fetch('https://6513442b-f879-45c9-be19-944f45086e60.neodove.com/integration/custom/1e376832-40d7-47df-bb80-682287d9e15a/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fallbackPayload),
          signal: controller2.signal
        });
        clearTimeout(timeoutId2);
        
        if (!neoRes.ok) {
           console.error('NeoDove Second Attempt Failed:', await neoRes.text());
        } else {
           console.log('NeoDove Success on Fallback:', await neoRes.text());
        }
      } else {
        console.log('NeoDove Success:', await neoRes.text());
      }
    } catch (neodoveError) {
      console.error('NeoDove backup critically failed (Network/Timeout):', neodoveError);
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
