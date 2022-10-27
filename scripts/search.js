import { recipes } from '../data/recipes.js'
import { createAListFactory, createList } from './Factories/listFactories.js'
import { createARecipeFactory } from './Factories/recipefactories.js'
import { filterThroughMainInput,refit, filterThroughAdvancedField, filterAdvancedItemsListThroughAdvancedInput  } from './Utils/filters.js'
import { foldDropdown, unfoldAndFoldDropdown } from './Utils/dropdown.js'


// ----------------- DOM
const mainInput = document.getElementById('searchBar')
const recipesContainer = document.getElementById('resultRecipes-container')
const noResultsContainer= document.getElementById('noResults')
const selectedTagContainer = document.getElementById("advancedSelectedFilterTags-container")

console.log(recipes)



// ----------------- Fonctions

// TODO= si on ne réutilise pas allRecipes, alors il faudra peut-être passer par un ForEach
// affiche les recettes une par une à partir d'un array de recette trié ou non
function displayRecipes(array){
  recipesContainer.innerHTML = " "
  console.log ('array length ds displayRecipes: ', array.length)
  if (array.length !== 0 ){
    noResultsContainer.style.display="none"
    array.map( recipe => recipesContainer.appendChild(createARecipeFactory(recipe).getRecipeCard()))
//  const allRecipes = array.map( recipe => recipesContainer.appendChild(createARecipeFactory(recipe).getRecipeCard()))
  }else { 
    noResultsContainer.style.display="flex"
  }
}

//affiche les boutons avec leur titre 
function displayListButtons(array){
  const buttonsEntitled = createList(array)
  buttonsEntitled.forEach(element => createAListFactory().getListBlock(element))
  return buttonsEntitled
}

// il faudrait d'abord créer la liste (dans listfactory)
// et ensuite afficher dans les boutons un par un par rapport à la liste
function displayItemsInButtonsBlocks(array){
  const advancedFiltersLists = createAListFactory().makeLists(array)
  console.log("advancedFiltersLists : ", advancedFiltersLists)
  for(const title in advancedFiltersLists){
    //console.log("title ou key", title)
    const menuBlock = document.querySelector(`menu #${title}-list`)
    menuBlock.innerHTML=" "
    advancedFiltersLists[title].map(item => createAListFactory().getListTemplate(item, title))
    //const listapp3 = advancedFiltersLists[key].map(item => {createAListFactory(item).getListTemplate(item, key)
    // TODO : peut-^tre pas besoin de map mais for each
  }
  return advancedFiltersLists
}

function displayTag(item, itemTittleList){
  //console.log("tag displayed : ",item)
    selectedTagContainer.appendChild(createAListFactory().getItemTagTemplate(item, itemTittleList))
  return
}

// supprime tag clické
function suppressTag(e){
  //console.log(e.target.parentNode.parentNode);
  selectedTagContainer.removeChild(e.target.parentNode.parentNode)
  // TODO: doit aussi s'enlever des filtres, où?
  return
}


// ----------------- APPEL des fonctions

displayListButtons(recipes)


displayRecipes(recipes)
let listBoutons= displayItemsInButtonsBlocks(recipes)
//console.log("advanced 2eme affichage en CL, premier display", listBoutons);
// TODO: changer le nom listBoutons

// ce selector capte la liste des boutons qui ouvre la dropdown
// ce selector doit être activé après l'affichage des boutons de listes
// la classe .active se fait sur li
const advancedFiltersLi = document.querySelectorAll("div > menu > li"); 



// ----------------- EVENTS LISTENERS



let mainInputFilled = false

