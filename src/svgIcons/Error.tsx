import * as React from "react";
import type { SVGProps } from "react";
import Tooltip from '@mui/material/Tooltip';

const SvgError = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
        <g fill="#9d4150" data-name="Icon ionic-ios-close-circle-outline">
            <path
                d="m17.297 15.708-3.706-3.705 3.705-3.705a1.124 1.124 0 0 0-1.589-1.589l-3.705 3.705-3.705-3.705a1.124 1.124 0 0 0-1.589 1.589l3.705 3.705-3.705 3.705a1.086 1.086 0 0 0 0 1.589 1.116 1.116 0 0 0 1.589 0l3.705-3.705 3.705 3.705a1.129 1.129 0 0 0 1.589 0 1.116 1.116 0 0 0 .001-1.589Z"
                data-name="Path 1"
            />
            <path
                d="M12 1.615a10.381 10.381 0 1 1-7.344 3.04A10.316 10.316 0 0 1 12 1.615M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Z"
                data-name="Path 2"
            />
        </g>
    </svg>
);
export default SvgError;

