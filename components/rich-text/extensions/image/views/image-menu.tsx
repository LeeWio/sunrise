import {
  Select,
  Label,
  Popover,
  Tabs,
  ListBox,
  Button,
  Slider,
} from "@heroui/react";
import { useCallback, useState } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { Image, SetImageOptions } from "../image";
import {
  ArrowTriangleheadClockwiseRotate90Icon,
  ArrowTriangleheadLeftAndRightRighttriangleLeftRighttriangleRightFillIcon,
  ArrowTriangleheadUpAndDownRighttriangleUpRighttriangleDownFillIcon,
  AspectratioFillIcon,
  PaintpaletteFillIcon,
  SliderVertical3Icon,
} from "@/components/icons";

interface ImageMenuProps {
  editor: Editor;
}

const LABEL_CLASS = "font-medium text-xs text-muted uppercase";

const FLIP_TOGGLE_MAP: Record<
  string,
  { horizontal: SetImageOptions["flip"]; vertical: SetImageOptions["flip"] }
> = {
  none: { horizontal: "horizontal", vertical: "vertical" },
  horizontal: { horizontal: "none", vertical: "both" },
  vertical: { horizontal: "both", vertical: "none" },
  both: { horizontal: "vertical", vertical: "horizontal" },
};

const FILTER_PRESETS = {
  normal: { brightness: 100, contrast: 100, saturate: 100 },
  bw: { brightness: 100, contrast: 100, saturate: 1 },
  vintage: { brightness: 110, contrast: 90, saturate: 70 },
  vivid: { brightness: 105, contrast: 120, saturate: 130 },
  soft: { brightness: 110, contrast: 80, saturate: 90 },
} as const;

export const ImageMenu: React.FC<ImageMenuProps> = ({ editor }) => {
  return (
    <Popover.Content className="z-50 max-h-[80vh] overflow-y-auto scrollbar-hide">
      <Popover.Dialog>
        <Tabs>
          <Tabs.ListContainer>
            <Tabs.List
              aria-label="Image editing options"
              className="*:data-[selected=true]:text-accent z-50"
            >
              <Tabs.Tab
                id="transform"
                className="w-full h-full flex flex-col items-center justify-center py-1.5 gap-1"
              >
                <AspectratioFillIcon />
                <span className="text-xs">Transform</span>
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab
                id="adjust"
                className="w-full h-full flex flex-col items-center justify-center py-1.5 gap-1"
              >
                <SliderVertical3Icon />
                <span className="text-xs">Adjust</span>
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab
                id="style"
                className="w-full h-full flex flex-col items-center justify-center py-1.5 gap-1"
              >
                <PaintpaletteFillIcon />
                <span className="text-xs">Style</span>
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          <Tabs.Panel className="pt-4 space-y-4" id="transform">
            <div className="space-y-2">
              <Label className={LABEL_CLASS}>Alignment</Label>
              <ImageAlignTabs editor={editor} />
            </div>
            <div className="space-y-2">
              <Label className={LABEL_CLASS}>Size</Label>
              <ImageSizeTabs editor={editor} />
            </div>
            <div className="space-y-2">
              <Label className={LABEL_CLASS}>Aspect Ratio</Label>
              <ImageAspectSelect editor={editor} />
            </div>
          </Tabs.Panel>
          <Tabs.Panel className="pt-4 space-y-4" id="adjust">
            <div className="space-y-2">
              <Label className={LABEL_CLASS}>Preset Filters</Label>
              <ImageFilterPresets editor={editor} />
            </div>
            <ImageBrightnessTabs editor={editor} />
            <ImageContrastTabs editor={editor} />
            <ImageSaturateTabs editor={editor} />
          </Tabs.Panel>
          <Tabs.Panel className="pt-4 space-y-4" id="style">
            <div className="space-y-2">
              <Label className={LABEL_CLASS}>Border Radius</Label>
              <ImageRadiusTabs editor={editor} />
            </div>
            <div className="space-y-2">
              <Label className={LABEL_CLASS}>Border</Label>
              <ImageBorderTabs editor={editor} />
            </div>
            <div className="space-y-2">
              <Label className={LABEL_CLASS}>Shadow</Label>
              <ImageShadowTabs editor={editor} />
            </div>
          </Tabs.Panel>
        </Tabs>
      </Popover.Dialog>
    </Popover.Content>
  );
};

interface TabOption {
  id: string;
  label: string;
}

interface ImageControlTabsProps {
  options: TabOption[];
  selected: string;
  onChange: (key: string) => void;
  ariaLabel: string;
}

