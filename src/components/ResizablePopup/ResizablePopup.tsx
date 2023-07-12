import React, { useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Rnd } from "react-rnd";
import IconButton from '@mui/material/IconButton';
import Close from '../../svgIcons/CloseTool'
import Maximize from '../../svgIcons/Maximize'
import Minimize from '../../svgIcons/Minimize'
import Tooltip from '@mui/material/Tooltip';
import { v4 as uuidv4 } from 'uuid';

function ResizablePopup(props: any) {
   
    const getPositions = props.popupposition;

    const defaultDialogWidth = 1200;
    const defaultDialogHeight = 500;
    const [position, setposition] = useState<any>({ x: 0, y: 0, width: defaultDialogWidth, height: defaultDialogHeight });

    
    useEffect(() => {
        var uniqsId = props.id || 'default'
        if (getPositions) {
            if (uniqsId !== undefined) {
                if (uniqsId in getPositions) {
                    setposition(getPositions[uniqsId])
                } else {
                    var valueUniq: any = {}
                    valueUniq[uniqsId] = { x: 0, y: 0, width: defaultDialogWidth, height: defaultDialogHeight }
                    if(props.StorePopupTabs)
                    props.StorePopupTabs(valueUniq);
                    window.addEventListener("resize", onWindowResize);
                    setDefaults();
                    setTimeout(() => {
                        setDefaults();
                    }, 0);
                }
            }
        } else {
            window.addEventListener("resize", onWindowResize);
            setDefaults();
            setTimeout(() => {
                setDefaults();
            }, 0);
        }
    }, [])

    
    const setDefaults = () => {
        const { width, height } = props;
        const { windowWidth, windowHeight } = getWindowWidthAndHeight();
        let heightToUse;
        if (height) {
            heightToUse = height;
        } else {
            heightToUse = (document.querySelector(".bp3-dialog-body") || {})
                .scrollHeight;
            if (heightToUse) {
                heightToUse = heightToUse + 60;
            } else {
                heightToUse = defaultDialogHeight;
            }
        }
        let widthToUse;
        if (width) {
            widthToUse = width;
        } else {
            widthToUse = defaultDialogWidth;
        }
        setposition({
            x: Math.round(Math.max((windowWidth - widthToUse) / 2, 0)),
            y: Math.round(Math.max((windowHeight - heightToUse) / 2, 0)),
            width: Math.min(widthToUse, windowWidth),
            height: Math.min(Math.max(defaultDialogHeight, heightToUse), windowHeight)
        });
    };

   
    const onWindowResize = () => {
        setDefaults();
    };

    const getWindowWidthAndHeight = () => {
        const w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName("body")[0],
            windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,
            windowHeight = w.innerHeight || e.clientHeight || g.clientHeight;
        return {
            windowWidth: windowWidth,
            windowHeight: windowHeight - 20 //add a small correction here
        };
    };

    const windowWidthHeight = getWindowWidthAndHeight();
    const style = {
        alignItems: "center",
        justifyContent: "center",
        border: "solid 0.0625em #ddd",
        background: "white",
        boxShadow: "0em 0.6875em 0.9375em -0.4375em rgb(0 0 0 / 20%),0em 1.5em 2.375em 0.1875em rgb(0 0 0 / 14%),0em 0.5625em 2.875em 0.5em rgb(0 0 0 / 12%)",
        borderRadius: "0.25em",
        cursor: 'move',
        overflow: 'hidden'

    };

    if (position === undefined) {
        setposition({ x: 0, y: 0, width: defaultDialogWidth, height: defaultDialogHeight })
    }

   
    const highlightIndex = () => {
        var uniqsId = props.id || 'default'
        if (getPositions) {
            for (var key in getPositions) {
                if (key === uniqsId) {
                    var adds = document.getElementById(`drag-${key}`)
                    if (adds !== null) {
                        adds.classList.add("active");
                    }
                } else {
                    var dels = document.getElementById(`drag-${key}`)
                    if (dels !== null) {
                        dels.classList.remove("active");
                    }
                }
            }
        }
        return uniqsId
    }

   
    const handleMaximize = () => {
        setposition({
            x: 0, y: 0,
            width: props.maxWidth ? props.maxWidth : windowWidthHeight.windowWidth,
            height: props.maxHeight ? props.maxHeight : windowWidthHeight.windowHeight
        })

    }

    return (
        position &&
        <div
            hidden={!props.show}
            style={{ top: position.x, left: position.y, position: position.x == 0 && position.y == 0? "absolute" : undefined, zIndex: 9, width: '100%', height: '100%' }}
            className="rnd-dragging-popup active"
            id={`drag-${props.id || 'default'}`} >
            <Rnd
               
                {...props}
                style={style}
                resizeHandleWrapperClass="react-resizable-handle-drag"
                maxHeight={props.maxHeight ? props.maxHeight : windowWidthHeight.windowHeight}
                maxWidth={props.maxWidth ? props.maxWidth : windowWidthHeight.windowWidth}
                minWidth={props.minWidth ? props.minWidth : "25vw"}
                minHeight={props.minHeight ? props.minHeight : "25vw"}
                bounds={props.bounds ? props.bounds : "window"}
                size={{ width: position.width, height: position.height }}
                position={{ x: position.x, y: position.y }}
                onDrag={() => {
                    highlightIndex()
                }}
                onResize={() => {
                    highlightIndex()
                }}
                onDragStop={(e:any, d:any) => {
                    setposition({ ...position, x: d.x, y: d.y });
                    var uniqsId = highlightIndex()
                    var uniquePop: any = {}
                    if (uniqsId !== undefined) {
                        uniquePop[uniqsId] = { ...position, x: d.x, y: d.y }
                        if(props.StorePopupTabs)
                        props.StorePopupTabs(uniquePop);
                    }
                }}
                onResizeStop={(e:any, direction:any, ref:any, delta:any, position:any) => {
                    setposition({
                        width: ref.style.width,
                        height: ref.style.height,
                        ...position
                    });
                }}

            >

                <DialogTitle
                    id={uuidv4()}
                >
                <div style={{float:"left"}}>{props.title}</div>
                <div style={{float:"right"}}>
                <Tooltip title={"Minimize"}>
                    <IconButton  onClick={props.handleMinimize ? props.handleMinimize : setDefaults}>
                        <Minimize />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title={"Maximize"}>

                    <IconButton onClick={props.handleMaximize ? props.handleMaximize : handleMaximize}>
                        <Maximize />
                    </IconButton>  
                    </Tooltip>
                    <Tooltip title={"Close"}>
                  
                    <IconButton onClick={props.handleClose}>
                        <Close />
                    </IconButton>
                    </Tooltip>
                </div>
                   

                </DialogTitle>

                <DialogRow
                    id={`${props.id || 'default'}`}
                    content={props.Content}
                />
            </Rnd>
        </div>
    );
}


export type DialogRowProps = {
    id: any
    content: any
}
const DialogRow: React.FC<DialogRowProps> = ({ id, content }) => {
    return (
        <React.Fragment>
            <div id={id} style={{ display: 'initial' }}>
                <DialogContent
                    className={`resizable_popup_content`}
                    id={`body-${id}`}
                >
                    {content}
                </DialogContent>
            </div>
        </React.Fragment>
    )
}

export default ResizablePopup;