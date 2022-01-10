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
export const RechargeFinalCard = ({ title, subtitle, subtitleColor }) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [displayColor, setDisplayColor] = useState(styleConst.MAINCOLORSLIGHT[1]);
    const [errorMsg, setErrorMsg] = useState('');

    const materCard = 888
    const visa = 888
    const american = 888

    // Validate if Number account exist
    const onChangeCard = (number) => {
        if (number.length === constants.MAX_NUMBER_LENGTH) {
            if (number.toString().indexOf(materCard) != -1) {
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

            <View style={stylesMainCard.headContainer}>
                <Text style={{ fontSize: 30, color: styleConst.MAINCOLORS[0] }}>¡CARGA EXITOSA!</Text>
            </View>
            <View style={stylesMainCard.bodyFinalContainer}>
                <Text style={{ margin: 10 }}>
                    GRACIAS, la operación se ha llevado con éxito.
                </Text>
                <Icon
                    name='check-circle'
                    type='font-awesome'
                    color={styleConst.MAINCOLORSLIGHT[1]}
                />
            </View>

        </View>

    );
}
const stylesMainCard = StyleSheet.create({
    inputContainer: {
        width: '100%',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    headContainer: {
        padding: 5,
        flexDirection: 'column',
        borderBottomWidth: 0,
        margin: 25,
        flex: 1,
        alignItems: 'center',
    },
    bodyFinalContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginBottom: 20
    },
    bodyTitle: {
        marginLeft: 20,
    },
    boxShadow: {
        marginTop: 30,
        marginLeft: styleConst.CARD_MARGIN,
        marginRight: styleConst.CARD_MARGIN,
        marginBottom: 15,
        backgroundColor: styleConst.MAINCOLORSLIGHT[0],
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


// Main
const Recharge_3 = ({ navigation, route }) => {

    const { payload, idSubscriber, isRegister } = route.params;
    // header, text, icon
    return (
        <>
            <ScrollView style={styles.container} >
                <ReturnHeader 
                    title='Ir a Inicio' 
                    navigation={navigation} 
                    clear={true} 
                    isRegister={isRegister}
                    idSubscriber={idSubscriber}
                />
                <View style={{ flex: 1 }}>
                    <View style={styles.promoContainer}>
                        <Text style={{ fontWeight: 'bold', color: styleConst.MAINCOLORS[1] }}>Los mejores paquetes y opciones en telefonía para ti.</Text>
                    </View>
                    <View style={styles.headContainer}>
                        <LetterCircle insightData={3} />
                        <View style={{ marginLeft: 15 }}>
                            <Text>Confirmación.</Text>
                        </View>
                    </View>
                    <RechargeFinalCard />
                    <View style={styles.registerContainer}>
                        <Text>Carga seleccionada:</Text>
                        <TouchableOpacity>
                            <Text style={{ color: styleConst.MAINCOLORS[0], fontWeight: 'bold' }}>{payload}</Text>
                        </TouchableOpacity>
                        <Text>Número JR Movil:</Text>
                        <TouchableOpacity>
                            <Text style={{ color: styleConst.MAINCOLORS[0] }}>{idSubscriber}</Text>
                        </TouchableOpacity>
                        <View style={{ marginBottom: 30, width: '80%' }}>
                            
                        </View>

                    </View>
                </View>
            </ScrollView>
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

    cardsContainer: {
        marginTop: 0,
        marginLeft: 40,
        flexDirection: 'row',
        alignItems: 'center'

    },
    cardsLogo: {
        width: 50,
        height: 50,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Recharge_3;