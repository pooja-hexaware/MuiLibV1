import * as React from 'react';
import {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '../../svgIcons/MenuIcon';
import ChevronLeftIcon from '../../svgIcons/ChevronLeftIcon';
import ChevronRightIcon from '../../svgIcons/ChevronRightIcon';
import ExpandLess from "../../svgIcons/ExpandLess";
import ExpandMore from "../../svgIcons/ExpandMore";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link,useRoutes} from "react-router-dom";

type IDrawerComponentProps = {
    id:  number,
    label: string,
    icon: React.ReactNode,
    path : string,
    element: React.ReactNode,
    children : []
}; 

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const BoxFlex = styled(Box)({
    display : 'flex'
  });
  

export default function ReactDrawer(props : any ) {
    const [expandedItems, setExpandedItems] = useState<number[]>([]);
    const [open, setOpen] = useState<boolean>(true);
  
    const {title, items} = props;
    const theme = useTheme();
    const GlobalRoutes = () => useRoutes(items);
  
  
    const handleExpand = (itemId : number) => {
      if (expandedItems.includes(itemId)) {
        setExpandedItems(expandedItems.filter((id : number) => id !== itemId));
      } else {
        setExpandedItems([...expandedItems, itemId]);
      }
    };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderItems = (items : IDrawerComponentProps[]) => {
    return items.map((item : any) => (
      <div key={item.id}>
        <ListItem to={item.path} component={Link}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
          {item.children && item.children.length > 0 && (
            <ListItemIcon>
              {expandedItems.includes(item.id) ? <ExpandLess onClick={() => handleExpand(item.id)} /> : <ExpandMore onClick={() => handleExpand(item.id) }/> }
            </ListItemIcon>
          )}
        </ListItem>
        {item.children && item.children.length > 0 && (
          <Collapse in={expandedItems.includes(item.id)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderItems(item.children)}
            </List>
          </Collapse>
        )}
      </div>
    ));
  };

  return (
    <BoxFlex sx={props.sx}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List component="nav">
            {
                renderItems(items)
            }
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <GlobalRoutes />
      </Main>
    </BoxFlex>
  );
}