import React from 'react';
import {PrimaryButton, Type} from '../Shared';
import {SCRIPTS} from '../../constants/';

const Dashboard = (props) => {
  return (
    <>
      <Type>{JSON.stringify(props.data)}</Type>

      <PrimaryButton
        onPress={() => {
          props.MainWVRef.current.injectJavaScript(SCRIPTS.logoutScript);
        }}>
        Logout
      </PrimaryButton>
    </>
  );
};

export default Dashboard;
