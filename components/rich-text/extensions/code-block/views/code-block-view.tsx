import { Button, cn } from "@heroui/react";
import {
  NodeViewContent,
  NodeViewWrapper,
  type NodeViewProps,
} from "@tiptap/react";
import { useState, useRef, useEffect } from "react";

import { CodeBlock } from "../code-block";

import { CheckIcon, CopyIcon } from "@/components/icons";

interface CodeBlockViewProps extends NodeViewProps {}

export const CodeBlockView: React.FC<CodeBlockViewProps> = ({
  node,
  editor,
  getPos,
  updateAttributes,
  deleteNode,
  selected,
}) => {
  const { surface = "default", showLineNumbers = false } = node.attrs;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const codeBlockRef = useRef<HTMLDivElement>(null);

  const lineCount = node.textContent
    .split("\n")
    .filter((line) => line.trim() !== "").length;
  const shouldShowButton = lineCount > 15;

  const shouldCollapse = !isExpanded && shouldShowButton;

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);

    if (!isExpanded && codeBlockRef.current) {
      setTimeout(() => {
        codeBlockRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  };

  const handleCopy = async () => {
    if (codeBlockRef.current) {
      try {
        const text = codeBlockRef.current.innerText;

        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code: ", err);
        alert("Failed to copy code");
      }
    }
  };

  return (
    <NodeViewWrapper
      ref={codeBlockRef}
      className={cn(
        "surface",
        `surface--${surface}`,
        "rounded-lg font-mono py-3.5 px-3.5",
        "transition-all duration-300 relative overflow-hidden",
        { "max-h-40 opacity-80": shouldCollapse },
        { "max-h-[1000px] opacity-100": isExpanded },
      )}
      data-type={CodeBlock.name}
    >
      <pre className="min-w-full w-max *:flex *:flex-col">
        <code className="text-sm">
          <NodeViewContent />
        </code>

        <button
          className="absolute top-2 right-2 button button--ghost button--icon-only button--sm"
          contentEditable={false}
          onClick={handleCopy}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </pre>
      {shouldShowButton && (
        <Button
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
          size="sm"
          variant="tertiary"
          onPress={handleToggleExpand}
        >
          {isExpanded ? "Collapse code" : "Expand code"}
        </Button>
      )}
    </NodeViewWrapper>
  );
};
