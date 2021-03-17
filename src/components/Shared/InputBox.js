import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, Text, Dimensions, Keyboard} from 'react-native';
import {useTheme} from 'react-native-paper';

import {ROUNDNESS} from '../../styles/theme';
import {VIBRANTS} from '../../constants/colors';

const {width, height} = Dimensions.get('screen');

const InputBox = (props) => {
  const {colors} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const [count, setCount] = useState(0);

  const inputRef = useRef();

  const handleFocus = () => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur();
  };

  const handleType = (text) => {
    setCount((count) => count + 1);
    setValue(text);
    if (props.onChangeText) props.onChangeText(text);
  };

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      inputRef.current.blur();
    });

    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <View
      style={{
        marginTop: 25,
        ...props.viewStyle,
      }}>
      <View
        style={{
          borderRadius: ROUNDNESS / 4,
          borderWidth: 0.5,
          borderColor: !props.error
            ? !isFocused
              ? colors.border
              : colors.primary
            : VIBRANTS.RED,
        }}>
        <TextInput
          {...props}
          style={{
            height: 45,
            color: colors.text,
            fontSize: width / 24,
            borderRadius: ROUNDNESS / 4,
            paddingHorizontal: ROUNDNESS / 2,
            paddingVertical: ROUNDNESS / 2,
            backgroundColor: colors.surface,
            ...props.style,
          }}
          value={
            count > 0
              ? value
              : !value && props.defaultValue
              ? props.defaultValue
              : value
          }
          ref={inputRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
          blurOnSubmit={true}
          onChangeText={(text) => handleType(text)}
        />
      </View>
      {props.error && (
        <Text style={{color: VIBRANTS.RED, marginHorizontal: 10}}>
          {props.error}
        </Text>
      )}
      <Text
        style={{
          position: 'absolute',
          left: ROUNDNESS,
          top: !isFocused && value === '' && !props.defaultValue ? 12 : -20,
          color:
            !isFocused && value === '' && !props.defaultValue
              ? colors.placeholder
              : colors.helper,
          fontSize: !isFocused && value === '' && !props.defaultValue ? 16 : 12,
        }}
        onPress={() => {
          inputRef.current.focus();
        }}>
        {props.label
          ? props.label.toUpperCase() + (props.isRequired ? ' *' : '')
          : null}
      </Text>
    </View>
  );
};

export default InputBox;
