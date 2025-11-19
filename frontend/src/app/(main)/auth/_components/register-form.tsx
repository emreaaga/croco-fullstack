"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { EyeOff, Eye, Mail, User, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { api } from "@/lib/api";
import React from "react";
import { Spinner } from "@/components/ui/spinner";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

const FormSchema = z
  .object({
    name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов." }),
    email: z.string().email({ message: "Введите корректный адрес электронной почты." }),
    password: z.string().min(6, { message: "Пароль должен содержать не менее 6 символов." }),
    confirmPassword: z.string().min(6, { message: "Подтверждение пароля обязательно." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setIsLoading(true);

      await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Регистрация прошла успешно, ожидайте одобрения модератора!");
      form.reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Произошла ошибка при регистрации. Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput type="text" placeholder="Введите ваше имя" autoComplete="name" {...field} />
                  <InputGroupAddon>
                    <User className="h-4 w-4" />
                  </InputGroupAddon>
                </InputGroup>
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput type="email" placeholder="you@example.com" autoComplete="email" {...field} />
                  <InputGroupAddon>
                    <Mail className="h-4 w-4" />
                  </InputGroupAddon>
                </InputGroup>
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
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    {...field}
                  />

                  <InputGroupAddon>
                    <Lock className="h-4 w-4" />
                  </InputGroupAddon>

                  <InputGroupAddon className="cursor-pointer" align="inline-end">
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" onClick={() => setShowPassword(false)} />
                    ) : (
                      <Eye className="h-4 w-4" onClick={() => setShowPassword(true)} />
                    )}
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    {...field}
                  />

                  <InputGroupAddon>
                    <Lock className="h-4 w-4" />
                  </InputGroupAddon>

                  <InputGroupAddon className="cursor-pointer" align="inline-end">
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" onClick={() => setShowConfirm(false)} />
                    ) : (
                      <Eye className="h-4 w-4" onClick={() => setShowConfirm(true)} />
                    )}
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Регистрация...
            </>
          ) : (
            "Зарегистрироваться"
          )}
        </Button>
      </form>
    </Form>
  );
}
