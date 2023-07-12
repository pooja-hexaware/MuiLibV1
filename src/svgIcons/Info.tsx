import * as React from "react";
import type { SVGProps } from "react";
const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} {...props}>
    <path
      fill="#2196f3"
      d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z"
    />
    <path
      fill="#fff"
      d="M22 22h4v11h-4V22zm4.5-5.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14s2.5 1.121 2.5 2.5z"
    />
  </svg>
);
export default SvgInfo;

