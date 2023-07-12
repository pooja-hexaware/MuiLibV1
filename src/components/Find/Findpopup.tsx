import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Settings from '../../svgIcons/Settings'
import SaveSVG from '../../svgIcons/SaveSVG'

import IconButton from '@mui/material/IconButton';

const ReactFindPopup = (props: any) => {
    const [selectAll, setSelectAll] = useState(false);
    const [show, setShow] = useState(false);
    
    const handleCheck = (event: any) => {
      const {
        target: { value, checked },
      } = event;
  
      if (checked)
        props.setSelectedFields(
          (current: any) => [...current, props.allFields?.filter((x: any) => x.name === value)[0]]
        );
      else
        props.setSelectedFields(
          props.selectedFields?.filter((x: any) => x.name !== value)
        );
  
  
    };
    useEffect(() => {
      props.selectedFields?.length < props.allFields?.length ? setSelectAll(false) : setSelectAll(true)
    }, [props.selectedFields?.length])
    const handleselectAll = (event: any) => {
      setSelectAll(!selectAll)
      const {
        target: { checked },
      } = event;
  
      if (checked)
        props.setSelectedFields(
          props.allFields
        );
      else
        props.setSelectedFields([]);
  
    }
    const renderFields = (show: boolean, field: any) => {
  
      return <>
        <FormControl 
        sx={{
          display: 'flex',
          flexDirection: 'row'
        }}
        >
         
          {show && <Checkbox
            key={field.name}
            value={field.name}
            onChange={handleCheck}
            checked={props.selectedFields?.filter((y: any) => y.name === field.name).length > 0}
          />}
          {
            field.comp
          }
         
        </FormControl>
      </>
    }
    return (
      <Dialog
        {...props}
        fullWidth={true}
        maxWidth={props.maxWidth ? props.maxWidth : 'lg'}
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle>{props.title}</DialogTitle>
        
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          {
            show && <Box
              noValidate
              component="form"
              style={{
                display: 'flex',
                flexDirection: 'row', flexWrap: 'wrap'
              }}
            >
              {props.allFields?.map((field: any) => {
                return (
                  renderFields(show, field)
                )
  
              })}
  
            </Box>
          }
          {
            !show && <Box
              noValidate
              component="form"
              style={{
                display: 'flex',
                flexDirection: 'row', flexWrap: 'wrap'
              }}
            >
              {props.selectedFields?.map((field: any) => {
                return (
                  renderFields(show, field)
                )
  
              })}
  
            </Box>
          }
          {show && <FormControlLabel control={<Checkbox checked={selectAll} onChange={handleselectAll} />} label={!selectAll ? "Select All" : "Unselect All"} />}
          <IconButton onClick={() => { setShow(!show) }}>
            {show?<SaveSVG/> :<Settings />}
          </IconButton>
        </DialogContent>
        <DialogContent>
          {props.searchResult}
        </DialogContent>
        <DialogActions>
        <Button disabled={show} onClick={props.handleSearch}>Search</Button>
        <Button disabled={show} onClick={props.handlePrevious}>Previous</Button>
        <Button disabled={show} onClick={props.handleTextClear}>Clear</Button>
        </DialogActions>
        <DialogActions >
          <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
export default ReactFindPopup