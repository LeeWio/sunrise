import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ResultResponse<T = unknown> = {
  /** Business status code (e.g., 200, 201) */
  code: number;

  /** Human-readable message */
  message: string;

  /** Response payload (may be null if no data) */
  data?: T;

  /** ISO 8601 formatted timestamp of the response */
  timestamp?: string;
};

export interface Page<T> {
  /** Page content (list of items) */
  content: T[];

  /** Total number of elements across all pages */
  totalElements: number;

  /** Total number of pages available */
  totalPages: number;

  /** Size of each page (number of elements per page) */
  size: number;

  /** Current page number (0-based) */
  number: number;
}
