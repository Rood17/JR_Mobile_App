
import React from 'react';
import { View, Text, StyleSheet, Button, Keyboard } from 'react-native';
import * as styleConst from '../../res/values/styles/StylesConstants'

let mainColor;

const IntentBtn = ({ color, stylesBtn, stylesBtnText, intent, btnText, isDisabled }) => {

  //Here go the intent
  const goIntent = () => {
    console.log("Intent - " + intent)
    alert("Intent - " + intent)
  }


  //Styles
  if (color == undefined || color === 0)
    mainColor = styleConst.MAINCOLORS[0]
  else if (color === 1)
    mainColor = styleConst.MAINCOLORSLIGHT[1]
  else if (color === 2)
    mainColor = styleConst.MAINCOLORS[2]
  else
    mainColor = color

  //console.log("Intent - " + mainColor)

  return (
    <View style={styles.btnContainer}>
      {isDisabled ?
        <Button
          //style={stylesBtn == null ? btnNormal() : stylesBtn}
          onPress={() => goIntent()}
          color={mainColor}
          title={btnText}
          disabled
        />
        :
        <Button
          //style={stylesBtn == null ? btnNormal() : stylesBtn}
          onPress={() => goIntent()}
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