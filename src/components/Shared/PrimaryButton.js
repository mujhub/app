import React from 'react';

import {Button} from 'react-native-paper';

const PrimaryButton = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

export default PrimaryButton;
