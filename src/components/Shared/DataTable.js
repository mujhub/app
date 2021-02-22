import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';

import {Type, ItemSeparator, BottomSheet} from '.';
import {VIBRANTS} from '../../constants/colors';
import AttendanceRowModal from '../Dms/AttendanceRowModal';

const DataTable = ({
  data,
  alternateTint,
  hasHeader,
  displayIndices,
  displayWidths,
  tintPercentageIndex,
  percentageThreshold,
  knowMore,
}) => {
  const {colors} = useTheme();

  const [showModal, setShowModal] = useState([false, 0]); //[shouldShowModal, dataIndex]

  const percentageTint = (percentage) => {
    return percentage < percentageThreshold
      ? VIBRANTS.RED
      : percentage > percentageThreshold
      ? VIBRANTS.GREEN1
      : VIBRANTS.YELLOW;
  };

  const handleKnowMore = (index) => {
    console.log(data[index]);
    if (!hasHeader || index) {
      setShowModal([true, index]);
    }
  };

  const renderRow = (rowArray, index) => (
    <View key={index}>
      <TouchableOpacity
        activeOpacity={knowMore ? (hasHeader ? (index ? 0.75 : 1) : 0.75) : 1}
        onPress={() => {
          handleKnowMore(index);
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
            backgroundColor:
              alternateTint && index
                ? index % 2
                  ? null
                  : colors.disabled + '05'
                : null,
          }}>
          {rowArray.map((cell, i) => (
            <Type
              key={i}
              style={{
                paddingHorizontal: 2,
                width: displayWidths
                  ? displayWidths[i] + '%'
                  : 100 / rowArray.length + '%',
                fontWeight: hasHeader && !index ? 'bold' : 'normal',
                textAlign:
                  hasHeader && !index && i
                    ? 'right'
                    : isNaN(parseInt(cell))
                    ? 'left'
                    : 'right',
                textDecorationLine: hasHeader && !index ? 'underline' : 'none',
                color: hasHeader
                  ? index && i == tintPercentageIndex
                    ? percentageTint(parseInt(cell))
                    : colors.text
                  : i === tintPercentageIndex
                  ? percentageTint(parseInt(cell))
                  : colors.text,
              }}>
              {cell.replace('Attandance ', '').replace('Attendance ', '')}
            </Type>
          ))}
        </View>
        <ItemSeparator widthPercentage="100%" opacityHex="22" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {showModal[0] && (
        <BottomSheet visible={showModal[0]} setVisible={setShowModal}>
          <AttendanceRowModal data={data[showModal[1]]} headingArr={data[0]} />
        </BottomSheet>
      )}
      <View>
        {typeof data === 'object' && data
          ? data.map((line, index) => {
              let display = [];
              for (let i = 0; i < displayIndices.length; i++) {
                display.push(line[displayIndices[i]]);
              }
              return renderRow(display, index);
            })
          : null}
      </View>
    </>
  );
};

export default React.memo(DataTable);