function search(){
// fait d'abord la gestion des inputs
// ensuite la gestion des clicks
  let arrayFromMainInput =[]

  mainInput.addEventListener('input', (event) =>{
    event.stopPropagation()
    console.log(event.target.value)
    selectedTagContainer.innerHTML=""
    tagsMap.clear()

    if (event.target.value.length > 2){
      mainInputFilled = true
      arrayFromMainInput= filterThroughMainInput(event, recipes)
      displayRecipes(arrayFromMainInput)
      listBoutons = displayItemsInButtonsBlocks(arrayFromMainInput)
      // console.log("mainInputFilled rempli : ", mainInputFilled);
    } else if (event.target.value.length < 3){
      // TODO: rajouter un message en dessous "écrire 3 caractères minimum"
      mainInputFilled =false
      displayRecipes(recipes)
      listBoutons = displayItemsInButtonsBlocks(recipes) //recipes s'il n'y a pas un autre array filtré en cours
    }
  })

  //console.log("arrayFromMainInput : ", arrayFromMainInput);
  //console.log("mainInputFilled plein? : ", mainInputFilled);

  const advancedFiltersInput = document.querySelectorAll("div > menu > li > button > input"); 
  advancedFiltersInput.forEach( input => {
    input.addEventListener('input', (event) =>{
      console.log("event", event)
      event.preventDefault() // je sais pas trop à quoi ça sert
      
      // TODO: faire une fonction??? vvvv
      const listTittle = (event.target).getAttribute('data-advanced-filter')
      const lists = listBoutons 
      const listFiltered = filterAdvancedItemsListThroughAdvancedInput(event.target.value,listTittle, lists)
      //console.log("listes filtrés",listFiltered);
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
      unfoldAndFoldDropdown(li, e)        
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
          let itemTittleList = (e.target).getAttribute('data-advanced-filter')
          let item = e.target.innerText
          tagsMap.set(item,itemTittleList)
          console.log("tagsMap",tagsMap)
          selectedTagContainer.innerHTML=""
          //tagsMap.forEach((key, value) => console.log("test alpha", key+ value)) // ingredient lait de coco
          tagsMap.forEach((itemTittL, ItM) => displayTag(ItM,itemTittL))
          document.getElementById(`search-${itemTittleList}`).value="" // vide l'input
          if (tagsMap.size===0){
            // il n'y a pas te tag sélectionné
            displayRecipes(recipes)
            listBoutons = displayItemsInButtonsBlocks(recipes)
          }else if (tagsMap.size===1){
            tagsMap.forEach((a,b)=> console.log(a, b)); // ingredient, lait de coco

            tagsMap.forEach((itemTittleList, item) => displayRecipes(filterThroughAdvancedField(item, recipes, itemTittleList)))
            tagsMap.forEach((itemTittleList, item) => listBoutons = displayItemsInButtonsBlocks(filterThroughAdvancedField(item, recipes, itemTittleList)))
            //console.log("listeBoutons",listBoutons);
          }else if (tagsMap.size>1){
            // s'il y a plus de deux tags sélectionnés
            // je MAP mes tags (du coup les doublons ne sont pas pris en compte)
            // à chaque clic sur tag, une liste de recette est crée et ajouté à l'array mixedtest2. 
            let mixedtest2=[]
            for (const [key, value] of tagsMap) { 
              mixedtest2.push(filterThroughAdvancedField(key, recipes, value))
            }
            console.log("quand plus de 3 tag, le tableau filtré", mixedtest2);
            // l'array mixedtest2 se composent d'un index par tag
            // dans chaque index il y a un tableau des résultats du filtre sur toutes les recettes

            function intersection2(array){
              // cette fonction va vérifier l'intersection entre chaque tableau et la renvoyer
              // initialisation de l'intersection sur l'array[0]
              let intersectionArray = array[0]
                // initialisation de l'intersection sur l'array0
                // pour chaque index, je compare l'index suivant avec le premier index, ensuite je compare l'index suivant avec l'intersection précédente, j'obtiens les intersections entre tous les tags
              for (let i = 0; i < array.length-1; i++) {
                intersectionArray = array[i+1].filter(item => intersectionArray.includes(item))
                //console.log('intersection', intersectionArray)
              }
              return intersectionArray
            };
            displayRecipes(intersection2(mixedtest2))
            listBoutons = displayItemsInButtonsBlocks(intersection2(mixedtest2))
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
            let a = (e.target).getAttribute('data-advanced-filter')
            let b = e.target.innerText
            tagsMap.set(b,a)
            
            selectedTagContainer.innerHTML="" // vide le container avant de le ramplir
            tagsMap.forEach((key, value) => displayTag(value,key))

            document.getElementById(`search-${(e.target).getAttribute('data-advanced-filter')}`).value="" // vide l'input

            if (tagsMap.size===0){
              displayRecipes(filterThroughAdvancedField(e.target.innerText, arrayFromMainInput, (e.target).getAttribute('data-advanced-filter')))
              listBoutons = displayItemsInButtonsBlocks(filterThroughAdvancedField(e.target.innerText, arrayFromMainInput, (e.target).getAttribute('data-advanced-filter')))
            }else if (tagsMap.size===1){
            // il y a un tag sélectionné
              displayRecipes(filterThroughAdvancedField(e.target.innerText, arrayFromMainInput, (e.target).getAttribute('data-advanced-filter')))
              listBoutons = displayItemsInButtonsBlocks(filterThroughAdvancedField(e.target.innerText, arrayFromMainInput, (e.target).getAttribute('data-advanced-filter')))
            }else if (tagsMap.size>1){
            // s'il y a plus de deux tags sélectionnés
            // je MAP mes tags (du coup les doublons ne sont pas pris en compte)
            // à chaque clic sur tag, une liste de recette est crée et ajouté à l'array mixedtest2. 
              let mixedtest2=[]
              for (const [key, value] of tagsMap) {
                mixedtest2.push(filterThroughAdvancedField(key, recipes, value))}
                // console.log("quand plus de 1 tag, le tableau filtré", mixedtest2);
                // l'array mixedtest2 se composent d'un index par tag
                // dans chaque index il y a un tableau des résultats du filtre sur toutes les recettes
                function intersection2(array){
                // cette fonction va vérifier l'intersection entre chaque tableau et la renvoyer
                  let intersectionArray = array[0]
                  for (let i = 0; i < array.length-1; i++) {
                    intersectionArray = array[i+1].filter(item => intersectionArray.includes(item))
                  }
                  return intersectionArray
                };
              displayRecipes(intersection2(mixedtest2))
              listBoutons = displayItemsInButtonsBlocks(intersection2(mixedtest2))
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
        if (tagsMap.size==0){
        // if (tagsMap.delete(e.target.parentNode.parentNode.innerText)===true && tagsMap.size==0){
          displayRecipes(recipes)
          displayItemsInButtonsBlocks(recipes)
        }else if (tagsMap.size===1){
          //tagsMap.forEach((a,b)=> console.log(a, b)); // ingredient, lait de coco
          tagsMap.forEach((itemTittleList, item) => displayRecipes(filterThroughAdvancedField(item, recipes, itemTittleList)))
          tagsMap.forEach((itemTittleList, item) => listBoutons = displayItemsInButtonsBlocks(filterThroughAdvancedField(item, recipes, itemTittleList)))
        }else if (tagsMap.size>1){
          // s'il ne reste plus que deux tags sélectionnés
          let mixedtest2=[]
          for (const [key, value] of tagsMap) {
            mixedtest2.push(filterThroughAdvancedField(key, recipes, value))}
            console.log("quand plus de 1 tag, le tableau filtré", mixedtest2);
              // l'array mixedtest2 se composent d'un index par tag
              // dans chaque index il y a un tableau des résultats du filtre sur toutes les recettes
            function intersection2(array){
              // cette fonction va vérifier l'intersection entre chaque tableau et la renvoyer
              let intersectionArray = array[0]
              for (let i = 0; i < array.length-1; i++) {
                intersectionArray = array[i+1].filter(item => intersectionArray.includes(item))
              }
              return intersectionArray
            };
          displayRecipes(intersection2(mixedtest2))
          listBoutons = displayItemsInButtonsBlocks(intersection2(mixedtest2))
        }
      }
  })
}

search()



// Refactoriser le code de la recherche :
//   >une fonction générale qui filtre et affiche les recettes en prenant en compte :
//      OK-l'input de recherche (si renseigné) 
//      -le filtre applicances (si renseigné) 
//      -le filtre ustensils (si renseigné) 
//      -le filtre ingredients (si renseigné)
//   OK>Quand on saisit dans l'input de recherche, les filtres sont mis à jour
//   OK>Quand on saisit dans l'input d'un filtre, cela met le filtre concerné à jour
//   >Quand on clique sur un filtre, on appelle la fonction générale qui filtre et affiche les recettes
//         -Optionnel : cela met également à jour les autres filtres

// problème de gestion de l'array qui filtre pour affichage, comment le creer?
// comment cumuler des filtres?
// méthode de filterde main Input?
// on recherche par gang , on met dans 1 tableau et on supprime les doublons:
//    soit une fonction qui s'active dès qu'il y a plus d'un tag
//    dès qu'il y a 2 tag : cherche toutes les recette de tag1= crée un tableau, 
//                          puis de tag2=crée un tableau
//                          puis ajoute les tableaux (spread)
//                          puis supprime les doubles
//                          puis affiche

