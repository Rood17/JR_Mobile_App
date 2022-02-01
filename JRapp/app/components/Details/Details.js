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
     setPayload(simData[4]);
     const expireMBData = simData[3]
     const totalSMSData = simData[2]
     const unsuedMBData = simData[1]
 
     const totalSMSData2 = simSMS[0]
 
     const totalMINData = simMIN[2]


    // header, text, icon
    return (
        <>

            <View style={styles.container} >
                <ReturnHeader title='Detalles de tu Saldo' navigation={navigation} />

                <View style={{ paddingLeft: 15, marginTop: 35 }}>
                    <Text>Consulta los datos de tu número JR Movil.</Text>
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
                                            campoD : '[Info]'
                                        },
                                        {
                                            campo : 'Saldo Actual',
                                            campoD : '[Info]'
                                        },
                                        {
                                            campo : 'Total Contratado',
                                            campoD : '[Info]'
                                        },
                                        {
                                            campo : 'Total SMS',
                                            campoD : '[Info]'
                                        },
                                        {
                                            campo : 'Total Tiempo V',
                                            campoD : '[Info]'
                                        },
                                        {
                                            campo : 'Última Fecha de Pago',
                                            campoD : '[Info]'
                                        },
                                        {
                                            campo : 'Fecha de Vencimiento',
                                            campoD : '[Info]'
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
                                            campo : 'Servicio 1',
                                            campoD : '[Info]'
                                        },
                                        {
                                            campo : 'Servicio 2',
                                            campoD : '[Info]'
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