// import days from 'days';

export default function transformRecipe(recipe) {
  // let { hours } = brewery;
  // let currentDate = new Date();
  // let day = days[currentDate.getDay()];
  // let currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:00`;
  // let openingTimeToday = hours[`${day.toLowerCase()}_open`];
  // let closingTimeToday = hours[`${day.toLowerCase()}_close`];
  //
  // let isOpen = (
  //   (currentTime > openingTimeToday) &&
  //   (currentTime < closingTimeToday || closingTimeToday === '00:00:00')
  // );

  return {
    name: recipe.name,
    ingredients: recipe.ingredients,
    calories: recipe.calories,
    servings: recipe.servings,
    fats: recipe.fats,
    carbs: recipe.carbs,
    proteins: recipe.proteins,
    tags: recipe.tags,
    photo: recipe.photo,
    directions: recipe.directions,
  };
}
