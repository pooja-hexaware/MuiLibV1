import * as React from "react";
import type { SVGProps } from "react";
const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path
      fill="#937708"
      d="m12 2.172 10.057 20.047H1.943L12 2.172Zm0-2.174a1.735 1.735 0 0 0-1.427 1.046L.329 21.463C-.456 22.863.212 24 1.813 24h20.374c1.6 0 2.269-1.142 1.484-2.537L13.429 1.046A1.735 1.735 0 0 0 12.002 0Zm1.5 19.5a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.502Zm-1.5-3a1.5 1.5 0 0 1-1.5-1.5v-4.5a1.5 1.5 0 0 1 3 0v4.5A1.5 1.5 0 0 1 12 16.5Z"
      data-name="Icon metro-warning"
    />
  </svg>
);
export default SvgWarning;

