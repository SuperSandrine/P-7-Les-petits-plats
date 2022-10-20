import { recipes } from '../data/recipes.js'
import { createAListFactory, createList } from './Factories/listFactories.js'
import { createARecipeFactory } from './Factories/recipefactories.js'
import { filterThroughInput,refit  } from './Utils/filters.js'
import { foldDropdown, unfoldAndFoldDropdown } from './Utils/dropdown.js'


// ----------------- DOM
const mainInput = document.getElementById('searchBar')
const recipesContainer = document.getElementById('resultRecipes-container')
const noResultsContainer= document.getElementById('noResults')

console.log(recipes)


// ----------------- Fonctions

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
  }
//return allRecipes 
// NICOLAS: est-ce que la portée de allRecipes n'est que dans la condition if/else?
}

//affiche les boutons avec leur titre 
function displayListButtons(array){
  const buttonsEntitled = createList(array)
  buttonsEntitled.forEach(element => createAListFactory(element).getListBlock(element))
  return buttonsEntitled
}

// il faudrait d'abord créer la liste 
// et ensuite afficher dans les boutons un par un par rapport à la liste
function displayItemsInButtonsBlocks(array){
  const applianceItemsList= [...new Set((array.map((recipe) => recipe.appliance)).map(e=>refit(e)))]
  //  console.log("appliance", applianceItemsList)
  //(11) ['Blender', 'Saladier', 'Cocotte', 'Cuiseur de riz', 'Four', 'Casserole', 'Poêle à crêpe', 
  const ustensilsItemsList= [...new Set((array.map((recipe) => recipe.ustensils).flat()).map(e=>refit(e)))]
  //  console.log(ustensilsItemsList)
  // (25) ['cuillère à soupe', 'verres', 'presse citron', 'couteau', 'saladier', 'passoire', 'moule à tarte', 
  const ingredientsItemsList= [...new Set(((array.map((recipe)=>recipe.ingredients.map((ing)=>ing.ingredient))).flat()).map(e=>refit(e)))]
  //  console.log("ingredients : ",ingredientsItemsList)
  //(121) ['lait de coco', 'jus de citron', 'crème de coco', 'sucre', 'glaçons',...

  const advancedFiltersLists = {
    ingredients: ingredientsItemsList,
    appliance: applianceItemsList,
    ustensils: ustensilsItemsList,
  }

  for(const key in advancedFiltersLists){
    const menuBlock = document.querySelector(`menu #${key}-list`)
    menuBlock.innerHTML=" "
    const listapp3 = advancedFiltersLists[key].map(item => {createAListFactory(item).getListTemplate(item, key)
    })
  //  console.log(listapp3) //(121) undefined 
  // NICOLAs: pourquoi ça renvoit des undefined? problème de portée? où est-ce qu'il faudrait que je le place
  //pour le voir?
  }
}

function displayTag(){
  // prend la donnée
  // crée un élément
  // append a child dans le container de tag
  // s'ajoute au filtre de recheher
  // click droix: Se remove et s'enlève des filtres
}

// ----------------- APPEL des fonctions


displayRecipes(recipes)
displayListButtons(recipes)
displayItemsInButtonsBlocks(recipes)


// à activer si on a besoin de gérer l'ordre d'appel des fonctions
// function init(){
//   displayRecipes(recipes)
// }
// init()


// ----------------- EVENTS LISTENERS


mainInput.addEventListener('input', (event) =>{
  console.log(event.target.value)
  if (event.target.value.length > 2){
    displayRecipes(filterThroughInput(event, recipes))
    displayItemsInButtonsBlocks(filterThroughInput(event, recipes))
  } else if (event.target.value.length === 0){
    displayRecipes(recipes)
    displayItemsInButtonsBlocks(recipes) //recipes s'il n'y a pas un autre array filtré en cours
  } else{ console.log("attends")}
})

// ce selector capte la liste des boutons qui ouvre la dropdown
// la classe .active se fait sur li
const advancedFiltersLi = document.querySelectorAll("div > menu > li"); 
console.log(advancedFiltersLi)

/* when one button is clicked : open/close the current dropdown */
advancedFiltersLi.forEach(li => {
  li.addEventListener('click', (e) => {
    //console.log(e.target)
    e.stopImmediatePropagation()
    unfoldAndFoldDropdown(li, e)
    // TODO: mettre ce qui suit dans une fonction ?
    // condition : ne pas cliquer sur le menu (dans les espaces autour des boutons)
    // et ne pas cliquer sur le bouton de tête (qui ferme la dropdown)
    if (((e.target).toString().indexOf('Menu') === -1)  &&
      (!e.target.contains(li.firstChild)) /* button */ && 
      (!e.target.contains(li.firstChild.firstChild)) /*son span*/ && 
      (!e.target.contains(li.firstChild.firstChild.nextSibling)) /*son input*/ ){
       console.log("button clické : ",e.target.innerText )
       // faire l'action:
       //    - afficher le tag (cf displayTag())
       //    - filtre recipes avec ce mot clef
     }
  })
})

/* on click outside the dropdown, if deployed,it will be closed*/
window.addEventListener('click', () => {
  foldDropdown(advancedFiltersLi)
})

const advancedFiltersInput = document.querySelectorAll("div > menu > li > button > input"); 
// console.log(advancedFiltersInput) //vide
advancedFiltersInput.forEach( input => {
  input.addEventListener('input', (event) =>{
    event.preventDefault()
    console.log(event.target.value)
    displayRecipes(filterThroughInput(event,recipes))
    displayItemsInButtonsBlocks(filterThroughInput(event, recipes))
  })
})




