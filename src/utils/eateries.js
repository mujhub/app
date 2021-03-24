export const scoreSort = (eateries) => {
  let sortedEateries = [];
  let featuredEateries = [];
  let scoreSortedEateries = [];
  eateries.forEach((eatery) => {
    if (eatery.is_featured) {
      featuredEateries.push(eatery);
    } else {
      scoreSortedEateries.push(eatery);
    }
  });
  //   featuredEateries = eateries.filter((eatery) => eatery.is_featured === true);
  //   scoreSortedEateries = eateries.filter(
  //     (eatery) => eatery.is_featured === false,
  //   );
  featuredEateries = featuredEateries.sort((a, b) => b.score - a.score);
  scoreSortedEateries = scoreSortedEateries.sort((a, b) => b.score - a.score);
  sortedEateries = [...featuredEateries, ...scoreSortedEateries];
  console.log('sortedEateries', sortedEateries);
  return sortedEateries;
};
