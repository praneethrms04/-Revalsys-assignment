"use client";

import { useId, useRef, useState, useCallback, useEffect, memo } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[] | SelectOption[];
  placeholder?: string;
  label: string;
  className?: string;
}

export const Select = memo(function Select({
  value,
  onChange,
  options,
  placeholder,
  label,
  className,
}: SelectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (option: SelectOption) => {
      onChange(option.value);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [onChange],
  );

  useEffect(() => {
    if (!open) {
      setActiveIndex(-1);
      return;
    }
    const idx = options.findIndex((o) => o.value === value);
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [open, options, value]);

  useEffect(() => {
    if (!open || activeIndex < 0 || !listRef.current) return;
    const el = listRef.current.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          setOpen(false);
          triggerRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1,
          );
          break;
        case "Home":
          e.preventDefault();
          setActiveIndex(0);
          break;
        case "End":
          e.preventDefault();
          setActiveIndex(options.length - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < options.length) {
            handleSelect(options[activeIndex]);
          }
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, activeIndex, options, handleSelect]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const listboxId = `${id}-listbox`;

  return (
    <div className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={
          activeIndex >= 0 ? `${id}-opt-${options[activeIndex]?.value}` : undefined
        }
        aria-label={label}
        onClick={handleToggle}
        className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition-all duration-200 hover:bg-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
        style={{
          borderColor: open
            ? "var(--border-focus)"
            : "var(--border)",
        }}
      >
        <span className={cn(!selectedOption && "text-text-tertiary")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-text-tertiary transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute z-50 mt-1 w-full min-w-[160px] rounded-lg border border-border bg-background p-1 shadow-lg shadow-black/5"
          style={{ animation: "select-fade-in 0.15s ease-out" }}
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              id={`${id}-opt-${option.value}`}
              role="option"
              aria-selected={option.value === value}
              className={cn(
                "flex cursor-pointer items-center rounded-md px-2.5 py-2 text-sm transition-all duration-150",
                i === activeIndex && "bg-muted",
                option.value === value
                  ? "font-medium text-foreground"
                  : "text-text-secondary",
              )}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(option);
              }}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
