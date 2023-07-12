import * as React from "react";
import type { SVGProps } from "react";
const SvgBinoculars = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 256 256"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12}
      d="M104 92h48M229.6 154.3 185.9 55a24.1 24.1 0 0 0-33.9 0v113M104 168V55a24.1 24.1 0 0 0-33.9 0l-43.7 99.3"
    />
    <circle
      cx={64}
      cy={168}
      r={40}
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12}
    />
    <circle
      cx={192}
      cy={168}
      r={40}
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12}
    />
  </svg>
);
export default SvgBinoculars;

