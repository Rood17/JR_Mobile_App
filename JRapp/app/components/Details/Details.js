import React, { useState, useEffect, useContext } from 'react';
import { Card, ReturnHeader, UserDataCard, DetailCard } from "../elements/Elements";
import * as data from '../../utils/services/perfil_uf.json';
import * as styleConst from '../../res/values/styles/StylesConstants'
import { getUserEmail, getUserLastName, getUserName } from '../../utils/Storage';
import UserContext from '../../../context/user/UserContext'
import { formatApiDate, setProductName } from '../../utils/Utils'

import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
} from 'react-native';

/**
 * Details
 * @param {navigation} navigation
 * @param {params} route
 * @returns component Details
 */
const Details = ({ navigation, route }) => {
    // States
    const [userInfo, setUserInfo] = useState([]);
    const userIsActive = data.responseSubscriber.status.subStatus;
    const { idSubscriber } = route.params;

     // get userData Context
     const { userData, getAPIUserData } = useContext(UserContext);
     useEffect(() => {
        getAPIUserData(idSubscriber);
     }, [])
 
 
     // Oferta actual
    const oferta = !userData.offeringId ? 'Sin Plan' : userData.offeringName
    const expireMBData = !userData.expireDate ? '' : formatApiDate(userData.expireDate)
    // MB
    const unsuedMBData = !userData.unusedDataAmt ? '-' : userData.unusedDataAmt
    const totalMBData = !userData.initialDataAmt ? '-' : userData.initialDataAmt
    //SMS
    const totalSMSData = !userData.totalSMS ? '-' : userData.totalSMS
    const unsuedSMSData = !userData.totalUnusedSMS ? '-' : userData.totalUnusedSMS
    // Min
    const totalMINData = !userData.totalMin ? '-' : userData.totalMin
    const unsuedMINData = !userData.totalUnusedMin ? '-' : userData.totalUnusedMin
    


    // header, text, icon
    return (
        <>

            <View style={styles.container} >
                <ReturnHeader title='Detalles de tu Saldo' navigation={navigation} />

                <View style={{ paddingLeft: 15, marginTop: 35 }}>
                    <Text style={{color : styleConst.SECONDARY_TXT_COLOR}}>Consulta los datos de tu número JRmóvil.</Text>
                </View>
                {userIsActive ?
                    <>
                        <ScrollView style={{ flexDirection: 'column' }}>

                            <TouchableOpacity >
                                <DetailCard 
                                    header='Detalles del Usuario'
                                    icon='user'
                                    data={[
                                        {
                                            campo : 'Número Jr',
                                            campoD : idSubscriber
                                        },
                                        {
                                            campo : 'Nombre Vinculado a la cuenta',
                                            campoD : getUserName() + ' ' + getUserLastName()
                                        },
                                        {
                                            campo : 'Email Vinculado a la cuenta',
                                            campoD : getUserEmail()
                                        },
                                        {
                                            campo : '',
                                            campoD : 
                                            <TouchableOpacity onPress={() => navigation.navigate('MiPerfil_2')}>
                                                <Text style={{color:styleConst.COLOR_LINK[0]}}>Editar</Text>
                                            </TouchableOpacity >,
                                        },
                                    ]}
                                />
                            </TouchableOpacity >

                            <TouchableOpacity>
                            <DetailCard header='Detalles de la Línea'
                                    icon='mobile'
                                    data={[
                                        {
                                            campo : 'Plan Actual',
                                            campoD : oferta
                                        },
                                        {
                                            campo : 'Saldo Actual',
                                            campoD : unsuedMBData + ' mb'
                                        },
                                        {
                                            campo : 'Total Contratado',
                                            campoD : totalMBData + ' mb'
                                        },
                                        {
                                            campo : 'Total SMS',
                                            campoD : totalSMSData
                                        },
                                        {
                                            campo : 'Sms restantes',
                                            campoD : unsuedSMSData
                                        },
                                        {
                                            campo : 'Minutos VoWifi',
                                            campoD : totalMINData
                                        },
                                        {
                                            campo : 'Minutos VoWifi Restantes',
                                            campoD : unsuedMINData
                                        },
                                        {
                                            campo : 'Fecha de Vencimiento',
                                            campoD : expireMBData
                                        },
                                    ]} 
                            />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <DetailCard 
                                    header='Servicios Complementarios'
                                    icon='file'
                                    data={[
                                        {
                                            campo : 'Buzón de voz',
                                            campoD : 'No contratado'
                                        },
                                        {
                                            campo : 'Llamada en espera',
                                            campoD : 'Sí'
                                        },
                                    ]}
                                />
                            </TouchableOpacity >

                        </ScrollView>
                    </>
                    :
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Asistance')}>
                            <UserDataCard header='Contáctanos para mayor Información'
                                text='¡Vaya, Este númeo se encuentra desactivado!'
                                icon='alert' />
                        </TouchableOpacity>

                    </View>
                } 


            </View>

        </>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        padding: 20,
        flex: 6,
        flexDirection: 'row',
        alignItems: 'center'
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
});

export default Details;