const ImageControlTabs: React.FC<ImageControlTabsProps> = ({
  options,
  selected,
  onChange,
  ariaLabel,
}) => {
  return (
    <Tabs
      className="w-full"
      selectedKey={selected}
      onSelectionChange={(key) => onChange(key as string)}
    >
      <Tabs.ListContainer>
        <Tabs.List
          className="rounded-xl grid w-full"
          style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
          aria-label={ariaLabel}
        >
          {options.map((option) => (
            <Tabs.Tab key={option.id} id={option.id} className="text-xs">
              {option.label}
              <Tabs.Indicator className="rounded-xl" />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
};

const ImageAlignTabs = ({ editor }: ImageMenuProps) => {
  const { align } = useEditorState({
    editor,
    selector(ctx) {
      return {
        align: ctx.editor.getAttributes(Image.name).align,
      };
    },
  });

  const onAlignChange = useCallback(
    (align: string) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageAlign(align as SetImageOptions["align"])
        .run();
    },
    [editor],
  );

  const options: TabOption[] = [
    { id: "left", label: "Left" },
    { id: "center", label: "Center" },
    { id: "right", label: "Right" },
    { id: "justify", label: "Justify" },
  ];

  return (
    <ImageControlTabs
      options={options}
      selected={align}
      onChange={onAlignChange}
      ariaLabel="Image alignment"
    />
  );
};

const ImageAspectSelect = ({ editor }: ImageMenuProps) => {
  const { aspect, flip, rotate } = useEditorState({
    editor,
    selector(ctx) {
      const attrs = ctx.editor.getAttributes(Image.name);
      return {
        aspect: attrs.aspect,
        flip: attrs.flip || "none",
        rotate: attrs.rotate || "0",
      };
    },
  });

  const onAspectChange = useCallback(
    (value: SetImageOptions["aspect"]) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageAspect(value)
        .run();
    },
    [editor],
  );

  const onRotate90 = useCallback(() => {
    const newRotate = (
      (parseInt(rotate) + 90) %
      360
    ).toString() as SetImageOptions["rotate"];
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageRotate(newRotate)
      .run();
  }, [editor, rotate]);

  const onFlipHorizontal = useCallback(() => {
    const newFlip = FLIP_TOGGLE_MAP[flip]?.horizontal || "none";
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageFlip(newFlip)
      .run();
  }, [editor, flip]);

  const onFlipVertical = useCallback(() => {
    const newFlip = FLIP_TOGGLE_MAP[flip]?.vertical || "none";
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageFlip(newFlip)
      .run();
  }, [editor, flip]);

  const isFlippedHorizontal = flip === "horizontal" || flip === "both";
  const isFlippedVertical = flip === "vertical" || flip === "both";

  return (
    <div className="flex gap-2 items-end">
      <div className="flex gap-1">
        <Button
          size="sm"
          isIconOnly
          variant="ghost"
          onPress={onRotate90}
          aria-label="Rotate 90°"
          className="data-[pressed=true]:scale-95"
        >
          <ArrowTriangleheadClockwiseRotate90Icon />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          isIconOnly
          onPress={onFlipHorizontal}
          aria-label="Flip horizontal"
          className="data-[pressed=true]:scale-95"
        >
          <ArrowTriangleheadLeftAndRightRighttriangleLeftRighttriangleRightFillIcon />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          isIconOnly
          onPress={onFlipVertical}
          aria-label="Flip vertical"
          className="data-[pressed=true]:scale-95"
        >
          <ArrowTriangleheadUpAndDownRighttriangleUpRighttriangleDownFillIcon />
        </Button>
      </div>
      <Select
        value={aspect}
        onChange={(value) => onAspectChange(value as SetImageOptions["aspect"])}
        placeholder="Select aspect ratio"
        className="flex-1"
      >
        <Select.Trigger className="w-full">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="auto" textValue="Auto">
              Auto
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="square" textValue="Square">
              Square (1:1)
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="video" textValue="Video">
              Video (16:9)
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="[4/3]" textValue="Standard">
              Standard (4:3)
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
};

const ImageSizeTabs = ({ editor }: ImageMenuProps) => {
  const { size } = useEditorState({
    editor,
    selector(ctx) {
      return {
        size: ctx.editor.getAttributes(Image.name).size,
      };
    },
  });

  const onSizeChange = useCallback(
    (size: string) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageSize(size as SetImageOptions["size"])
        .run();
    },
    [editor],
  );

  const options: TabOption[] = [
    { id: "25%", label: "25%" },
    { id: "50%", label: "50%" },
    { id: "75%", label: "75%" },
    { id: "100%", label: "100%" },
  ];

  return (
    <ImageControlTabs
      options={options}
      selected={size}
      onChange={onSizeChange}
      ariaLabel="Image size"
    />
  );
};

const ImageRadiusTabs = ({ editor }: ImageMenuProps) => {
  const { radius } = useEditorState({
    editor,
    selector(ctx) {
      return {
        radius: ctx.editor.getAttributes(Image.name).radius,
      };
    },
  });

  const onRadiusChange = useCallback(
    (radius: string) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageRadius(radius as SetImageOptions["radius"])
        .run();
    },
    [editor],
  );

  const options: TabOption[] = [
    { id: "none", label: "None" },
    { id: "md", label: "Medium" },
    { id: "xl", label: "Large" },
    { id: "3xl", label: "X-Large" },
  ];

  return (
    <ImageControlTabs
      options={options}
      selected={radius}
      onChange={onRadiusChange}
      ariaLabel="Image border radius"
    />
  );
};

const ImageShadowTabs = ({ editor }: ImageMenuProps) => {
  const { shadow } = useEditorState({
    editor,
    selector(ctx) {
      return {
        shadow: ctx.editor.getAttributes(Image.name).shadow,
      };
    },
  });

  const onShadowChange = useCallback(
    (shadow: string) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageShadow(shadow as SetImageOptions["shadow"])
        .run();
    },
    [editor],
  );

  const options: TabOption[] = [
    { id: "none", label: "None" },
    { id: "sm", label: "Small" },
    { id: "md", label: "Medium" },
    { id: "lg", label: "Large" },
    { id: "xl", label: "X-Large" },
  ];

  return (
    <ImageControlTabs
      options={options}
      selected={shadow}
      onChange={onShadowChange}
      ariaLabel="Image shadow"
    />
  );
};

