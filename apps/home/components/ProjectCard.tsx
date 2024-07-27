import { memo, forwardRef, ComponentPropsWithoutRef } from "react";
import Image from "next/image";

export interface ProjectCardProps extends ComponentPropsWithoutRef<"a"> {
  name: string;
  url: string;
  description: string;
}

const ProjectCard = memo(
  forwardRef<HTMLAnchorElement, ProjectCardProps>(
    ({ name, url, description, ...restProps }, ref) => {
      return (
        <a
          className="no-underline"
          {...restProps}
          href={url}
          target="_blank"
          ref={ref}
        >
          <div className="border p-6 py-4 rounded border-gray-300 md:p-6 hover:bg-gray-100 dark:border-gray-500  dark:hover:bg-gray-950">
            <h3 className="m-0 nx-text-gray-800 font-medium">{name}</h3>
            <p className="m-0 mt-2 nx-text-gray-600 font-normal leading-normal dark:nx-text-gray-300">
              {description}
            </p>
          </div>
        </a>
      );
    }
  )
);

export default ProjectCard;
