
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const DisplayLogo = ({stylesLogo}) => {

    return (
        <Image
            style={stylesLogo}
            source={require('../../res/drawable/logo/jr_mov.png')}
        />
    );
}

export default DisplayLogo;