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

const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("998")) {
    return digits.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5");
  }

  if (digits.length === 11 || digits.length === 10) {
    return digits.replace(/(\d{1,3})(\d{3})(\d{3})(\d{3,4})/, "+$1 $2-$3-$4");
  }

  return phone;
};

const formatDate = (date: string) => new Date(date).toLocaleDateString("ru-RU");

const short = (str: string, max = 20) => (str.length > max ? str.slice(0, max) + "..." : str);

const normalizeUrl = (url: string) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
};

export const columns: ColumnDef<Application>[] = [
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
    accessorKey: "siteUrl",
    header: "Сайт",
    enableSorting: false,
    cell: ({ row }) => {
      const url: string = row.getValue("siteUrl");
      const safeUrl = normalizeUrl(url);

      return (
        <a href={safeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {short(url)}
        </a>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Телефон",
    enableSorting: false,
    cell: ({ row }) => {
      return <div>{formatPhone(row.getValue("phoneNumber"))}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Дата создания
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="text-muted-foreground">{formatDate(row.getValue("createdAt"))}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      const app = row.original;
      const safeUrl = normalizeUrl(app.siteUrl);

      const ACTIONS = [
        {
          icon: Copy,
          label: "Копировать email",
          handler: () => navigator.clipboard.writeText(app.email),
        },
        {
          icon: ExternalLink,
          label: "Перейти на сайт",
          handler: () => window.open(safeUrl, "_blank"),
        },
      ];

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            {ACTIONS.map((a, i) => (
              <DropdownMenuItem key={i} onClick={a.handler}>
                <a.icon className="mr-2 h-4 w-4" />
                {a.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
