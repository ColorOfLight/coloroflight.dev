"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavigationProps extends React.ComponentProps<"nav"> {}
export interface NavigationItemProps extends React.ComponentProps<"li"> {
  to: string;
}

const Navigation = ({ className, children, ...restProps }: NavigationProps) => {
  return (
    <nav
      className={
        "bg-slate-100 px-6 py-8 border-slate-200 border-r" +
        (` ${className}` ?? "")
      }
      {...restProps}
    >
      <ul className="flex flex-col gap-2">{children}</ul>
    </nav>
  );
};

const NavigationItem = ({
  className,
  to,
  ...restProps
}: NavigationItemProps) => {
  const pathname = usePathname();
  const isCurrentPath = pathname === to;

  return (
    <Link href={to}>
      <li
        className={
          "text-gray-900" +
          (isCurrentPath ? " font-medium" : "") +
          (` className` ?? "")
        }
        {...restProps}
      ></li>
    </Link>
  );
};

export default Navigation;
export { NavigationItem };
