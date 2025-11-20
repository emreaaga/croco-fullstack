"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Ban, CircleCheck, EllipsisVertical, Trash2, ShieldCheck, User as UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type UserRole = "user" | "admin" | "superadmin";

export type User = {
  id: number;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

const formatDate = (date: string) => new Date(date).toLocaleDateString("ru-RU");

const STATUS_STYLES: Record<User["status"], string> = {
  approved: "text-emerald-700 bg-emerald-100",
  pending: "text-yellow-700 bg-yellow-100",
  rejected: "text-red-700 bg-red-100",
};

const STATUS_ACTIONS: Record<
  User["status"],
  {
    status: "approved" | "rejected";
    icon: any;
    label: string;
    className?: string;
  }[]
> = {
  pending: [
    { status: "approved", icon: CircleCheck, label: "Одобрить", className: "text-green-900" },
    { status: "rejected", icon: Ban, label: "Отклонить", className: "text-red-900" },
  ],
  approved: [{ status: "rejected", icon: Ban, label: "Отклонить", className: "text-red-600" }],
  rejected: [{ status: "approved", icon: CircleCheck, label: "Одобрить", className: "text-emerald-600" }],
};

export function createColumns<T extends User>(
  handleStatusChange: (id: number, status: "approved" | "rejected") => void,
  handleDelete: (id: number) => void,
): ColumnDef<T>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Имя
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const role = row.original.role;
        const Icon = role === "admin" ? ShieldCheck : UserIcon;
        const label = role === "admin" ? "Администратор" : "Пользователь";

        return (
          <div className="flex items-center gap-2 font-medium">
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <Icon className={cn("h-4 w-4", role === "admin" ? "text-green-600" : "text-muted-foreground")} />
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                {label}
              </TooltipContent>
            </Tooltip>
            {row.getValue("name")}
          </div>
        );
      },
    },

    {
      accessorKey: "email",
      enableSorting: false,
      header: "Email",
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },

    {
      accessorKey: "status",
      header: "Статус",
      enableSorting: false,
      cell: ({ row }) => {
        const status = row.getValue("status") as User["status"];
        return (
          <span className={cn("rounded-md px-2 py-1 text-xs font-medium capitalize", STATUS_STYLES[status])}>
            {status}
          </span>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div className="flex w-full justify-center">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Дата регистрации
            <ArrowUpDown />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground w-full text-center">{formatDate(row.getValue("createdAt"))}</div>
      ),
    },

    // Actions
    {
      id: "actions",
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        const user = row.original;
        const actions = STATUS_ACTIONS[user.status];

        const roleLabel = user.role === "admin" ? "Администратор" : "Пользователь";

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground flex size-8">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <div className="flex items-center justify-center rounded px-2 py-1.5 text-xs font-medium">
                {roleLabel}
              </div>

              <DropdownMenuSeparator />

              {actions.map((a, i) => (
                <DropdownMenuItem key={i} className={a.className} onClick={() => handleStatusChange(user.id, a.status)}>
                  <a.icon className="mr-2 h-4 w-4" />
                  {a.label}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="font-medium text-red-600 hover:bg-red-50 focus:bg-red-50"
                onClick={() => handleDelete(user.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
