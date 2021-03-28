import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Type} from '../Shared';

const {width, height} = Dimensions.get('screen');

const OutletHeader = ({
  headerColor,
  handleBack,
  headingTint,
  hasScrolled,
  outletInfo,
}) => {
  const data = {
    title: '',
    ...outletInfo,
  };
  return (
    <View
      style={{
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={handleBack} activeOpacity={0.75}>
          <Icon
            name="chevron-back"
            size={28}
            style={{
              margin: 10,
              color: `rgb(${headingTint},${headingTint},${headingTint})`,
            }}
          />
        </TouchableOpacity>

        <Type
          style={{
            margin: 10,
            fontSize: width / 20,
            color: `rgb(${headingTint},${headingTint},${headingTint})`,
            fontWeight: 'bold',
          }}
          viewStyle={{margin: 10}}>
          {hasScrolled ? data.title : 'Welcome to'}
        </Type>
      </View>

      {hasScrolled && (
        <TouchableOpacity
          onPress={() => {
            Linking.canOpenURL('upi://pay').then((can) => {
              if (can) {
                Linking.openURL(
                  'upi://pay?pa=dustspeck@kotak&pn=Vaibhav Garg&tn=Via MUJ HUB&cu=INR',
                );
              }
            });
          }}
          activeOpacity={0.75}>
          <Icon
            name="wallet-outline"
            size={25}
            style={{
              margin: 10,
              marginHorizontal: 20,
              color: `rgb(${headingTint},${headingTint},${headingTint})`,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OutletHeader;
