"use client";

import { icons } from "lucide-react";
import * as LucideIcons from "lucide-react";

export const Icon = ({
  name,
  color,
  size,
  className,
}: {
  name: keyof typeof icons;
  color: string;
  size: number;
  className?: string;
}) => {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.warn(`Ícone "${name}" não encontrado`);
    return null;
  }

  return <LucideIcon color={color} size={size} className={className} />;
};
