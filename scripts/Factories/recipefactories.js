import { recipesContainer } from '../search.js'

export function createARecipeFactory (recipeDatas){
  const { id, name, ingredients , time, description, appliance, ustensils} = recipeDatas
  let createRecipeIngredientsList=[]
  // NICOLAS: est qu'on peut destructurer ingredients? si oui comment?
  //const {ingredients:[{ingredient}]} = recipeDatas
  //const { ingredient2 , unit, quantity}=ingredients
  //console.log("list : ", ingredient2 ) // undefined

  // For/in loops throught properties of an object 
  for ( let x in ingredients){
    const ingre = ingredients[x].ingredient
    const quant = ingredients[x].quantity ===undefined ? " " : " : " + ingredients[x].quantity;
    const uni = ingredients[x].unit ===undefined ? " " : ingredients[x].unit;
    createRecipeIngredientsList.push(`<li><strong>${ingre}</strong> ${quant} ${uni}</li>`)    
  }
  
  function getRecipeCard(){
    const fillUpRecipeWithIngredients = createRecipeIngredientsList.join(" ")
    const article = document.createElement('article')
      article.setAttribute('class', 'recipe-card')
      article.innerHTML=`
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

        recipesContainer.appendChild(article)
      


  }
  return{ 
      recipeDatas,
      getRecipeCard,

  }
}


      // vvv ce code affiche la dernière recette et efface fur et 
      // à mesure du map les recettes précédentes.
      // function createRecipeCard() =>
      //recipesContainer.innerHTML =
    //     `
    //     <article class="recipe-card">
    //     <div class="img"></div>
    //     <div class="recipeText-container">
    //         <div class="recipeText-header">
    //           <h2>${name}</h2>
    //           <p><i class="far fa-clock"></i> ${time} min</p>
    //         </div>
    //         <div class="recipeText-listAndDescription">
    //           <ul>
    //             <li><strong>poulet:</strong> 1</li>
    //             <li>oignon: 2</li>
    //           </ul>
    //           <p class="recipeText-description">
    //           ${description}
    //           </p>
    //         </div>
    //       </div>
    //       </article>`
//}

