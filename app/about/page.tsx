"use client";

import { Checkbox, Label, Slider } from "@heroui/react";
import { useState } from "react";

export default function AboutPage() {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Checkbox id="basic-terms">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox>

      <div
        aria-checked={checked}
        className={`checkbox${checked ? "checkbox--checked" : ""}`}
        role="checkbox"
        tabIndex={0}
        onClick={() => setChecked(!checked)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setChecked(!checked);
          }
        }}
      >
        <div className="checkbox__control">
          <div className="checkbox__indicator" />
        </div>
      </div>

      <div
        aria-checked={checked}
        className={`checkbox${checked ? " checkbox--checked" : ""}`}
        data-selected={checked} // 添加此行以标记选中状态
        role="checkbox"
        tabIndex={0}
        onClick={() => setChecked(!checked)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setChecked(!checked);
          }
        }}
      >
        <div className="checkbox__control">
          <div className="checkbox__indicator">
            {/* 确保这里包含对勾图标的数据槽 */}
            {checked && (
              <svg
                data-slot="checkbox-default-indicator--checkmark"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
              </svg>
            )}
          </div>
        </div>
      </div>

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
