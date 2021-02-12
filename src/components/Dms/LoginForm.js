import React, {useRef} from 'react';
import {View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

import {PrimaryButton, InputBox} from '../Shared/';

import {returnLoginScript} from '../../constants/scripts';
import * as URLS from '../../constants/urls';

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
        textContentType="password"
        secureTextEntry={true}
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
          props.MainWVRef.current.injectJavaScript(
            returnLoginScript(props.username, props.password, props.captcha),
          );
        }}
        loading={props.isLoading}
        loadingText={'Loading'}>
        Login
      </PrimaryButton>
    </>
  );
};

export default LoginForm;
