import { Button, cn, Popover } from "@heroui/react";
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
  placement?: "top" | "bottom" | "left" | "right";
  /**
   * Size of the trigger button
   */
  size?: "sm" | "md" | "lg";
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
   * Popover content
   */
  children: ReactNode;
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
  size = "sm",
  isSelected = false,
  children,
  className,
  isDisabled = false,
  isPending = false,
  "aria-label": ariaLabel,
  isOpen,
  onOpenChange,
  placement,
  ...props
}) => {
  const isIconOnly = !!icon;

  const triggerContent = icon;

  const triggerButton = (
    <Button
      aria-label={ariaLabel}
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

  return (
    <Popover.Root isOpen={isOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger>{triggerButton}</Popover.Trigger>
      <Popover.Content
        className="tooltip flex justify-center items-center"
        placement={placement}
      >
        {children}
      </Popover.Content>
    </Popover.Root>
  );
};

export default memo(PopoverWrapper);
