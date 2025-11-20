"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, EllipsisVertical, Copy, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Application = {
  id: number;
  name: string;
  siteUrl: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
};

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Название
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "siteUrl",
    header: "Сайт",
    cell: ({ row }) => {
      const url: string = row.getValue("siteUrl");
      const maxLength = 20;
      const displayUrl = url.length > maxLength ? url.slice(0, maxLength) + "..." : url;

      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" title={url}>
          {displayUrl}
        </a>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Телефон",
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Дата создания
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
      const app = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <EllipsisVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(app.email)}>
              <Copy className="mr-2 h-4 w-4" />
              Копировать email
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => window.open(app.siteUrl, "_blank")}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Перейти на сайт
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
