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
import { useCallback,useEffect,useState } from 'react';
import { Avatar, MenuItem, Menu, Badge, ListItemButton, Backdrop, CircularProgress } from '@mui/material';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import CalendarProfile from './CalendarProfile';
import Profile from './Profile';
import Rendezvous from './Rendezvous';
import Prescription from './Prescription';
import Billing from './Billing';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useQuery, useQueryClient } from 'react-query';
import { getMedecin } from '../../../services/UserService';
import { BsFillGearFill } from 'react-icons/bs'
import {AiFillAccountBook, AiFillDollarCircle} from 'react-icons/ai'
import { MdOutlineVideoCameraFront } from 'react-icons/md'
import EmploiDuTemps from './EmploiDuTemps';
import Notifications from './Notifications';
import { toast, ToastContainer } from 'react-toastify';
import Events from './Events';
import {MdSms} from 'react-icons/md';
import { imagestore } from '../../../helpers/constants';
import { getAllNotificationsByUser } from '../../../services/NotificationService';
import GestionPatient from './GestionPatient';
import ComptabiliteAssurance from './ComptabiliteAssurance';
import Payement from './Payement';
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

export default function Layout({auth}) {
  const theme = useTheme();
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(true);
  const [abnOptions,setAbnOptions] = useState(['facturation','prescription','prescription']);
  const [unreadNotif,setUnreadNotif] = useState(0);
  
  useEffect(() => {
    if(auth?.abonnement) {
      setAbnOptions(auth?.abonnement?.pack?.options?.map(o => o.name))
    }
  },[auth?.abonnement])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate()
  const signOut = useSignOut()
  const [anchorEl, setAnchorEl] = useState(null);
 

  const handleMenu = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  },[]);
  
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  },[]);
  const handleSignOut = useCallback(() => {
    queryClient.clear();
    signOut();
    setAnchorEl(null);
    navigate('/connexion', { replace: true });

  },[queryClient,signOut,navigate]);

  
  const key = ["loadMedecinInfo",auth?._id]
  const key1 = ["loadNotification",auth?._id]
   useQuery(key1,() => getAllNotificationsByUser(auth?._id),{
    onSuccess:(_) => {
      const u = _.filter(n => !(n.isRead));
      setUnreadNotif(u);
    }
  })
 const gotoNotification = () => navigate('notifications');
  const {data, isLoading} = useQuery(key, () => getMedecin(auth?._id), {
    onSuccess(_){},
    onerror(_){
      toast.error('Impossible de recuperer les informations de ce medecin !!!')
    },
    staleTime: 50_000
  });
  return (
      <>
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  {data && <div>
    <Box sx={{ display: 'flex' }}>
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
          <div className="h-15 flex items-center justify-between">
            <div>
            <IconButton
                size="large"
                color="inherit"
               
              >
                    <Badge color="success" badgeContent={auth?.sms_account}>
                         <MdSms  className="text-white" />
                    </Badge>
              </IconButton>
               <IconButton
                size="large"
                color="inherit"
                onClick={gotoNotification}
               
              >
                    <Badge color="primary" badgeContent={unreadNotif?.length}>
                         <NotificationsIcon  className="text-white" />
                    </Badge>
              </IconButton>
              
            </div>
           
                   <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
               
              >
               <Avatar alt={auth?.fistName} src={`${imagestore}${data?.profile_image}`} />
              </IconButton>
              </div>
             
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="">
                 <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
               <Link to={`emploi-du-temps`}>
                <MenuItem onClick={handleClose}>Mon Emploi du temps</MenuItem>
               </Link>
               
                <Divider />
                <MenuItem onClick={handleSignOut}>Se deconnecter</MenuItem>
              </Menu>
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
        <DrawerHeader className="bg-primary shadow-2xl">
         <div className="flex items-center justify-between w-full">
           <img src="/logo.png" alt="logo" className="h-15 w-20" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
         </div>
        </DrawerHeader>
        <Divider />
        <List className="bg-primary h-full">
          <ListItem button disablePadding>
              <Link to="calendrier" className="text-white w-full">
              <ListItemButton>
              <ListItemIcon>
                <InsertInvitationIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Calendrier" />
            </ListItemButton>
              </Link>
            
          </ListItem>
          <ListItem disablePadding>
            <Link to="appoinment" className="text-white w-full">
             <ListItemButton>
              <ListItemIcon>
                <EventAvailableIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Rendez-vous" />
            </ListItemButton>
            </Link>
           
          </ListItem>
          {auth?.abonnement?.isActive && abnOptions.includes('prescription') && <ListItem disablePadding>
            <Link to={`prescription`} className="text-white w-full">
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon className="text-white " />
              </ListItemIcon>
              <ListItemText primary="Prescriptions" />
            </ListItemButton>
            </Link>
          </ListItem>}
          {auth?.abonnement?.isActive && abnOptions.includes('facturation') &&  <ListItem disablePadding>
            <Link to={`facturation`} className="text-white w-full">
             <ListItemButton>
              <ListItemIcon>
                <MonetizationOnIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Facturations" />
            </ListItemButton>
            </Link>
          </ListItem>}
          <ListItem disablePadding>
            <Link to="notifications" className="text-white w-full">
            <ListItemButton>
              <ListItemIcon>
                <NotificationsIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>
            </Link>
            
          </ListItem>
          <ListItem disablePadding>
              <Link to="events" className="text-white w-full">
               <ListItemButton>
              <ListItemIcon>
                <EventNoteIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Evenements" />
            </ListItemButton>
              </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to="gestion-patients" className="text-white w-full">
            <ListItemButton>
              <ListItemIcon>
                <BsFillGearFill className="text-white h-6 w-6" />
              </ListItemIcon>
              <ListItemText primary="Gestion Patients" />
            </ListItemButton>
            </Link>
            
          </ListItem>
          <ListItem disablePadding>
            <Link to="comptabilite-assurance" className="text-white w-full">
            <ListItemButton>
              <ListItemIcon>
                <AiFillAccountBook className="text-white h-6 w-6" />
              </ListItemIcon>
              <ListItemText primary="Comptabilité Assurance" />
            </ListItemButton>
            </Link>
            
          </ListItem>

          <ListItem disablePadding>
            <Link to="videocall" className="text-white w-full">
            <ListItemButton>
              <ListItemIcon>
                <MdOutlineVideoCameraFront className="text-white h-6 w-6" />
              </ListItemIcon>
              <ListItemText primary="Téléconsultation" />
            </ListItemButton>
            </Link>
            
          </ListItem>
          <ListItem disablePadding>
            <Link to="paiement" className="text-white w-full">
            <ListItemButton>
              <ListItemIcon>
                <AiFillDollarCircle className="text-white h-6 w-6" />
              </ListItemIcon>
              <ListItemText primary="Paiement" />
            </ListItemButton>
            </Link>
            
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
                  <Route path="" element={ <Profile auth={data} />} />
                  <Route path={`emploi-du-temps`} element={ <EmploiDuTemps auth={data} />} />
                 <Route path="calendrier" element={ <CalendarProfile auth={data} />} />
                 <Route path={`appoinment`} element={ <Rendezvous auth={data} />} />
                 { auth?.abonnement.isActive && abnOptions.includes('prescription') && <Route path={`prescription`} element={  <Prescription auth={data} />} />}
                  {auth?.abonnement.isActive && abnOptions.includes('facturation') && <Route path={`facturation`} element={<Billing auth={data} />} />}
                  <Route path={`events`} element={<Events auth={data} />} />
                  <Route path={`notifications`} element={<Notifications auth={data} />} />
                 <Route path={`gestion-patients`} element={<GestionPatient auth={data} />} />
                  <Route path={`paiement`} element={<Payement auth={data} />} />
                 {auth?.abonnement.isActive && abnOptions.includes('comptabilite-assurance') && <Route path={`comptabilite-assurance`} element={<ComptabiliteAssurance auth={data} />} />}
                  <Route path={`videocall`} element={<VideoCall auth={data} />} />
            </Routes>
      </Main>
    </Box>
    </div>}
    <ToastContainer />
    </>
  );
}
