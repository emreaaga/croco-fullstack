import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="bg-background flex min-h-dvh flex-col items-center justify-center text-center space-y-6 px-4">
      <Lock className="text-destructive mx-auto size-12" />
      <h2 className="text-2xl font-semibold">Доступ запрещён</h2>
      <p className="text-muted-foreground max-w-md text-sm">
        У вас нет прав для просмотра этой страницы. Обратитесь к администратору, если считаете, что это ошибка.
      </p>
      <Button asChild variant="outline">
        <Link href="/dashboard">Вернуться в панель</Link>
      </Button>
    </div>
  );
}
