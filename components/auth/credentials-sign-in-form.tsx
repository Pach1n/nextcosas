"use client";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUpDefaultValues } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";

export default function CredentialsSignInForm({
  callbackUrl = "/profile",
}: {
  callbackUrl?: string;
}): React.JSX.Element {
  async function handleSumbit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    //Comprobaciones de los campos del formulario
    if (!password || !email) return;

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: callbackUrl,
      },
      {
        onRequest: () => {},
        onResponse: () => {},
        onError: (ctx) => {
          console.log(ctx.error.message);
        },
        onSuccess: () => {
          console.log("Login correcto");
        },
      },
    );
  }
  return (
    <form onSubmit={handleSumbit}>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="text"
            defaultValue={signUpDefaultValues.email}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="text"
            defaultValue={signUpDefaultValues.password}
            required
          />
        </div>
        <div>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </div>
      </div>
    </form>
  );
}
