"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Loader2, ShieldOff, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiServer } from "@/lib/api-server";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function AccountPage() {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.warning("Заполните все поля");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Пароли не совпадают");
    }

    try {
      setLoading(true);

      const res = await apiServer("/auth/change-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          old_password: oldPassword,
          password: newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Ошибка при смене пароля");
      }

      toast.success("Пароль успешно изменён!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message || "Не удалось изменить пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="border-border/40 bg-card/50 w-full space-y-6 rounded-lg border p-6 shadow-sm transition-all">
        <div className="space-y-1">
          <h4 className="text-base font-semibold">Изменить пароль</h4>
          <p className="text-muted-foreground text-sm">Для защиты вашего аккаунта регулярно обновляйте пароль.</p>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="max-w-md space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="current-password">Текущий пароль</Label>
              <InputGroup>
                <InputGroupInput
                  id="current-password"
                  type={showOld ? "text" : "password"}
                  placeholder="••••••••"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />

                <InputGroupAddon>
                  <Lock className="h-4 w-4" />
                </InputGroupAddon>

                <InputGroupAddon align="inline-end" className="cursor-pointer">
                  {showOld ? (
                    <EyeOff className="h-4 w-4" onClick={() => setShowOld(false)} />
                  ) : (
                    <Eye className="h-4 w-4" onClick={() => setShowOld(true)} />
                  )}
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-password">Новый пароль</Label>
              <InputGroup>
                <InputGroupInput
                  id="new-password"
                  type={showNew ? "text" : "password"}
                  placeholder="Введите новый пароль"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <InputGroupAddon>
                  <Lock className="h-4 w-4" />
                </InputGroupAddon>

                <InputGroupAddon align="inline-end" className="cursor-pointer">
                  {showNew ? (
                    <EyeOff className="h-4 w-4" onClick={() => setShowNew(false)} />
                  ) : (
                    <Eye className="h-4 w-4" onClick={() => setShowNew(true)} />
                  )}
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Подтвердите пароль</Label>
              <InputGroup>
                <InputGroupInput
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Повторите новый пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <InputGroupAddon>
                  <Lock className="h-4 w-4" />
                </InputGroupAddon>

                <InputGroupAddon align="inline-end" className="cursor-pointer">
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" onClick={() => setShowConfirm(false)} />
                  ) : (
                    <Eye className="h-4 w-4" onClick={() => setShowConfirm(true)} />
                  )}
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>

          <div className="flex justify-end">
            <Button size="sm" onClick={handleChangePassword} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Обновление..." : "Обновить пароль"}
            </Button>
          </div>
        </div>
      </div>

      <div className="border-border/40 bg-card/50 w-full space-y-6 rounded-lg border p-6 shadow-sm transition-all">
        <div className="space-y-1">
          <h4 className="flex items-center gap-2 text-base font-semibold">Двухфакторная аутентификация (2FA)</h4>
          <p className="text-muted-foreground text-sm">Дополнительная защита вашего аккаунта при входе.</p>
        </div>

        <Separator />

        <div className="flex max-w-md flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted rounded-md p-2">
              <ShieldOff className="text-muted-foreground h-5 w-5" />
            </div>
            <div>
              <Label className="text-sm font-medium">2FA неактивна</Label>
              <p className="text-muted-foreground text-sm">Скоро будет доступно</p>
            </div>
          </div>

          <Switch disabled />
        </div>
      </div>
    </div>
  );
}
