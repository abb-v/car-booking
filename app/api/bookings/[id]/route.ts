import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        customer: true
      }
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Réservation non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la réservation' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { customerEmail, customerPhone, ...bookingData } = body;

    // Update customer if provided
    if (customerEmail || customerPhone) {
      const booking = await prisma.booking.findUnique({
        where: { id: params.id },
        include: { customer: true }
      });

      if (booking) {
        await prisma.customer.update({
          where: { id: booking.customer.id },
          data: {
            ...(customerEmail && { email: customerEmail }),
            ...(customerPhone && { phone: customerPhone }),
          }
        });
      }
    }

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: bookingData,
      include: {
        customer: true
      }
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la réservation' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.booking.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Réservation supprimée' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la réservation' },
      { status: 500 }
    );
  }
}