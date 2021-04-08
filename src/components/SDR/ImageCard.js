import React, {useState, useEffect} from 'react';
import {View, Dimensions, TouchableOpacity, Linking, Image} from 'react-native';

import {useTheme} from 'react-native-paper';

import {Type} from '../Shared';

import {cardBehaviorHandler} from '../../utils/SDRHandlers';

const {width, height} = Dimensions.get('screen');

const ImageCard = ({card, navigation, horizontal}) => {
  const {colors} = useTheme();

  const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});

  let data = {imageSource: null, ...card.data};
  let behavior = {
    // link: 'https://www.google.com',
    // navigate: {to: 'MenuScene', params: {}},
    ...card.behavior,
  };

  useEffect(() => {
    Image.getSize(
      data.imageSource,
      (width, height) => {
        setImageDimensions({width, height});
      },
      (err) => {
        setImageDimensions({width: 0, height: 0});
      },
    );
  }, []);

  const handleAction = () => {
    cardBehaviorHandler({behavior, navigation});
  };

  return (
    card.visible && (
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleAction}
        style={{marginTop: !horizontal ? height / 30 : 0}}>
        <View
          style={{
            backgroundColor: colors.elevated,
            overflow: 'hidden',
            borderRadius: 10,
          }}>
          <Image
            source={{uri: data.imageSource}}
            style={{height: imageDimensions.height}}
            resizeMode={'cover'}
          />
        </View>
      </TouchableOpacity>
    )
  );
};

export default ImageCard;
