import { Separator, Surface } from "@heroui/react";

export function ManualVariantOverride() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Separator on default surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
          <h3 className="text-foreground text-base font-semibold">Surface Content</h3>
          <Separator />
          <p className="text-muted text-sm">The separator adapts to the surface background.</p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Separator on secondary surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
          <h3 className="text-foreground text-base font-semibold">Surface Content</h3>
          <Separator />
          <p className="text-muted text-sm">The separator adapts to the surface background.</p>
        </Surface>
      </div>
    </div>
  );
}
