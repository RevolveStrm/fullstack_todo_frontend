import { cn } from "@/utils/cn";

type Props = React.HTMLAttributes<HTMLSpanElement>;

export const Error = (props: Props) => {
  const { className, children, ...restProps } = props;

  return (
    <span {...restProps} className={cn("text-sm text-red-400", className)}>
      {children}
    </span>
  );
};
