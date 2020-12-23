import React, {useRef} from 'react';
import {View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

import {PrimaryButton, InputBox} from '../Shared/';

import {URLS} from '../../constants/';

const {height, width} = Dimensions.get('screen');

const LoginForm = (props) => {
  return (
    <>
      <InputBox
        style={{borderRadius: 15, margin: 5}}
        value={props.username}
        onChangeText={(value) => props.setUsername(value)}
        placeholder={'Enter Registration Number'}
      />
      <InputBox
        value={props.password}
        onChangeText={(value) => props.setPassword(value)}
        placeholder={'Enter Password'}
      />

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View pointerEvents="none">
          <WebView
            ref={props.CaptchaWVRef}
            style={{
              height: width * 0.15,
              width: width * 0.5,
            }}
            source={{uri: URLS.DMS_CAPTCHA}}
            injectedJavaScript={`document.getElementsByTagName('img')[0].style = "width:${
              width * 0.5
            }px"`}
          />
        </View>
        <PrimaryButton
          onPress={() => {
            props.MainWVRef.current.injectJavaScript(
              `document.location.replace('${URLS.DMS_ROOT}');true;`,
            );
          }}>
          Refresh
        </PrimaryButton>
      </View>

      <InputBox
        value={props.captcha}
        onChangeText={(value) => props.setCaptcha(value)}
        placeholder={'Enter Captcha'}
      />

      <PrimaryButton
        onPress={() => {
          props.MainWVRef.current.injectJavaScript(props.loginScript);
        }}>
        Login
      </PrimaryButton>
    </>
  );
};

export default LoginForm;
