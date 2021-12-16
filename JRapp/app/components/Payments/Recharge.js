/**
 * -- Asistance JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import { LetterCircle, ReturnHeader } from "../elements/Elements";
import * as styleConst from '../../res/values/styles/StylesConstants'
import { Icon, Input, Overlay } from 'react-native-elements'
import * as constants from '../../utils/constants/Constants'
import IntentBtn from '../elements/IntentBtn';

import {
    Button,
    SafeAreaView,
    ScrollView,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TouchableOpacity,
} from 'react-native';


// MainCard
export const RechargeOneCard = ({ title, subtitle, subtitleColor }) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [displayColor, setDisplayColor] = useState(styleConst.MAINCOLORSLIGHT[1]);
    const [errorMsg, setErrorMsg] = useState('');

    const numberExist = 888

    // Validate if Number account exist
    const onChangeNumber = (number) => {
        if (number.length === constants.MAX_NUMBER_LENGTH) {
            if (number.toString().indexOf(numberExist) != -1) {
                setDisabledBtn(false)
                setDisplayColor(styleConst.MAINCOLORSLIGHT[1])
                setErrorMsg('')
            } else {
                setDisplayColor('red')
                setDisabledBtn(true)
                setErrorMsg('Este número aún no tiene una cuenta registrada.')
            }

        }
        else {
            setDisabledBtn(true)
            setDisplayColor(styleConst.MAINCOLORSLIGHT[1])
            setErrorMsg('')
        }

    }

    return (

        <View style={stylesMainCard.boxShadow}>

            <View style={stylesMainCard.inputContainer}>
                <Text>Introduce el número a recargar</Text>
                <Input
                    placeholder="Número JRmovil (10 dígitos)"
                    keyboardType='number-pad'
                    textContentType='telephoneNumber'
                    errorMessage={errorMsg}
                    leftIcon={{ type: 'font-awesome', name: 'mobile', size: 18, color: displayColor }}
                    maxLength={constants.MAX_NUMBER_LENGTH}
                    style={{ borderBottomColor: displayColor, color: displayColor }}
                    onChangeText={number => onChangeNumber(number)}
                />
                <Input
                    placeholder="Introduce de nuevo tu número"
                    keyboardType='number-pad'
                    textContentType='telephoneNumber'
                    errorMessage={errorMsg}
                    leftIcon={{ type: 'font-awesome', name: 'mobile', size: 18, color: displayColor }}
                    maxLength={constants.MAX_NUMBER_LENGTH}
                    style={{ borderBottomColor: displayColor, color: displayColor }}
                    onChangeText={number => onChangeNumber(number)}
                />
            </View>
            <OverlayModal />
            <View style={{ marginBottom: 30, width: '80%' }}>
                <IntentBtn
                    isDisabled={disabledBtn}
                    intent='goToEnterCode'
                    btnText='Continuar' />
            </View>
        </View>

    );
}
const stylesMainCard = StyleSheet.create({
    inputContainer: {
        width: '100%',
        padding: 20
    },
    headContainer: {
        padding: 5,
        flexDirection: 'column',
        borderBottomWidth: 0,
        margin: 25,
        flex: 1,
        alignItems: 'center'
    },
    bodyContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    bodyTitle: {
        marginLeft: 20,
    },
    cardTitleTxt: {
        color: styleConst.MAINCOLORSLIGHT[1],
        fontSize: 25
    },
    boxShadow: {
        marginTop: 30,
        marginLeft: styleConst.CARD_MARGIN,
        marginRight: styleConst.CARD_MARGIN,
        marginBottom: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        alignItems: 'center',
    },
});
// END MainCard

// Money List
export const MoneyCard = () => {
    const [gbProduct, setGbProduct] = useState()

    // 999 seguro aquí se va a neceistar un ref
    console.log(gbProduct)

    return (
        <View style={stylesMoneyCard.boxShadow} >
            <View style={stylesMoneyCard.horizontalCard}>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$20</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$30</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$50</Text>
                </TouchableHighlight>
            </View>
            <View style={stylesMoneyCard.horizontalCard}>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$20</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$30</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$50</Text>
                </TouchableHighlight>
            </View>
            <View style={stylesMoneyCard.horizontalCard}>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$20</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$30</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={stylesMoneyCard.box}
                    onPress={() => setGbProduct(5)}
                >
                    <Text>$50</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const stylesMoneyCard = StyleSheet.create({
    container: {

    },
    horizontalCard: {
        flexDirection: 'row'
    },
    box: {
        borderColor: 'red',
        padding: 5,
        borderWidth: 1
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

// Products List
export const ProductCard = () => {
    const [gbProduct, setGbProduct] = useState()

    // 999 seguro aquí se va a neceistar un ref
    console.log(gbProduct)

    return (
        <ScrollView horizontal >
            <TouchableHighlight
                onPress={() => setGbProduct(5)}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/2.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => setGbProduct(10)}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/3.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => setGbProduct(20)}
                style={stylesProductCard.boxShadow}
            >
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/4.jpg')}
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => setGbProduct(50)}
                style={stylesProductCard.boxShadow}>
                <Image
                    style={stylesProductCard.imageProduct}
                    source={require('../../res/drawable/products/5.jpg')}
                />
            </TouchableHighlight>
        </ScrollView>
    );
}

const stylesProductCard = StyleSheet.create({
    container: {

    },
    imageProduct: {
        width: 300,
        height: 300,
        padding: 5,
        borderBottomWidth: .8,
        //borderBottomColor: styleConst.MAINCOLORSLIGHT[1],
        margin: 0,
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


// Modal
const OverlayModal = () => {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const togglePlans = () => {
        setVisible1(!visible1);
    };

    const togglePrices = () => {
        setVisible2(!visible2);
    };

    return (
        <View>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.iconContainer}>
                    <View style={styles.icon}>
                        <Icon
                            raised
                            name='dropbox'
                            type='font-awesome'
                            color={styleConst.MAINCOLORSLIGHT[1]}
                            onPress={togglePlans} />
                        <Text>Planes JR</Text>
                    </View>
                    <View style={styles.icon}>
                        <Icon
                            raised
                            name='dollar'
                            type='font-awesome'
                            color={styleConst.MAINCOLORSLIGHT[1]}
                            onPress={togglePrices} />
                        <Text>Cargar saldo</Text>
                    </View>
                </View>
            </View>

            <Overlay isVisible={visible1} onBackdropPress={togglePlans}>
                <View style={modalStyle.headContainer}>
                    <Text style={modalStyle.headTxt}>Planes JR</Text>
                </View>

                <View style={modalStyle.bodyContainer}>
                    <Text style={{ margin: 15 }}>Slecciona una compra</Text>
                    <ProductCard />
                </View>

                <View style={modalStyle.footer}>
                    <IntentBtn
                        intent='goToEnterCode'
                        btnText='Cerrar'
                        color={1} />
                </View>
            </Overlay>
            <Overlay isVisible={visible2} onBackdropPress={togglePrices}>
                <View style={modalStyle.headContainer}>
                    <Text style={modalStyle.headTxt}>Recarga Saldo</Text>
                    <View style={modalStyle.bodyContainer}>
                        <Text style={{ margin: 15 }}>Slecciona una compra</Text>
                        <MoneyCard />
                    </View>
                    <View style={modalStyle.footer}>
                        <IntentBtn
                            intent='goToEnterCode'
                            btnText='Cerrar'
                            color={1} />
                    </View>
                </View>
            </Overlay>
        </View>
    );
};
const modalStyle = StyleSheet.create({
    headContainer: {
        margin: 20,
        alignItems: 'center'
    },
    bodyContainer: {
        width: '80%',

    },
    footer: {
        margin: 20
    },
    headTxt: {
        fontWeight: 'bold',
        color: styleConst.MAINCOLORS[1]
    },
});

const Recharge = () => {
    // header, text, icon
    return (
        <>
            <View style={styles.container} >
                <ReturnHeader title='Recarga de saldo' />
                <View style={{ flex: 1 }}>
                    <View style={styles.promoContainer}>
                        <Text style={{ fontWeight: 'bold', color: styleConst.MAINCOLORS[1] }}>Los mejores paquetes y opciones en telefonía para ti.</Text>
                    </View>
                    <View style={styles.headContainer}>
                        <LetterCircle insightData={1} />
                        <View style={{ marginLeft: 15 }}>
                            <Text>Ingresa tu número JR Movil y el tipo de compra.</Text>
                        </View>
                    </View>
                    <RechargeOneCard />
                    <View style={styles.registerContainer}>
                        <Text>Carga seleccionada:</Text>
                        <TouchableOpacity>
                            <Text style={{ color: styleConst.MAINCOLORS[0] }}>Plan 50</Text>
                        </TouchableOpacity>


                    </View>
                    <View style={styles.headContainer}>
                        <View style={styles.inline}>
                            <LetterCircle insightData={2} color={1} />
                        </View>
                        <View style={styles.inline}>
                            <Text>Realiza tu pago.</Text>
                        </View>
                        <View style={{marginLeft:15}3
                    325.}>
                            <Text style={}>tertyyyyyy</Text>
                        </View>
                    </View>

                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    promoContainer: {
        marginLeft: 15,
        marginBottom: 5,
        marginTop: 30,
    },
    headContainer: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerContainer: {
        alignItems: 'center',
        margin: 10
    },
    logo: {
        flex: 1,
        height: 100,
        margin: 20

    },
    btnActionContainer: {
        padding: 20,
        flex: 2,
        alignItems: 'center'
    },
    iconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    icon: {
        alignItems: 'center',
        flexBasis: '35%',
    },
    inline:{
        
    }
    ,
});

export default Recharge;