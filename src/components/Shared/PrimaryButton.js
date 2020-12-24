import React from 'react';

import {Button} from 'react-native-paper';

const PrimaryButton = (props) => {
  return (
    <Button
      {...props}
      mode="contained"
      style={{margin: 5}}
      disabled={props.loading}>
      {props.loading ? props.loadingText : props.children}
    </Button>
  );
};

export default PrimaryButton;
