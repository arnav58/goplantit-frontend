import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';


// import orange from '@material-ui/core/colors/orange';
// import cyan from '@material-ui/core/colors/cyan';
// import lightGreen from '@material-ui/core/colors/lightGreen';


//black #190E00
//white #FFF4E5

const baseTheme = createMuiTheme({
   palette: {
      type:'dark',
      primary: {
         main:'#17B978'
      },

      secondary: {
         main:'#A64942'
      },

      tertiary: {
         main:'#FFFFFF'
      },

   },
   typography: {
    useNextVariants: true,
    fontFamily: [
      'Rubik',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ].join(',')
  },
  overrides: {
   MuiMobileStepper : {
      dotActive:{
         backgroundColor:"#FFF4E5"
      }
   }
}
});

const mainTheme = responsiveFontSizes(baseTheme);

export default mainTheme;
