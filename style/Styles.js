import { StyleSheet } from "react-native";
import { MD3LightTheme } from "react-native-paper"

export const colors = {
  main: '#9BBEC8',
  secondary: '#DDF2FD',
  borders: '#164863',
  content: '#3b3b3b'
};

export default Styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 10,
  },
  exerciseContainer: {
    marginBottom: 100
  },
  modalContainer: {
    flex: 1,
    zIndex: 9,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  chip: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 6,
    height: 50,
    marginBottom: 6,
    alignItems: 'center',
  },
  card: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    padding: 2
  },
  cardContent : {
  
  },
  cardContentIcons: {
   position: 'absolute',
   right: 0,
   borderWidth: 2,
   borderRadius: 25,
   borderColor: colors.borders,
   padding: 6,
   marginTop: 10,
   marginBottom: 10,
   marginRight: 5,
   backgroundColor: colors.main
  },
  headlines: {
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
    fontFamily: 'RussoOne',
    textAlign: 'center',
    justifyContent: 'center'
  },
  text : {
    fontSize: 16,
  },
  textInputs: {
    zIndex: 0,
    marginTop: 15,
  },
  buttons: {
    zIndex: -1,
    position: 'relative',
    marginTop: 20,
  },
  date: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 4,
    backgroundColor: colors.main
  },
  radiobutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  }

})

export const MyTheme = {
  ...MD3LightTheme,
  roundness: 1,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.content,
    surface: colors.content,
    secondaryContainer: colors.main,
    outline: colors.borders,
    outlineVariant: colors.borders,
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level1: colors.secondary, 
    },
  },
};
