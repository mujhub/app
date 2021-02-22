import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {useTheme} from 'react-native-paper';

const DialogBox = ({visible, heading, text, buttons}) => {
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
        style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onPress={() => {}}>
        <View flex={1} justifyContent="center">
          <View
            style={{
              height: null,
              width: '75%',
              borderRadius: 10,
              backgroundColor: colors.surface,
              alignSelf: 'center',
              padding: 25,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                color: colors.text,
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 10,
              }}>
              {heading}
            </Text>
            <Text style={{color: colors.text}}>{text}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              {buttons &&
                buttons.map((button) => (
                  <Text
                    key={button.text}
                    onPress={button.action}
                    style={{
                      color: colors.text,
                      fontWeight: 'bold',
                      fontSize: 16,
                      alignSelf: 'flex-end',
                      margin: 5,
                      marginTop: 15,
                      padding: 15,
                      paddingBottom: 5,
                    }}>
                    {button.text}
                  </Text>
                ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DialogBox;
