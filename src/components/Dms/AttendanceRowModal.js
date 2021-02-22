import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';

import {Type} from '../Shared';
import {useTheme} from 'react-native-paper';
import {VIBRANTS} from '../../constants/colors';
import {ATTENDANCE} from '../../constants/strings';

const {width, height} = Dimensions.get('screen');

const AttendanceRowModal = ({data, headingArr}) => {
  console.log(data);
  const {colors} = useTheme();

  const THRESHOLD = 0.75;
  const [thresholdMessage, setThresholdMessage] = useState();
  const [attn, setAttn] = useState(0);

  useEffect(() => {
    let P = data[6];
    let T = data[8];
    let curr = P / T;
    // let attn = 0;
    if (curr > THRESHOLD) {
      setAttn(parseInt((P - THRESHOLD * T) / THRESHOLD));
    } else if (curr < THRESHOLD) {
      setAttn(parseInt((P - THRESHOLD * T) / (1 - THRESHOLD)));
    }
    if (attn > 0) {
      setThresholdMessage(
        attn > 1
          ? ATTENDANCE.ABOVE_THRESHOLD.replace('${v}', attn)
          : ATTENDANCE.ABOVE_THRESHOLD_SINGULAR,
      );
    } else if (attn < 0) {
      setThresholdMessage(
        attn < -1
          ? ATTENDANCE.BELOW_THRESHOLD.replace('${v}', -1 * attn)
          : ATTENDANCE.BELOW_THRESHOLD_SINGULAR,
      );
    } else {
      setThresholdMessage(ATTENDANCE.EQUAL_THRESHOLD);
    }
  }, []);

  return (
    <View
      style={{
        height: 300,
        padding: width / 30,
        justifyContent: 'space-around',
        width: '100%',
      }}>
      <View>
        <Type style={{fontSize: width / 32, color: colors.disabled}}>
          {headingArr[1]}
        </Type>
        <Type style={{fontSize: width / 20, fontWeight: 'bold'}}>
          {data[1]}
        </Type>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '25%'}}>
          <Type style={{fontSize: width / 32, color: colors.disabled}}>
            {headingArr[2]}
          </Type>
          <Type style={{fontSize: width / 26}}>{data[2]}</Type>
        </View>
        <View style={{width: '25%'}}>
          <Type style={{fontSize: width / 32, color: colors.disabled}}>
            {headingArr[3]}
          </Type>
          <Type style={{fontSize: width / 26}}>{data[3]}</Type>
        </View>
        <View style={{width: '25%'}}>
          <Type style={{fontSize: width / 32, color: colors.disabled}}>
            {headingArr[4]}
          </Type>
          <Type style={{fontSize: width / 26}}>{data[4]}</Type>
        </View>
        <View style={{width: '25%'}}>
          <Type style={{fontSize: width / 32, color: colors.disabled}}>
            {headingArr[5]}
          </Type>
          <Type style={{fontSize: width / 26}}>{data[5]}</Type>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '25%'}}>
          <Type style={{fontSize: width / 32, color: colors.disabled}}>
            {headingArr[6]}
          </Type>
          <Type style={{fontSize: width / 26}}>{data[6]}</Type>
        </View>
        <View style={{width: '25%'}}>
          <Type style={{fontSize: width / 32, color: colors.disabled}}>
            {headingArr[7]}
          </Type>
          <Type style={{fontSize: width / 26}}>{data[7]}</Type>
        </View>
        <View style={{width: '25%'}}>
          <Type style={{fontSize: width / 32, color: colors.disabled}}>
            {headingArr[8]}
          </Type>
          <Type style={{fontSize: width / 26}}>{data[8]}</Type>
        </View>
        <View style={{width: '25%'}}>
          <Type style={{fontSize: width / 32, color: colors.disabled}}>
            {headingArr[9]}
          </Type>
          <Type style={{fontSize: width / 26}}>{data[9]}</Type>
        </View>
      </View>

      <View>
        <Type
          style={{
            fontSize: width / 28,
            color:
              attn > 0
                ? VIBRANTS.GREEN1
                : attn < 0
                ? VIBRANTS.RED
                : VIBRANTS.YELLOW,
          }}>
          {thresholdMessage}
        </Type>
      </View>
    </View>
  );
};

export default React.memo(AttendanceRowModal);
