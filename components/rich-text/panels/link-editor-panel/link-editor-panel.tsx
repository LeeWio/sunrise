import { useCallback, useMemo, useState } from "react";
import { Button, Form } from "@heroui/react";

import { CheckIcon } from "@/components/icons";

export type LinkEditorPanelProps = {
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
  onOpenChange?: () => void;
};

export const useLinkEditorState = ({
  initialUrl,
  initialOpenInNewTab,
  onSetLink,
}: LinkEditorPanelProps) => {
  const [url, setUrl] = useState(initialUrl || "");
  const [openInNewTab, setOpenInNewTab] = useState(
    initialOpenInNewTab || false,
  );

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }, []);

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValidUrl) {
        onSetLink(url, openInNewTab);
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink],
  );

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  };
};

export const LinkEditorPanel = ({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}: LinkEditorPanelProps) => {
  const state = useLinkEditorState({
    onSetLink,
    initialOpenInNewTab,
    initialUrl,
  });

  return (
    <Form
      className="flex justify-between items-center"
      onSubmit={state.handleSubmit}
    >
      <input
        aria-label="URL input"
        className="text-sm shadow-sm border-none ring-0 focus:ring-0 focus:outline-none hover:outline-none hover:border-none"
        placeholder="Enter URL"
        type="url"
        value={state.url}
        onChange={state.onChange}
      />
      <Button
        isIconOnly
        isDisabled={!state.isValidUrl}
        size="sm"
        type="submit"
        variant="ghost"
      >
        <CheckIcon />
      </Button>
    </Form>
  );
};
