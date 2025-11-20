"use client";

import * as React from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { createColumns, User } from "./columns";
import { useUser } from "@/config/user-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function UsersPage() {
  const user = useUser();

  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  if (!user) {
    return <div className="text-muted-foreground p-6 text-center">Загрузка...</div>;
  }

  if (user.role !== "admin") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-10 text-center">
        <Lock className="text-destructive size-12" />

        <h2 className="text-2xl font-semibold">Доступ запрещён</h2>

        <p className="text-muted-foreground max-w-md text-sm">У вас нет прав для просмотра этого раздела.</p>

        <Button asChild variant="outline">
          <Link href="/dashboard">Вернуться в панель</Link>
        </Button>
      </div>
    );
  }

  const handleStatusChange = async (id: number, status: "approved" | "rejected") => {
    try {
      const res = await api.patch(`/users/${id}`, { status });

      if (res.data.success) {
        toast.success(`Статус обновлён: ${status}`);
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
      } else {
        toast.error("Не удалось обновить статус.");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Не удалось обновить статус.";
      toast.error(message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await api.delete(`/users/${id}`);

      if (res.data.success) {
        toast.success("Пользователь удален.");
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        toast.error("Не удалось удалить пользователя.");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Не удалось удалить пользователя.";
      toast.error(message);
    }
  };

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/users");

        if (res.data.success) {
          setUsers(res.data.data);
        } else {
          toast.error("Не удалось загрузить пользователей");
        }
      } catch (err: any) {
        toast.error("Ошибка при загрузке пользователей");
        console.error("Ошибка запроса:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const table = useReactTable({
    data: users,
    columns: createColumns(handleStatusChange, handleDelete),
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) return <div className="text-muted-foreground p-6 text-center">Загрузка...</div>;

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground h-24 text-center">
                  Нет данных.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
