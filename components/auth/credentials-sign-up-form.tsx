"use client";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUpDefaultValues } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function CredentialsSignUpForm() {
  const [commMethod, setCommMethod] = useState<"mail" | "phone">(
    (signUpDefaultValues as any).communicationMethod ?? "mail",
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSumbit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setError(null);
    const formData = new FormData(evt.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");
    const phone = String(formData.get("phone") || "").trim();
    const terms = formData.get("terms") === "on" || formData.get("terms") === "true";

    // Validaciones de los campos del formulario
    if (!name || !password || !email) {
      setError("Por favor completa los campos obligatorios.");
      return;
    }
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      toast.error("Las contraseñas no coinciden.");
      return;
    }
    
    if (!terms) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }
    if (commMethod === "phone" && !phone) {
      setError("Si eliges comunicación por teléfono debes proporcionar un número.");
      return;
    }

    setIsLoading(true);
    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          phone,
          comms: commMethod,
        },
        {
          onRequest: () => {},
          onResponse: () => {
            setIsLoading(false);
          },
          onError: (ctx) => {
            const msg = ctx?.error?.message || "Error al registrar";
            setError(msg);
            toast.error(msg);
            console.log(msg);
            setIsLoading(false);
          },
          onSuccess: () => {
            setError(null);
            toast.success("Registro correcto");
            console.log("Registro correcto");
            setIsLoading(false);
          },
        },
      );
    } catch (err: any) {
      const msg = err?.message || "Error inesperado";
      setError(msg);
      toast.error(msg);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSumbit}>
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={signUpDefaultValues.name}
            required
          />
        </div>
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
          <Label htmlFor="phone">Phone <span className="text-muted-foreground">(Optional)</span></Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            defaultValue={signUpDefaultValues.phone}
            required={commMethod === "phone"}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={signUpDefaultValues.password}
            required
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            defaultValue={signUpDefaultValues.password}
            required
          />
        </div>
        <div className="space-x-2">
          <Input id="terms" name="terms" type="checkbox" className="size-4" />
          <Label htmlFor="terms">
            I agree to the <a href="/terms" className="underline">Terms and Conditions</a>
          </Label>
        </div>
        <div>
          <Label>How do you want to receive communications?</Label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="comms"
                value="mail"
                checked={commMethod === "mail"}
                onChange={() => setCommMethod("mail")}
              />
              <span>Mail</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="comms"
                value="phone"
                checked={commMethod === "phone"}
                onChange={() => setCommMethod("phone")}
              />
              <span>Phone</span>
            </label>
          </div>
        </div>
        <div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Sign Up"}
          </Button>
          {error && (
            <div className="text-sm text-destructive mt-2 text-center">{error}</div>
          )}
          <div className="mt-2 text-center">
            <span className="text-muted-foreground">Aun no tienes una cuenta? </span>
            <Link href="/sign-in" className="underline text-muted-foreground">Sign in</Link>
          </div>
        </div>
      </div>
    </form>
  );
}
