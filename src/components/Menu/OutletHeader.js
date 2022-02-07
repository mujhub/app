import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FOOD} from '../../constants/strings';
import {payUPI} from '../../utils/misc';
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={handleBack} activeOpacity={0.75}>
          <Icon
            name="chevron-back"
            size={24}
            style={{
              marginVertical: 17,
              marginHorizontal: 10,
              color: `rgb(${headingTint},${headingTint},${headingTint})`,
            }}
          />
        </TouchableOpacity>

        <Type
          style={{
            marginTop: 16,
            fontSize: width / 24,
            color: `rgb(${headingTint},${headingTint},${headingTint})`,
            // fontWeight: 'bold',
          }}
          viewStyle={{margin: 10}}>
          {hasScrolled ? data.title : 'Food'}
        </Type>
      </View>

      {hasScrolled && (
        <TouchableOpacity
          onPress={() => {
            payUPI({payments: outletInfo.payments, title: outletInfo.title});
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
