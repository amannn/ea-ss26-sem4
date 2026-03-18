import RoomRepository from '@/repositories/RoomRepository';
import UserRepository from '@/repositories/UserRepository';
import {notFound} from 'next/navigation';
import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

export async function POST(
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

  let room = RoomRepository.getRoom(id);
  if (!room) notFound();

  const me = UserRepository.getMe();
  if (!me) notFound();

  const hasStarred = me.starredRoomIds.includes(room.id);
  if (hasStarred) {
    me.starredRoomIds.splice(me.starredRoomIds.indexOf(room.id), 1);
  } else {
    me.starredRoomIds.push(room.id);
  }

  return NextResponse.json(RoomRepository.getRoom(id));
}
