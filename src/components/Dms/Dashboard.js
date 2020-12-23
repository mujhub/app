import React from 'react';
import {PrimaryButton, Type} from '../Shared';

const Dashboard = (props) => {
  return (
    <>
      <Type>{JSON.stringify(props.wvMessage.user)}</Type>
      <PrimaryButton
        onPress={() => {
          props.MainWVRef.current.injectJavaScript(props.logoutScript);
        }}>
        Logout
      </PrimaryButton>
    </>
  );
};

export default Dashboard;
