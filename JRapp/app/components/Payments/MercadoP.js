import React, {useState, useEffect,useRef} from 'react';

//import all the components we are going to use
import { SafeAreaView, View, Text, BackHandler, Alert} from 'react-native';

import { WebView } from 'react-native-webview';
import { ReturnHeader, Loader } from '../elements/Elements';
import NetInfo from "@react-native-community/netinfo";
import UserState from '../../../context/user/UserState';
import { LOG_INFO } from '../../res/values/strings/Strings'
import {cancel_payment} from '../../utils/services/get_services'

const MercadoP = ({ navigation, route }) => {

    const { init_point, pago_id } = route.params;
    const [isFinish, setIsFinish] = useState(false)
    const [canGoBack, setCanGoBack] = useState()
    const [url, setUrl] = useState()
    const webViewRef = useRef(null)
    console.log(LOG_INFO('MercadoP', 'init_point')+init_point)
    console.log(LOG_INFO('MercadoP', 'pago_id')+pago_id)

    // Back handler
    useEffect(() => {
        const backAction = () => {
            if (canGoBack) {
                console.log(LOG_INFO('MercadoP', 'webViewRef.current : ')+webViewRef.current)
                webViewRef.current.goBack();
                return true; 
            } else {
                // Cancelar pago (API)
                cancel_payment(pago_id)
                console.log(LOG_INFO('MercadoP', 'Intentional user getting out of MP App.'))
            }
            return false;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, [canGoBack]);

    // Subscribe
    useEffect( () => {
        if (url == undefined || url.toString().indexOf('www.mercadopago.com') != -1
        ||  url.toString().indexOf('.paypal.com') != -1) {
            return
        } else {
            navigation.popToTop()
        }
    }, [url])
    
    const _onMessage = (message) => {
        // you can put processing code here.
        console.log(LOG_INFO('MercadoP', '_onMessage.message')+JSON.stringify(message))
      }


    // Inject js
    const jsCode = "window.ReactNativeWebView.postMessage()"

    return (
        
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                ref={webViewRef}
                onLoadEnd={()=>{
                    setIsFinish(true)
                    /* add you work that you want to do after loading is done. */
                    }}
                source={{ uri: init_point }}
                style={{ marginTop: 20 }}
                startInLoadingState={true}
                mixedContentMode={"always"}
                allowsBackForwardNavigationGestures={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                
                renderLoading={() => 
                <>
                <Loader marginTop={1}/>
                </>}
                onMessage={(message) => _onMessage(message)}
                injectedJavaScript={jsCode}
                onNavigationStateChange={(e) => {
                    //console.info("current state is ", JSON.stringify(e, null, 2));
                    setUrl(e.url)
                    //console.info("e.canGoBack ", e);
                   // console.info("e.canGoBack ", e.canGoBack);
                    if (e.canGoBack){
                        setCanGoBack(true)
                    } else {
                        setCanGoBack(false)
                    }
                    /** put your comdition here based here and close webview.
                     Like if(e.url.indexOf("end_url") > -1)
                     Then close webview
                     */
                }}





            />
        </SafeAreaView>
    );
};

export default MercadoP;