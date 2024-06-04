type Props = { icon?: string; className?: string };

export const Icon = ({ icon, className }: Props) => {
  return <i className={`${icon} ${className}`} />;
};
