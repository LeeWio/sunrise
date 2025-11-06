"use client";

import { Label, Slider } from "@heroui/react";

export default function AboutPage() {
  return (
    <div>
      asdf
      <Slider className="w-full max-w-xs" defaultValue={30}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
      <Slider />
    </div>
  );
}
