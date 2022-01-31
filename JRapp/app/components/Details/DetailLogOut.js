/**
 * -- Main - JR App --
 * Author: Rodrigo Mora
 * rodmorar@yahoo.com.mx
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useEffect } from 'react';

 import DisplayLogo from '../elements/DisplayLogo';
 import IntentBtn from '../elements/IntentBtn';
 import { Icon, Input } from 'react-native-elements'
 import { WarningAdvice, MainHeader, MainFooter, MainCard, SocialMainCard, ReturnHeader } from '../elements/Elements';
 import * as styleConst from '../../res/values/styles/StylesConstants'
 import * as constants from '../../utils/constants/Constants'
 import { formatApiDate, setProductType } from '../../utils/Utils'
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
 
    const { idSubscriber } = route.params;     
 
    let gbProduct = ' nolose '
     // Api data
     let [totalMBData, unsuedMBData, expireMBData, actualMBData,
         totalSMSData, unsuedSMSData, expireSMSData, actualSMSData,
         totalMINData, unsuedMINData, expireMINData, actualMINData] = [0]
 
     //Validación vigencia - falta 999
     const validitNearDaysEnd = 5
     // respuesta Api
 
 
     data.responseSubscriber.freeUnits.map((item, i) => {
         // Get data 'mb'
         if (item.name.indexOf("FreeData_Altan") != -1) {
             // set Vars
             totalMBData = item.freeUnit.totalAmt;
             unsuedMBData = item.freeUnit.unusedAmt;
             actualMBData = totalMBData - unsuedMBData;
 
             // if unsed data is none
             if (actualMBData == 0)
                 actualMBData = totalMBData
 
             // Get Expirtaion Date
             item.detailOfferings.map((subItem) => {
                 //console.log(subItem.expireDate)
                 expireMBData = subItem.expireDate;
             })
         }
 
         // get 'sms'  y 'tiempo'
         if (item.name.indexOf("FU_SMS_Altan-NR-LDI_NA") != -1) {
             // set Vars
             totalSMSData = item.freeUnit.totalAmt;
             unsuedSMSData = item.freeUnit.unusedAmt;
             actualSMSData = totalSMSData - unsuedSMSData;
 
             // if unsed data is none
             if (actualSMSData == 0)
                 actualSMSData = totalSMSData
 
             // Get Expirtaion Date
             item.detailOfferings.map((subItem) => {
                 //console.log(subItem.expireDate)
                 expireSMSData = subItem.expireDate;
             })
         }
         if (item.name.indexOf("FU_Min_Altan-NR-IR-LDI_NA") != -1) {
             // set Vars
             totalMINData = item.freeUnit.totalAmt;
             unsuedMINData = item.freeUnit.unusedAmt;
             actualMINData = totalMINData - unsuedMINData;
 
             // if unsed data is none
             if (actualMINData == 0)
                 actualMINData = totalMINData
 
             // Get Expirtaion Date
             item.detailOfferings.map((subItem) => {
                 //console.log(subItem.expireDate)
                 expireMINData = subItem.expireDate;
             })
         }
     })
 
 
     // Just accept this format '2022/02/18'
     const validityUser = formatApiDate(expireMBData)
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
                             title='{payload}'
                             subtitle={validityResponse}
                             subtitleColor={validityColor}
                             bodyHeadOne='MB Totales'
                             bodyHeadTwo='MB Disponibles'
                             dataOne={totalMBData + ' MB'}
                             dataTwo={actualMBData + ' MB'}
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