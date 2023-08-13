"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Utils";

export default function SeeAllEvents() {
  const router = useRouter();
  return (
    <>
      <Button
        size="lg"
        onClick={() => {
          void router.push("/events");
        }}
      >
        See all Upcoming Events
      </Button>
    </>
  );
}
