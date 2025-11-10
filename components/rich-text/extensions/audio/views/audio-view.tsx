import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import {
  Button,
  Card,
  Label,
  Slider,
  TooltipContent,
  TooltipRoot,
} from "@heroui/react";

import {
  BackwardFillIcon,
  ForwardFillIcon,
  HeartIcon,
  PlayFillIcon,
  SpeakerWave2Icon,
} from "@/components/icons";

interface AudioViewProps extends NodeViewProps {}

export const AudioView: React.FC<AudioViewProps> = ({
  node,
  selected,
  updateAttributes,
}) => {
  const { src, title, artist, album, controls, autoplay } = node.attrs;

  return (
    <NodeViewWrapper data-drag-handle>
      {/* <MusicPlayerFinal */}
      {/*   album={album} */}
      {/*   artist={artist} */}
      {/*   autoplay={autoplay} */}
      {/*   parsedDuration={node.attrs.duration} */}
      {/*   title={title} */}
      {/*   url={src} */}
      {/* /> */}

      <Card variant="default">
        <Card.Header className="flex flex-row gap-2">
          <img
            alt="Indie Hackers community"
            className="pointer-events-none aspect-square w-14 select-none rounded-2xl object-cover"
            loading="lazy"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
          />
          <div className="text-gray-300">
            <div className="font-extrabold text-lg">Ditto</div>
            <div className="font-bold text-md">NewJeans</div>
          </div>
        </Card.Header>
        <Card.Content className="w-full text-gray-500">
          <Slider
            className="w-full flex flex-row items-center justify-center"
            defaultValue={30}
          >
            <Label className="text-gray-500">0:00</Label>
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
            <Slider.Output>3:00</Slider.Output>
          </Slider>
        </Card.Content>
        <Card.Footer className="flex items-center justify-between">
          <Button isIconOnly size="lg" variant="ghost">
            <HeartIcon />
          </Button>
          <div>
            <Button isIconOnly variant="ghost">
              <BackwardFillIcon />
            </Button>
            <Button isIconOnly variant="ghost">
              <PlayFillIcon />
            </Button>
            <Button isIconOnly variant="ghost">
              <ForwardFillIcon />
            </Button>
          </div>

          <TooltipRoot delay={0}>
            <Button isIconOnly variant="ghost">
              <SpeakerWave2Icon />
            </Button>
            <TooltipContent className="flex h-40 items-center justify-center">
              <Slider
                className="h-full"
                defaultValue={30}
                orientation="vertical"
              >
                <Slider.Output />
                <Slider.Track>
                  <Slider.Fill />
                  <Slider.Thumb />
                </Slider.Track>
              </Slider>
            </TooltipContent>
          </TooltipRoot>
        </Card.Footer>
      </Card>
    </NodeViewWrapper>
  );
};
