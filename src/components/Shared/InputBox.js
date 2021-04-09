import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, Text, Dimensions, Keyboard} from 'react-native';
import {useTheme} from 'react-native-paper';

import {ROUNDNESS} from '../../styles/theme';
import {VIBRANTS} from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

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
        marginTop: 28,
        ...props.viewStyle,
      }}>
      <View
        style={{
          borderRadius: ROUNDNESS / 4,
          borderWidth: 1,
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
            paddingHorizontal: ROUNDNESS,
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
      {props.error && <Text style={{color: VIBRANTS.RED}}>{props.error}</Text>}
      <Text
        style={{
          position: 'absolute',
          transform: !props.error ? [{translateY: -10}] : [{translateY: -20}],
          // left: ROUNDNESS,
          left:
            !isFocused && value === '' && !props.defaultValue ? ROUNDNESS : 0,
          top: !isFocused && value === '' && !props.defaultValue ? '50%' : -10,
          color:
            !isFocused && value === '' && !props.defaultValue
              ? colors.placeholder
              : colors.helper,
          fontSize:
            !isFocused && value === '' && !props.defaultValue ? width / 30 : 12,
        }}
        onPress={() => {
          inputRef.current.focus();
        }}>
        {props.label
          ? props.label.toUpperCase() + (props.isRequired ? ' *' : '')
          : null}
      </Text>
      {props.cancellable && (
        <Text
          onPress={props.onCancel}
          style={{
            position: 'absolute',
            right: ROUNDNESS,
            top: 11,
            color: colors.helper,
            fontSize: 16,
            paddingLeft: 10,
            // backgroundColor: 'red',
          }}>
          <Icon name="close-circle" size={22} />
        </Text>
      )}
    </View>
  );
};

export default InputBox;
