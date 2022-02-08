import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
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
import {useTheme} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

const LoginScene = ({navigation}) => {
  const {colors} = useTheme();
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
        ToastAndroid.show(
          'Please enter a valid phone number',
          ToastAndroid.SHORT,
        );
      }
    } else {
      ToastAndroid.show('Please enter your phone number', ToastAndroid.SHORT);
    }
  };

  const confirmCode = async () => {
    if (otp !== '') {
      if (validateOTP(otp)) {
        try {
          setConfirmLoading(true);
          await confirm.confirm(otp);
          navigation.reset({index: 0, routes: [{name: 'ProfileScreen'}]});
        } catch (error) {
          console.log(error);
          console.log('Invalid code.');
        } finally {
          setConfirmLoading(false);
        }
      } else {
        ToastAndroid.show('The OTP entered is incorrect', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Please enter the OTP to continue', ToastAndroid.SHORT);
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
        <Type style={{fontSize: 25, fontWeight: 'bold', marginTop: 20}}>
          {'Welcome to MUJ HUB'.toUpperCase()}
        </Type>
        <Type
          style={{
            fontSize: 16,
            marginVertical: 10,
            marginHorizontal: 15,
            textAlign: 'center',
            color: colors.disabled,
          }}>
          {
            'Your one stop solution for everything in \n Manipal University, Jaipur'
          }
        </Type>
        <Image
          source={logo}
          style={{height: width / 3, width: width / 3, marginVertical: 45}}
        />
      </View>
      <KeyboardAvoidingView
        behavior={'position'}
        style={{paddingBottom: height / 18}}>
        <LinearGradient
          colors={['#0000', colors.background]}
          locations={[0, 0.4]}>
          <View style={{paddingHorizontal: height / 40}}>
            <Type
              style={{fontSize: 25, marginVertical: 20, fontWeight: 'bold'}}>
              {`Let's sign you in`}
            </Type>
            {!confirm && (
              <>
                <Type
                  style={{
                    fontSize: 16,
                    marginVertical: 20,
                    color: colors.disabled,
                  }}>
                  {
                    'Enter your phone number. We will send you a OTP for verification.'
                  }
                </Type>
                <InputBox
                  value={phone}
                  onChangeText={(value) => setPhone(value)}
                  maxLength={10}
                  label={'(+91) Phone Number'}
                  keyboardType="phone-pad"
                  isRequired={true}
                  viewStyle={{marginBottom: 10}}
                />
                <PrimaryButton
                  onPress={signInWithPhoneNumber}
                  loading={phoneLoading}>
                  <Type>Get OTP</Type>
                </PrimaryButton>
              </>
            )}
            {confirm && (
              <>
                <Type
                  style={{
                    fontSize: 16,
                    marginVertical: 20,
                    color: colors.disabled,
                  }}>
                  {`Enter the OTP sent on ${phone}. `}
                  <Type
                    onPress={() => {
                      setConfirm(null);
                    }}
                    style={{
                      fontSize: 16,
                      marginVertical: 20,
                      color: colors.primary,
                    }}>
                    {`Change?`}
                  </Type>
                </Type>
                <InputBox
                  value={otp}
                  onChangeText={(value) => setOTP(value)}
                  label={'OTP'}
                  keyboardType="numeric"
                  isRequired={true}
                  viewStyle={{marginBottom: 10}}
                />
                <PrimaryButton onPress={confirmCode} loading={confirmLoading}>
                  <Type>Submit</Type>
                </PrimaryButton>
              </>
            )}
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SceneBuilder>
  );
};

export default LoginScene;
