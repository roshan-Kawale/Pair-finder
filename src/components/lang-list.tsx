"use client";

import { useRouter } from "next/navigation";
import { Badge, badgeVariants } from "./ui/badge";

export function LangList({ language }: { language: string[] }) {
  const router = useRouter();

  return (
    <div className="flex gap-2 flex-wrap cursor-pointer">
      {language?.map((lang) => (
        <Badge
          key={lang}
          variant="secondary"
          onClick={() => {
            router.push(`/browse?search=${lang}`);
          }}
        >
          {lang}
        </Badge>
      ))}
    </div>
  );
}
