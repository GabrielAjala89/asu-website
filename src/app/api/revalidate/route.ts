import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path') ?? '/';
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, path });
}
