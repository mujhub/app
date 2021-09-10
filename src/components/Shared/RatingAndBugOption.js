/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Dimensions, TouchableOpacity, Linking} from 'react-native';

import {useTheme} from 'react-native-paper';
import {Type} from '.';
import {SUPPORT_EMAIL, BUNDLE_IDENTIFIER} from '../../constants/info';
import {APP} from '../../constants/strings';
const {width, height} = Dimensions.get('screen');

const HelpAndFeedbackOption = () => {
  const {colors} = useTheme();
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`market://details?id=${BUNDLE_IDENTIFIER}`)
        }>
        {/* On Press - app store */}
        <View>
          <Type style={{marginTop: 10, marginBottom: 5, fontSize: width / 24}}>
            Rate App
          </Type>
          <Type
            style={{
              marginBottom: 16,
              color: colors.disabled,
              fontSize: width / 30,
            }}>
            Like using MUJ HUB? Recommend us to others by rating us on Google
            Play Store
          </Type>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            `mailto:${SUPPORT_EMAIL}?subject=${APP.SUPPORT_EMAIL.SUBJECT}&body=${APP.SUPPORT_EMAIL.BODY}`,
          )
        }>
        <View>
          <Type style={{marginBottom: 5, fontSize: width / 24}}>
            Report Bug
          </Type>
          <Type
            style={{
              marginBottom: 20,
              color: colors.disabled,
              fontSize: width / 30,
            }}>
            Tell us what happened - the more detail the better!
          </Type>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default HelpAndFeedbackOption;
