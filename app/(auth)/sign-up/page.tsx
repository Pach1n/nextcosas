import React from "react";
import { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CredentialsSignUpForm from "@/components/auth/credentials-sign-up-form";


export const metadata:Metadata = {
    title: "Sign-Up",
}

export default function SignUpPage() {
  return <div className="w-full max-w-md mx-auto">
    <Card>
        <CardHeader className="space-y-4">
            <Link href={"/"} className="flex-center">
                <Image
                src="/images/logo.svg"
                alt={`${APP_NAME} logo`}
                width={50}
                height={50}
                priority
                />
            </Link>
            <CardTitle className="text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">Sign up for a new account</CardDescription>
        </CardHeader>
        <CardContent>
            <CredentialsSignUpForm />
        </CardContent>
    </Card>
  </div>;
}
