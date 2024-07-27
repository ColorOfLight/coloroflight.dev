import { forwardRef, memo, ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export interface ProjectListProps extends ComponentPropsWithoutRef<"div"> {}

const ProjectList = memo(
  forwardRef<HTMLDivElement, ProjectListProps>(
    ({ className, ...restProps }, ref) => {
      return (
        <div
          className={clsx("flex flex-col gap-4", className)}
          {...restProps}
          ref={ref}
        ></div>
      );
    }
  )
);

export default ProjectList;
