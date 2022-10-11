import { recipes } from '../data/recipes.js'
import { createARecipeFactory } from './Factories/recipefactories.js'
import { filterThroughInput , actionsOnInputSearch } from './Utils/filters.js'

const mainInput = document.getElementById('searchBar')
const recipesContainer = document.getElementById('resultRecipes-container')


// 1 - récupérer les données avec fetch : pour se faire, il 
// faudrait changer le fichier .js en .json, peu d'intérêt.
//async function getRecipesDatas () {
    //await
    //  fetch("./data/recipes.js"
    //  //, {
    //     // headers : { 
    //     //   'Content-Type': 'application/json',
    //     //   'Accept': 'application/json'
    //     //  }
    //     )
     
    //   .then((response) => response.js())
    //   .then((response2) => console.log(response2)
      // .then((response2) => {
      //   recipes = response2
      //   console.log(recipes)
      //)
  //  return { recipes }
//  }


// OK= import/export 2 - Passer les données à une variable 

// 3 - Créer une fonction d'affichage (méthode MAP) Si je map en direct, plutôt
// que appendChild, plus besoin de vider la gallerie, la gallerie 
// affichera directement l'array mapé

// 4 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map)

// 3 - Gérer les filtre

console.log(recipes)

function displayRecipes(array){
  recipesContainer.innerHTML = " "
  const allRecipes = array.map( recipe => createARecipeFactory(recipe).getRecipeCard())
  return allRecipes
}



// // vvv ça marche pas, j'aurai bien aimé trouvé qqchose qui remplace
// // un innerHtml map
// let filteredRecipe=[]
// function displayRecipes(array){
//   filteredRecipe = array.map((recipe)=>{
//     const aRecipeObject = createARecipeFactory(recipe)
//     aRecipeObject.getRecipeCard()
//     console.log(aRecipeObject)
//   })
//   console.log(filteredRecipe)
// }
// ^^^end

  // j'ai qqchose avec cette ligne, mais elle est à retravailler:
  // le problème est l'appel de la methode et la factory method en une ligne?  
  // recipesContainer.innerHTML = array.map(recipe=> recipesFactory(recipe).createRecipeCard)
  
  // vvv ça marche: vvv
  // recipesContainer.innerHTML = array.map((recipe) => `
  // <article class="recipe-card"> 
  // <div class="image">
  // </div>
  // <div class="recipeText-container">
  //     <div class="recipeText-header">
  //       <h2>${recipe.name}</h2>
  //       <p><i class="far fa-clock"></i> ${recipe.time} min</p>
  //     </div>
  //     <div class="recipeText-listAndDescription">
  //       <ul>
  //         <li><strong>poulet:</strong> 1</li>
  //         <li>oignon: 2</li>
  //       </ul>
  //       <p class="recipeText-description">
  //       ${recipe.description}
  //       </p>
  //     </div>
  //   </div>
  //   </article>`)
  //   .join(" ")
    // ^^^ end ^^^


  //console.log(array.map( recipe => console.log(recipesFactory(recipe))))
  //.createRecipeCard())
  //console.log(array.map( recipe => console.log(recipesFactory(recipe).createRecipeCard())))



// à activer si on a besoind e gérer l'ordre d'appel des fonctions
function init(){
  displayRecipes(recipes)
  
}
init()

mainInput.addEventListener('input', (insideInput) =>{
    
  //    console.log(e.target.value)
  
  displayRecipes(filterThroughInput(insideInput, recipes))
  
  })

  export{recipesContainer}