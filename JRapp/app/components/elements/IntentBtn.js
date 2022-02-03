
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Button, Keyboard } from 'react-native';
import * as styleConst from '../../res/values/styles/StylesConstants'

let mainColor;

const IntentBtn = ({ color,btnParams, justAction,navigation,intent, btnText, isDisabled }) => {
  let goToView = '';

  //Styles
  if (color == undefined || color === 0)
    mainColor = styleConst.MAINCOLORS[0]
  else if (color === 1)
    mainColor = styleConst.MAINCOLORSLIGHT[1]
  else if (color === 2)
    mainColor = styleConst.MAINCOLORS[2]
  else
    mainColor = color
  
  if (typeof intent == 'object' ){
    goToView = intent[0]
    btnParams = intent[1]
  } else if (btnParams) {
    goToView = intent
  } else {
    goToView = intent
  }

  return (
    <View style={styles.btnContainer}>
      {isDisabled ?
        <Button
          //style={stylesBtn == null ? btnNormal() : stylesBtn}
          color={mainColor}
          title={btnText}
          disabled
        />
        : !justAction || btnParams ?
        <Button
          //style={stylesBtn == null ? btnNormal() : stylesBtn}
          onPress={() => navigation.navigate(goToView, btnParams)}
          color={mainColor}
          title={btnText}
        />
        :
        <Button
          //style={stylesBtn == null ? btnNormal() : stylesBtn}
          onPress={() => justAction}
          color={mainColor}
          title={btnText}
        />
      
      }
    </View>
  );
}

// Dinamic Styles
const btnNormal = function () {
  return {
    padding: 15,
    backgroundColor: mainColor,
    marginVertical: 10,
    marginHorizontal:10
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop:10,
    marginBottom:10
  },

});

export default IntentBtn;