import * as React from "react";
import type { SVGProps } from "react";
const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    viewBox="-16.8 -16.8 57.6 57.6"
    {...props}
  >
    <path
      fill="#FFF"
      fillRule="evenodd"
      d="M12 3a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 12.586V4a1 1 0 0 1 1-1ZM4 14a1 1 0 0 1 1 1c0 .977.005 1.32.058 1.585a3 3 0 0 0 2.357 2.357C7.68 18.995 8.023 19 9 19h6c.977 0 1.32-.005 1.585-.058a3 3 0 0 0 2.357-2.357c.053-.265.058-.608.058-1.585a1 1 0 1 1 2 0v.116c0 .817 0 1.375-.096 1.86a5 5 0 0 1-3.928 3.928c-.485.096-1.043.096-1.86.096H8.884c-.817 0-1.375 0-1.86-.096a5 5 0 0 1-3.928-3.928C3 16.49 3 15.933 3 15.116V15a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDownload;

