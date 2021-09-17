import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Card, Type, ItemSeparator} from '../Shared';
import {useTheme} from 'react-native-paper';
import ItemRow from '../Menu/ItemRow';

const OrderHistoryCard = ({order}) => {
  const {colors, isDark} = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [itemNames, setItemNames] = useState('');

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    let total = 0;
    let list = '';
    order.items.forEach((item, i) => {
      total += parseInt(item.price);
      list += i + 1 < order.items.length ? `${item.name}, ` : item.name;
    });
    setOrderTotal(total);
    setItemNames(list);
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={handlePress}>
      <Card>
        <View key={order.oid}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              minWidth: '100%',
            }}>
            <Type style={{fontSize: 20}}>{order.shopName}</Type>
            <Type
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.disabled,
              }}>
              {order.status}
            </Type>
          </View>
          <Type style={{fontSize: 18, fontWeight: 'bold'}}>{order.oid}</Type>
          <Type style={{fontSize: 14, color: colors.disabled}}>
            {new Date(order.createdAt).toLocaleString()}
          </Type>
          <ItemSeparator viewStyle={{margin: 15}} />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              maxWidth: '100%',
            }}>
            {!isExpanded && (
              <>
                <Type style={{maxWidth: '75%', color: colors.disabled}}>
                  {itemNames.substr(0, 37).concat('...')}
                </Type>
                <Type style={{fontSize: 16, color: colors.disabled}}>
                  {`₹ ${orderTotal}`}
                </Type>
              </>
            )}
          </View>
          {isExpanded && (
            <View>
              {order.items.map((item, i) => (
                <ItemRow
                  viewStyle={{paddingVertical: 5, paddingHorizontal: 0}}
                  item={item}
                  i={i}
                  key={i}
                />
              ))}
            </View>
          )}
          {isExpanded && (
            <Type
              style={{
                fontSize: 14,
                color: colors.disabled,
                width: '100%',
                textAlign: 'right',
              }}>
              {'Order Total ₹ '}
              <Type
                style={{
                  color: colors.disabled,
                  fontSize: 16,
                }}>
                {orderTotal}
              </Type>
            </Type>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderHistoryCard;
