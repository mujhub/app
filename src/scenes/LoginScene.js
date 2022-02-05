import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ToastAndroid, Image, Dimensions} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';

import {UserAuth} from '../contexts/UserAuth';

import {
  InputBox,
  SceneBuilder,
  Type,
  PrimaryButton,
} from '../components/Shared';

import {validatePhone, validateOTP} from '../utils/validators';

import logo from '../assets/images/logo128.png';

const {width, height} = Dimensions.get('screen');

const LoginScene = ({navigation}) => {
  const {user} = useContext(UserAuth);
  const [phone, setPhone] = useState('');
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [otp, setOTP] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPhone('');
      setOTP('');
      setConfirm(null);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        ToastAndroid.show('Phone Number verified!', ToastAndroid.SHORT);
        navigation.navigate('MainScreen');
      }
    });
  }, []);

  const signInWithPhoneNumber = async () => {
    if (phone !== '') {
      if (validatePhone(`+91${phone}`)) {
        try {
          setPhoneLoading(true);
          const confirmation = await auth().signInWithPhoneNumber(
            `+91${phone}`,
          );
          setConfirm(confirmation);
          console.log('otp sent');
        } catch (error) {
          console.log(error);
        } finally {
          setPhoneLoading(false);
        }
      } else {
        ToastAndroid.show('Invalid phone number', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Empty phone number', ToastAndroid.SHORT);
    }
  };

  const confirmCode = async () => {
    if (otp !== '') {
      if (validateOTP(otp)) {
        try {
          setConfirmLoading(true);
          await confirm.confirm(otp);
          console.log(JSON.stringify(confirm));
          navigation.reset({index: 0, routes: [{name: 'ProfileScreen'}]});
        } catch (error) {
          console.log(error);
          console.log('Invalid code.');
        } finally {
          setConfirmLoading(false);
        }
      } else {
        ToastAndroid.show('Invalid OTP', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Empty OTP', ToastAndroid.SHORT);
    }
  };

  return (
    <SceneBuilder>
      <View
        style={{
          display: 'flex',
          minWidth: '100%',
          alignItems: 'center',
        }}>
        <Type style={{fontSize: 25, fontWeight: 'bold', marginVertical: 20}}>
          {'Welcome to MUJ HUB'.toUpperCase()}
        </Type>
        <Image
          source={logo}
          style={{height: width / 3, width: width / 3, marginVertical: 45}}
        />
      </View>

      {!confirm && (
        <>
          <InputBox
            value={phone}
            onChangeText={(value) => setPhone(value)}
            maxLength={10}
            label={'Phone Number'}
            keyboardType="phone-pad"
            isRequired={true}
          />
          <PrimaryButton onPress={signInWithPhoneNumber} loading={phoneLoading}>
            <Type>Send OTP</Type>
          </PrimaryButton>
        </>
      )}
      {confirm && (
        <>
          <InputBox
            value={otp}
            onChangeText={(value) => setOTP(value)}
            label={'OTP'}
            keyboardType="numeric"
            isRequired={true}
          />
          <PrimaryButton onPress={confirmCode} loading={confirmLoading}>
            <Type>Verify</Type>
          </PrimaryButton>
        </>
      )}
    </SceneBuilder>
  );
};

export default LoginScene;
