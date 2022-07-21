import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BsFillCalendar2EventFill } from 'react-icons/bs';
import { RiHealthBookFill } from 'react-icons/ri';
import { FaUserMd,FaUser } from 'react-icons/fa'; 
import { FcVideoCall } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { Avatar, MenuItem, Tooltip, Menu, Backdrop, CircularProgress } from '@mui/material';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import Profile from './Profile';
import RendezVous from './RendezVous';
import Praticiens from './Praticiens';
import ModalValidation from '../../Modals/ModalValidation';
import { useQuery, useQueryClient } from 'react-query';
import { getPatient } from '../../../services/UserService';
import HealthBook from './HealthBook';
import VideoCall from './VideoCall';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout({auth,isVerified}) {
  const theme = useTheme();
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(true);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const navigate = useNavigate()
  const signOut = useSignOut()

  const key = ["loadPatientInfo"]
  const {data, isLoading} = useQuery(key, () => getPatient(auth?._id), {
    staleTime: 50_000
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleVerify = () => setVerifyOpen(true);
  const handleVerifyClose = () => setVerifyOpen(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = useCallback(() => {
    queryClient.clear()
    signOut();
    setAnchorElUser(null);
    navigate('/connexion', { replace: true });

  },[queryClient,signOut,navigate]);

  return (
    <>
     <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
    { data && <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar className="bg-primary">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow:1}} variant="h6" noWrap component="div">
            Tableau de bord
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={`//localhost:3100/uploads/${data?.profile_image}`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem>
                <Link to="">
                  <Typography textAlign="center">Profil</Typography>
                 </Link>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <Typography textAlign="center">Déconnexion</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
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
        <DrawerHeader className="bg-primary">
         <div className="flex items-center justify-between w-full">
          <Link to="/">
             <img src="/logo.png" alt="logo" className="h-15 w-20" />
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
         </div>
        </DrawerHeader>
        <Divider />
        <List>
            <Link to="rendez-vous">
              <ListItem button >
              <ListItemIcon>
               <BsFillCalendar2EventFill  className="h-10 w-10" />
              </ListItemIcon>
              <ListItemText primary="Mes Rendez-vous"/>
            </ListItem>
            </Link>
            <Link to="carnet-de-sante">
             <ListItem button >
              <ListItemIcon>
              <RiHealthBookFill  className="h-10 w-10" />
              </ListItemIcon>
              <ListItemText primary="Mon Carnet de Santé"/>
            </ListItem>
            </Link>
           
            <Link to="praticiens">
              <ListItem button >
              <ListItemIcon>
                <FaUserMd className="h-10 w-10" />
              </ListItemIcon>
              <ListItemText primary="Mes Praticiens"/>
            </ListItem>
            </Link>
            <Link to="videocall">
              <ListItem button >
              <ListItemIcon>
                <FcVideoCall  className="h-10 w-10" />
              </ListItemIcon>
              <ListItemText primary="Téléconsultation"/>
            </ListItem>
            </Link>
            <Link to="">
            <ListItem button >
              <ListItemIcon>
               <FaUser  className="h-10 w-10"/>
              </ListItemIcon>
              <ListItemText primary="Mon Profil"/>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {!isVerified && <div className="h-10 bg-gray-400 text-white flex items-center justify-around p-2 rounded-lg"> 
        verifier votre compte SVP !!! 
        <button type="button" onClick={handleVerify}  className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none
         focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">VERIFIER MAINTENANT</button>
        </div>}
        <Routes>
                  <Route path="/" element={ <Profile auth={data} />} />
                 <Route path={`rendez-vous`} element={ <RendezVous auth={data} /> } />
                  <Route path={`praticiens`} element={<Praticiens auth={data} />} />
                  <Route path={`carnet-de-sante`} element={<HealthBook auth={data} />} />
                  <Route path={`videocall`} element={<VideoCall auth={data} />} />
            </Routes>
      </Main>
    </Box>}
    <ModalValidation open={verifyOpen} close={handleVerifyClose}/>
    </>
  );
}
