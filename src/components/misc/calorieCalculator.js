const calculateCalories = (servings, carbs, fats, proteins) => {
  const carbCalories = carbs * 4;
  const fatCalories = fats * 9;
  const proteinCalories = proteins * 4;
  return (carbCalories + fatCalories + proteinCalories) * servings;
};

export default calculateCalories;
