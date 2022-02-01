/**
 * -- Main - JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useEffect, useContext } from 'react';

 import DisplayLogo from '../elements/DisplayLogo';
 import IntentBtn from '../elements/IntentBtn';
 import { Icon, Input } from 'react-native-elements'
 import { WarningAdvice, MainHeader, MainFooter, MainCard, SocialMainCard, ReturnHeader } from '../elements/Elements';
 import * as styleConst from '../../res/values/styles/StylesConstants'
 import * as constants from '../../utils/constants/Constants'
 import { formatApiDate, setProductType } from '../../utils/Utils'
 import UserContext from '../../../context/user/UserContext'
 import PaquetesContext from '../../../context/paquetes/PaquetesContext';
 // Services
 import * as data from '../../utils/services/perfil_uf.json'
 
 import {
     createDrawerNavigator,
     DrawerContentScrollView,
     DrawerItemList,
     DrawerItem,
 } from '@react-navigation/drawer';
 
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
     TouchableOpacity,
 } from 'react-native';
 
 
 
 const DetailLogOut = ({ navigation, route }) => {
    const { idSubscriber, UFuserData } = route.params;   

    // get userData Context
    const {userData, getJson} = useContext(UserContext);

    useEffect(() => {
        getJson();
    }, [])

     // get Paquetes Context
     const {paquetes, getPaquetes} = useContext(PaquetesContext);

     useEffect(() => {
        getPaquetes();
     }, [])
    

    let expireDate,initialAmt,unusedAmt, offeringId, ofertaActual = 0;
    //offeringId
    Object.values(paquetes).map((item) => {
        //console.log(item.offerId)
        Object.values(userData).map((item) => {
            // Freeeunits
            if ( item.freeUnits != undefined){
                item.freeUnits.map((i) => {
                    // Catch Plans Data
                    if ( i.name == "FreeData_Altan-RN")
                    {
                        expireDate = i.detailOfferings[0].expireDate;
                        initialAmt = i.detailOfferings[0].initialAmt;
                        unusedAmt = i.detailOfferings[0].unusedAmt;
                        offeringId = i.detailOfferings[0].offeringId

                        console.log("??? : " + i.detailOfferings[0])                    }
                })
            }
        })

        // Get oferta actual
        if (offeringId == item.offerId)
            ofertaActual = item.name
    })
    
    console.log("super : " + expireDate)
    console.log("super : " + initialAmt)
    console.log("super : " + unusedAmt)
    console.log("super : " + offeringId)
    console.log("super : " + ofertaActual)

    let gbProduct = ' nolose '

 
     //Validación vigencia - falta 999
     const validitNearDaysEnd = 5
     // respuesta Api
     expireDate == undefined ? expireDate='9999999999999' : null


     // Just accept this format '2022/02/18'
     const validityUser = formatApiDate(expireDate)
     const validityUserCode = validityUser.replace(/\//g, '')
     console.log("validityUser : " + validityUser)
     console.log("validityUserCode : " + validityUserCode)
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
 
 
     // Payload select
     useEffect(() => {
 
         if (gbProduct) {
             // Set product
             let charge = setProductType(gbProduct)
 
             // Intent to Recharge_2
            /** navigation.navigate('Recharge_2', {
                 idSubscriber: idSubscriber,
                 isRegister: false,
                 isJr: true,
                 sendPayload: charge
             })**/
         }
     });
 
 
     return (
         <>
             <View style={styles.container}>

                <ReturnHeader title='Detalles de tu Saldo' navigation={navigation} />
                 <ScrollView style={styles.container}>
                     <View style={styles.numberContainer}>
                         <Icon
                             name='mobile'
                             type='font-awesome'
                             color={styleConst.MAINCOLORSLIGHT[1]}
                         />
                         <Text style={styles.number}>{idSubscriber}</Text>
                     </View>
                     <View>
                         <MainCard
                             title={ofertaActual}
                             subtitle={validityResponse}
                             subtitleColor={validityColor}
                             bodyHeadOne='MB Totales'
                             bodyHeadTwo='MB Disponibles'
                             dataOne={initialAmt}
                             dataTwo={unusedAmt}
                             MBC='true'
                             text='Consumos de datos:'
                         />

                             <View style={styles.infoNoRegisterTxt}>
                                 <TouchableOpacity>
                                     <Text style={{ textAlign: 'center' }}>
                                         Para más información
                                         <Text style={{ color: styleConst.MAINCOLORS[0] }}> Ingresa </Text>
                                         a tu "Cuenta".
                                     </Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity>
                                     <Text style={{ textAlign: 'center' }}>
                                         O<Text style={{ color: styleConst.MAINCOLORS[0] }}> Registrate Aquí. </Text>
                                         ¡Es gratuito!
                                     </Text>
                                 </TouchableOpacity>
                                 <View style={styles.btnsContainer}>
                                     <View style={styles.btnAction}>
                                         <IntentBtn
                                             navigation={navigation}
                                             intent='Recharge'
                                             btnParams={{ idSubscriber: idSubscriber, isRegister: false, isJr: true }}
                                             btnText='Recarga' />
                                     </View>
                                 </View>
                             </View>
                        
 
 
                     </View>
                 </ScrollView>

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
     btnsContainer: {
         margin: 10,
         marginLeft: 20,
         marginRight: 20,
         flexDirection: 'row',
     },
     btnAction: {
         margin: 5,
         flex: 1
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
     },
     infoNoRegisterTxt: {
         marginLeft: 50,
         marginRight: 50,
         marginBottom: 20,
         marginTop: 20,
         alignItems: 'center',
     },
 });
 
 export default DetailLogOut;