import * as React from "react";
import type { SVGProps } from "react";
const SvgZoomOut = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    viewBox="-14.4 -14.4 52.8 52.8"
    {...props}
  >
    <path
      fill="#FFF"
      fillRule="evenodd"
      d="M5 10a5 5 0 1 1 10 0 5 5 0 0 1-10 0Zm5-7a7 7 0 1 0 4.192 12.606l5.1 5.101a1 1 0 0 0 1.415-1.414l-5.1-5.1A7 7 0 0 0 10 3ZM8 9a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H8Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgZoomOut;

