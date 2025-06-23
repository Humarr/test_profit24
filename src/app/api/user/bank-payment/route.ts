// app/api/user/bank-payment/route.ts

import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('evidence') as File;
  const plan = formData.get('plan')?.toString();
  const amount = formData.get('amount')?.toString();

  if (!file || !plan || !amount) {
    return NextResponse.json({ error: 'Incomplete data' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${uuidv4()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

  await writeFile(filePath, buffer);

  await prisma.pendingPayment.create({
    data: {
      userId: user.id,
      plan,
      amount,
      evidence: `/uploads/${fileName}`,
    },
  });

  return NextResponse.json({ success: true });
}
