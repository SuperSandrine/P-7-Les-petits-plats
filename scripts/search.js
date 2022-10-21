import { recipes } from '../data/recipes.js'
import { createAListFactory, createList } from './Factories/listFactories.js'
import { createARecipeFactory } from './Factories/recipefactories.js'
import { filterThroughMainInput,refit, filterThroughAdvancedInput  } from './Utils/filters.js'
import { foldDropdown, unfoldAndFoldDropdown } from './Utils/dropdown.js'


// ----------------- DOM
const mainInput = document.getElementById('searchBar')
const recipesContainer = document.getElementById('resultRecipes-container')
const noResultsContainer= document.getElementById('noResults')
const selectedTagContainer = document.getElementById("advancedSelectedFilterTags-container")


console.log(recipes)


// ----------------- Fonctions

// TODO= si on ne réutilise pas allRecipes, alors il faudra peut-être passer par un ForEach
function displayRecipes(array){
  recipesContainer.innerHTML = " "
  if (array.length !== 0 ){
    noResultsContainer.style.display="none"
  array.map( recipe => recipesContainer.appendChild(createARecipeFactory(recipe).getRecipeCard()))
//  const allRecipes = array.map( recipe => recipesContainer.appendChild(createARecipeFactory(recipe).getRecipeCard()))
  
  }else { 
    console.log(noResultsContainer)
    noResultsContainer.style.display="flex"
  }
//return allRecipes 
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
// vvv ça marche mais à déplacer
  // const applianceItemsList= [...new Set((array.map((recipe) => recipe.appliance)).map(e=>refit(e)))]
  // //  console.log("appliance", applianceItemsList)
  // //(11) ['Blender', 'Saladier', 'Cocotte', 'Cuiseur de riz', 'Four', 'Casserole', 'Poêle à crêpe', 
  // const ustensilsItemsList= [...new Set((array.map((recipe) => recipe.ustensils).flat()).map(e=>refit(e)))]
  // //  console.log(ustensilsItemsList)
  // // (25) ['cuillère à soupe', 'verres', 'presse citron', 'couteau', 'saladier', 'passoire', 'moule à tarte', 
  // const ingredientsItemsList= [...new Set(((array.map((recipe)=>recipe.ingredients.map((ing)=>ing.ingredient))).flat()).map(e=>refit(e)))]
  // //  console.log("ingredients : ",ingredientsItemsList)
  // //(121) ['lait de coco', 'jus de citron', 'crème de coco', 'sucre', 'glaçons',...

  // const advancedFiltersLists = {
  //   ingredients: ingredientsItemsList,
  //   appliance: applianceItemsList,
  //   ustensils: ustensilsItemsList,
  // }
  // ^^^^end
  const advancedFiltersLists= createAListFactory(array).makeLists(array)
  console.log("advancedFiltersLists : ", advancedFiltersLists)

  for(const key in advancedFiltersLists){
    const menuBlock = document.querySelector(`menu #${key}-list`)
    menuBlock.innerHTML=" "
    advancedFiltersLists[key].map(item => {createAListFactory(item).getListTemplate(item, key)
    //const listapp3 = advancedFiltersLists[key].map(item => {createAListFactory(item).getListTemplate(item, key)
    // peut-^tre pas besoin de map mais for each
    })
  //  console.log(listapp3) //(121) undefined 
  // NICOLAs: pourquoi ça renvoit des undefined? problème de portée? où est-ce qu'il faudrait que je le place
  //pour le voir?
  }
}


function displayTag(item, itemTittleList){
selectedTagContainer.appendChild(createAListFactory().getItemTagTemplate(item, itemTittleList)
//  (item= buttoncliqué),
//  (récupérer le titre de la liste au moement du clix) 
)


  // const selectedTag = document.createElement('div')
  // selectedTag.className='advancedSelectedFilterTag'
  // selectedTag.classList.add(`${element}-color`)
  // const textItem = document.createElement('p')
  // textItem.innerText = item
  // const tagClosure = document.createElement('i')
  // tagClosure.className="far fa-times-circle"

  // selectedTag.appendChild(textItem)
  // selectedTag.appendChild(tagClosure)
  
  /*  <!-- <div class="advancedSelectedFilterTag ingredients-color">
              <p>chochochocolat</p>
              <i class="far fa-times-circle"></i>
            </div> -->*/
  // OK - prend la donnée
  // OK - crée un élément
  // OK - append a child dans le container de tag
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
    displayRecipes(filterThroughMainInput(event, recipes))
    displayItemsInButtonsBlocks(filterThroughMainInput(event, recipes))
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
    // console.log("e : ", e.target)
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
      //console.log('data récupéré: ', (e.target).getAttribute('data-advanced-filter'));

       // faire l'action:
       //    OK - afficher le tag (cf displayTag())
       //    - filtre recipes avec ce mot clef
        displayTag(e.target.innerText, (e.target).getAttribute('data-advanced-filter'))
    }
  })
})

/* on click outside the dropdown, if deployed,it will be closed*/
window.addEventListener('click', () => {
  foldDropdown(advancedFiltersLi)
})

const advancedFiltersInput = document.querySelectorAll("div > menu > li > button > input"); 
// console.log(advancedFiltersInput) //vide

// cas où mainInput est vide
advancedFiltersInput.forEach( input => {
  input.addEventListener('input', (event) =>{
    event.preventDefault() // je sais pas trop à quoi ça sert

    //console.log("premier e.target: ", event.target);
        //<input class="ingredients-color advancedSearch" 
    // type="search" id="search-ingredients" 
    // placeholder="Rechercher dans ingredients">
    // OK : TODO: récupérere le titre là-dedans
    //console.log("premier e.target avec data: ", (event.target).getAttribute('data-advanced-filter')); // true
    //console.log("premier e.target: ", (event.target).getAttribute('id').includes('appliance')); // true
      // 3 conditions, si includes ingredients true, alors tittle = ingredient, return tittle
      // 3 fois pour les 3 catégories
    // OU utiliser les datas attributes pour être plus efficace

    const listTittle = (event.target).getAttribute('data-advanced-filter')
    console.log("tittle",listTittle);
    console.log("value", event.target.value)
    // displayRecipes(recipes)
    displayItemsInButtonsBlocks(filterThroughAdvancedInput(event, recipes,listTittle )) // pour mixer renvoie un array de 6
    // si je clique sur le boutton, alors j'affiche le tag et j'affiche les recettes
  })
})




// Refactoriser le code de la recherche :
//  - une fonction générale qui filtre et affiche les recettes en prenant en compte :
//    - l'input de recherche (si renseigné) 
//    - le filtre applicances (si renseigné) 
//    - le filtre ustensils (si renseigné) 
//    - le filtre ingredients (si renseigné)
// OK - Quand on saisit dans l'input de recherche, les filtres sont mis à jour
// OK - Quand on saisit dans l'input d'un filtre, cela met le filtre concerné à jour
// - Quand on clique sur un filtre, on appelle la fonction générale qui filtre et affiche les recettes
//    - Optionnel : cela met également à jour les autres filtres