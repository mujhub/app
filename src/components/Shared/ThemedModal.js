import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {useTheme} from 'react-native-paper';

const ThemedModal = ({visible, setVisible, children}) => {
  const {colors} = useTheme();
  return (
    <Modal
      visible={visible}
      transparent={true}
      statusBarTranslucent
      animated
      animationType="fade">
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
        onPress={() => {
          setVisible(false);
        }}>
        <View flex={1} justifyContent="center">
          <View
            style={{
              height: null,
              width: '85%',
              borderRadius: 10,
              backgroundColor: colors.elevated,
              alignSelf: 'center',
              padding: 25,
              paddingBottom: 10,
            }}>
            {children}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ThemedModal;
