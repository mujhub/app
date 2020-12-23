import React from 'react';

import {Button} from 'react-native-paper';

const PrimaryButton = (props) => {
  return (
    <Button {...props} mode="contained" style={{margin: 5}}>
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
