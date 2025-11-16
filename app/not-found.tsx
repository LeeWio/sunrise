"use client";

import FuzzyText from "@/components/fuzzy-text";

export default function NotFound() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <FuzzyText baseIntensity={0.2}>404</FuzzyText>
    </div>
  );
}
