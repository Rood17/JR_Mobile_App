import React, { useState } from 'react';
import type { Node } from 'react';
import { Overlay } from 'react-native-elements'
import DisplayLogo from '../elements/DisplayLogo';
import IntentBtn from '../elements/IntentBtn';
import * as styleConst from '../../res/values/styles/StylesConstants'
import { getUserName, getUserData, getUserString, getStringValue } from '../../utils/Storage'
import { Loader } from '.././elements/Elements';



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
  ImageBackground,
} from 'react-native';


const OverlayModal = ({ openModal, navigation, lastView }) => {



  // If success Go to Main
  const goToIntent = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Main',
        },
      ],
    })
  }

  // Go to intent countdown
  if (openModal) {
    setTimeout(() => {
      goToIntent()
    }, 2000);
  }



  return (
    <View>
      <Overlay isVisible={openModal} fullScreen={true}>
      
        <View style={modalStyle.containerModal}>
        <ImageBackground
          source={require('../../res/drawable/background/bg_2.jpg')}
          style={{ width: '100%', height: '100%' }} >

          {lastView == 'register' ?

            <View style={modalStyle.headContainer}>
              <Text style={modalStyle.headTxt}>¡Gracias {getUserName()}!</Text>
              <Text >Tu cuenta se ha registrado exitosamente.</Text>
            </View>

            :

            <View style={modalStyle.headContainer}>
              <Text style={modalStyle.headTxt}>Bienvenid@ {getUserName()}</Text>
              <Text>¡Es un gusto verte de nuevo!</Text>
            </View>
          }

</ImageBackground>
        </View>
        
      </Overlay>
    </View>
  );
};
const modalStyle = StyleSheet.create({
  containerModal: {
    margin: 20,
    marginTop:140
  },
  headContainer: {
    margin: 0,
    marginTop:190,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyContainer: {
    alignItems: 'flex-start',
    margin: 20,
    justifyContent: 'center'
  },
  footer: {
    margin: 10
  },
  headTxt: {
    fontWeight: 'bold',
    color: styleConst.MAINCOLORS[0],
    fontSize: 22
  },
});


const RegisterSuccess: () => Node = ({ navigation, route }) => {

  const image = { require: '../res/drawable/background/bg_1.jpg' };
  const [openModal, setOpenModal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  getUserString('lastView')
  const lastView = getStringValue()


  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  console.log('prevRoute : ' + 34)

  // Entering From Auth
  getUserData().then(() => {
    // GOpen Modal countdown
    accesHandler()
    setIsReady(true)
  })

  // If just register
  const accesHandler = () => {
    if (lastView == 'register' || lastView == 'login') {
      setOpenModal(true)
    } else {
      setTimeout(() => {
        setOpenModal(true)
      }, 500);
    }
  }







  return (
    <>
                {!isReady ?
        <Loader />

        :
        <ImageBackground
          style={{ width: '100%', height: '100%' }} >

          <OverlayModal
            openModal={openModal}
            navigation={navigation}
            lastView={lastView}
          />

        </ImageBackground>
}
      


    </>
  );
};

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
    alignItems: 'flex-start',
    alignItems: 'center'
  },
});

export default RegisterSuccess;
