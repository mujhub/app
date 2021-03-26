import React from 'react';
import {View, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {parseQRCode} from '../utils/misc';

const {width, height} = Dimensions.get('screen');

const QrReaderScene = ({navigation}) => {
  const onQRCodeRead = (data) => {
    let slug = parseQRCode(data);
    if (slug) navigation.navigate('MenuScene', {slug});
  };
  return (
    <View>
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
    </View>
  );
};

export default QrReaderScene;
