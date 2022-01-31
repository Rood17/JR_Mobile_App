/**
 * Look and Feel Constants - JR App --
 */

 import {Dimensions, useColorScheme, StyleSheet} from 'react-native'

 // Vars
 let backgroundStyle;
 
 // JR Colors
 export const MAINCOLORS = ['#4a9462', '#2a2a2a', '#E89E20', 'black'];
 export const MAINCOLORSLIGHT = ['#ddf4e7db', '#539190', 'grey', '#b6b7bd']
 export const WHATS_COLOR = '#49c359'
 export const FACEBOOK_COLOR = '#1877f2'
 export const TWITTER_COLOR = '#1d9bf0'
 export const INSTA_COLOR = '#e843a8'
 export const WARNINGS = ['red', 'yellow', 'green']
 export const COLOR_LINK = ['#568be0']
 // Prepare Themes
 export const P_LIGHT_THEME = ['dark', '#444548']
 // Scheme Styles
 export const STYLES = ['default', 'dark-content', 'light-content'];
 //Transitions
 export const TRANSITIONS = ['fade', 'slide', 'none'];
 
 
 /**
  * Size Constants
  */
 // Width
 export const WINDOWS_WIDTH  = parseInt(Dimensions.get('window').width)
 // Height
 export const WINDOWS_HEIGHT = parseInt(Dimensions.get('window').height)
 // MainCardMargin
 export const CARD_MARGIN = 30

 /**
  * Font Size
  */
 export const BTN_TXT_SIZE = 15
 
 /**
  * Styles Arrays
  */
 const darkmodeManger = () => {
     const isDarkMode = useColorScheme() === 'dark';
     backgroundStyle = {
     backgroundColor: isDarkMode ? 'red' : 'Colors.lighter',
     };
 }
  
 export const MAIN_CONTAINER_STYLE = 
 {
     flex:1,
     backgroundColor: 'white'
     //height: WINDOWS_HEIGHT,
 }


 
 