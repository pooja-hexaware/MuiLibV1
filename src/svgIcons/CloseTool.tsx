import * as React from "react";
import type { SVGProps } from "react";
const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <path fill="#fff" fillOpacity={0.01} d="M0 0h48v48H0z" />
    <path
      stroke="#333"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14 14 20 20M14 34l20-20"
    />
  </svg>
);
export default SvgClose;

