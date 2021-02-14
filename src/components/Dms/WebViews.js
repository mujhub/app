import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {Switch} from 'react-native-paper';

import {PrimaryButton} from '../Shared';

import * as URLS from '../../constants/urls';
import {getUserScript, getAttendanceScript} from '../../constants/scripts';

const WebViews = (props) => {
  useEffect(() => {
    //   Load attendance page after successful login
    if (props.data.isLoggedIn) {
      props.AttWVRef.current.injectJavaScript(
        `document.location.replace("${URLS.DMS_ATTENDANCE}")`,
      );
    } else {
      props.setData({...props.data, attendance: {data: null}});
    }
  }, [props.data.isLoggedIn]);

  return (
    <>
      {/* <Switch
        value={props.devMode}
        onValueChange={() => {
          props.setDevMode(!props.devMode);
        }}
      /> */}

      <View style={{opacity: props.devMode ? 1 : 0}}>
        <PrimaryButton
          onPress={() => {
            props.MainWVRef.current.injectJavaScript(
              `window.location.replace("${URLS.DMS_PROFILE}")`,
            );
          }}>
          Action
        </PrimaryButton>

        {/* Main Webview which logs in the user and updates profile data*/}
        <WebView
          ref={props.MainWVRef}
          style={{marginTop: 10, height: 250, width: 375}}
          source={{uri: URLS.DMS_PROFILE}}
          onLoadEnd={() => {
            props.MainWVRef.current.injectJavaScript(getUserScript);
            if (!props.data.isLoggedIn) props.CaptchaWVRef.current.reload(); //	update captcha after reload
          }}
          //   Updates the loading state and current URL
          onNavigationStateChange={(navState) => {
            if (navState.loading) props.setIsLoading(true);
            else {
              props.setCurrURL(navState.url);
              props.setIsLoading(false);
            }
          }}
          onMessage={(event) => {
            let wvData = JSON.parse(event.nativeEvent.data);
            props.setData({...props.data, ...wvData});
          }}
        />

        {/* Webview which updates attendance data when user logs in
			(Reloading this webview before login will change the Captcha) */}
        <WebView
          ref={props.AttWVRef}
          style={{marginTop: 10, height: 550, width: 375}}
          source={{uri: ''}}
          onLoadEnd={() => {
            //   Update attendance data after successful login
            if (props.data.isLoggedIn)
              props.AttWVRef.current.injectJavaScript(getAttendanceScript);
          }}
          onMessage={(event) => {
            let wvData = JSON.parse(event.nativeEvent.data);
            props.setData({...props.data, ...wvData});
          }}
        />
      </View>
    </>
  );
};

export default WebViews;
