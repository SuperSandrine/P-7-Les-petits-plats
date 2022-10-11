import { recipesContainer } from '../search.js'

export function createARecipeFactory (recipeDatas){
  const { id, name, ingredients, time, description, appliance, ustensils} = recipeDatas

  function getRecipeCard(){
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
              <li><strong>poulet:</strong> 1</li>
              <li>oignon: 2</li>
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

      // const article = document.createElement('article')
      // article.setAttribute('class', 'recipe-card')
      // article.innerHTML=`
      // <div class="img"></div>
      // <div class="recipeText-container">
      //     <div class="recipeText-header">
      //       <h2>${name}</h2>
      //       <p><i class="far fa-clock"></i> ${time} min</p>
      //     </div>
      //     <div class="recipeText-listAndDescription">
      //       <ul>
      //         <li><strong>poulet:</strong> 1</li>
      //         <li>oignon: 2</li>
      //       </ul>
      //       <p class="recipeText-description">
      //       ${description}
      //       </p>
      //     </div>
      //   </div>`

      //   recipesContainer.appendChild(article)

      // vvv ce code affiche la dernière recette et efface fur et 
      // à mesure du map les recettes précédentes.
      //recipesContainer.innerHTML =




    // function createRecipeCard() =>
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

