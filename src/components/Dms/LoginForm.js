import React, {useRef, useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {PrimaryButton, InputBox, Type} from '../Shared/';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';

import {returnLoginScript} from '../../constants/scripts';
import * as URLS from '../../constants/urls';
import {DMS} from '../../constants/strings';
import {VIBRANTS} from '../../constants/colors';
import MMKVStorage from 'react-native-mmkv-storage';
import {mmkvDMSDetails} from '../../utils/storage';
import InfoCard from './InfoCard';

const MMKV = new MMKVStorage.Loader().withEncryption().initialize();

const {height, width} = Dimensions.get('screen');

const LoginForm = (props) => {
  const {colors} = useTheme();

  const [localUsername, setLocalUsername] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [localName, setLocalName] = useState('');

  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    if (!props.username) {
      setErrors({username: DMS.NULL_USERNAME});
      return;
    }
    if (!props.password) {
      setErrors({password: DMS.NULL_PASSWORD});
      return;
    }
    if (!props.captcha) {
      setErrors({captcha: DMS.NULL_CAPTCHA});
      return;
    }
    props.MainWVRef.current.injectJavaScript(
      returnLoginScript(props.username, props.password, props.captcha),
    );
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [errors]);

  useEffect(() => {
    const getCredentials = async () => {
      const res = await mmkvDMSDetails();
      console.log('res', res);
      if (res.username) {
        setLocalUsername(res.username);
        setLocalPassword(res.password);
        setLocalName(res.name);
        props.setIsSaved(true);
        //As the user doesn't type credentials, so onChange event is not triggered
        props.setUsername(res.username);
        props.setPassword(res.password);
      }
    };

    getCredentials();
  }, []);

  return (
    <View>
      {props.isSaved && <InfoCard name={localName} id={localUsername} />}

      {!props.isSaved && (
        <>
          <InputBox
            defaultValue={localUsername}
            value={props.username}
            onChangeText={(value) => props.setUsername(value)}
            label={DMS.USERNAME}
            error={errors.username}
            isRequired={true}
          />
          <InputBox
            defaultValue={localPassword}
            value={props.password}
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(value) => props.setPassword(value)}
            label={DMS.PASSWORD}
            error={errors.password}
            isRequired={true}
          />
        </>
      )}
      <View style={{marginTop: 16}}>
        <Type style={{color: colors.disabled}}>SECURITY CAPTCHA</Type>
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
                height: width * 0.1,
                width: width * 0.3,
              }}>
              <WebView
                ref={props.CaptchaWVRef}
                style={{margin: -4}}
                source={{uri: !props.isLoading ? URLS.DMS_CAPTCHA : null}}
                injectedJavaScript={`document.getElementsByTagName('img')[0].style = "width:${
                  width * 0.3 + 8
                }px; height:${width * 0.1 + 8}px;true;"`}
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
            <Icon name="refresh" size={width / 20} />
          </PrimaryButton>
        </View>
      </View>

      <InputBox
        value={props.captcha}
        onChangeText={(value) => props.setCaptcha(value)}
        label={DMS.CAPTCHA}
        autoCapitalize="none"
        error={errors.captcha}
        isRequired={true}
        viewStyle={{marginTop: 20}}
      />

      {props.error ? (
        <Type
          style={{
            marginTop: 32,
            margin: 2,
            color: VIBRANTS.RED + '99',
            fontSize: width / 28,
            alignSelf: 'center',
          }}>
          {props.error}
        </Type>
      ) : null}

      <PrimaryButton
        style={{marginTop: 20}}
        onPress={handleSubmit}
        loading={props.isLoading}
        loadingText={DMS.LOADING}>
        {DMS.ACTION}
      </PrimaryButton>

      <View style={{flexDirection: 'row', width: '90%', marginVertical: 10}}>
        <Icon
          size={width / 24}
          style={{margin: 10}}
          name={'information-circle'}
          color={colors.disabled}
        />
        <Type style={{color: colors.disabled, fontSize: width / 28}}>
          {DMS.LOGIN_FOOTER}
        </Type>
      </View>
    </View>
  );
};

export default LoginForm;
