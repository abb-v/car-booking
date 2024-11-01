import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { email } = await request.json();
    const booking = await prisma.booking.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Réservation non trouvée' },
        { status: 404 }
      );
    }

    if (booking.customerEmail !== email) {
      return NextResponse.json(
        { error: 'Email non valide pour cette réservation' },
        { status: 403 }
      );
    }

    return NextResponse.json({ verified: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la vérification' },
      { status: 500 }
    );
  }
}