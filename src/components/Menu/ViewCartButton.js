import React from 'react';
import {View, Text, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
const ViewCartButton = ({data}) => {
  return (
    <View style={{position: 'absolute', bottom: 0}}>
      <View style={{width, height: null, backgroundColor: 'red'}}>
        <Text>{JSON.stringify(data)}</Text>
      </View>
    </View>
  );
};

export default ViewCartButton;
