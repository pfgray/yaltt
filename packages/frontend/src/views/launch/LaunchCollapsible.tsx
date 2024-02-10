import { ReactNode, useState } from "react";

import { Collapse } from "react-daisyui";

type LaunchCollapsibleProps = {
  title: string;
  initialOpen?: boolean;
  children: ReactNode;
};

export const LaunchCollapsible = (props: LaunchCollapsibleProps) => {
  const [open, setOpen] = useState(props.initialOpen === true);
  console.log("Rendering collapsible with:", props.initialOpen, open);
  return (
    <div className="flex flex-wrap gap-2">
      <Collapse
        icon="arrow"
        checkbox
        className="border border-base-300 bg-base-200"
        open={open}
        onToggle={() => setOpen(!open)}
      >
        <Collapse.Title className="text-xl font-medium">
          {props.title}
        </Collapse.Title>
        <Collapse.Content>{props.children}</Collapse.Content>
      </Collapse>
    </div>
  );
};
