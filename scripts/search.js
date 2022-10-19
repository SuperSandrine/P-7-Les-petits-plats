import { recipes } from '../data/recipes.js'
import { createAListFactory, createList } from './Factories/listFactories.js'
import { createARecipeFactory } from './Factories/recipefactories.js'
import { filterThroughInput,refit  } from './Utils/filters.js'
import { foldDropdown, unfoldAndFoldDropdown } from './Utils/dropdown.js'

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
//    console.log("message de champs vide avec set attribute display flex/none")
}

//return allRecipes 
// NICOLAS: est-ce que la portée de allRcipes n'est que dans la condition if/else?
 }


// TODO: renommer en fonction de ce qu'elle fait
function displayListButtons(array){
  //affiche les boutons avec leur titre 
  const buttonsEntitled = createList(array)
  buttonsEntitled.forEach(element => createAListFactory(element).getListBlock(element))
  return buttonsEntitled
}

  // il faudrait d'abord créer la liste et ensuite afficher dans les boutons un par un par rapport à la liste
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

//const itemsList = [applianceItemsList,ustensilsItemsList,ingredientsItemsList]
//console.log("itemsList", itemsList)

const advancedFiltersLists = {
  ingredients: ingredientsItemsList,
  appliance: applianceItemsList,
  ustensils: ustensilsItemsList,
}

//for(const value of categories.appliance)
//console.log(value) //moule, mixe ...
//for(const key in categories)
//console.log(key)// appliance, ustensils, ingre

  for(const key in advancedFiltersLists){
    const menuBlock = document.querySelector(`menu #${key}-list`)
    menuBlock.innerHTML=" "
  const listapp3 = advancedFiltersLists[key].map(item => {createAListFactory(item).getListTemplate(item, key)
  })
//  console.log(listapp3) //(121) undefined 
  // NICOLA: pourquoi ça renvoit des undefined? problème de portée? où est-ce qu'il faudrait que le place
  //pour le voir?
  
}
}



displayRecipes(recipes)
displayListButtons(recipes)
displayItemsInButtonsBlocks(recipes)


// à activer si on a besoin de gérer l'ordre d'appel des fonctions
// function init(){
//   displayRecipes(recipes)
// }
// init()

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



const advancedFiltersLi = document.querySelectorAll("div > menu > li"); // ce selector est en faut la liste des boutons qui ouvre la dropdown
console.log(advancedFiltersLi)

/* when one button is clicked : open/close the current dropdown */
advancedFiltersLi.forEach(li => {
  li.addEventListener('click', (e) => {
    console.log(e.target)
    e.stopImmediatePropagation()
    unfoldAndFoldDropdown(li, e)
  })
})

/* on click outside the dropdown, if deployed,it will be closed*/
window.addEventListener('click', () => {
  foldDropdown(advancedFiltersLi)
})

const advancedFiltersInput = document.querySelectorAll("div > menu > li > button > input"); // ce selector est en faut la liste des boutons qui ouvre la dropdown
console.log(advancedFiltersInput) //vide

advancedFiltersInput.forEach( input => {
  input.addEventListener('input', (event) =>{
  console.log(event.target.value)})
  })
//   if (event.target.value.length > 2){
//     displayRecipes(filterThroughInput(event, recipes))
//     displayItemsInButtonsBlocks(filterThroughInput(event, recipes))
//   } else if (event.target.value.length === 0){
//     displayRecipes(recipes)
//     displayItemsInButtonsBlocks(recipes) //recipes s'il n'y a pas un autre array filtré en cours
//   } else{ console.log("attends")}
//})




//ça marche, version not DRY vvv
// advancedFiltersLi.forEach(li => {
//   li.addEventListener('click', function (e) {
//     console.log(e.target)
//     e.stopImmediatePropagation()
//     if (li.classList.contains('active') && (li.firstChild === e.target)){
//       this.classList.remove('active')
//     }else if(!li.classList.contains('active')){
//     this.classList.add('active')
//     }
//   })
// })
//end ^^^^^^^

//_______________________________  
// fonction d'ouverture de la dropdown, pas très efficace et pas de fermeture en travailvvv  
// Array.from(advancedSearchButtons).forEach(element => {console.log(element)
//   element.addEventListener('click',(e)=>{
//    console.log(e.target.innerText)
//    animateDropdown(e, element)
//   })
//   // const arrowMoves = document.querySelector(`div.advancedFilters-button.${e.target.innerHTML}-color`)
//   // console.log(arrowMoves)
//   // arrowMoves.classList.add('clicked')
//   // const ulToBeDeployed = document.getElementById(`${e.target.innerText}-list`)
//   // console.log(ulToBeDeployed)
//   // ulToBeDeployed.style.display="flex"
//   // const advancedFilterInput = document.getElementById(`search-${e.target.innerText}`)
//   // console.log(advancedFilterInput)
//   // advancedFilterInput.style.display="block"
//   // const advancedFilterSpan = document.getElementById(`span-${e.target.innerText}`)
//   // console.log(advancedFilterSpan)
//   // advancedFilterSpan.style.display="none"

// //    mainInput.style.backgroundColor="blue"
// })
//^^^end
//_______________________________  



// advancedFiltersLi.forEach(li => {
//   li.addEventListener('click', () => unfoldAndFoldDropdown(li, advancedFiltersLi) );
// });

// function unfoldAndFoldDropdown( element, elementMenu) {
//   if (element.classList.contains('active')) {
//     element.classList.remove('active');
//   } else {
//     elementMenu.forEach(otherElement => {otherElement.classList.remove('active');})
//     element.classList.add('active');
//   }
// }
/* if the user clicks anywhere outside the select box, then this line close select box: */
//console.log(advancedFiltersLi[1])
// window.addEventListener('click', () => {advancedFiltersLi[1].classList.remove('active')})
// // je ne peux plus ouvrir la dropdown de ustensils



  


// vvv marche pour open/close mais pas outside the box
// advancedFiltersLi.forEach(li => {
//     li.addEventListener('click', () => unfoldAndFoldDropdown(li, advancedFiltersLi) );
//   });
  
//   function unfoldAndFoldDropdown( element, elementMenu) {
//     if (element.classList.contains('active')) {
//       element.classList.remove('active');
//     } else {
//       elementMenu.forEach(otherElement => {otherElement.classList.remove('active');})
//       element.classList.add('active');
//     }
//   }
//^^^ênd 




//window.addEventListener('click', (e) => unfoldAndFoldDropdown(e, advancedFiltersLi) );

// function unfoldAndFoldDropdown(e, elementMenu) {
  
//     console.log("cible", e.target)//Renvoie là
//   console.log("element",element)
//   console.log("elementMenu", elementMenu)
//   //console.log(elementMenu)
  

//    if (element.classList.contains('active')) {
//     element.classList.remove('active');
//   } else {
//     elementMenu.forEach(otherElement => {otherElement.classList.remove('active');})
//     element.classList.add('active');
//   }
// }

