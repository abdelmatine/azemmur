"use client";

import * as React from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "../../lib/utils";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  children: React.ReactNode;
}

export function IconButton({
  className,
  size = "sm",
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      size={size}
      className={cn(
        "rounded-full h-8 w-8 p-0 flex items-center justify-center",
        className
      )}
      {...props}
    />
  );
}
