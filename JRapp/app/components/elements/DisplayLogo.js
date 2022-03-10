
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const DisplayLogo = ({stylesLogo, mini}) => {

    return (
        <>
        { mini ? 
            <Image
            style={stylesLogo}
            source={require('../../res/drawable/logo/icon.png')}
        />
            : 
            <Image
            style={stylesLogo}
            source={require('../../res/drawable/logo/jrlogo_2.png')}
        />
        }
        
        </>
    );
}

export default DisplayLogo;