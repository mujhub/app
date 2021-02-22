import React, {useState, useRef, useEffect} from 'react';
import {FlatList, Dimensions, Text, View, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {PrimaryButton, Type, DataTable, Card} from '../Shared';
import InfoCard from './InfoCard';
import CollapsedInfoCard from './CollapsedInfoCard';

import {logoutScript} from '../../constants/scripts';
import {DMS, ATTENDANCE} from '../../constants/strings';

const {width, height} = Dimensions.get('screen');

const Dashboard = (props) => {
  const {colors} = useTheme();

  const displayIndices = [1, 6, 8, 9];
  const displayWidths = [45, 15, 15, 25];

  const [cardHasScrolled, setCardHasScrolled] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  const handleScroll = (event) => {
    setCardHasScrolled(event.nativeEvent.contentOffset.y > cardHeight);
    if (!cardHasScrolled)
      setHeaderOpacity(event.nativeEvent.contentOffset.y / cardHeight);
  };

  const welcomeCardRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (welcomeCardRef.current)
        welcomeCardRef.current.measure((_x, _y, _ox, oy) => {
          setCardHeight(oy);
        });
    }, 1);
  }, []);

  return (
    <>
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          opacity: headerOpacity,
        }}>
        <CollapsedInfoCard
          name={props.data.user.name}
          id={props.data.user.id}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        decelerationRate="normal"
        snapToOffsets={[cardHeight]}
        snapToEnd={false}
        onScroll={handleScroll}>
        <View
          collapsable={false}
          ref={welcomeCardRef}
          style={{
            opacity: 1 - 3 * headerOpacity,
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <InfoCard
            name={props.data.user.name}
            id={props.data.user.id}
            program={props.data.user.program}
          />
        </View>

        <Card heading={ATTENDANCE.HEADING}>
          <DataTable
            data={props.data.attendance.data}
            hasHeader={true}
            displayIndices={displayIndices}
            displayWidths={displayWidths}
            tintPercentageIndex={displayIndices.length - 1}
            percentageThreshold={75}
            alternateTint={true}
            knowMore={true}
          />
        </Card>

        <PrimaryButton
          onPress={() => {
            props.MainWVRef.current.injectJavaScript(logoutScript);
          }}>
          Logout
        </PrimaryButton>

        <Type
          style={{
            margin: 10,
            marginTop: 20,
            fontSize: width / 28,
            color: colors.disabled,
          }}>
          {DMS.FOOTER}
        </Type>

        <View style={{height: height / 3}} />
      </ScrollView>
    </>
  );
};

export default Dashboard;
