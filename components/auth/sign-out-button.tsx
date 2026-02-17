"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => router.push("/"),
          },
        })
      }
      variant={"destructive"}
    >
      Sign Out
    </Button>
  );
}
