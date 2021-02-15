import React, {useRef} from 'react';
import {View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {PrimaryButton, InputBox, Type} from '../Shared/';

import Icon from 'react-native-vector-icons/Ionicons';

import {returnLoginScript} from '../../constants/scripts';
import * as URLS from '../../constants/urls';
import {DMS} from '../../constants/strings';

const {height, width} = Dimensions.get('screen');

const LoginForm = (props) => {
  return (
    <View style={{marginHorizontal: 10}}>
      <InputBox
        value={props.username}
        onChangeText={(value) => props.setUsername(value)}
        label={DMS.USERNAME}
      />
      <InputBox
        value={props.password}
        textContentType="password"
        secureTextEntry={true}
        onChangeText={(value) => props.setPassword(value)}
        label={DMS.PASSWORD}
      />
      <View style={{marginTop: 16}}>
        <Type>SECURITY CAPTCHA</Type>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              borderRadius: 4,
              flexGrow: 1,
              alignItems: 'center',
              backgroundColor: '#ffffff',
              marginRight: 16,
            }}>
            <View
              pointerEvents="none"
              style={{
                height: 40,
                width: width * 0.3,
              }}>
              <WebView
                ref={props.CaptchaWVRef}
                style={{
                  margin: -4,
                  width: width * 0.4,
                }}
                source={{uri: URLS.DMS_CAPTCHA}}
                injectedJavaScript={`document.getElementsByTagName('img')[0].style = "width:${
                  width * 0.5
                }px"`}
              />
            </View>
          </View>
          <PrimaryButton
            mode="outlined"
            onPress={() => {
              props.MainWVRef.current.injectJavaScript(
                `document.location.replace('${URLS.DMS_ROOT}');true;`,
              );
            }}>
            {/* {DMS.RELOAD} */}
            <Icon name="refresh" size={20} />
          </PrimaryButton>
        </View>
      </View>

      <InputBox
        style={{
          marginBottom: 16, // margin for button
        }}
        value={props.captcha}
        onChangeText={(value) => props.setCaptcha(value)}
        label={DMS.CAPTCHA}
      />

      <PrimaryButton
        onPress={() => {
          props.MainWVRef.current.injectJavaScript(
            returnLoginScript(props.username, props.password, props.captcha),
          );
        }}
        loading={props.isLoading}
        loadingText={DMS.LOADING}>
        {DMS.ACTION}
      </PrimaryButton>
    </View>
  );
};

export default LoginForm;
