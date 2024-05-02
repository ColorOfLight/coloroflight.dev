"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

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
      <Link href="/">
        <div className="mb-2">
          <FontAwesomeIcon
            className="text-gray-400 w-4 h-4 hover:text-gray-500"
            icon={faHouse}
          />
        </div>
      </Link>
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
          "text-gray-900 hover:font-semibold" +
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
