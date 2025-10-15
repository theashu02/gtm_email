import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import logo from "../assets/images/logoimg.jpeg";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginValues = z.infer<typeof LoginSchema>;

export function LoginPage() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: LoginValues) => {
    // TODO: Replace with your auth call
    await new Promise((r) => setTimeout(r, 600));
    console.log(values);
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background text-foreground">
      {/* Left half: image (hidden on small screens) */}
      <div className="relative hidden md:block">
        <img
          src={logo}
          alt="Modern workspace with laptop on a desk"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-foreground/30" aria-hidden="true" />
      </div>

      {/* Right half: form */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-red-300">
        <div className="w-full max-w-sm rounded-xl border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Use your email and password to continue
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className="mt-6 space-y-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-describedby="email-error"
                        className="focus:border-2 focus:bg-amber-200 focus:border-amber-500 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="focus:border-2 focus:bg-amber-200 focus:border-amber-500 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        aria-describedby="password-error"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="password-error" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                aria-busy={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
