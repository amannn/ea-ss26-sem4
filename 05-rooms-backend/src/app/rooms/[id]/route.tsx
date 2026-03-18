import RoomRepository from '@/repositories/RoomRepository';
import {notFound} from 'next/navigation';
import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

export async function GET(
  request: NextRequest,
  props: {params: Promise<{id: string}>}
) {
  const {id: rawId} = await props.params;
  const id = z.coerce
    .number()
    .optional()
    .catch(undefined)
    .parse(rawId);
  if (id == null) notFound();

  let result = RoomRepository.getRoom(id);
  if (!result) notFound();

  return NextResponse.json(result);
}
