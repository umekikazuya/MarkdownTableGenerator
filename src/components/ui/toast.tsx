"use client";

import { Toaster, toast } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}

export function showToast({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  toast(title, {
    description,
  });
}
