import React from 'react';
import {View, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';

import {Type, FoodType} from '../Shared';
import CounterBtn from './CounterButton';

const {width, height} = Dimensions.get('screen');

const MenuItem = ({item, i, addItem, subtractItem, showCounter, isOnline}) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        backgroundColor: i % 2 ? colors.disabled + '25' : null,
        paddingVertical: 5,
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 2,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: !showCounter ? 'space-between' : null,
            maxWidth: width * 0.6,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FoodType type={item.type} />
            <Type
              style={{
                fontSize: width / 25,
                margin: 2,
                flexShrink: 1,
                minWidth: isOnline && showCounter ? 0 : width * 0.5,
              }}>
              {item.name}
            </Type>
            {showCounter && (
              <Type
                style={{
                  fontSize: width / 25,
                  margin: 2,
                }}>
                {' - '}
              </Type>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Type
              style={{
                fontSize: width / 30,
                margin: 2,
                color: colors.disabled,
              }}>
              ₹
            </Type>
            <Type style={{fontSize: width / 30, margin: 2}}>
              {typeof item.price === 'object'
                ? item.price.map((p, i) =>
                    i < item.price.length - 1 ? p + ' / ' : p,
                  )
                : item.price}
            </Type>
          </View>
        </View>

        {showCounter && isOnline && (
          <View
            style={{
              height: '100%',
              minHeight: 40,
              width: '25%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <CounterBtn
              onAdd={addItem}
              onSubtract={subtractItem}
              id={item.id}
              price={item.price}
              max={5}
            />
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          maxWidth: width,
          justifyContent: 'flex-end',
        }}>
        {`${item.description}`.length > 0 ? (
          <View style={{marginBottom: 10, width: '100%'}}>
            <Type
              style={{
                fontSize: width / 35,
                lineHeight: 20,
                marginTop: 5,
                paddingRight: 10,
                marginLeft: width / 28 + 12,
              }}>
              {item.description ? item.description : ''}
            </Type>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default MenuItem;
