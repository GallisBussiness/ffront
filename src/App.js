import { BrowserRouter} from "react-router-dom";

import {QueryClient,QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@mui/material';
import {AnimatePresence} from 'framer-motion'
import { theme } from './Theme';
import RouterComponent from './RouterComponent';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import "primeicons/primeicons.css";  
import "./App.css";


const queryClient = new QueryClient();

function App() {

 return (
   <div className="body">
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
         <AnimatePresence>
         <BrowserRouter>
       <RouterComponent />
   </BrowserRouter>
   </AnimatePresence>
   </QueryClientProvider>
    </ThemeProvider>
   </div>
 );
}



export default App;
