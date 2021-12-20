/**
 * -- Main - JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';

import DisplayLogo from './elements/DisplayLogo';
import IntentBtn from './elements/IntentBtn';
import { Icon, Input } from 'react-native-elements'
import { MainHeader, MainFooter, MainCard, SocialMainCard } from './elements/Elements';
import * as styleConst from '../res/values/styles/StylesConstants'
import * as constants from '../utils/constants/Constants'


import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback ,
} from 'react-native';


// Card
export const ProductCard = () => {
    return (
        <ScrollView horizontal >
            <TouchableHighlight
                onPress={() => alert('Yaay!')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/2.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => alert('Yaay!')}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/3.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/4.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../res/drawable/products/5.jpg')}
                />
            </TouchableHighlight>
        </ScrollView>
    );
}

const stylesProductCard = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageProduct: {
        width: 300,
        height: 300,
        padding: 5,
        flexDirection: 'column',
        borderBottomWidth: .8,
        //borderBottomColor: styleConst.MAINCOLORSLIGHT[1],
        margin: 0,
        flex: 1
    },
    boxShadow: {
        marginTop: 0,
        margin: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
});

const Main = ({navigation}) => {

    //Validación vigencia - falta 999
    const validitNearDaysEnd = 5
    // respuesta Api
    const validityUser = ' 2021/12/18'
    const validityUserCode = validityUser.replace(/\//g, '')
    // si no tiene próxima recarga - vigencia
    let validityResponse = 'Vigencia: ' + validityUser
    let validityColor = styleConst.MAINCOLORSLIGHT[2]

    // Validity neast conditionals
    // If validity is end
    if (parseInt(validityUserCode) < constants.DATE_NOW_CODE) {
        validityResponse = 'SALDO VENCIDO';
        validityColor = styleConst.MAINCOLORS[1]
    }
    // If validity ends today
    else if (parseInt(validityUserCode) == constants.DATE_NOW_CODE) {
        validityResponse = '¡HOY VENCE TU SALDO!';
        validityColor = styleConst.MAINCOLORS[2]
    }
    // If validity is near to end
    else {
        if (parseInt(validityUserCode) - validitNearDaysEnd <= constants.DATE_NOW_CODE)
            if ((parseInt(validityUserCode) - constants.DATE_NOW_CODE) == 1)
                validityResponse = 'Tu saldo vence mañana'
            else
                validityResponse = 'Tu saldo vence en ' +
                    (parseInt(validityUserCode) - constants.DATE_NOW_CODE)
                    + ' días'
    }


    return (
        <>
            <View style={styles.container}>
                <MainHeader name='Hola [Usuario]' />
                <ScrollView style={styles.container}>
                    <View style={styles.numberContainer}>
                        <Icon
                            name='mobile'
                            type='font-awesome'
                            color={styleConst.MAINCOLORSLIGHT[1]}
                        />
                        <Text style={styles.number}>55 89 54 78 21</Text>
                    </View>
                    <View>
                        <MainCard
                            title='Carga - $50'
                            subtitle={validityResponse}
                            subtitleColor={validityColor}
                            bodyHeadOne='MB Totales'
                            bodyHeadTwo='MB Disponibles'
                            dataOne='10,000 MB'
                            dataTwo='1,312 MB'
                            MBC='true'
                            text='Consumos de datos:' />
                        <SocialMainCard />
                        <MainCard
                            bodyHeadOne='Min Consumidos'
                            bodyHeadTwo='SMS Consumidos'
                            dataOne='255 Min'
                            dataTwo='5 Msj'
                            showDetalles />
                          
                        <View style={styles.btnsContainer}>
                            <View style={styles.btnAction}>
                            <IntentBtn
                                intent='goToRegister'
                                btnText='Paquetes' />
                            </View>
                            <View style={styles.btnAction}>
                            <IntentBtn
                                intent='goToRegister'
                                btnText='Cargar Saldo' />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <View style={styles.productTitleContiner}>
                            <Icon
                                name='dropbox'
                                type='font-awesome'
                                color={styleConst.MAINCOLORSLIGHT[1]}
                            />
                            <Text style={{ marginLeft: 15 }}>Selecciona el plan que más te convenga</Text>
                        </View>
                        <View>
                            <ProductCard />
                        </View>
                    </View>
                </ScrollView>
                <MainFooter navigation={navigation} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    numberContainer: {
        flexDirection: 'row',
        margin: 25,
        alignItems: 'center',
    },
    btnsContainer:{
        margin:10,
        marginLeft:20,
        marginRight:20,
        flexDirection:'row',
    },
    btnAction: {
        margin: 5,
        flex:1
    },
    productTitleContiner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 35,
        marginBottom: 30
    },
    number: {
        marginLeft: 15,
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 18
    }
});

export default Main;