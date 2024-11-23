import type { Metadata, Viewport } from "next";

type Props = React.PropsWithChildren & {
  modal: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker",
};

export default function TasksLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