const ImageBorderTabs = ({ editor }: ImageMenuProps) => {
  const { border } = useEditorState({
    editor,
    selector(ctx) {
      return {
        border: ctx.editor.getAttributes(Image.name).border,
      };
    },
  });

  const onBorderChange = useCallback(
    (border: string) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageBorder(border as SetImageOptions["border"])
        .run();
    },
    [editor],
  );

  const options: TabOption[] = [
    { id: "none", label: "None" },
    { id: "sm", label: "Small" },
    { id: "md", label: "Medium" },
    { id: "lg", label: "Large" },
    { id: "xl", label: "X-Large" },
  ];

  return (
    <ImageControlTabs
      options={options}
      selected={border}
      onChange={onBorderChange}
      ariaLabel="Image border"
    />
  );
};

interface ImageAdjustSliderProps {
  editor: Editor;
  attribute: "brightness" | "contrast" | "saturate";
  label: string;
  ariaLabel: string;
}

const ImageAdjustSlider: React.FC<ImageAdjustSliderProps> = ({
  editor,
  attribute,
  label,
  ariaLabel,
}) => {
  const attributeValue = useEditorState({
    editor,
    selector(ctx) {
      return ctx.editor.getAttributes(Image.name)[attribute] || 100;
    },
  });

  const onChange = useCallback(
    (value: number | number[]) => {
      const numValue = Array.isArray(value) ? value[0] : value;
      const command =
        attribute === "brightness"
          ? "setImageBrightness"
          : attribute === "contrast"
            ? "setImageContrast"
            : "setImageSaturate";

      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        [command](numValue)
        .run();
    },
    [editor, attribute],
  );

  return (
    <div className="space-y-2">
      <Label className={LABEL_CLASS}>{label}</Label>
      <Slider
        className="w-full"
        value={attributeValue}
        onChange={onChange}
        minValue={0}
        maxValue={200}
        step={1}
        aria-label={ariaLabel}
      >
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
        <Slider.Output />
      </Slider>
    </div>
  );
};

const ImageBrightnessTabs = ({ editor }: ImageMenuProps) => {
  return (
    <ImageAdjustSlider
      editor={editor}
      attribute="brightness"
      label="Brightness"
      ariaLabel="Image brightness"
    />
  );
};

const ImageContrastTabs = ({ editor }: ImageMenuProps) => {
  return (
    <ImageAdjustSlider
      editor={editor}
      attribute="contrast"
      label="Contrast"
      ariaLabel="Image contrast"
    />
  );
};

const ImageSaturateTabs = ({ editor }: ImageMenuProps) => {
  return (
    <ImageAdjustSlider
      editor={editor}
      attribute="saturate"
      label="Saturation"
      ariaLabel="Image saturation"
    />
  );
};

const ImageFilterPresets = ({ editor }: ImageMenuProps) => {
  const [selectedPreset, setSelectedPreset] = useState<string>("");

  const applyPreset = useCallback(
    (preset: string) => {
      setSelectedPreset(preset);

      const values = FILTER_PRESETS[preset as keyof typeof FILTER_PRESETS];
      if (values) {
        editor
          .chain()
          .focus(undefined, { scrollIntoView: false })
          .setImageBrightness(values.brightness)
          .setImageContrast(values.contrast)
          .setImageSaturate(values.saturate)
          .run();
      }
    },
    [editor],
  );

  const options: TabOption[] = [
    { id: "normal", label: "Normal" },
    { id: "bw", label: "B&W" },
    { id: "vintage", label: "Vintage" },
    { id: "vivid", label: "Vivid" },
    { id: "soft", label: "Soft" },
  ];

  return (
    <ImageControlTabs
      options={options}
      selected={selectedPreset}
      onChange={applyPreset}
      ariaLabel="Image filter presets"
    />
  );
};
