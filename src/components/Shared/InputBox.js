import React from 'react';

import {TextInput, useTheme} from 'react-native-paper';

const InputBox = (props) => {
  const {colors} = useTheme();
  return (
    <TextInput
      theme={{colors}}
      {...props}
      mode="outlined"
      style={{marginVertical: 5}}>
      {props.children}
    </TextInput>
  );
};

export default InputBox;
