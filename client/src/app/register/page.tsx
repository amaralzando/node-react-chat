"use client";

import Progressbar from "@/src/components/progressbar";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { AuthContext } from "@/src/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "O nome deve ter pelo menos 5 caracteres.",
  }),
  email: z.string().email({
    message: "O e-mail deve ser um endereço válido (ex: usuario@exemplo.com).",
  }),
  password: z.string().refine((val) => val.length >= 8 && /[A-Z]/.test(val), {
    message:
      "A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra maiúscula.",
  }),
});

export default function Register() {
  const { signUp } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setISError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await signUp(data);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error.issues);
      }
      if (error instanceof Error) {
        setISError(error.message);
      }
    }
  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto sm:max-w-lg px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Cadastre-se</CardTitle>
            <CardDescription className="text-center">
              Coleque seu nome, email e senha!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Difite seu Nome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Difite seu email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                          type="password"
                          placeholder="Digite sua senha"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  className="w-full h-12"
                  type="submit"
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center w-[30px]">
                      <Progressbar />
                    </div>
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
                {isError && (
                  <span className="flex justify-center text-red-500">
                    {isError}
                  </span>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-center text-sidebar-foreground">
              {" "}
              Já tenho uma conta?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
