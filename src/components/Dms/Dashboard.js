import React from 'react';
import {PrimaryButton, Type} from '../Shared';
import {logoutScript} from '../../constants/scripts';

const Dashboard = (props) => {
  return (
    <>
      <Type>{JSON.stringify(props.data)}</Type>

      <PrimaryButton
        onPress={() => {
          props.MainWVRef.current.injectJavaScript(logoutScript);
        }}>
        Logout
      </PrimaryButton>
    </>
  );
};

export default Dashboard;
