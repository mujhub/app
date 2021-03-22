import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import {Type, TextCard, ImageCard} from '../../Shared';
import MessMenuCard from '../MessMenuCard';

const SDRCards = ({cards, navigation}) => {
  const [sortedCards, setSortedCards] = useState([]);

  useEffect(() => {
    setSortedCards([...cards.sort((a, b) => a.position - b.position)]);
    console.log(sortedCards);
  }, [cards]);

  return (
    <View>
      {/* {cards.map((card, i) => ( */}
      {sortedCards.length > 0 &&
        sortedCards.map((card, i) => (
          <View key={i.toString()}>
            {card.type === 'MessMenuCard' && <MessMenuCard />}
            {card.type === 'text' && (
              <TextCard card={card} navigation={navigation} />
            )}
            {card.type === 'image' && (
              <ImageCard card={card} navigation={navigation} />
            )}
          </View>
        ))}
    </View>
  );
};

export default SDRCards;
