import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';

import {UserAuth} from '../contexts/UserAuth';

import {
  InputBox,
  SceneBuilder,
  Type,
  PrimaryButton,
} from '../components/Shared';

import {validatePhone, validateOTP} from '../utils/validators';

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

  const signInWithPhoneNumber = async () => {
    if (phone !== '') {
      if (validatePhone(phone)) {
        try {
          setPhoneLoading(true);
          const confirmation = await auth().signInWithPhoneNumber(phone);
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
      <Type style={{fontSize: 25}}>{'Welcome'.toUpperCase()}</Type>
      <InputBox
        value={phone}
        onChangeText={(value) => setPhone(value)}
        label={'Phone Number'}
        // error={errors.username}
        isRequired={true}
      />
      <PrimaryButton onPress={signInWithPhoneNumber} loading={phoneLoading}>
        <Type>Send OTP</Type>
      </PrimaryButton>

      {confirm && (
        <>
          <InputBox
            value={otp}
            onChangeText={(value) => setOTP(value)}
            label={'OTP'}
            // error={errors.username}
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
