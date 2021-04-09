import React from 'react';
import {View, Dimensions, TouchableOpacity, Linking} from 'react-native';
import Share from 'react-native-share';
import {useTheme} from 'react-native-paper';

import {Type, ItemSeparator} from '.';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');

const UpdateAppOption = () => {
  const onShare = async () => {
    const sharedMessage = {
      message: 'MUJ HUB SAYS ELLO MATE',
      // url: image,
      title: 'Wow, did you see that?',
    };
    try {
      const result = await Share.open(sharedMessage);
    } catch (error) {
      console.error(error.message);
    }
  };

  const {colors} = useTheme();
  return (
    <>
      <ItemSeparator widthPercentage="100%" />
      <Type
        style={{
          marginTop: 20,
          marginBottom: 5,
          fontSize: width / 30,
          color: colors.disabled,
        }}>
        MUJ HUB v1 (Beta)
      </Type>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <TouchableOpacity
          onPress={() => Linking.openURL('market://details?id=com.whatsapp')}>
          <Type
            style={{
              color: colors.primary,
              fontSize: width / 30,
            }}>
            Check for updates
          </Type>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              name="share-social-outline"
              size={20}
              style={{
                textAlign: 'right',
                // marginRight: 2,
                color: colors.primary,
              }}
            />
            <Type style={{color: colors.primary, fontSize: width / 30}}>
              {' '}
              Share
            </Type>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UpdateAppOption;
