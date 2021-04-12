import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

const ViewCartButton = ({slug, data, cartTotal, navigation}) => {
  return (
    <View style={{position: 'absolute', bottom: 0}}>
      <View style={{width, height: null, backgroundColor: 'red', padding: 10}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PlaceOrderScreen', {slug, data, cartTotal});
          }}>
          <Text>{JSON.stringify(data)}</Text>
          <Text>{JSON.stringify(cartTotal)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewCartButton;
