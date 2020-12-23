import React, {useRef, useState} from 'react';
import {ScrollView, Dimensions, View, Alert, Switch} from 'react-native';
import {WebView} from 'react-native-webview';

import {SceneBuilder, Type, PrimaryButton} from '../components/Shared/';

import {LoginForm} from '../components/Dms';

import {URLS} from '../constants/';
import Dashboard from '../components/Dms/Dashboard';

const {height, width} = Dimensions.get('screen');

const DmsScene = () => {
  const MainWVRef = useRef();
  const CaptchaWVRef = useRef();

  const [currURL, setCurrURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wvMessage, setWvMessage] = useState({});

  const [devMode, setDevMode] = useState(false);

  const [userDetails, setUserDetails] = useState({
    uid: '',
    name: '',
    year: '',
    program: '',
  });

  const logoutScript = `WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$lnkSignout", "", true, "", "", false, true));true;`;
  const loginScript = `document.getElementById('txtUserid').value = "${username}";document.getElementById('txtpassword').value = "${password}";document.getElementById('txtCaptcha').value = "${captcha}";__doPostBack('hprlnkStduent','');true;`;
  const checkStateScript = `window.ReactNativeWebView.postMessage(JSON.stringify({msg:document.getElementById('lblErrorMsg')?document.getElementById('lblErrorMsg').innerText :'' || document.getElementById('labelerror')?document.getElementById('labelerror').innerText : '', user:document.getElementById('LblName') ? document.getElementById('LblName').innerText : ''}));true;`;

  return (
    <SceneBuilder>
      <ScrollView>
        <Type>DMS</Type>

        {!isLoggedIn && (
          <LoginForm
            username={username}
            password={password}
            captcha={captcha}
            setUsername={setUsername}
            setPassword={setPassword}
            setCaptcha={setCaptcha}
            loginScript={loginScript}
            MainWVRef={MainWVRef}
            CaptchaWVRef={CaptchaWVRef}
          />
        )}
        {isLoggedIn && (
          <Dashboard
            MainWVRef={MainWVRef}
            wvMessage={wvMessage}
            logoutScript={logoutScript}
          />
        )}

        <Type>{`Loading: ${isLoading} ; LoggedIn :${isLoggedIn} ; 
        Data: ${JSON.stringify(wvMessage)}`}</Type>

        <Switch
          value={devMode}
          onValueChange={() => {
            setDevMode(!devMode);
          }}
        />

        <View style={{opacity: devMode ? 1 : 0}}>
          <PrimaryButton
            onPress={() => {
              MainWVRef.current.injectJavaScript(
                `window.location.replace("${URLS.DMS_ROOT}")`,
              );
            }}>
            Action
          </PrimaryButton>
          <WebView
            ref={MainWVRef}
            style={{marginTop: 10, height: 250, width: 375}}
            source={{uri: URLS.DMS_PROFILE}}
            onLoadEnd={() => {
              MainWVRef.current.injectJavaScript(checkStateScript);
              if (!isLoggedIn) CaptchaWVRef.current.reload();
            }}
            onNavigationStateChange={(navState) => {
              if (navState.loading) setIsLoading(true);
              else {
                setCurrURL(navState.url);
                setIsLoading(false);
              }
            }}
            onMessage={(event) => {
              let data = JSON.parse(event.nativeEvent.data);
              console.log(data);
              setWvMessage(data);
              if (data.user) {
                setIsLoggedIn(true);
              } else {
                setIsLoggedIn(false);
                if (data.msg !== '') {
                  Alert.alert(
                    'Invalid Values.',
                    'Please check the details and try again.',
                  );
                }
              }
            }}
          />
        </View>

        <View style={{height: 100}}></View>
      </ScrollView>
    </SceneBuilder>
  );
};

export default DmsScene;
