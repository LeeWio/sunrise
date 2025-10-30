import { Link } from "@heroui/react";

import TextMenuItem from "../../menus/text-menu/components/text-menu-item";

import { PencilIcon, TrashIcon } from "@/components/icons";

export type LinkPreviewPanelProps = {
  url: string;
  onEdit: () => void;
  onClear: () => void;
};

export const LinkPreviewPanel = ({
  url,
  onEdit,
  onClear,
}: LinkPreviewPanelProps) => {
  return (
    <div className="tooltip flex items-center justify-center gap-0.5 z-50">
      <Link.Root href={url} target={"_blank"}>
        {url}
      </Link.Root>

      <TextMenuItem
        aria-label="Edit link"
        icon={<PencilIcon />}
        tooltip="edit"
        onPress={onEdit}
      />

      <TextMenuItem
        aria-label="Remove link"
        icon={<TrashIcon />}
        tooltip="clear"
        onPress={onClear}
      />
    </div>
  );
};
