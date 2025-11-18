"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Ban,
  CircleCheck,
  EllipsisVertical,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type User = {
  id: number;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export const createColumns = (
  handleStatusChange: (id: number, status: "approved" | "rejected") => void,
): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Имя
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const color =
        status === "approved"
          ? "text-emerald-600 bg-emerald-50 border border-emerald-200"
          : status === "pending"
            ? "text-yellow-600 bg-yellow-50 border border-yellow-200"
            : "text-red-600 bg-red-50 border border-red-200";

      return <span className={`rounded-md px-2 py-1 text-xs font-medium capitalize ${color}`}>{status as string}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Дата регистрации
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div className="text-muted-foreground">{date.toLocaleDateString("ru-RU")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground flex size-8">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            {user.status === "pending" && (
              <>
                <DropdownMenuItem className="text-emerald-600" onClick={() => handleStatusChange(user.id, "approved")}>
                  <CircleCheck className="mr-2 h-4 w-4 stroke-[2.25]" />
                  Одобрить
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => handleStatusChange(user.id, "rejected")}>
                  <Ban className="mr-2 h-4 w-4 stroke-[1.75] text-red-400" />
                  Отклонить
                </DropdownMenuItem>
              </>
            )}
            {user.status === "approved" && (
              <DropdownMenuItem className="text-red-600" onClick={() => handleStatusChange(user.id, "rejected")}>
                <Ban className="mr-2 h-4 w-4 stroke-[1.75] text-red-400" />
                Отклонить
              </DropdownMenuItem>
            )}
            {user.status === "rejected" && (
              <DropdownMenuItem className="text-emerald-600" onClick={() => handleStatusChange(user.id, "approved")}>
                <CircleCheck className="mr-2 h-4 w-4 stroke-[2.25]" />
                Одобрить
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="font-medium text-red-600 hover:bg-red-50 focus:bg-red-50"
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              <Trash2 className="mr-2 h-4 w-4 stroke-[2.25] text-red-600" />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
