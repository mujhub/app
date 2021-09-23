import React from 'react';
import {
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from 'react-native';

import ItemRow from './ItemRow';
import {Type, InputBox, PrimaryButton, ItemSeparator, Card} from '../Shared';

import {CART} from '../../constants/strings';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {ROUNDNESS} from '../../styles/theme';
import {mmkvDefaultBlock} from '../../utils/storage';
import OrderHeaderCard from '../Order/OrderHeaderCard';

const {width, height} = Dimensions.get('screen');

const InvoiceList = ({
  cart,
  cartTotal,
  additionalInfo,
  setAdditionalInfo,
  handlePlaceOrder,
  placingOrder,
  user,
  outletInfo,
  slug,
}) => {
  const {colors} = useTheme();
  return (
    <View
      style={{minHeight: height - StatusBar.currentHeight - 50, marginTop: 20}}>
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <OrderHeaderCard outletInfo={outletInfo} user={user} />
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor: colors.background}}>
            <Type
              style={{
                marginBottom: 5,
                fontSize: width / 28,
                color: colors.disabled,
              }}>
              ORDER ITEMS
            </Type>
          </View>
          <Card>
            <View>
              {cart.map((cartItem, i) => (
                <ItemRow
                  viewStyle={{paddingVertical: 5, paddingHorizontal: 0}}
                  item={cartItem}
                  i={i}
                  key={i}
                />
              ))}
            </View>
          </Card>
        </ScrollView>
        <View style={{minHeight: 200}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <InputBox
              viewStyle={{width: '50%'}}
              defaultValue={additionalInfo}
              value={additionalInfo}
              onChangeText={(value) => setAdditionalInfo(value)}
              label={CART.INVOICE.ADDITIONAL}
              isRequired={true}
            />

            <Type
              style={{
                fontSize: 16,
                flex: 1,
                padding: 10,
                textAlign: 'right',
                textAlignVertical: 'bottom',
              }}>
              {`${CART.INVOICE.PAYABLE_LABEL}  ₹ ${cartTotal}`}
            </Type>
          </View>
          <PrimaryButton
            onPress={handlePlaceOrder}
            loading={placingOrder}
            loadingText="Please Wait...">
            {CART.INVOICE.ACTION}
          </PrimaryButton>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default InvoiceList;
