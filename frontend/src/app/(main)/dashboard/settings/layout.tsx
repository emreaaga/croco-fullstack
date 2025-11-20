"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Settings, Sun, Bell, Monitor } from "lucide-react";

const sidebarNavItems = [
  { title: "Профиль", href: "/dashboard/settings/profile", icon: User },
  { title: "Аккаунт", href: "/dashboard/settings/account", icon: Settings },
  { title: "Внешний вид", href: "/dashboard/settings/appearance", icon: Sun },
  { title: "Уведомления", href: "/dashboard/settings/notifications", icon: Bell },
  { title: "Отображение", href: "/dashboard/settings/display", icon: Monitor },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPage = sidebarNavItems.find((i) => i.href === pathname);

  return (
    <div className="space-y-2 px-1 pb-8 md:px-2 md:pb-8">
      <div className="space-y-0.5">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">Настройки</h2>
        <p className="text-muted-foreground text-xs md:text-sm">
          Управляйте настройками аккаунта и параметрами уведомлений.
        </p>
      </div>

      <Separator className="my-3" />

      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6">
        <div className="w-full overflow-x-auto md:w-30 md:overflow-visible">
          <nav className="flex gap-1 pb-2 md:sticky md:top-20 md:-ml-6 md:flex-col md:items-start md:gap-1 md:pb-0">
            {sidebarNavItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Button
                  key={item.title}
                  asChild
                  variant="ghost"
                  className={cn(
                    "flex-shrink-0 justify-start px-2 py-1 text-xs whitespace-nowrap transition-colors md:w-full md:text-sm",
                    "hover:bg-muted/50",
                    active && "bg-muted hover:bg-muted border-l-2",
                  )}
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="w-full flex-1 md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
          <Card className="bg-background rounded-lg border p-4 md:p-5">
            <p className="text-muted-foreground text-xs md:text-sm">
              Настройки / <span className="text-foreground">{currentPage?.title}</span>
            </p>
            <Separator />
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}
