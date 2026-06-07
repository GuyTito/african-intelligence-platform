import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  error?: string;
}

export const Selectii = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = "Select an option",
      label,
      disabled = false,
      name,
      className,
      triggerClassName,
      error,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);

    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : internalValue;

    const selectedOption = options.find((opt) => opt.value === selectedValue);
    const enabledOptions = options.filter((opt) => !opt.disabled);
    const enabledIndices = options
      .map((opt, i) => (!opt.disabled ? i : -1))
      .filter((i) => i !== -1);

    const getValidHighlightedIndex = useCallback(
      (current: number, direction: "up" | "down") => {
        if (enabledIndices.length === 0) return -1;
        if (current === -1) {
          return direction === "down"
            ? enabledIndices[0]
            : enabledIndices[enabledIndices.length - 1];
        }
        const currentPos = enabledIndices.indexOf(current);
        if (currentPos === -1) {
          return direction === "down"
            ? enabledIndices[0]
            : enabledIndices[enabledIndices.length - 1];
        }
        const nextPos =
          direction === "down"
            ? (currentPos + 1) % enabledIndices.length
            : (currentPos - 1 + enabledIndices.length) % enabledIndices.length;
        return enabledIndices[nextPos];
      },
      [enabledIndices],
    );

    const setValue = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
        setIsOpen(false);
        setHighlightedIndex(-1);
        triggerRef.current?.focus();
      },
      [isControlled, onChange],
    );

    const toggleOpen = useCallback(() => {
      if (disabled) return;
      setIsOpen((prev) => {
        if (!prev) {
          const firstEnabledIndex = enabledOptions[0]
            ? options.indexOf(enabledOptions[0])
            : -1;
          setHighlightedIndex(firstEnabledIndex);
        } else {
          setHighlightedIndex(-1);
        }
        return !prev;
      });
    }, [disabled, enabledOptions, options]);

    const close = useCallback(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }, []);

    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (selectRef.current && !selectRef.current.contains(target)) {
          close();
        }
      };
      const handleEscape = (event: globalThis.KeyboardEvent) => {
        if (event.key === "Escape") {
          close();
          triggerRef.current?.focus();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, close]);

    useEffect(() => {
      if (isOpen && highlightedIndex !== -1 && listboxRef.current) {
        const highlightedElement = listboxRef.current.querySelector(
          `[data-index="${highlightedIndex}"]`,
        );
        highlightedElement?.scrollIntoView({ block: "nearest" });
      }
    }, [isOpen, highlightedIndex]);

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      switch (event.key) {
        case "Enter":
        case " ":
        case "ArrowDown":
          event.preventDefault();
          toggleOpen();
          break;
        case "ArrowUp":
          event.preventDefault();
          setIsOpen(true);
          setHighlightedIndex(getValidHighlightedIndex(-1, "down"));
          break;
        default:
          break;
      }
    };

    const handleListboxKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) => getValidHighlightedIndex(prev, "down"));
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) => getValidHighlightedIndex(prev, "up"));
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (highlightedIndex !== -1 && !options[highlightedIndex].disabled) {
            setValue(options[highlightedIndex].value);
          }
          break;
        case "Escape":
          event.preventDefault();
          close();
          triggerRef.current?.focus();
          break;
        case "Tab":
          close();
          break;
        case "Home":
          event.preventDefault();
          setHighlightedIndex(getValidHighlightedIndex(-1, "down"));
          break;
        case "End":
          event.preventDefault();
          setHighlightedIndex(getValidHighlightedIndex(-1, "up"));
          break;
        default:
          break;
      }
    };

    const handleOptionClick = (option: SelectOption) => {
      if (option.disabled || disabled) return;
      setValue(option.value);
    };

    const handleOptionMouseEnter = (index: number) => {
      if (!options[index].disabled) {
        setHighlightedIndex(index);
      }
    };

    const labelId = label ? `select-label-${name ?? "select"}` : undefined;
    const listboxId = `select-listbox-${name ?? "select"}`;
    const describedById = error
      ? `select-error-${name ?? "select"}`
      : undefined;

    return (
      <div className={cn("w-full", className)} ref={selectRef}>
        {label && (
          <label
            id={labelId}
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <button
            ref={(node) => {
              (
                triggerRef as React.MutableRefObject<HTMLButtonElement | null>
              ).current = node;
              if (typeof ref === "function") ref(node);
              else if (ref)
                (
                  ref as React.MutableRefObject<HTMLButtonElement | null>
                ).current = node;
            }}
            type="button"
            onClick={toggleOpen}
            onKeyDown={handleTriggerKeyDown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={labelId}
            aria-describedby={describedById}
            aria-disabled={disabled}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 ring-offset-slate-900 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "data-[state=open]:ring-2 data-[state=open]:ring-blue-500 data-[state=open]:ring-offset-2",
              "placeholder:text-slate-500",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-900",
              error && "border-red-500 focus:ring-red-500",
              triggerClassName,
            )}
            data-state={isOpen ? "open" : "closed"}
          >
            <span
              className={cn("truncate", !selectedOption && "text-slate-500")}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-slate-400 transition-transform",
                isOpen && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>

          {isOpen && (
            <div className="absolute z-50 mt-1 max-h-72 w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-800 py-1 shadow-lg">
              <ul
                ref={listboxRef}
                id={listboxId}
                role="listbox"
                aria-labelledby={labelId}
                tabIndex={-1}
                onKeyDown={handleListboxKeyDown}
                className="max-h-72 overflow-y-auto py-1"
              >
                {options.length === 0 ? (
                  <li
                    role="option"
                    aria-selected={false}
                    aria-disabled={true}
                    className="px-3 py-2 text-sm text-slate-500 select-none"
                  >
                    No options available
                  </li>
                ) : (
                  options.map((option, index) => {
                    const isSelected = option.value === selectedValue;
                    const isHighlighted = index === highlightedIndex;
                    return (
                      <li
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled || disabled}
                        data-index={index}
                        data-selected={isSelected}
                        data-highlighted={isHighlighted}
                        onMouseEnter={() => handleOptionMouseEnter(index)}
                        onClick={() => handleOptionClick(option)}
                        className={cn(
                          "relative mx-1 flex cursor-default items-center rounded-md px-3 py-2 text-sm select-none",
                          "transition-colors",
                          isHighlighted &&
                            !option.disabled &&
                            "bg-slate-700 text-white",
                          !isHighlighted && "text-slate-300",
                          isSelected && "font-medium text-white",
                          (option.disabled || disabled) &&
                            "cursor-not-allowed opacity-50",
                        )}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected && (
                          <Check
                            className="ml-auto h-4 w-4 text-blue-400"
                            aria-hidden="true"
                          />
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>

        <input type="hidden" name={name} value={selectedValue} readOnly />

        {error && (
          <p
            id={describedById}
            role="alert"
            className="mt-1.5 text-sm text-red-400"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Selectii.displayName = "Select";
