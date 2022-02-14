import React from 'react';
import {View, Dimensions, TouchableOpacity, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {useTheme} from 'react-native-paper';

import {cardBehaviorHandler} from '../../utils/SDRHandlers';

import {Type} from '../Shared';
import {logCardTap} from '../../services/analytics';

const {width, height} = Dimensions.get('screen');

const TextCard = ({card, navigation, horizontal}) => {
  const {colors} = useTheme();

  let data = {bodyText: null, headingText: null, iconName: null, ...card.data};
  let behavior = {
    // link: 'https://www.google.com',
    // navigate: {to: 'MenuScene', params: {}},
    ...card.behavior,
  };
  let appearance = {
    textColor: colors.text,
    backgroundGradient: {from: colors.elevated, to: colors.elevated},
    ...card.appearance,
  };

  const handleAction = () => {
    if (card.data)
      if (card.data.headingText) logCardTap({title: card.data.headingText});
    cardBehaviorHandler({behavior, navigation});
  };

  return (
    card.visible && (
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleAction}
        style={{marginTop: !horizontal ? height / 30 : 0}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[
            appearance.backgroundGradient.from,
            appearance.backgroundGradient.to,
          ]}
          style={{
            backgroundColor: colors.elevated,
            padding: height / 48,
            maxHeight: 'auto',
            borderRadius: 10,
          }}>
          <View
            style={{
              textAlignVertical: 'center',
              flexDirection: 'row',
              alignItems: 'baseline',
            }}>
            {data.iconName && (
              <Icon
                color={appearance.textColor}
                size={width / 18}
                name={data.iconName}
                style={{
                  margin: 5,
                  marginLeft: 0,
                }}
              />
            )}
            {data.headingText && (
              <Type
                style={{
                  fontSize: width / 24,
                  fontWeight: 'bold',
                  textAlignVertical: 'center',
                  color: appearance.textColor,
                }}>
                {data.headingText}
              </Type>
            )}
          </View>
          {data.bodyText && (
            <Type
              style={{
                fontSize: width / 28,
                paddingTop: 4,
                lineHeight: 22,
                color: appearance.textColor,
              }}>
              {data.bodyText}
            </Type>
          )}

          {Object.keys(behavior).length > 0 && (
            <View
              style={{
                position: 'absolute',
                right: 0,
                top: 5,
                padding: width / 20,
              }}>
              <Icon
                name="chevron-forward"
                size={width / 24}
                color={appearance.textColor}
              />
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    )
  );
};

export default TextCard;
