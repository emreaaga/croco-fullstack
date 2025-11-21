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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createColumns, User } from "./columns";
import { useUser } from "@/config/user-context";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function UsersPage() {
  const user = useUser();

  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [refreshKey, setRefreshKey] = React.useState(0); 

  const handleStatusChange = React.useCallback(
    async (id: number, status: "approved" | "rejected") => {
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
    },
    []
  );

  const handleDelete = React.useCallback(async (id: number) => {
    try {
      const res = await api.delete(`/users/${id}`);

      if (res.data.success) {
        toast.success("Пользователь удалён.");
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        toast.error("Не удалось удалить пользователя.");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Не удалось удалить пользователя.";
      toast.error(message);
    }
  }, []);

  const fetchUsers = React.useCallback(async () => {
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
  }, []);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers, refreshKey]);

  const memoColumns = React.useMemo(
    () => createColumns(handleStatusChange, handleDelete),
    [handleStatusChange, handleDelete]
  );

  const memoUsers = React.useMemo(() => users, [users]);

  const table = useReactTable({
    data: memoUsers,
    columns: memoColumns,
    state: { sorting },
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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

  if (loading) {
    return (
      <div className="rounded-md border p-4">
        <Table>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!loading && memoUsers.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 gap-4">
        <p className="text-muted-foreground text-sm">Нет пользователей 🥲</p>

        <Button
          onClick={() => setRefreshKey((x) => x + 1)}
          className="mt-2"
          variant="outline"
        >
          Обновить
        </Button>
      </div>
    );
  }

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getRowModel().rows.length} пользователей найдено
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Назад
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Вперёд
          </Button>
        </div>
      </div>
    </div>
  );
}
