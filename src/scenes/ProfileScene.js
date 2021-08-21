import React, {useEffect, useState, useContext} from 'react';
import {View, Dimensions, ActivityIndicator, ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';

import {UserAuth} from '../contexts/UserAuth';

import {
  SceneBuilder,
  Type,
  Header,
  InputBox,
  PrimaryButton,
} from '../components/Shared';
import {PRIMARY} from '../constants/colors';

const {width, height} = Dimensions.get('screen');

const ProfileScene = ({navigation}) => {
  const {user, setUser} = useContext(UserAuth);

  const [userProfile, setUserProfile] = useState({displayName: ''});
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async () => {
    if (!userProfile.displayName) {
      ToastAndroid.show('Display Name can not be empty!', ToastAndroid.SHORT);
      return;
    }
    setIsLoading(true);
    try {
      await auth().currentUser.updateProfile({
        displayName: userProfile.displayName,
      });
      let updatedUser = await auth().currentUser;
      setUser(updatedUser);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigation.reset({index: 0, routes: [{name: 'MainScreen'}]});
    }
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUserProfile({displayName: user?.displayName});
  }, [user]);

  return (
    <SceneBuilder>
      <Header heading={'PROFILE'} navigation={navigation} />
      {user ? (
        <View>
          <View style={{marginTop: 20}} />
          <Type style={{fontSize: 30}}>
            Hi
            <Type>
              {user?.displayName
                ? ` ${user?.displayName.toString().substr(0, 15)},`
                : ' there,'}
            </Type>
          </Type>
          {/* <Type>{JSON.stringify(user)}</Type> */}
          <InputBox
            defaultValue={userProfile.displayName}
            value={userProfile.displayName}
            onChangeText={(value) => setUserProfile({displayName: `${value}`})}
            label={'Name'}
            isRequired
          />
          <InputBox
            editable={false}
            defaultValue={user.phoneNumber}
            value={user.phoneNumber}
            label={'Phone'}
            isRequired
          />
          <PrimaryButton
            loading={isLoading}
            style={{marginTop: 24}}
            onPress={handleUpdateProfile}>
            Save
          </PrimaryButton>
          <PrimaryButton
            style={{marginTop: 24}}
            mode={'outline'}
            onPress={handleSignOut}>
            Sign Out
          </PrimaryButton>
        </View>
      ) : (
        <ActivityIndicator color={PRIMARY} size={28} />
      )}
    </SceneBuilder>
  );
};

export default ProfileScene;