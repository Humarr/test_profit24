import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
// export async function GET(req: Request) {
  // const session = await getServerSession(authOptions);
  const user = await getAuthUser();

  // if (!session || !session.user?.email) {
  if (!user) {
    // console.log('User not found');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bots = await prisma.bot.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        tier: true,
        imageUrl: true,
        stats: true,
        minAmount: true,
        performance: true,
        fee: true,
        bgColor: true,
      },
    });

    console.log(bots);
// console.log(NextResponse.json({ bots }, { status: 200 }))
    return NextResponse.json({ bots }, { status: 200 });
  } catch (error) {
    console.log('Error fetching bots:', error as Error);
    return NextResponse.json({ error: 'Failed to load bots' }, { status: 500 });
  }
}
