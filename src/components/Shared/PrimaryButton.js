import React from 'react';

import {Button} from 'react-native-paper';

import {ROUNDNESS} from '../../styles/theme';

const PrimaryButton = (props) => {
  return (
    <Button
      {...props}
      mode={props.mode}
      style={{
        marginVertical: 8,
        borderRadius: ROUNDNESS / 4,
        height: 40,
        ...props.style,
      }}
      disabled={props.loading}>
      {props.loading ? props.loadingText : props.children}
    </Button>
  );
};

// in case we need non contained props
PrimaryButton.defaultProps = {
  mode: 'contained',
};

export default PrimaryButton;
