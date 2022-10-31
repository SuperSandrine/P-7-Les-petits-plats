import { recipes } from '../data/recipes.js'
import { createAListFactory, createList } from './Factories/listFactories.js'
import { createARecipeFactory } from './Factories/recipefactories.js'
import { filterThroughMainInput, filterThroughAdvancedField, filterAdvancedItemsListThroughAdvancedInput, intersection2 } from './Utils/filters.js'
import { foldDropdown, unfoldAndFoldDropdown } from './Utils/dropdown.js'


// ----------------- DOM
const mainInput = document.getElementById('searchBar')
const recipesContainer = document.getElementById('resultRecipes-container')
const noResultsContainer= document.getElementById('noResults')
const selectedTagContainer = document.getElementById("advancedSelectedFilterTags-container")

console.log(recipes)



// ----------------- Fonctions

// TODO= si on ne réutilise pas allRecipes, alors il faudra peut-être passer par un ForEach //map semble un peu plus performant que forEach 
// affiche les recettes une par une à partir d'un array de recettes filtrées ou non
function displayRecipes(array){
  recipesContainer.innerHTML = " "
  //console.log ('array length ds displayRecipes: ', array.length)
  if (array.length !== 0 ){
    noResultsContainer.style.display="none"
    array.map( recipe => recipesContainer.appendChild(createARecipeFactory(recipe).getRecipeCard()))
//  const allRecipes = array.map( recipe => recipesContainer.appendChild(createARecipeFactory(recipe).getRecipeCard()))
  }else { 
    noResultsContainer.style.display="flex"
  }
}

//affiche les boutons de filtres avec leur titre 
function displayListButtons(array){
  const buttonsEntitled = createList(array)
  buttonsEntitled.forEach(element => createAListFactory().getListBlock(element))
  return buttonsEntitled
}

// il faudrait d'abord créer la liste (des items à mettre dans les boutons)
// et ensuite afficher les items dans les boutons un par un en suivant cette liste d'items filtrés ou non
// on récupère la liste de listes d'items filtrés pour ajouter des filtres sur cette liste
function displayItemsInButtonsBlocks(array,cible){
  const advancedFiltersLists = createAListFactory().makeLists(array)
  console.log("advancedFiltersLists : ", advancedFiltersLists)
  for(const title in advancedFiltersLists){
    //console.log("title ou key", title)
    const menuBlock = document.querySelector(`menu #${title}-list`)
    menuBlock.innerHTML=" "
    advancedFiltersLists[title].map(item => createAListFactory().getListTemplate(item, title))
    //console.log("je compte pour 1 fois", cible);
    
    
    //const listapp3 = advancedFiltersLists[key].map(item => {createAListFactory(item).getListTemplate(item, key)
    // TODO : peut-^tre pas besoin de map mais for each
  }
  // if (cible){
  //   console.log("test");
  //   cible.remove()
  //   }
  //cherche à supprimer le bouton cliqké de la liste
  // si tagsmaps est >0, si tagsmaps.has('la e.target')
  // alors remove la e.target de la l'affichage
  // OU
  // if (tagsMap>0){
  //   tagsMap.forEach((a,b)=> console.log(a, b));
  //   tagsMap.forEach((a,b)=>{ if (advancedFiltersItemsButtons.innerText == b){
  //     advancedFiltersItemsButtons.remove()}})
  // }
  return advancedFiltersLists
}

// si un item est présent dans les tags
// alors le supprimer des listes
function suppressItemsClickedFromButtonsBlock(tagsList){
  if (tagsList.size ===1){
    let itemToSuppress 
    for (const key of tagsList.keys()) {
      itemToSuppress = key
    }
    const displayedList= document.querySelectorAll("div > menu > li > menu > li > button")
    for (const button of displayedList) {
      if (button.innerText.includes(itemToSuppress)) {
        button.remove()
      }
    }
  }
  else if (tagsList.size >1){
    // tagsList.forEach((ListTittle,Item) => console.log("ListTittle/Item",ListTittle + "/"+ Item))   // renvoie : ListTittle/Item ingredients/lait de coco
    const displayedList= document.querySelectorAll("div > menu > li > menu > li > button")
    tagsList.forEach((ListTittle,Item) => {
    for (const button of displayedList) {
      if (button.innerText.includes(Item)) {
        button.remove()
      }
    }})
  }
}

