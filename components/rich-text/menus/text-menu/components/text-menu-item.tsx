import { Button, cn, TooltipContent, TooltipRoot } from "@heroui/react";
import { memo } from "react";

interface TextMenuItemProps {
  /**
   * Icon to display in the button
   */
  icon?: React.ReactNode;
  /**
   * Whether the button is selected/active
   */
  isSelected?: boolean;
  /**
   * Size of the button
   */
  size?: "sm" | "md" | "lg";
  /**
   * Tooltip text to show on hover
   */
  tooltip?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Handler called when button is pressed
   */
  onPress?: () => void;
  /**
   * Content to display at the end of the button
   */
  endContent?: React.ReactNode;
  /**
   * Text value to display (used when no icon is provided)
   */
  value?: string;
  /**
   * Whether the button is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the button is in a loading state
   */
  isPending?: boolean;
  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
  /**
   * Tooltip placement
   */
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
}

const TextMenuItem: React.FC<TextMenuItemProps> = ({
  icon,
  tooltip,
  size = "sm",
  isSelected = false,
  value,
  onPress,
  endContent,
  className,
  isDisabled = false,
  isPending = false,
  "aria-label": ariaLabel,
  tooltipPlacement = "top",
  ...props
}) => {
  const button = (
    <Button
      isIconOnly
      aria-label={ariaLabel || (tooltip ? tooltip : value)}
      className={cn(
        "transition-all duration-200 ease-in-out",
        {
          "bg-accent text-accent-foreground hover:bg-accent/90": isSelected,
        },
        className,
      )}
      isDisabled={isDisabled}
      isPending={isPending}
      size={size}
      variant="ghost"
      onPress={onPress}
      {...props}
    >
      {icon || value}
      {endContent}
    </Button>
  );

  if (tooltip) {
    return (
      <TooltipRoot closeDelay={100} delay={300}>
        {button}
        <TooltipContent
          showArrow
          className="max-w-xs"
          placement={tooltipPlacement}
        >
          <p className="text-sm">{tooltip}</p>
        </TooltipContent>
      </TooltipRoot>
    );
  }

  return button;
};

export default memo(TextMenuItem);
