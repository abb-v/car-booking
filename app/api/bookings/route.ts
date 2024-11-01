import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const BookingSchema = z.object({
  vehicleSize: z.string(),
  service: z.string(),
  date: z.string(),
  time: z.string(),
  price: z.number(),
  specialNeeds: z.string().optional(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  customerName: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = BookingSchema.parse(body);

    const {
      customerEmail,
      customerPhone,
      customerName,
      ...bookingData
    } = validatedData;

    // Create or update customer
    const customer = await prisma.customer.upsert({
      where: { email: customerEmail },
      update: {
        phone: customerPhone,
        name: customerName,
      },
      create: {
        email: customerEmail,
        phone: customerPhone,
        name: customerName,
      },
    });

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        ...bookingData,
        date: new Date(bookingData.date),
        customerId: customer.id,
      },
      include: {
        customer: true,
      },
    });

    return NextResponse.json({
      success: true,
      booking: {
        ...booking,
        customerEmail,
        customerPhone,
        customerName,
      },
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An error occurred while processing your booking' 
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
      },
    });
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Error fetching bookings' },
      { status: 500 }
    );
  }
}