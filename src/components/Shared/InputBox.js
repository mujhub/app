import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, Text, Dimensions, Keyboard} from 'react-native';
import {useTheme} from 'react-native-paper';

import {ROUNDNESS} from '../../styles/theme';

const {width, height} = Dimensions.get('screen');

const InputBox = (props) => {
  const {colors} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

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
        // marginVertical: 16,
        marginTop: 25,
        ...props.viewStyle,
      }}>
      <View
        style={{
          borderRadius: ROUNDNESS / 4,
          borderWidth: 0.5,
          borderColor: !isFocused ? colors.border : colors.primary,
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
          value={value}
          ref={inputRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
          blurOnSubmit={true}
          onChangeText={(text) => handleType(text)}
        />
      </View>
      <Text
        style={{
          position: 'absolute',
          left: ROUNDNESS,
          top: !isFocused && value === '' ? 12 : -20,
          color:
            !isFocused && value === '' ? colors.placeholder : colors.helper,
          fontSize: !isFocused && value === '' ? 16 : 12,
        }}
        onPress={() => {
          inputRef.current.focus();
        }}>
        {props.label ? props.label.toUpperCase() : null}
      </Text>
    </View>
  );
};

export default InputBox;
