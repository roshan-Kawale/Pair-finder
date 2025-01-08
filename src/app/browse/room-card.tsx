"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { TagsList } from "@/components/tags-list";
import { BarChart, Globe, Tag, UserPlus, Users } from "lucide-react";
import { LangList } from "@/components/lang-list";

export function RoomCard({ room }: { room: Room }) {
  const currentPeople = 2;
  const isFull = currentPeople >= room.maximumPeople!;
  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>{room.name}</CardTitle>
    //     <CardDescription>{room.description}</CardDescription>
    //   </CardHeader>
    //   <CardContent className="flex flex-col gap-4">
    //     <TagsList tags={room.tags} />
    //   </CardContent>
    //   <CardFooter>
    //     <Button asChild>
    //       <Link href={`/rooms/${room.id}`}>Join Room</Link>
    //     </Button>
    //   </CardFooter>
    // </Card>

    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TagsList tags={room.tags} />
        <LangList language={room.language!}/>
        <div className="flex items-center space-x-2">
          <BarChart className="w-4 h-4" />
          <span>{room.level}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Room Capacity</span>
            <span className="text-sm font-medium">
              {currentPeople}/{room.maximumPeople}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>{currentPeople} joined</span>
        </div>
        <Button disabled={isFull}>
          <UserPlus className="w-4 h-4 mr-2" />
          <Link href={`/rooms/${room.id}`}>{isFull ? "Room Full" : "Join Room"}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
