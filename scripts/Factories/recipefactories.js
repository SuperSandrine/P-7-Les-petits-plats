
export function createARecipeFactory (recipeDatas) {
  const { name, ingredients, time, description } = recipeDatas
  const createRecipeIngredientsList = []

  // For/in  boucles dans les propriétés d'un objet
  for (const x in ingredients) {
    const ingre = ingredients[x].ingredient
    const quant = ingredients[x].quantity === undefined ? ' ' : ' : ' + ingredients[x].quantity
    const uni = ingredients[x].unit === undefined ? ' ' : ingredients[x].unit
    createRecipeIngredientsList.push(`<li><strong>${ingre}</strong> ${quant} ${uni}</li>`)
  }

  // fabrique l'élément 'carte' d'affichage des recettes
  function getRecipeCard () {
    const fillUpRecipeWithIngredients = createRecipeIngredientsList.join(' ')
    const article = document.createElement('article')
    article.setAttribute('class', 'recipe-card')
    article.innerHTML = `
      <div class="img"></div>
      <div class="recipeText-container">
          <div class="recipeText-header">
            <h2>${name}</h2>
            <p><i class="far fa-clock"></i> ${time} min</p>
          </div>
          <div class="recipeText-listAndDescription">
            <ul>
              ${fillUpRecipeWithIngredients} 
            </ul>
            <p class="recipeText-description">
            ${description}
            </p>
          </div>
        </div>`

    return article
  }
  return {
    getRecipeCard
  }
}
