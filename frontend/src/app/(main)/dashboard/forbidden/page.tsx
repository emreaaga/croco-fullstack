import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-6xl font-bold text-destructive">403</h1>
      <p className="text-muted-foreground text-sm">
        У вас нет доступа к этой странице.
      </p>
      <Button asChild variant="outline">
        <Link href="/dashboard">Вернуться в панель</Link>
      </Button>
    </div>
  );
}
