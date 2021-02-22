import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';

import {ROUNDNESS} from '../../styles/theme';

const {width, height} = Dimensions.get('screen');

const BottomSheet = ({visible, setVisible, children}) => {
  const {colors} = useTheme();

  const contentRef = useRef();
  const modalRef = useRef();

  const [cardHeight, setCardHeight] = useState(0);
  const [bgShade, setBGShade] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.measure((_ox, _oy, _w, h) => {
          setCardHeight(h);
          setTimeout(() => {
            if (modalRef.current) {
              modalRef.current.scrollTo({
                y: h + 20,
                animated: true,
              });
            }
          }, 50);
        });
      }
    }, 10);
  }, []);

  const handleScroll = (event) => {
    if (event.nativeEvent.contentOffset.y <= 0) {
      setVisible(false);
    }
    setBGShade(1.5 * (event.nativeEvent.contentOffset.y / height));
  };

  const handleClosePress = () => {
    setTimeout(() => {
      modalRef.current.scrollTo({y: 0, animated: true});
    }, 1);
  };

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="fade"
      animated
      visible={visible}>
      <ScrollView
        ref={modalRef}
        onScroll={handleScroll}
        snapToOffsets={[cardHeight + 20]}
        snapToEnd={true}
        snapToStart={true}
        decelerationRate="fast">
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleClosePress}
          style={{
            backgroundColor: `rgba(0, 0, 0, ${bgShade})`,
            height: height + cardHeight,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: colors.elevated,
              width,
              borderTopStartRadius: ROUNDNESS * 1.5,
              borderTopEndRadius: ROUNDNESS * 1.5,
            }}>
            <View ref={contentRef} style={{width: '100%'}} collapsable={false}>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    width: '20%',
                    backgroundColor: colors.disabled + '55',
                    height: 5,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                />
              </View>
              <View style={{padding: 20}}>{children}</View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

export default BottomSheet;
