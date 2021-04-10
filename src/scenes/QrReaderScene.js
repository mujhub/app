import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import logo from '../assets/images/logo128.png';

import {parseQRCode} from '../utils/misc';

import {PRIMARY, ACCENT} from '../constants/colors';
import {SCAN} from '../constants/strings';

const {width, height} = Dimensions.get('screen');

const QR_SIZE = width * 0.75;
const QR_RADIUS = 20;
const QR_BORDER = 4;
const QR_EYE_SIZE = width / 7;
const LOGO_SIZE = width * 0.18;

const QrReaderScene = ({navigation}) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const onQRCodeRead = (data) => {
    let slug = parseQRCode(data);
    if (slug) navigation.navigate('MenuScene', {slug});
  };

  return (
    <View>
      {/* CAMERA VIEW */}
      <RNCamera
        style={{width, height}}
        onBarCodeRead={onQRCodeRead}
        captureAudio={false}
        notAuthorizedView={
          <View style={{height, width, backgroundColor: 'black'}}></View>
        }
        pendingAuthorizationView={
          <View style={{height, width, backgroundColor: 'black'}}></View>
        }
      />
      {/* CAMERA VIEW ENDS */}

      {/* GRADIENTS */}
      <View
        style={{
          height,
          width,
          alignItems: 'center',
          position: 'absolute',
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['black', '#0000']}
          style={{
            position: 'absolute',
            top: 0,
            height: height / 2,
            width,
          }}
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#0000', 'black']}
          style={{
            position: 'absolute',
            bottom: 0,
            height: height / 3,
            width,
          }}
        />
        {/* GRADIENTS END */}

        {/* QR CODE */}
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            height,
            width,
            left: (width - QR_SIZE) / 2,
          }}>
          <View
            style={{
              position: 'absolute',
              left: -height / 2,
              top: -width / 3,
              borderWidth: height / 2,
              borderRadius: QR_RADIUS + height / 2,
              borderColor: '#0005',
            }}>
            <View
              style={{
                height: QR_SIZE,
                width: QR_SIZE,
              }}>
              <View
                style={{
                  height: QR_SIZE,
                  width: QR_SIZE,
                  borderWidth: QR_BORDER,
                  borderColor: ACCENT,
                  borderRadius: QR_RADIUS,
                }}>
                <Image
                  source={logo}
                  style={{
                    width: LOGO_SIZE,
                    height: LOGO_SIZE,
                    position: 'absolute',
                    top: (QR_SIZE - LOGO_SIZE) / 2 - QR_BORDER,
                    left: (QR_SIZE - LOGO_SIZE) / 2 - QR_BORDER,
                  }}
                />

                <View style={{left: 0, ...styles.eye}} />
                <View style={{right: 0, ...styles.eye}} />
                <View style={{bottom: 0, right: 0, ...styles.eye}} />
                <View style={{bottom: 0, ...styles.eye}} />
              </View>
            </View>
          </View>
        </View>
        {/* QR CODE ENDS */}

        {/* OVERLAY TEXT */}
        <View
          style={{
            height,
            width,
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'space-between',
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: width / 22,
                fontWeight: 'bold',
                marginTop: height / 6,
                color: 'white',
              }}>
              {SCAN.HEADING}
            </Text>
            <Text
              style={{
                fontSize: width / 24,
                marginTop: height / 80,
                paddingHorizontal: width / 6,
                textAlign: 'center',
                color: 'white',
              }}>
              {SCAN.QR_HEADER}
            </Text>
          </View>
          <Text
            style={{
              fontSize: width / 24,
              marginBottom: height / 7,
              paddingHorizontal: width / 6,
              textAlign: 'center',
              color: 'white',
            }}>
            {SCAN.QR_FOOTER}
          </Text>
        </View>
        <View style={{position: 'absolute', left: 10, marginTop: 30}}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.75}>
            <Icon
              name="chevron-back"
              size={24}
              style={{marginVertical: 17, marginHorizontal: 10, color: 'white'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* OVERLAY TEXT ENDS */}
    </View>
  );
};

const styles = StyleSheet.create({
  eye: {
    width: QR_EYE_SIZE,
    height: QR_EYE_SIZE,
    margin: 2 * QR_BORDER,
    backgroundColor: ACCENT + '20',
    borderRadius: QR_RADIUS - QR_BORDER * 2,
    position: 'absolute',
  },
});

export default QrReaderScene;
