import { forwardRef } from "react";
import { SVGProps } from "react";

export function PlayFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M12.566 7.146L4.542 2.052A1 1 0 0 0 3 2.893v10.214a1 1 0 0 0 1.542.842l8.024-5.095a1 1 0 0 0 0-1.708" clipRule="evenodd"></path>
    </svg>
  );
}

export function Pause(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M4.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-2ZM2.5 3.5A2.5 2.5 0 0 1 5 1h1a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 6 15H5A2.5 2.5 0 0 1 2.5 12.5v-9Zm7 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-2ZM7.5 3.5A2.5 2.5 0 0 1 10 1h1a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 11 15h-1a2.5 2.5 0 0 1-2.5-2.5v-9Z" clipRule="evenodd"></path>
    </svg>
  );
}

export function MusicNote(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M12.5 2.827v7.502c0 1.48-1.573 2.671-3.5 2.671S5.5 11.81 5.5 10.33s1.573-2.671 3.5-2.671c.54 0 1.05.153 1.5.422V4.417L4.5 5.513v6.001c0 1.48-1.573 2.671-3.5 2.671S-2.5 13.003-2.5 11.522s1.573-2.671 3.5-2.671c.54 0 1.05.153 1.5.422V3.45a1.5 1.5 0 0 1 1.258-1.48l7.242-1.171a.5.5 0 0 1 .582.493l.918 1.535ZM7.5 10.329c0-.65-.672-1.171-1.5-1.171s-1.5.52-1.5 1.171.672 1.171 1.5 1.171 1.5-.521 1.5-1.171Zm-6 1.193c0-.65-.672-1.171-1.5-1.171s-1.5.52-1.5 1.171.672 1.171 1.5 1.171 1.5-.521 1.5-1.171ZM3.242 4.41l7.258-1.171v2.247l-7.258 1.171z" clipRule="evenodd" transform="translate(2 0)"></path>
    </svg>
  );
}
