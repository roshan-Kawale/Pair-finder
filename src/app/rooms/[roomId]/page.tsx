import { TagsList } from "@/components/tags-list";
import { getRoom } from "@/data-access/rooms";
import { DevFinderVideo } from "./video-player";
import { unstable_noStore } from "next/cache";

export default async function RoomPage(props: { params: { roomId: string } }) {
  unstable_noStore();
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) {
    return <div>No room of this ID found</div>;
  }

  return (
    <div className="grid sm:grid-cols-4 items-center min-h-screen">
      <div className="sm:col-span-3 sm:p-4 sm:pr-2 w-[85vw] sm:w-full">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <DevFinderVideo room={room} />
        </div>
      </div>
      <div className="sm:col-span-1 sm:p-4 sm:pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base flex flex-wrap">{room?.name}</h1>

          <p className="text-base text-gray-600">{room?.description}</p>

          <TagsList tags={room.tags} />
        </div>
      </div>
    </div>
  );
}