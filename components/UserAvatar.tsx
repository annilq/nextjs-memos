import { cn } from "@/utils/utils";

interface Props {
  avatarUrl?: string;
  className?: string;
}

const UserAvatar = (props: Props) => {
  const { avatarUrl, className } = props;
  return (
    <div className={cn(`w-8 h-8 overflow-clip rounded-full`, className)}>
      <img
        className="w-full h-auto rounded-full shadow min-w-full min-h-full object-cover dark:opacity-80"
        src={avatarUrl || "/logo.webp"}
        decoding="async"
        loading="lazy"
        alt=""
      />
    </div>
  );
};

export default UserAvatar;
