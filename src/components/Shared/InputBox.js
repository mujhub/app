import React from 'react';

import {TextInput, useTheme} from 'react-native-paper';

const InputBox = (props) => {
  const {colors} = useTheme();
  return (
    <TextInput theme={{colors}} {...props}>
      {props.children}
    </TextInput>
  );
};

export default InputBox;
