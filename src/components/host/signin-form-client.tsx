"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createAuthToken } from "@/services/api/host";

export default function SigninFormClient() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await createAuthToken({
        username: JSON.stringify({ host_name: name, group: "host" }),
        password: password,
      });

      if (response.error_codes.length > 0) {
        setError("An error occurred. Please try again.");
      } else {
        router.push("/host");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="ml-2 block text-sm text-muted-foreground">
            Remember me
          </Label>
        </div>
        <Link href="/host/forgotpassword" className="text-sm font-medium text-primary hover:text-primary/80">
          Forgot your password?
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
}
