"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center space-y-2 text-center">
      <h1 className="text-2xl font-semibold">Страница не найдена</h1>
      <p className="text-muted-foreground">Страница, которую вы ищете, не существует или была удалена.</p>
      <Link replace href="/dashboard/default">
        <Button variant="outline">Вернуться на главную</Button>
      </Link>
    </div>
  );
}
