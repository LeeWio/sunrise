import {
  Button,
  cn,
  PopoverArrow,
  PopoverContent,
  PopoverDialog,
  PopoverRoot,
} from "@heroui/react";
import { memo, ReactNode } from "react";

interface PopoverWrapperProps {
  /**
   * Icon to display in the trigger button
   */
  icon?: ReactNode;
  /**
   * Whether the trigger button is selected/active
   */
  isSelected?: boolean;
  /**
   * Size of the trigger button
   */
  size?: "sm" | "md" | "lg";
  /**
   * Tooltip text to show on hover
   */
  tooltip?: string;
  /**
   * Additional CSS classes for the trigger button
   */
  className?: string;
  /**
   * Additional CSS classes for the popover content
   */
  popoverClassName?: string;
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
   * Popover placement
   */
  placement?: "top" | "bottom" | "left" | "right";
  /**
   * Popover offset from trigger
   */
  offset?: number;
  /**
   * Whether popover should show arrow
   */
  showArrow?: boolean;
  /**
   * Popover content
   */
  children: ReactNode;
  /**
   * Popover heading (optional)
   */
  heading?: ReactNode;
  /**
   * Whether popover is controlled
   */
  isOpen?: boolean;
  /**
   * Called when popover open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
}

const PopoverWrapper: React.FC<PopoverWrapperProps> = ({
  icon,
  tooltip,
  size = "sm",
  isSelected = false,
  children,
  heading,
  className,
  popoverClassName,
  isDisabled = false,
  isPending = false,
  "aria-label": ariaLabel,
  placement = "bottom",
  offset = 8,
  showArrow = true,
  isOpen,
  onOpenChange,
  ...props
}) => {
  // Determine if button should be icon only (priority to icon only mode)
  const isIconOnly = !!icon;

  // Trigger button content
  const triggerContent = icon;

  // Create the trigger button component
  const triggerButton = (
    <Button
      aria-label={ariaLabel || (tooltip ? tooltip : "")}
      className={cn(
        "transition-all duration-200 ease-in-out",
        {
          "bg-accent text-accent-foreground hover:bg-accent/90": isSelected,
        },
        className,
      )}
      isDisabled={isDisabled}
      isIconOnly={isIconOnly}
      isPending={isPending}
      size={size}
      variant="ghost"
      {...props}
    >
      {triggerContent}
    </Button>
  );

  // Popover content
  const popoverContent = (
    <PopoverDialog className={cn(popoverClassName)}>
      {heading && (
        <div className="px-3 py-2 border-b border-border">{heading}</div>
      )}
      {children}
    </PopoverDialog>
  );

  return (
    <PopoverRoot isOpen={isOpen} onOpenChange={onOpenChange}>
      {triggerButton}
      <PopoverContent offset={offset} placement={placement}>
        {showArrow && <PopoverArrow />}
        {popoverContent}
      </PopoverContent>
    </PopoverRoot>
  );
};

export default memo(PopoverWrapper);
