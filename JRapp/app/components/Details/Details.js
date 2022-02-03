/**
 * -- Details JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useContext } from 'react';
import { Card, ReturnHeader, UserDataCard, DetailCard } from "../elements/Elements";
import { getPerfilUf } from '../../utils/services/get_services'
import * as data from '../../utils/services/perfil_uf.json';
import * as styleConst from '../../res/values/styles/StylesConstants'
import { getUserEmail, getUserLastName, getUserName } from '../../utils/Storage';
import UserContext from '../../../context/user/UserContext'

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

const Details = ({ navigation, route }) => {
    const [userInfo, setUserInfo] = useState([]);
    const userIsActive = data.responseSubscriber.status.subStatus;
    const { idSubscriber } = route.params;

     // get userData Context
     const { userData, getJson } = useContext(UserContext);

     useEffect(() => {
         getJson();
     }, [])
 
 
     // Open the package
     if (userData.simData != undefined)
         var simData = Object.values(userData.simData)
 
     // Open the package
     if (userData.simSMS != undefined)
         var simSMS = Object.values(userData.simSMS)
 
     // Open the package
     if (userData.simMIN != undefined)
         var simMIN = Object.values(userData.simMIN)
 
 
 
     // Oferta actual
    const oferta = !simData[4] ? 'Sin Carga' : simData[4]
    const expireMBData = !simData[0] ? '202201010100' : simData[0]
    
    // MB
    const unsuedMBData = !simData ? 'NaN' : simData[2]
    const totalMBData = !simData ? 'NaN' : simData[1]
    //SMS
    const totalSMSData = !simSMS ? 'NaN' : simSMS[1]
    const unsuedSMSData = !simSMS ? 'NaN' : simSMS[2]
    //SMS
    const totalMINData = !simMIN ? 'NaN' : simMIN[1]
    const unsuedMINData = !simMIN ? 'NaN' : simMIN[2]


    // header, text, icon
    return (
        <>

            <View style={styles.container} >
                <ReturnHeader title='Detalles de tu Saldo' navigation={navigation} />

                <View style={{ paddingLeft: 15, marginTop: 35 }}>
                    <Text>Consulta los datos de tu número JRmóvil.</Text>
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
                                            campo : 'Total Tiempo VoWifi',
                                            campoD : 'ILIMITADO'
                                        },
                                        {
                                            campo : 'Última Fecha de Pago',
                                            campoD : 'NONE'
                                        },
                                        {
                                            campo : 'Fecha de Vencimiento',
                                            campoD : '02/04/2022'
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