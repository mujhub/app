import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ROUNDNESS} from '../../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {Type, ItemSeparator} from '../Shared';

const OrderHeaderCard = ({outletInfo, user}) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.elevated,
        padding: 14,
        paddingLeft: 8,
        borderRadius: ROUNDNESS,
        marginBottom: 15,
      }}>
      <View
        style={{
          marginVertical: 5,
          marginHorizontal: 8,
          display: 'flex',
          flexDirection: 'row',
        }}>
        {/* <Type
              style={{fontSize: 16, color: colors.disabled, marginVertical: 5}}>
              {'TO'}
            </Type> */}

        <Icon
          name="arrow-undo-outline"
          size={18}
          style={{
            margin: 3,
            marginRight: 8,
            color: colors.disabled,
          }}
        />
        <View>
          <Type
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>{`${outletInfo.title}`}</Type>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Icon
              name="location-outline"
              size={14}
              style={{margin: 3, color: colors.disabled}}
            />
            <Type
              style={{
                fontSize: 14,
                marginRight: 14,
                color: colors.disabled,
              }}>{`${outletInfo.location}`}</Type>
            <Icon
              name="time-outline"
              size={14}
              style={{margin: 3, color: colors.disabled}}
            />
            <Type
              style={{
                fontSize: 14,
                color: colors.disabled,
              }}>{`${outletInfo.opens_at} - ${outletInfo.closes_at}`}</Type>
          </View>
        </View>
      </View>

      <View style={{margin: 10}}>
        <ItemSeparator opacityHex="88" widthPercentage="100%" />
      </View>

      <View
        style={{
          marginVertical: 5,
          marginHorizontal: 8,
          display: 'flex',
          flexDirection: 'row',
        }}>
        {/* <Type
              style={{fontSize: 16, color: colors.disabled, marginVertical: 5}}>
              {'FROM'}
            </Type> */}

        <Icon
          name="arrow-redo-outline"
          size={18}
          style={{
            margin: 3,
            marginRight: 8,
            color: colors.disabled,
          }}
        />

        <View>
          <Type
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              maxWidth: '60%',
            }}>
            {`${user.displayName}`.substr(0, 20)}
          </Type>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Icon
              name="call-outline"
              size={14}
              style={{margin: 3, color: colors.disabled}}
            />
            <Type
              style={{
                fontSize: 16,
                color: colors.disabled,
                marginRight: 14,
              }}>
              {`${user.phoneNumber}`.replace('+91', '')}
            </Type>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderHeaderCard;
