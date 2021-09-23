import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Type} from '../Shared';
const {width, height} = Dimensions.get('screen');

const ViewCartButton = ({slug, data, cartTotal, navigation, cartCount}) => {
  const {colors} = useTheme();

  return (
    <View style={{position: 'absolute', bottom: 0}}>
      <View
        style={{
          width,
          height: null,
          backgroundColor: colors.elevated,
          paddingVertical: height / 45,
          paddingHorizontal: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-between',
          }}>
          <View>
            <Type style={{textAlign: 'center'}}>{cartCount}</Type>
            <Type>Items</Type>
          </View>
          <View>
            <Type style={{textAlign: 'center'}}>₹ {cartTotal}</Type>
            <Type>Total Price</Type>
          </View>
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderColor: colors.primary,
            borderWidth: 1,
            borderRadius: 4,
          }}
          onPress={() => {
            navigation.navigate('PlaceOrderScreen', {slug, data, cartTotal});
          }}>
          <Type>View Cart</Type>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewCartButton;
