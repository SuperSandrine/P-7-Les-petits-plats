import { recipes } from '../data/recipes.js'
import { createAListFactory, createList } from './Factories/listFactories.js'
import { createARecipeFactory } from './Factories/recipefactories.js'
import { filterThroughInput,refit  } from './Utils/filters.js'

const mainInput = document.getElementById('searchBar')
const recipesContainer = document.getElementById('resultRecipes-container')
const noResultsContainer= document.getElementById('noResults')

//const advancedFiltersUl= document.getElementById('advancedFilters-list')
// PLAN:
// OK 1 - récupérer les données  OK= import/export 

// OK 2 - Passer les données à une variable, variable:recipes

// OK 3 - Créer une fonction d'affichage (méthode MAP testée: Si je map en direct, plutôt
// que appendChild, plus besoin de vider la gallerie, la gallerie 
// affichera directement l'array mapé, mais du coup c'est en surchargeant la fonction display
// loin de la factory method => mauvaise pratique du code fonctionnel

// 4 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map)

// 5 - Gérer les filtres

console.log(recipes)

// TODO= si on ne réutilise pas allRecipes, alors il faudra peut-être passer par un ForEach
function displayRecipes(array){
  recipesContainer.innerHTML = " "

  if (array.length !== 0 ){
    noResultsContainer.style.display="none"
  const allRecipes = array.map( recipe => recipesContainer.appendChild(createARecipeFactory(recipe).getRecipeCard())
  )
  }else { 
    console.log(noResultsContainer)
    noResultsContainer.style.display="flex"
    console.log("message de champs vide avec set attribute display flex/none")
}

//return allRecipes 
// NICOLAS: est-ce que la portée de allRcipes n'est que dans la condition if/else?
 }


// TODO: renommer en fonction de ce qu'elle fait
function displayListButton(array){
  //affiche les boutons avec leur titre 
  const buttonsEntitled = createList(array)
  buttonsEntitled.forEach(element => createAListFactory(element).getListBlock(element))
  return buttonsEntitled
}

  // il faudrait d'abord créer la liste et ensuite afficher dans les boutons un par un par rapport à la liste
function displayItemsInButtonList(array){
  const applianceItemsList= [...new Set((array.map((recipe) => recipe.appliance)).map(e=>refit(e)))]
  console.log("appliance", applianceItemsList)
//(11) ['Blender', 'Saladier', 'Cocotte', 'Cuiseur de riz', 'Four', 'Casserole', 'Poêle à crêpe', 
  const ustensilsItemsList= [...new Set((array.map((recipe) => recipe.ustensils).flat()).map(e=>refit(e)))]
  console.log(ustensilsItemsList)
// (25) ['cuillère à soupe', 'verres', 'presse citron', 'couteau', 'saladier', 'passoire', 'moule à tarte', 
const ingredientsItemsList= [...new Set(((array.map((recipe)=>recipe.ingredients.map((ing)=>ing.ingredient))).flat()).map(e=>refit(e)))]
console.log("ingredients : ",ingredientsItemsList)
//(121) ['lait de coco', 'jus de citron', 'crème de coco', 'sucre', 'glaçons',...

const itemsList = [applianceItemsList,ustensilsItemsList,ingredientsItemsList]
console.log("itemsList", itemsList)

const categories = {
  ingredients: ingredientsItemsList,
  appliance: applianceItemsList,
  ustensils: ustensilsItemsList,
}

//for(const value of categories.appliance)
//console.log(value) //moule, mixe ...
//for(const key in categories)
//console.log(key)// appliance, ustensils, ingre

  for(const key in categories){
    const ulBlock = document.querySelector(`ul #${key}-list`)
    ulBlock.innerHTML=" "
  const listapp3 = categories[key].map(item => {createAListFactory(item).getListTemplate(item, key)
  })
  console.log(listapp3) //(121) undefined 
  // nicolas pourquoi ça renvoit des undefined? problème de portée? où est-ce qu'il faudrait que le place
  //pour le voir?
  
}
}



displayRecipes(recipes)
displayListButton(recipes)
displayItemsInButtonList(recipes)


// à activer si on a besoin de gérer l'ordre d'appel des fonctions
// function init(){
//   displayRecipes(recipes)
// }
// init()

mainInput.addEventListener('input', (event) =>{
      console.log(event.target.value)
  if (event.target.value.length > 2){
  displayRecipes(filterThroughInput(event, recipes))
  displayItemsInButtonList(filterThroughInput(event, recipes))
}else if (event.target.value.length === 0){
displayRecipes(recipes)
displayItemsInButtonList(recipes) //recipes s'il n'y a pas un autre array filtré en cours
} else{ console.log("attends")}
  })


