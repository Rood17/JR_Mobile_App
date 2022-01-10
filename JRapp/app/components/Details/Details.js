/**
 * -- Details JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Card, ReturnHeader, UserDataCard } from "../elements/Elements";
import { getPerfilUf } from '../../utils/services/get_services'
import * as data from '../../utils/services/perfil_uf.json';
import axios from 'axios';
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
    // FU_Tethering - please wit /** */
    /**useEffect(() => {
        const fetchData = async () => {
            const response = await getPerfilUf();
            //console.info("LeagueCatalog > Response >> "+JSON.stringify(response))
            if (response.statusResponse) {
                setUserInfo(response.dataPerfilUf);
                console.log("holaa : " + esponse.dataPerfilUf)
            }
        };
        fetchData();
    }, []);
    // I don´t fucking know yet
    useEffect(() => {
        const consultarApi = () => {
            const url = './perfil_uf.json'
            const resultados = axios.get(url)
            console.log(resultados)
        }
        consultarApi()
    }, []); **/
    //setUserInfo(data.responseSubscriber)
    useEffect(() => {
        const consultarApi = () => {
            setUserInfo(data.responseSubscriber)
        }
        consultarApi()
    }, []);
    console.log(idSubscriber)


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
                        <View style={{ flexDirection: 'column' }}>

                            <TouchableOpacity onPress={() => alert("hola")}>
                                <Card header='Contáctanos'
                                    text='Ponte en contacto, ¡estamos para ayudarte!'
                                    icon='user' />
                            </TouchableOpacity >

                            <TouchableOpacity onPress={() => alert("hola")}>
                                <Card header='Ayuda con la App'
                                    text='Ponte en contacto, ¡estamos para ayudarte!'
                                    icon='life-ring' />
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => alert("hola")}>
                                <Card header='Contáctanos'
                                    text='Ponte en contacto, ¡estamos para ayudarte!'
                                    icon='user' />
                            </TouchableOpacity >

                            <TouchableOpacity onPress={() => alert("hola")}>
                                <Card header='Ayuda con la App'
                                    text='Ponte en contacto, ¡estamos para ayudarte!'
                                    icon='life-ring' />
                            </TouchableOpacity>

                        </View>
                    </>
                    :
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => alert("hola")}>
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