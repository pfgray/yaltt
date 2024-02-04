import { title } from "@effect/schema/Schema";
import { ReactNode } from "react";

import { Collapse } from "react-daisyui";

type LaunchCollapsibleProps = {
  title: string;
  children: ReactNode;
};

export const LaunchCollapsible = (props: LaunchCollapsibleProps) => (
  <div className="flex flex-wrap gap-2">
    <Collapse
      icon="arrow"
      checkbox
      className="border border-base-300 bg-base-200"
    >
      <Collapse.Title className="text-xl font-medium">
        {props.title}
      </Collapse.Title>
      <Collapse.Content>{props.children}</Collapse.Content>
    </Collapse>
  </div>
);
