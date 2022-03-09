import React, {useState, useEffect,useRef} from 'react';

//import all the components we are going to use
import { SafeAreaView, View, Text, BackHandler, Alert} from 'react-native';

import { WebView } from 'react-native-webview';
import { ReturnHeader, Loader } from '../elements/Elements';
import NetInfo from "@react-native-community/netinfo";
import UserState from '../../../context/user/UserState';

let varX;
const MercadoP = ({ navigation, route }) => {

    const { init_point } = route.params;
    const [isFinish, setIsFinish] = useState(false)
    const [canGoBack, setCanGoBack] = useState()
    const [url, setUrl] = useState()
    const webViewRef = useRef(null)

    // Back handler
    useEffect(() => {
        const backAction = () => {
            if (canGoBack) {
                console.log('pasando por back ************* ' + webViewRef.current)
                webViewRef.current.goBack();
                return true; 
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
        //console.log(" ****** is finsih!!!!! url " + url)
        if (url == undefined || url.toString().indexOf('www.mercadopago.com') != -1
        ||  url.toString().indexOf('.paypal.com') != -1) {
            return
        } else {
            navigation.popToTop()
        }
    }, [url])
    
    const _onMessage = (message) => {
        // you can put processing code here.
        console.log("SUPER msg -- " + JSON.stringify(message))
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
                        console.log("Puede ir hacía atras")
                        setCanGoBack(true)
                    } else {
                        console.log("no puede ir hacía atras")
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