import React, {useRef, useState} from 'react';
import {View, Dimensions, ToastAndroid} from 'react-native';
import {useTheme} from 'react-native-paper';

import {
  SceneBuilder,
  Type,
  Header,
  ThemedModal,
  PrimaryButton,
} from '../components/Shared/';

import {LoginForm, Dashboard, WebViews} from '../components/Dms';
import {DMS} from '../constants/strings';

import {mmkvDMSDetails} from '../utils/storage';
import {logoutScript} from '../constants/scripts';

const {width, height} = Dimensions.get('screen');

const DmsScene = ({navigation}) => {
  const {colors} = useTheme();
  const MainWVRef = useRef();
  const AttWVRef = useRef();
  const CaptchaWVRef = useRef();

  const [currURL, setCurrURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');

  const [devMode, setDevMode] = useState(false);

  const [data, setData] = useState({
    isLoggedIn: false,
    displayName: '',
    msg: '',
    error: '',
    user: {
      id: '',
      name: '',
      year: '',
      program: '',
      phone: '',
      email: '',
    },
    attendance: {},
  });

  const [settingsModal, setSettingsModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <>
      <ThemedModal visible={settingsModal} setVisible={setSettingsModal}>
        <Type style={{fontSize: width / 28, fontWeight: 'bold'}}>SETTINGS</Type>
        <View style={{paddingVertical: 15}}>
          {data.isLoggedIn && (
            <PrimaryButton
              onPress={() => {
                MainWVRef.current.injectJavaScript(logoutScript);
                setSettingsModal(false);
              }}>
              Logout
            </PrimaryButton>
          )}
          <PrimaryButton
            mode="outlined"
            onPress={async () => {
              const res = await mmkvDMSDetails(null, null, null, true);
              if (res.status) {
                setIsSaved(false);
                ToastAndroid.show(
                  'Cleared stored session.',
                  ToastAndroid.SHORT,
                );
              }
            }}>
            {DMS.CLEAR_SESSION_BUTTON}
          </PrimaryButton>
          <Type
            style={{
              margin: 5,
              marginBottom: 10,
              fontSize: width / 32,
              color: colors.disabled,
            }}>
            {DMS.CLEAR_SESSION}
          </Type>
        </View>
      </ThemedModal>

      <SceneBuilder>
        <Header
          heading="DMS"
          navigation={navigation}
          iconNames={['settings-sharp']}
          iconActions={[
            () => {
              setSettingsModal(true);
            },
          ]}
        />
        <View>
          {!data.isLoggedIn && (
            <LoginForm
              username={username}
              password={password}
              captcha={captcha}
              setUsername={setUsername}
              setPassword={setPassword}
              isSaved={isSaved}
              setIsSaved={setIsSaved}
              setCaptcha={setCaptcha}
              MainWVRef={MainWVRef}
              CaptchaWVRef={CaptchaWVRef}
              isLoading={isLoading}
              error={data.msg}
            />
          )}

          {data.isLoggedIn && (
            <Dashboard
              userCredentials={{
                username,
                password,
              }}
              MainWVRef={MainWVRef}
              data={data}
              isLoading={isLoading}
            />
          )}

          <WebViews
            data={data}
            setData={setData}
            devMode={devMode}
            setDevMode={setDevMode}
            MainWVRef={MainWVRef}
            CaptchaWVRef={CaptchaWVRef}
            AttWVRef={AttWVRef}
            setIsLoading={setIsLoading}
            setCurrURL={setCurrURL}
          />
        </View>
      </SceneBuilder>
    </>
  );
};

export default DmsScene;
