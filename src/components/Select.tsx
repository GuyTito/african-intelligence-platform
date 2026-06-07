import ReactSelect, {
  type SelectComponentsConfig,
  type StylesConfig,
} from "react-select";

import { cn } from "@/utils/cn";

import { Loader } from "./Loader";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

type Props = Readonly<
  {
    options?: SelectOption[];
    onChange?: any;
    value?: any;
    error?: string | { message: string } | boolean;
    label?: string;
    className?: string;
    iconBefore?: string;
  } & React.ComponentProps<typeof ReactSelect>
>;

export function Select(props: Props) {
  const { options, onChange, value, label, iconBefore, ...rest } = props;

  return (
    <div className={cn(props.className)}>
      {label && (
        <label
          htmlFor={props?.id ?? props.name}
          className="mb-1.5 block text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "border focus-within:ring focus-within:ring-slate-500 hover:border-slate-600 border-slate-700 bg-slate-800 rounded-lg flex justify-between flex-1 items-center overflow-hidden focus-within:outline-none",
        )}
      >
        {iconBefore ?? null}
        <ReactSelect
          id={props?.id ?? props.name}
          options={options}
          menuPosition="fixed"
          onChange={(option: any, { name }) => {
            onChange({ target: { value: option?.value, name } });
          }}
          value={options?.find((option) => option.value === value) ?? null}
          isClearable
          isSearchable
          components={{ ...props.components, ...selectComponents }}
          {...rest}
          styles={selectStyles}
        />
      </div>
    </div>
  );
}

const selectComponents: Partial<SelectComponentsConfig<any, any, any>> = {
  LoadingIndicator: (inner) => (
    <Loader {...inner} size="small" position="center" />
  ),
  IndicatorSeparator: () => null,
};

const selectStyles: StylesConfig<any> = {
  container: (baseStyles) => ({
    ...baseStyles,
    width: "100%",
  }),
  control: (baseStyles) => ({
    ...baseStyles,
    color: "var(--color-slate-300)",
    backgroundColor: "transparent",
    borderWidth: "0",
    boxShadow: "",
    paddingBlock: "2px",
    paddingInline: "0",
    height: "48px",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "var(--color-slate-300)",
    fontSize: "14px",
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: "var(--color-slate-300)",
    fontSize: "14px",
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: "var(--color-slate-500)",
    fontSize: "14px",
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "hsl(35.36, 41.67%, 95.29%)",
    borderRadius: "4px",
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    ":hover": {
      backgroundColor: "hsl(35.36, 42.41%, 62.55%)",
      borderRadius: "4px",
      color: "white",
    },
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    // background: "oklch(27.9% 0.041 260.031)",
    background: "var(--color-slate-800)",
    // border: "1px solid oklch(37.2% 0.044 257.287)",
    border: "1px solid var(--color-slate-700)",
    padding: "4px",
    borderRadius: "12px",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    color: "var(--color-slate-300)",
    borderRadius: "12px",
    ":hover": {
      backgroundColor: state.isSelected
        ? "var(--color-slate-600)"
        : "var(--color-slate-700)",
    },
    backgroundColor: state.isSelected
      ? "var(--color-slate-600)"
      : state.isFocused
        ? "var(--color-slate-700)"
        : undefined,
  }),
};