// affiche le tag cliqué
function displayTag(item, itemTittleList){
  //console.log("tag displayed : ",item)
  selectedTagContainer.appendChild(createAListFactory().getItemTagTemplate(item, itemTittleList))
  return
}

// supprime de l'affichage le tag cliquéé
function suppressTag(e){
  //console.log(e.target.parentNode.parentNode);
  selectedTagContainer.removeChild(e.target.parentNode.parentNode)
  return
}


// ----------------- APPEL des fonctions

displayListButtons(recipes)
// ce selector capte la liste des boutons qui ouvre la dropdown
// ce selector doit être activé après l'affichage des boutons de listes
// la classe .active se fait sur li
const advancedFiltersLi = document.querySelectorAll("div > menu > li"); 
// const advancedFiltersItemsButtons = document.querySelectorAll("div > menu > li >menu >li >button"); 

displayRecipes(recipes)
let filteredListsAdvancedField = displayItemsInButtonsBlocks(recipes)
//console.log("advanced 2eme affichage en CL, premier display", filteredListsAdvancedField);


// ----------------- EVENTS LISTENERS

let mainInputFilled = false

function search(){
// fait d'abord la gestion des inputs
// ensuite la gestion des clicks:
//    - avec le main Input vide
//    - avec le main Input plein
//    - gestion de la suppression de tag

  let arrayFromMainInput =[]

  mainInput.addEventListener('input', (event) =>{
    event.stopPropagation()
    console.log("main input event", event)
    selectedTagContainer.innerHTML=""
    tagsMap.clear()
    if (event.target.value.length > 2){
      mainInput.parentElement.removeAttribute("data-error-visible", true);
      
      mainInputFilled = true
      arrayFromMainInput = filterThroughMainInput(event, recipes)
      displayRecipes(arrayFromMainInput)
      filteredListsAdvancedField = displayItemsInButtonsBlocks(arrayFromMainInput)
      // console.log("mainInputFilled rempli : ", mainInputFilled);
    } else if (event.target.value.length < 3){
      // TODO: rajouter un message en dessous "écrire 3 caractères minimum"
      mainInput.parentElement.setAttribute("data-error-visible", true);
      mainInputFilled =false
      displayRecipes(recipes)
      filteredListsAdvancedField = displayItemsInButtonsBlocks(recipes) //recipes s'il n'y a pas un autre array filtré en cours
    }
  })

  const advancedFiltersItemsButtons = document.querySelectorAll("div > menu > li >menu >li >button"); 
  //console.log("arrayFromMainInput : ", arrayFromMainInput);
  //console.log("mainInputFilled plein? : ", mainInputFilled);
  const advancedFiltersInput = document.querySelectorAll("div > menu > li > button > input"); 
  advancedFiltersInput.forEach( input => {
    input.addEventListener('input', (event) =>{
      console.log("event", event)
      event.preventDefault() // je sais pas trop à quoi ça sert
      
      // TODO: faire une fonction??? vvvv
      const listTittle = (event.target).getAttribute('data-advanced-filter')
      const lists = filteredListsAdvancedField 
      const listFiltered = filterAdvancedItemsListThroughAdvancedInput(event.target.value,listTittle, lists)
      console.log("listes filtrés",listFiltered);
      const menuTittleBlock = document.querySelector (`menu #${listTittle}-list`)
      menuTittleBlock.innerHTML=" "
      listFiltered.map(item => createAListFactory().getListTemplate(item, listTittle))
      // ^^^faire une fonction ^^^
    })
  })

  let tagsMap = new Map()
  advancedFiltersLi.forEach(li => {
    li.addEventListener('click', (e) => {
      e.stopPropagation()
      unfoldAndFoldDropdown(li, e, advancedFiltersLi)        
      if (mainInputFilled===false){
        console.log('e.target', e.target);
        // le champs MainInput n'est pas renseigné
        // TODO: mettre ce qui suit dans une fonction ?
        // condition : ne pas cliquer sur le menu (dans les espaces autour des boutons)
        // et ne pas cliquer sur le bouton de tête (qui ferme la dropdown)
        if (((e.target).toString().indexOf('Menu') === -1)  &&
        (!e.target.contains(li.firstChild)) /* button */ && 
        (!e.target.contains(li.firstChild.firstChild)) /*son span*/ && 
        (!e.target.contains(li.firstChild.firstChild.nextSibling)) /*son input*/ ){
          const itemTittleList = (e.target).getAttribute('data-advanced-filter')
          const item = e.target.innerText
          tagsMap.set(item,itemTittleList)
          console.log("tagsMap",tagsMap)
          selectedTagContainer.innerHTML=""
          tagsMap.forEach((itemTittL, ItM) => displayTag(ItM,itemTittL))
          document.getElementById(`search-${itemTittleList}`).value="" // vide l'input
          //e.target.remove() // ça marche mais, au click la liste est actualisée avec les éléments des recettes filtrées
          let target = e.target

          if (tagsMap.size===0){
            // il n'y a pas de tag sélectionné
            ;
            displayRecipes(recipes)
            filteredListsAdvancedField = displayItemsInButtonsBlocks(recipes)
            ;
          }else if (tagsMap.size===1){
            
            //tagsMap.forEach((a,b)=> console.log(a, b)); // ingredient, lait de coco
            tagsMap.forEach((itemTittleList, item) => displayRecipes(filterThroughAdvancedField(item, recipes, itemTittleList)))
            tagsMap.forEach((itemTittleList, item) => filteredListsAdvancedField = displayItemsInButtonsBlocks(filterThroughAdvancedField(item, recipes, itemTittleList), target))
            suppressItemsClickedFromButtonsBlock(tagsMap)
          
          }else if (tagsMap.size>1){
            // s'il y a plus de deux tags sélectionnés
            // je MAP mes tags (du coup les doublons ne sont pas pris en compte)
            // à chaque clic sur tag, une liste de recette est crée et ajouté à l'array mixedtest2. 
            // TODO: changer nom de mixedtest2 et intersection2
            let mixedtest2=[]
            for (const [key, value] of tagsMap) { 
              mixedtest2.push(filterThroughAdvancedField(key, recipes, value))
            }
            // console.log("à partir de 2 tags, le tableau créé: ", mixedtest2);
            // l'array mixedtest2 se composent d'un index par tag
            // dans chaque index il y a un tableau des résultats du filtre sur le tableau de recettes (filtré ou non par le mainInput)
            
            displayRecipes(intersection2(mixedtest2))
            filteredListsAdvancedField = displayItemsInButtonsBlocks(intersection2(mixedtest2))
            suppressItemsClickedFromButtonsBlock(tagsMap)
          }
        }
      }

      else if (mainInputFilled == true) {
          //si le champs de recherche principal est renseigné
          //console.log("après avoir remplir le main input", e.target);
          if (((e.target).toString().indexOf('Menu') === -1)  &&
          (!e.target.contains(li.firstChild)) /* button */ && 
          (!e.target.contains(li.firstChild.firstChild)) /*son span*/ && 
          (!e.target.contains(li.firstChild.firstChild.nextSibling)) /*son input*/ ){
            //console.log("button clické : ",e.target.innerText )
            const itemListTittle = (e.target).getAttribute('data-advanced-filter')
            const itemName = e.target.innerText
            tagsMap.set(itemName,itemListTittle)
            
            selectedTagContainer.innerHTML="" // vide le container avant de le remplir
            tagsMap.forEach((itemTittL, ItM) => displayTag(ItM,itemTittL))
            document.getElementById(`search-${itemListTittle}`).value="" // vide l'input

            if (tagsMap.size===0){
              displayRecipes(filterThroughAdvancedField(itemName, arrayFromMainInput, itemListTittle))
              filteredListsAdvancedField = displayItemsInButtonsBlocks(filterThroughAdvancedField(itemName, arrayFromMainInput, itemListTittle))

            }else if (tagsMap.size===1){
            // il y a un tag sélectionné
              displayRecipes(filterThroughAdvancedField(itemName, arrayFromMainInput, itemListTittle))
              filteredListsAdvancedField = displayItemsInButtonsBlocks(filterThroughAdvancedField(itemName, arrayFromMainInput, itemListTittle))
              suppressItemsClickedFromButtonsBlock(tagsMap)

            }else if (tagsMap.size>1){
            // s'il y a plus de deux tags sélectionnés
              let mixedtest2=[]
              for (const [key, value] of tagsMap) {
                mixedtest2.push(filterThroughAdvancedField(key, arrayFromMainInput, value))
              }
              
              displayRecipes(intersection2(mixedtest2))
              filteredListsAdvancedField = displayItemsInButtonsBlocks(intersection2(mixedtest2))
              suppressItemsClickedFromButtonsBlock(tagsMap)

            }
          }
        }
      })
    })
    window.addEventListener('click', () => {
      foldDropdown(advancedFiltersLi)
    })

    window.addEventListener('click', (e)=> { 
      //console.log(e.target.className.includes("far fa-times-circle"));
      if (e.target.className.includes("far fa-times-circle")){
      //alors supprime le tag
      suppressTag(e)
      tagsMap.delete(e.target.parentNode.parentNode.innerText)
        if (mainInputFilled === false){
          if (tagsMap.size==0){
          // if (tagsMap.delete(e.target.parentNode.parentNode.innerText)===true && tagsMap.size==0){
            displayRecipes(recipes)
            displayItemsInButtonsBlocks(recipes)
          }else if (tagsMap.size===1){
            //tagsMap.forEach((a,b)=> console.log(a, b)); // ingredient, lait de coco
            tagsMap.forEach((itemTittleList, item) => displayRecipes(filterThroughAdvancedField(item, recipes, itemTittleList)))
            tagsMap.forEach((itemTittleList, item) => filteredListsAdvancedField = displayItemsInButtonsBlocks(filterThroughAdvancedField(item, recipes, itemTittleList)))
            suppressItemsClickedFromButtonsBlock(tagsMap)

          }else if (tagsMap.size>1){
            // si dans le reste, il y a au moins deux tags sélectionnés
            let mixedtest2=[]
            for (const [key, value] of tagsMap) {
              mixedtest2.push(filterThroughAdvancedField(key, recipes, value))
            }
            displayRecipes(intersection2(mixedtest2))
            filteredListsAdvancedField = displayItemsInButtonsBlocks(intersection2(mixedtest2))
            suppressItemsClickedFromButtonsBlock(tagsMap)

          }
        } else if (mainInputFilled === true){
          if (tagsMap.size==0){
            // if (tagsMap.delete(e.target.parentNode.parentNode.innerText)===true && tagsMap.size==0){
              displayRecipes(arrayFromMainInput)
              displayItemsInButtonsBlocks(arrayFromMainInput)
            }else if (tagsMap.size===1){
              //tagsMap.forEach((a,b)=> console.log(a, b)); // ingredient, lait de coco
              tagsMap.forEach((itemTittleList, item) => displayRecipes(filterThroughAdvancedField(item, arrayFromMainInput, itemTittleList)))
              tagsMap.forEach((itemTittleList, item) => filteredListsAdvancedField = displayItemsInButtonsBlocks(filterThroughAdvancedField(item, arrayFromMainInput, itemTittleList)))
              suppressItemsClickedFromButtonsBlock(tagsMap)

            }else if (tagsMap.size>1){
              // si dans le reste, il y a au moins deux tags sélectionnés
              let mixedtest2=[]
              for (const [key, value] of tagsMap) {
                mixedtest2.push(filterThroughAdvancedField(key, arrayFromMainInput, value))
              }
              displayRecipes(intersection2(mixedtest2))
              filteredListsAdvancedField = displayItemsInButtonsBlocks(intersection2(mixedtest2))
              suppressItemsClickedFromButtonsBlock(tagsMap)

            }
        }
      }
  })
}

search()




