import React, {useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';

import {SceneBuilder, Type} from '../components/Shared/';

import {LoginForm, Dashboard, WebViews} from '../components/Dms';

const DmsScene = () => {
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

  return (
    <SceneBuilder>
      <ScrollView>
        <Type>DMS</Type>

        {!data.isLoggedIn && (
          <LoginForm
            username={username}
            password={password}
            captcha={captcha}
            setUsername={setUsername}
            setPassword={setPassword}
            setCaptcha={setCaptcha}
            MainWVRef={MainWVRef}
            CaptchaWVRef={CaptchaWVRef}
            isLoading={isLoading}
          />
        )}

        {data.isLoggedIn && (
          <Dashboard MainWVRef={MainWVRef} data={data} isLoading={isLoading} />
        )}

        <Type>{`Loading: ${isLoading} ; 
Data: ${JSON.stringify(data)}`}</Type>

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

        <View style={{height: 100}}></View>
      </ScrollView>
    </SceneBuilder>
  );
};

export default DmsScene;
