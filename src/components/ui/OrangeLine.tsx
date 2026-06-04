import { cn } from "@/lib/utils";

/** The short orange horizontal rule used above section headings throughout the design. */
export function OrangeLine({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-[3px] w-12 bg-[#F37021] rounded-full", className)}
      aria-hidden="true"
    />
  );
}
