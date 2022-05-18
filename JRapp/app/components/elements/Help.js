import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as styleConst from '../../res/values/styles/StylesConstants'
import * as string from '../../res/values/strings/Strings'

const Help = ({navigation}) => {

    const onPress = () => {
        //alert('go to ayudaaa')
    }

    return (
        <>
        <TouchableOpacity style={styles.helpContainer} onPress={() => navigation.navigate('Asistance')}>
            <Text style={{color: styleConst.MAINCOLORS[0], fontWeight:'bold'}}>{string.HELP}</Text>
        </TouchableOpacity>
        </>
    );
} 

const styles = StyleSheet.create({
    helpContainer: {
      padding: 15,
      alignItems: 'center',
      backgroundColor : styleConst.MAINCOLORSLIGHT[0]
    },
  });

export default Help;
