import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";

import { MusicPlayer } from "@/components/music-player/music-player";

interface AudioViewProps extends NodeViewProps {}

export const AudioView: React.FC<AudioViewProps> = ({
  node,
  selected,
  updateAttributes,
}) => {
  const { src, title, artist, album, controls, autoplay } = node.attrs;

  return (
    <NodeViewWrapper data-drag-handle>
      <MusicPlayer autoplay={autoplay} url={src} />
    </NodeViewWrapper>
  );
};
