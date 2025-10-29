import { useCallback, useMemo, useState } from "react";
import { Button, Form, Input } from "@heroui/react";

import { CheckIcon } from "@/components/icons";

export type LinkEditorPanelProps = {
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
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
    <>
      <Form
        className="flex justify-center items-center"
        onSubmit={state.handleSubmit}
      >
        <Input
          aria-label="URL input"
          placeholder="Enter URL"
          type="url"
          value={state.url}
          onChange={state.onChange}
        />
        <Button
          isDisabled={!state.isValidUrl}
          size="lg"
          type="submit"
          variant="ghost"
        >
          <CheckIcon />
        </Button>
      </Form>
    </>
  );
};
