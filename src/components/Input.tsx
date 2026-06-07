import * as React from "react";

import { cn } from "@/utils/cn";

type Props = Readonly<{
  label?: string;
}> &
  React.ComponentProps<"input">;

function Input({ className, label, type, ...props }: Props) {
  return (
    <div>
      {label && (
        <label
          htmlFor={props?.id ?? props.name}
          className="mb-1.5 block text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-12 w-full min-w-0 rounded-lg border border-input px-2.5 py-1 text-base focus-within:ring focus-within:ring-slate-500 hover:border-slate-600 border-slate-700 bg-slate-800 outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
