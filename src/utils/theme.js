import { createTheme} from '@mui/material/styles';

const theme =createTheme({

    palette:
     {     
    primary: { main: '#007BFF' },
     secondary: { main: '#4107FF' }, 
    success: { main: '#28A745' },
     warning: { main: '#FFC107' }, 
     info: { main: '#17A2B8' },
      error: { main: '#DC3545' },
      background: { default: '#F8F9FA' }, 
      text: { primary: '#212529' }, }
});
export default theme;