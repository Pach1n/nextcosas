"use client";
import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/auth/sign-out-button";

export default function ProfilePage() {
  const {
    data: session,
    isPending, //loading state
    error, //error state
    refetch, //refetch the session
  } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;
  console.log(session);
  if (!session) {
    return (
    <div className="space-x-4">
      <h1 className="mb-4">You are not Authorized</h1>
      <Button asChild variant={"destructive"}>
        <Link href={"/sign-in"}>Sign In</Link>
      </Button>
      <Button asChild variant={"default"}>
        <Link href={"/"}>Go Home</Link>
      </Button>
    </div>
    );
  }

  return (
    <section id="profile" className="container mx-auto">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>
      <pre className="text-sm overflow-clip">
        {!!session ? JSON.stringify(session, null, 2) : "UNAUTHORIZED"}
      </pre>
      <SignOutButton />
    </section>
  );
}
