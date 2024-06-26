import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {Type, TextCard, ImageCard} from '../../Shared';

const {width, height} = Dimensions.get('screen');

const SDRCards = ({cards, navigation}) => {
  const [sortedCards, setSortedCards] = useState([]);

  useEffect(() => {
    setSortedCards([...cards.sort((a, b) => a.position - b.position)]);
  }, [cards]);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{marginTop: 5, maxHeight: height / 6}}
      contentContainerStyle={{alignItems: 'center'}}>
      {sortedCards.length > 0 &&
        sortedCards.map((card, i) => (
          <View key={i.toString()}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              {card.type === 'image' && card.visible && (
                <View style={{width: width - 40, paddingRight: 20}}>
                  <ImageCard
                    card={card}
                    navigation={navigation}
                    horizontal={true}
                  />
                </View>
              )}
              {card.type === 'text' && card.visible && (
                <View style={{width: width - 40, paddingRight: 20}}>
                  <TextCard
                    card={card}
                    navigation={navigation}
                    horizontal={true}
                  />
                </View>
              )}
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

export default SDRCards;
