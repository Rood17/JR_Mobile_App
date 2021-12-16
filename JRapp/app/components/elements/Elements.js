import React from 'react';
import { Image, Dimensions, TouchableWithoutFeedback, View, StyleSheet, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as styleConst from '../../res/values/styles/StylesConstants'
import { Icon, Input } from 'react-native-elements'
import IntentBtn from '../elements/IntentBtn'

let colorMain = styleConst.MAINCOLORS[0];

// Line
const Line = ({ color }) => {

    if (color != null)
        colorMain = color;

    console.log('fdfdf : ' + colorMain)
    return (
        <>
            <View style={{
                padding: .2,
                backgroundColor: colorMain,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center'
            }}></View>
        </>
    );
}
export default Line;
// END Line

// Card
export const Card = ({ header, text, icon, actionBtnTxt }) => {
    return (

        <View style={stylesCard.boxShadow}>
            <View style={stylesCard.infoContainer}>
                <View style={stylesCard.iconContainer}>
                    <Icon
                        name={icon}
                        type='font-awesome'
                        color={styleConst.MAINCOLORSLIGHT[1]}
                    />
                </View>
                <View style={stylesCard.headContainer}>
                    <Text style={stylesCard.cardHeadTxt}>{header}</Text>
                    <Text>{text}</Text>
                </View>
            </View>
            {actionBtnTxt ?
                <View style={stylesCard.btnContainer}>
                    <IntentBtn
                        btnText={actionBtnTxt}
                    />
                </View>

                :
                null}
        </View>

    );
}
const stylesCard = StyleSheet.create({
    container: {
        flex: 1,

    },
    iconContainer: {
        padding: 15
    },
    headContainer: {
        padding: 15
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnContainer: {
        flexDirection: 'column',
        margin: 15
    },
    cardHeadTxt: {
        color: styleConst.MAINCOLORSLIGHT[1],
        fontWeight: 'bold'
    },
    boxShadow: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        flexDirection: 'column'
    }
});
// END Card

// MainCard
export const MainCard = ({ title, subtitle, subtitleColor, bodyHeadOne,
    bodyHeadTwo, dataOne, dataTwo, MBC, text, showDetalles }) => {
    return (

        <View style={stylesMainCard.boxShadow}>
            {title ?
                <View style={stylesMainCard.headContainer}>
                    <Text style={stylesMainCard.cardTitleTxt}>{title}</Text>
                    <Text style={{ color: subtitleColor }}>{subtitle}</Text>
                </View>
                : null}
            {text ?
                <View style={stylesMainCard.bodyTitle}>
                    <Text style={{ color: styleConst.MAINCOLORS[3] }}>{text}</Text>
                </View>
                : null}
            <View style={stylesMainCard.bodyContainer}>

                <View style={stylesMainCard.datosContainer}>
                    <Text style={stylesMainCard.cardHeadTxt}>{bodyHeadOne}</Text>
                    <Text >{dataOne}</Text>
                </View>
                <View style={stylesMainCard.verticalLine}></View>
                <View style={stylesMainCard.datosContainer}>
                    <Text style={stylesMainCard.cardHeadTxt}>{bodyHeadTwo}</Text>
                    <Text style={stylesMainCard.mbText}>{dataTwo}</Text>
                </View>
            </View>
            {MBC ?
                <View style={{
                    alignItems: 'center', margin: 5
                }}>
                    <Image
                        style={{}}
                        source={require('../../res/drawable/utils/mbcimetro.png')}
                    />
                </View>
                : null}

            {showDetalles ?
                <View style={stylesMainCard.detalles}>
                    <TouchableOpacity onPress={() => alert('holaa')}>
                        <Text style={{ color: styleConst.MAINCOLORSLIGHT[1] }}>Ver más detalles</Text>
                    </TouchableOpacity>
                </View>
                : null}


        </View>

    );
}
const stylesMainCard = StyleSheet.create({
    container: {
        flex: 1,
    },
    headContainer: {
        padding: 5,
        flexDirection: 'column',
        borderBottomWidth: 0,
        //borderBottomColor: styleConst.MAINCOLORSLIGHT[2],
        margin: 25,
        flex: 1,
        alignItems: 'center'
    },
    bodyContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    datosContainer: {
        padding: 5,
        flexDirection: 'column',
        borderBottomWidth: 0,
        //borderBottomColor: styleConst.MAINCOLORSLIGHT[1],
        margin: 20,
        flex: 1,
        alignItems: 'center'
    },
    bodyTitle: {
        marginLeft: 20,
    },
    verticalLine: {
        marginTop: 20,
        borderLeftWidth: 1,
        borderLeftColor: styleConst.MAINCOLORSLIGHT[2],
        height: 50
    },
    cardTitleTxt: {
        color: styleConst.MAINCOLORSLIGHT[1],
        fontSize: 25
    },
    cardHeadTxt: {
        color: styleConst.MAINCOLORS[3],
        fontWeight: 'bold'
    },
    mbText: {
        color: styleConst.MAINCOLORS[0],
    },
    boxShadow: {
        marginTop: 0,
        marginLeft: styleConst.CARD_MARGIN,
        marginRight: styleConst.CARD_MARGIN,
        marginBottom: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        alignItems: 'center'
    },
    detalles: {
        marginBottom: 15,

    },
});
// END MainCard

// Card
export const SocialMainCard = ({ header, text, icon }) => {
    return (

        <View style={SocialSimpleCard.boxShadow}>

            <View style={SocialSimpleCard.iconContainer}>
                <Text style={SocialSimpleCard.cardHeadTxt}>Redes ilimitadas</Text>
                <Icon
                    name='whatsapp'
                    type='font-awesome'
                    color={styleConst.MAINCOLORS[0]}
                />
                <Icon
                    name='facebook'
                    type='font-awesome'
                    color={styleConst.FACEBOOK_COLOR}
                />
                <Icon
                    name='twitter'
                    type='font-awesome'
                    color={styleConst.TWITTER_COLOR}
                />
                <Icon
                    name='instagram'
                    type='font-awesome'
                    color={styleConst.INSTA_COLOR}
                />
            </View>
        </View>

    );
}
const SocialSimpleCard = StyleSheet.create({
    container: {
        flex: 1,

    },
    iconContainer: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    headContainer: {
        padding: 15
    },

    cardHeadTxt: {
        color: styleConst.MAINCOLORS[3],
        fontWeight: 'bold',
        margin: 10
    },
    boxShadow: {
        marginTop: 0,
        marginLeft: styleConst.CARD_MARGIN,
        marginRight: styleConst.CARD_MARGIN,
        marginBottom: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        flexDirection: 'column'
    }
});
// END Card

// Retorn Header
export const ReturnHeader = ({ title }) => {

    const onPress = () => {
        alert("Go to Back")
    }

    return (
        <>
            <TouchableOpacity style={stylesReturn.container} onPress={onPress}>
                <View style={stylesReturn.returnElement}>
                    <Icon
                        name='arrow-left'
                        type='font-awesome'
                        color={styleConst.MAINCOLORS[0]}
                    />
                </View>
                <View style={stylesReturn.returnElement}>
                    <Text style={stylesReturn.returnHeadTxt}>{title}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
}
const stylesReturn = StyleSheet.create({
    container: {
        height: 75,
        backgroundColor: styleConst.MAINCOLORSLIGHT[0],
        flexDirection: 'row',
        alignItems: 'center'
    },
    returnHeadTxt: {
        color: styleConst.MAINCOLORS[0],
        fontWeight: 'bold',
        fontSize: 18

    },
    returnElement: {
        margin: 20
    }
});
// END Return Header


// User Image
export const UserImg = ({ backColor, colorTxt, small, medium, large }) => {
    let size = 0.09
    let txtSize = 20

    if (small) { size = 0.09; txtSize = 20 }
    if (medium) { size = 0.20; txtSize = 40 }
    if (large) { size = 0.50; txtSize = 40 }


    return (
        <>
            <TouchableHighlight
                style={{
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width * size,
                    height: Dimensions.get('window').width * size,
                    backgroundColor: backColor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                underlayColor='#ccc'
                onPress={() => alert('Yaay!')}
            >
                <Text style={colorTxt ? { color: colorTxt, fontSize: txtSize } : styleHeadMain.textAvatar}> R </Text>

            </TouchableHighlight>
        </>
    );
}
// MainHeader
export const MainHeader = ({ name }) => {

    const onPress = () => {
        //  console.log("goToAyuda")
    }

    return (
        <>
            <View style={styleHeadMain.container} onPress={onPress}>
                <View style={styleHeadMain.iconContainer}>
                    <Icon
                        name='user'
                        type='font-awesome'
                        color='white'
                    />
                </View>
                <View style={styleHeadMain.nameContainer}>
                    <Text style={styleHeadMain.returnHeadTxt}>{name}</Text>
                </View>
                <View style={styleHeadMain.avatarContainer}>
                    <TouchableHighlight
                        style={{
                            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                            width: Dimensions.get('window').width * 0.09,
                            height: Dimensions.get('window').width * 0.09,
                            backgroundColor: styleConst.MAINCOLORSLIGHT[0],
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        underlayColor='#ccc'
                        onPress={() => alert('Yaay!')}
                    >
                        <Text style={styleHeadMain.textAvatar}> R </Text>

                    </TouchableHighlight>
                </View>
            </View>
        </>
    );
}
const styleHeadMain = StyleSheet.create({
    container: {
        height: 65,
        backgroundColor: styleConst.MAINCOLORS[0],
        flexDirection: 'row',
        alignItems: 'center'
    },
    returnHeadTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18

    },
    iconContainer: {
        marginLeft: 20,
        flex: 0
    },
    nameContainer: {
        margin: 10,
        flex: 4
    },
    avatarContainer: {
        flex: 1
    },
    textAvatar: {
        color: styleConst.MAINCOLORSLIGHT[1],
        fontSize: 20
    }
});
// END MainHeader

// MainFooter
export const MainFooter = ({ name }) => {

    const onPress = () => {
        //  console.log("goToAyuda")
    }

    return (
        <>
            <View style={styleFooterMain.container} onPress={onPress}>
                <TouchableOpacity style={styleFooterMain.iconContainer}>
                    <Icon
                        name='home'
                        type='font-awesome'
                        color={styleConst.MAINCOLORSLIGHT[1]}
                        onPress={() => alert('ok..')}
                    />
                    <Text style={{ color: styleConst.MAINCOLORSLIGHT[1] }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleFooterMain.iconContainer}>
                    <Icon
                        name='mobile'
                        type='font-awesome'
                        color={styleConst.MAINCOLORSLIGHT[2]}
                        onPress={() => alert('ok..')}
                    />
                    <Text style={{ color: styleConst.MAINCOLORSLIGHT[2] }}>Recarga</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleFooterMain.iconContainer}>
                    <Icon
                        name='file'
                        type='font-awesome'
                        color={styleConst.MAINCOLORSLIGHT[2]}
                        onPress={() => alert('ok..')}
                    />
                    <Text style={{ color: styleConst.MAINCOLORSLIGHT[2] }}>Saldo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleFooterMain.iconContainer}>
                    <Icon
                        name='question'
                        type='font-awesome'
                        color={styleConst.MAINCOLORSLIGHT[2]}
                        onPress={() => alert('ok..')}
                    />
                    <Text style={{ color: styleConst.MAINCOLORSLIGHT[2] }}>Ayuda</Text>
                </TouchableOpacity>

            </View>
        </>
    );
}
const styleFooterMain = StyleSheet.create({
    container: {
        height: 65,
        backgroundColor: styleConst.MAINCOLORSLIGHT[0],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    returnHeadTxt: {
        color: styleConst.MAINCOLORSLIGHT[0],
        fontWeight: 'bold',
        fontSize: 18

    },
    iconContainer: {
        flex: 0,

    },
});
// END MainFooter


// CIRCLE
export const LetterCircle = ({insightData, color}) => {
    let letterColor;
    if ( color === 1 ){
        color = styleConst.MAINCOLORSLIGHT[3]
        letterColor = 'white'
    } else {
        color = styleConst.MAINCOLORSLIGHT[0]
        letterColor = styleConst.MAINCOLORSLIGHT[1]
    }
    return (
        <>
            <TouchableHighlight
                style={{
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width * 0.09,
                    height: Dimensions.get('window').width * 0.09,
                    backgroundColor: color,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                underlayColor='#ccc'
                onPress={() => alert('Yaay!')}
            >
                <Text style={stylesCircle.textAvatar, {color:letterColor}}> {insightData} </Text>

            </TouchableHighlight>
        </>
    );
}

const stylesCircle = StyleSheet.create({
    circle: { height: 30, width: 30, borderRadius: 30, },
    textAvatar: {
        fontSize: 20
    }
});