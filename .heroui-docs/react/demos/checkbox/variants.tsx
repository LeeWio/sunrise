import { Checkbox, Description, Label } from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Primary variant</p>
        <Checkbox id="primary" name="primary" variant="primary">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label htmlFor="primary">Primary checkbox</Label>
            <Description>Standard styling with default background</Description>
          </Checkbox.Content>
        </Checkbox>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Secondary variant</p>
        <Checkbox id="secondary" name="secondary" variant="secondary">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label htmlFor="secondary">Secondary checkbox</Label>
            <Description>Lower emphasis variant for use in surfaces</Description>
          </Checkbox.Content>
        </Checkbox>
      </div>
    </div>
  );
}
