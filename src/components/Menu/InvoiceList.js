import React from 'react';
import {View, Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native';

import ItemRow from './ItemRow';
import {Type, InputBox, PrimaryButton} from '../Shared';

import {CART} from '../../constants/strings';

const {width, height} = Dimensions.get('screen');

const InvoiceList = ({
  cart,
  cartTotal,
  additionalInfo,
  setAdditionalInfo,
  handlePlaceOrder,
  user,
  outletInfo,
  slug,
}) => {
  return (
    <View style={{minHeight: height - 30}}>
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <ScrollView>
          <Type>{JSON.stringify(user)}</Type>
          <Type>{JSON.stringify(outletInfo)}</Type>
          <Type>{JSON.stringify(slug)}</Type>
          {cart.map((cartItem, i) => (
            <ItemRow item={cartItem} i={i} />
          ))}
          <Type>{`${CART.INVOICE.TOTAL_LABEL} ${cartTotal}`}</Type>
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
          <PrimaryButton onPress={handlePlaceOrder}>
            {CART.INVOICE.ACTION}
          </PrimaryButton>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default InvoiceList;
