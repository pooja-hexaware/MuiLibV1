import React, { useState, useEffect, useRef } from 'react'
import {Box,Stack, TextField, InputAdornment,IconButton, Button, Popper,ClickAwayListener} from '@mui/material'
import ArrowDropDownIcon from '../../svgIcons/Dropdown';
import Search from '../../svgIcons/Search';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import "./SelectWithTable.css"

/**
 * To filter special characters from the search value
 */
function escapeRegExp(value: string) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props: any) {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
                justifyContent: 'space-between',
                display: 'flex',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            }}
        >
            <TextField sx={{width: 780}}
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                // onClick={""}
                                // onMouseDown={""}
                                edge="end"
                            >
                                <Search  />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};



const SelectTableComponent = (props: any) => {
    const {
        id, name, placeholder, label, title, error, helperText, disabled, 
        required, valueKey, defaultText,
        tableHeader, tableRows, handleValueSelection, allowEmpty, 
        isInLineError, readOnly
    } = props;

    const [value, setValue] = useState(props.value || null);
    const [ValueKey, setValueKey] = useState(props.valueKey ||'')
    const [dataClick, setdataClick] = useState([]);
    const [anchorEl, setAnchorEl]: any = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(Boolean(anchorEl));
    const [Body, setBody] = useState([]);
    const [Header, setHeader] = useState([]);
    const [searchText, setSearchText] = React.useState('');
    const [dynamicHeight, setdynamicHeight] = useState(3);
    const [emptyValueText] = useState(props.emptyValueText !== null ? props.emptyValueText : '<none>');
    const [searchRows, setsearchRows] = React.useState(Body);

    // let open = Boolean(anchorEl);

     // To open/close the select dropdown
        const handleToggle = (event: React.MouseEvent<HTMLElement>, origin: string) => {
            setSearchText('')
            requestSearch('')
            if (Body?.length === 2) {
                setdynamicHeight(Body.length + 3)
            } else if (Body?.length === 0 || Body?.length === 1) {
                setdynamicHeight(3)
            } else {
                setdynamicHeight(5)
            }
            if(origin === "textField"){
                setAnchorEl(event.currentTarget)
            }else{
                setAnchorEl(event.currentTarget?.parentElement?.parentElement?.parentElement);       
            }
            setOpen(Boolean(!anchorEl))
            console.log("anchorEl at handleToggle ", anchorEl)
        };
    
        const noDataFoundRender = () => { 
            return (   <Stack height="100%" alignItems="center" paddingTop="2em" justifyContent="center" color="red">
                     <div>No data found</div>    
            </Stack>)
        }
          
     //Render No Data Found Message.
    const NoRowDisplay = () => { 
        if(searchText && searchRows?.length === 0){
            return noDataFoundRender();
        }
        else if(searchText === '' && isInLineError && tableRows?.length === 0){
            return noDataFoundRender();
        }
        else {
            return null;
        }
    }

    //   Triggered when user clicks the row in the Dropdown
    useEffect(() => {
        setValue(dataClick);
        if (dataClick?.length !== 0) {
            handleValueSelection(dataClick);
        }
        setAnchorEl(null)
        setOpen(false)
    }, [dataClick])

   
    //  Function to close popper component 
    const handleClose = (event: any) => {
        if (anchorEl) {
            setAnchorEl(null)
        }
        setOpen(false)
    };

    
    //   Initial useEffect to load Header Function
    
    useEffect(() => {
        HeaderFunction();
    }, [])

    /**
     * useeffect triggered when Table Rows are changed, the Body Function is called
     */
    useEffect(() => {
        BodyFunction();
    }, [tableRows]);

    /**
     * BodyFunction is called when Header is changed
     */
    useEffect(() => {
        if (Header && Header?.length > 0) {
            BodyFunction();
        }
    }, [Header]);

    /**
     * values/TableRows when changed, it is added to state value
     */
    useEffect(() => {
        setValue(props.value || null);
    }, [props.value, tableRows]);

    /**
     * Function to set Body Rows for the Dropdown Table
     */
    const BodyFunction = () => {
        const BodyResult = tableRows.map((item: any) => Header.reduce((acc: any, { field }) => {
             acc[field] = item[field]
            return acc;
        }, {}))
        BodyResult.forEach((items: any, i: number) => {
            items.id = i + 1
        })
        setBody(BodyResult)
        setsearchRows(BodyResult)
    }

    /**
     * Function to set the Header for Dropdown Table
     */
    const HeaderFunction = () => {
        const ResHeader = tableHeader.map((item: any, index: any) => {
            item.field = item.name;
            item.headerName = item.label;
            item.minWidth = 200;
            item.flex = 1
            item.headerClassName = "--color-textArea"
            return item;
        })
        setHeader(ResHeader);
    }

     // Function to search rows based on the input search value and assign them to state
    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = Body.filter((row: any) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field]?.toString());

            });
        });
        setsearchRows(filteredRows);
    };

    return (
 <React.Fragment>
            <Box id={`${id}_container`}  className="dropdowntableselect-container">
                <Box>
                <TextField 
                        id={id} name={name}
                        label={label} title={title}
                        size='medium' className={'form-control'} variant="outlined" placeholder={placeholder || ''}
                        InputLabelProps={{ shrink: false }}
                        disabled={disabled}
                        onKeyDown={(event: any) => handleToggle(event,"textField")}
                        InputProps={{
                            readOnly: readOnly ,
                            endAdornment: <InputAdornment position="end">
                                <Button aria-label={'dropdown icon'} disabled={disabled} onClick={(event) => handleToggle(event,"dropDown")}>
                                    <ArrowDropDownIcon width="24" height="22"/>
                                </Button>
                            </InputAdornment>,
                        }}
                        required={required}
                        value={value ? value[ValueKey] : allowEmpty ? emptyValueText : defaultText}
                        error={error ? error[label] : ''}
                        helperText={helperText ? helperText[label] : ''}
                    />
                </Box>
                <Popper open={open} anchorEl={anchorEl} role={undefined} placement={'bottom-start'}  disablePortal
                   className={'dropDownTableSelect-table'}
                   >
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box>
                            {tableHeader?.length > 1 &&
                                <Box sx={{
                                    height: 60 + 60 * dynamicHeight, width: 780,
                                    '& .--color-textArea': {
                                        backgroundColor: '#e9ecef',
                                    },
                                }}
                                    style={{ height: 60 + 60 * dynamicHeight, width: 780 }}>
                                    <DataGrid
                                        sortingOrder={['desc', 'asc']}
                                        rowHeight={75}
                                        components={{ Toolbar: QuickSearchToolbar, NoRowsOverlay: NoRowDisplay }}
                                        disableColumnFilter
                                        disableColumnSelector
                                        disableColumnMenu
                                        hideFooterSelectedRowCount={true}
                                        componentsProps={{
                                            toolbar: {
                                                value: searchText,
                                                onChange: (event: any) => requestSearch(event.target.value),
                                                clearSearch: () => requestSearch(''),
                                            },
                                        }}
                                        columns={Header}
                                        rows={searchRows }
                                        onCellClick={(params: any, event: any) => {
                                                props.valueKey? setValueKey(props.valueKey): setValueKey(params.field)}}
                                        onRowClick={(params: any, event: any) => {
                                            if (!event.ignore) {
                                                for (let k in params.row) {
                                                    tableRows.forEach(function (arrayItem: any) {
                                                        if (params.row[k] === arrayItem[k]) {
                                                            setdataClick(arrayItem);
                                                        }
                                                    });
                                                    break
                                                }
                                            }
                                        }}
                                        // hoverStateEnabled={true}
                                        showCellVerticalBorder={true}
                                    />
                                </Box>
                            }
                        </Box>
                    </ClickAwayListener>
                </Popper>
            </Box>
</React.Fragment>
    )}

export default SelectTableComponent;