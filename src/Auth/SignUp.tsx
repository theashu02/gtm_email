import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chrome, Eye, EyeOff } from "lucide-react";
import logo from "../assets/images/logoimg.jpeg";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";

const SignUpSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms and Privacy Policy",
  }),
});

type SignUpValues = z.infer<typeof SignUpSchema>;

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      password: "",
      terms: false,
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: SignUpValues) => {
    await new Promise((r) => setTimeout(r, 600));
    console.log("[v0] signup values:", values);
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="h-screen md:h-screen overflow-hidden grid md:grid-cols-2 bg-background text-foreground">
      {/* Left: Illustration */}
      <div className="relative hidden md:block h-full">
        <img
          src={logo}
          alt="Illustration with analytics dashboard and gears"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-foreground/10" aria-hidden="true" />
      </div>

      {/* Right: Form Card */}
      <main className="flex h-screen items-center justify-center p-3 sm:p-6 md:p-5 overflow-hidden">
        <div className="absolute right-5 top-5">
          <ThemeToggle />
        </div>
        <section className="w-full max-w-md rounded-none md:rounded-xl border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 p-6 sm:p-8 shadow-sm h-full overflow-y-auto">
          <header className="mb-2">
            <h1 className="text-center text-2xl font-semibold tracking-tight text-balance">
              Sign Up
            </h1>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Welcome, create your account
            </p>
          </header>

          <div className="grid gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => console.log("[v0] Continue with Google clicked")}
            >
              <Chrome className="size-4" aria-hidden="true" />
              Continue with Google
            </Button>

            <div className="my-0 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-xs text-muted-foreground">
              <Separator />
              <span>or</span>
              <Separator />
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className="mt-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name
                      <span aria-hidden="true" className="text-destructive">
                        {" *"}
                      </span>
                      <span className="sr-only">required</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        aria-describedby="name-error"
                        className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="name-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="organization"
                        placeholder="Your company (optional)"
                        aria-describedby="company-error"
                        className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="company-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email
                      <span aria-hidden="true" className="text-destructive">
                        {" *"}
                      </span>
                      <span className="sr-only">required</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-describedby="email-error"
                        className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="email-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Set Your Password
                      <span aria-hidden="true" className="text-destructive">
                        {" *"}
                      </span>
                      <span className="sr-only">required</span>
                    </FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="••••••••"
                          aria-describedby="password-error"
                          className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            onClick={() => setShowPassword((s) => !s)}
                          >
                            {showPassword ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage id="password-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="terms" className="text-sm leading-none">
                        I have read and understand the Terms of Service Privacy Policy.
                      </Label>
                    </div>

                    <FormMessage id="terms-error" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                aria-busy={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account…" : "Sign Up"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                No Credit Card Required
              </p>
            </form>
          </Form>

          <p className="mt-3 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary underline underline-offset-4"
            >
              Log in
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
