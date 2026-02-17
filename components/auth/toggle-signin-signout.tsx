"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserIcon } from "lucide-react";

export default function ToggleSignInSignOut() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return <Button variant={"outline"} disabled>Loading...</Button>;
  }

  if (session) {
    return (
      <Button
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("/"),
            },
          });
        }}
        variant={"destructive"}
      >
        Sign Out
      </Button>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Button asChild variant={"ghost"}>
        <Link href={"/sign-in"}>
          <UserIcon /> Sign in
        </Link>
      </Button>
      <Button asChild>
        <Link href={"/sign-up"}>Register</Link>
      </Button>
    </div>
  );
}
