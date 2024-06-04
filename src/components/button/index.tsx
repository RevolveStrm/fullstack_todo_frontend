import { cn } from "@/utils/cn";
import { Icon } from "../icon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string;
  fill: boolean;
};

export const Button = ({
  type = "button",
  icon,
  className,
  children,
  fill,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "flex max-w-xs items-center justify-center rounded-2xl border-2 border-heliotrope px-7 py-4 transition duration-500 hover:scale-95",
        {
          "bg-heliotrope": fill,
        },
        className,
      )}
      {...restProps}
    >
      {icon && <Icon icon={`${icon}`} />}

      {children}
    </button>
  );
};
