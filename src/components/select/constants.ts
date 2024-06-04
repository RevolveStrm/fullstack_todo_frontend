import { cn } from "@/utils/cn";
import { ClassNamesConfig, StylesConfig } from "react-select";
const controlStyles = {
  base: " text-black border-2 outline-none border-friar-gray font-sans rounded-2xl bg-white hover:cursor-pointer h-[52px] w-32",
  focus: "border-friar-gray outline-none ",
  nonFocus: "border-gray-300 hover:border-friar-gray",
};
const placeholderStyles = "pl-1 py-0.5 ";
const selectInputStyles = "pl-1 py-0.5";
const valueContainerStyles = "p-2";
const singleValueStyles = "leading-7 text-center";
const indicatorsContainerStyles = "p-1 ";
const indicatorSeparatorStyles = "none";
const dropdownIndicatorStyles =
  "p-1 hover:bg-gray-100  rounded-2xl hover:text-black";
const menuStyles =
  "p-2 mt-2 border border-gray-200 bg-white rounded-2xl max-h-36  text-friar-gray animate-fadeIn ";
const groupHeadingStyles = "ml-3 mt-2 mb-1  text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded-2xl text-center",
  focus: "bg-gray-100 active:bg-gray-200",
  selected:
    "text-black font-semibold after:content-['✔'] after:ml-2 after:text-green-500 ",
};
const noOptionsMessageStyles =
  " p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

export const selectStylesConfig: StylesConfig<any, false, any> = {
  input: (base) => ({
    ...base,
    "input:focus": {
      boxShadow: "none",
    },
  }),
  control: (base) => ({
    ...base,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
  }),
  menuList: (base, state) => ({
    ...base,
    maxHeight: "125px",
  }),
};

export const selectClassnamesConfig: ClassNamesConfig = {
  control: ({ isFocused }) =>
    cn(
      isFocused ? controlStyles.focus : controlStyles.nonFocus,
      controlStyles.base,
    ),
  placeholder: () => placeholderStyles,
  input: () => selectInputStyles,
  valueContainer: () => valueContainerStyles,
  singleValue: () => singleValueStyles,
  indicatorsContainer: () => indicatorsContainerStyles,
  indicatorSeparator: () => indicatorSeparatorStyles,
  dropdownIndicator: () => dropdownIndicatorStyles,
  menu: () => menuStyles,
  groupHeading: () => groupHeadingStyles,
  option: ({ isFocused, isSelected }) =>
    cn(
      isFocused && optionStyles.focus,
      isSelected && optionStyles.selected,
      optionStyles.base,
    ),
  noOptionsMessage: () => noOptionsMessageStyles,
  menuList: () => "!max-h-32 ",
};
