import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import CircleArrowRight from '../../svgIcons/CircleArrowRight';
import CircleArrowLeft from '../../svgIcons/CircleArrowLeft';
import ZoomIn from '../../svgIcons/ZoomIn';
import ZoomOut from '../../svgIcons/ZoomOut';
import Print from '../../svgIcons/Print';
import Download from '../../svgIcons/Download';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RotateCounterClockWise from '../../svgIcons/RotateCounterClockWise';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

type ToolbarProps = {
    inputKey : number;
    currentPage: number;
    scale : number;
    numPages: number;
    onPageChange: (pageNumber: number) => void;
    onGoToPage: (pageNumber: number) => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onPrint: () => void;
    onDownload : () => void;
    onZoomChange : (pageZoom : number) => void;
    onRotateCounterClockWise : () => void;
  };
  
const ToolBar = ({
    inputKey,
    scale,
    currentPage,
    numPages,
    onPageChange,
    onGoToPage,
    onZoomIn,
    onZoomOut,
    onPrint,
    onDownload,
    onZoomChange,
    onRotateCounterClockWise,
  } : ToolbarProps) => {

  const goToPreviousPage = () => {
      onPageChange(currentPage - 1);
    };
  
  const goToNextPage = () => {
      onPageChange(currentPage + 1);
    };
  
  const handleGoToPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const pageNumber = parseInt(event.target.value);
      onGoToPage(pageNumber);
    };
  
  const handleZoomChange = (event: SelectChangeEvent<number>) => {
    const pageZoom = parseFloat(event.target.value as string);
    onZoomChange(pageZoom);
  }
  const inputProps = {
    style: {
      padding : '5px',
      width: '30px', 
      textAlign: 'center' as 'center',
    },
      min: 1,
      max: numPages,
    };
  
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }} displayPrint="none">
      <ThemeProvider theme={darkTheme}>
        <AppBar component="nav" position="static" color="primary">
              <Toolbar>
              <Box sx={{ flexGrow: 0, display: 'flex'}}></Box>
              <Box sx={{ flexGrow: 0, display: 'flex'}}>
              <Button 
              data-testid="nextpage"
              sx={{padding : '0px', minWidth: '25px'}}
              onClick={goToPreviousPage}  
              disabled={currentPage === 1}>
              <CircleArrowLeft />
            </Button>
            <Button 
              data-testid="previouspage"
              sx={{padding : '0px', minWidth: '25px'}}
              onClick={goToNextPage} 
              disabled={currentPage === numPages}>
                <CircleArrowRight />
            </Button>
            </Box>
            <Box sx={{ flexGrow: 1 , display: 'flex'}}>
            <TextField
              data-testid="current-page-number"
              type="text"
              key={inputKey}
              sx={{ padding :'0px', textAlign: 'center', marginRight :'5px', display :'flex'}}
              inputProps={inputProps}
              value={currentPage}
              onChange={handleGoToPage}
            />
            <div style={{ margin : '5px'}}> of {numPages}</div>
            </Box>
            <Box sx={{ flexGrow: 6, display: 'flex'}}>
            <Button data-testid="zoom-in-button"
                sx={{padding :'0px', margin :'0px', background:'none'}} disabled={scale === 2}
                variant="contained" onClick={onZoomIn}>
              <ZoomIn />
            </Button>
            <Button data-testid="zoom-out-button" sx={{padding :'0px', margin :'0px', background:'none'}} disabled={scale === 0.5}
            variant="contained" onClick={onZoomOut}>
              <ZoomOut />
            </Button>
            <Select data-testid="zoom-level" sx={{ height :'25px', fontSize :'12px', margin :'20px 0px 0px 10px'}} value={scale} onChange={handleZoomChange}>
              <MenuItem value={1}>50%</MenuItem>
              <MenuItem value={1.5}>100%</MenuItem>
              <MenuItem value={2}>150%</MenuItem>
              <MenuItem value={2.5}>200%</MenuItem>
          </Select>
              <Button sx={{padding :'0px', marginLeft :'20px', background:'none'}} variant="contained" onClick={onRotateCounterClockWise}>
                <RotateCounterClockWise />
              </Button>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex' }}></Box>
           
            <Box sx={{ flexGrow: 0, display: 'flex' }}>
              <Button data-testid="print"  sx={{padding :'0px', margin :'0px', background:'none'}} variant="contained" onClick={onPrint}>
                <Print />
              </Button>
              <Button data-testid="download" sx={{padding :'0px', margin :'0px',  background:'none'}} variant="contained" onClick={onDownload}>
                <Download />
              </Button>
            </Box>
            </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
    );
 };
export default ToolBar;