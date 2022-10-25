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
//console.log(typeof(recipes))



// ----------------- Fonctions

// TODO= si on ne réutilise pas allRecipes, alors il faudra peut-être passer par un ForEach
// affiche les recettes une par une à partir d'un array de recette trié ou non
function displayRecipes(array){
  recipesContainer.innerHTML = " "
  console.log ('array length ds displayRecipes: ', array.length)
  // ajouter genre null et undefined dans la condition array.length?
  if (array.length !== 0 ){
    noResultsContainer.style.display="none"
  array.map( recipe => recipesContainer.appendChild(createARecipeFactory(recipe).getRecipeCard()))
//  const allRecipes = array.map( recipe => recipesContainer.appendChild(createARecipeFactory(recipe).getRecipeCard()))
  
  }else { 
//    console.log(noResultsContainer)
    noResultsContainer.style.display="flex"
  }
//return allRecipes 
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
    advancedFiltersLists[title].map(item => {createAListFactory().getListTemplate(item, title)
    //const listapp3 = advancedFiltersLists[key].map(item => {createAListFactory(item).getListTemplate(item, key)
    // peut-^tre pas besoin de map mais for each

    })
  //  console.log(listapp3) //(121) undefined 
  // NICOLAs: pourquoi ça renvoit des undefined? problème de portée? où est-ce qu'il faudrait que je le place
  //pour le voir?
  // return listapp3
  }

}

let tagCount=0

function displayTag(item, itemTittleList){
  console.log("tag displayed : ",item)
    tagCount++
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
  // >> ne fait pas parti de la fonction display: s'ajoute au filtre de recheher
  // >> ne fait pas parti de la fonction display: click droix: Se remove et s'enlève des filtres
  return tagCount
}

// suppress tag clicked 
function suppressTag(e){
  selectedTagContainer.removeChild(e.target.parentNode.parentNode)
  // doit aussi s'enlever des filtres, où?
}


// ----------------- APPEL des fonctions

displayListButtons(recipes)

displayRecipes(recipes)
displayItemsInButtonsBlocks(recipes)



// à activer si on a besoin de gérer l'ordre d'appel des fonctions
// function init(){
//   displayRecipes(recipes)
// }
// init()


// ----------------- EVENTS LISTENERS

// -------marchevvv
// mainInput.addEventListener('input', (event) =>{
//   console.log(event.target.value)
//   if (event.target.value.length > 2){
//     displayRecipes(filterThroughMainInput(event, recipes))
//     displayItemsInButtonsBlocks(filterThroughMainInput(event, recipes))
    
//   } else if (event.target.value.length === 0){
//     displayRecipes(recipes)
//     displayItemsInButtonsBlocks(recipes) //recipes s'il n'y a pas un autre array filtré en cours
//   } else{ console.log("attends")}
// })
// -------end^^^



// ce selector capte la liste des boutons qui ouvre la dropdown
// la classe .active se fait sur li
const advancedFiltersLi = document.querySelectorAll("div > menu > li"); 
//console.log(advancedFiltersLi)

/* when one button is clicked : open/close the current dropdown */
// advancedFiltersLi.forEach(li => {
//   li.addEventListener('click', (e) => {
//      console.log("e.target : ", e.target)
//     e.stopImmediatePropagation()
//     unfoldAndFoldDropdown(li, e)
//     // TODO: mettre ce qui suit dans une fonction ?
//     // condition : ne pas cliquer sur le menu (dans les espaces autour des boutons)
//     // et ne pas cliquer sur le bouton de tête (qui ferme la dropdown)
//     if (((e.target).toString().indexOf('Menu') === -1)  &&
//       (!e.target.contains(li.firstChild)) /* button */ && 
//       (!e.target.contains(li.firstChild.firstChild)) /*son span*/ && 
//       (!e.target.contains(li.firstChild.firstChild.nextSibling)) /*son input*/ ){
//       console.log("button clické : ",e.target.innerText )
//       //console.log('data récupéré: ', (e.target).getAttribute('data-advanced-filter'));
//        // faire l'action:
//        //    OK - afficher le tag (cf displayTag())
//        //    OK - filtre recipes avec ce mot clef
//         displayTag(e.target.innerText, (e.target).getAttribute('data-advanced-filter'))
//         displayRecipes(filterThroughAdvancedInput(e.target.innerText, recipes, (e.target).getAttribute('data-advanced-filter')))
//     }
//   })
// })

/* on click outside the dropdown, if deployed,it will be closed*/
// window.addEventListener('click', () => {
//   foldDropdown(advancedFiltersLi)
// })

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
    displayItemsInButtonsBlocks(filterThroughAdvancedInput(event.target.value, recipes,listTittle )) // pour mixer renvoie un array de 6
    // si je clique sur le boutton, alors j'affiche le tag et j'affiche les recettes
  })
})

// window.addEventListener('click', (e)=>{console.log(e.target.className.includes("far fa-times-circle"));
//   if (e.target.className.includes("far fa-times-circle")){
//     //alors supprime le tag
//     suppressTag(e)
//     // et modifie le filtre en fonction 
//   } else {
//     console.log("pas supprimé");
//   }
// })



// Refactoriser le code de la recherche :
//  - une fonction générale qui filtre et affiche les recettes en prenant en compte :
//      - l'input de recherche (si renseigné) 
//      - le filtre applicances (si renseigné) 
//      - le filtre ustensils (si renseigné) 
//      - le filtre ingredients (si renseigné)
// OK - Quand on saisit dans l'input de recherche, les filtres sont mis à jour
// OK - Quand on saisit dans l'input d'un filtre, cela met le filtre concerné à jour
// OK(mais ce n'est pas la fonction générale) - Quand on clique sur un tag de filtre, on appelle la fonction générale qui filtre et affiche les recettes
//      OK - Optionnel : cela met également à jour les autres filtres


// **************************** travail sur le cumul/intersection de recherche
// pour l'instant tout marche/marchait indépendamment les uns des autres
let mainInputFilled = false


function search(){
// on arrive sur la page
// On cherche dans mainInput, les résults s'affichent à 3 caractère
// si on click sur un bouton, les listes sont filtrés
// si je rempli input ou si je click sur un btnTag, alors la recherche doit se faire 
// dans l'array filtré
//let mainInputFilled = false
  let arrayFromMainInput =[]

  mainInput.addEventListener('input', (event) =>{
    console.log(event.target.value)
    if (event.target.value.length > 2){
      mainInputFilled = true
      arrayFromMainInput= filterThroughMainInput(event, recipes)
      displayRecipes(arrayFromMainInput)
      displayItemsInButtonsBlocks(arrayFromMainInput)
      // console.log("mainInputFilled rempli : ", mainInputFilled);
    } else if (event.target.value.length === 0){
      mainInputFilled =false
      displayRecipes(recipes)
      displayItemsInButtonsBlocks(recipes) //recipes s'il n'y a pas un autre array filtré en cours
    } else{ console.log("attends")}
    // TODO: que faire à la place de attends?
  })

  console.log("arrayFromMainInput : ", arrayFromMainInput);
  console.log("mainInputFilled plein? : ", mainInputFilled);
  
  let tagsSet = new Set()
  let tagsArray =[]
  let tagsMap = new Map()
    advancedFiltersLi.forEach(li => {
      li.addEventListener('click', (e) => {
        //console.log("e.target : ", e.target)
        e.stopImmediatePropagation()
        unfoldAndFoldDropdown(li, e)
        // TODO: mettre ce qui suit dans une fonction ?
        // condition : ne pas cliquer sur le menu (dans les espaces autour des boutons)
        // et ne pas cliquer sur le bouton de tête (qui ferme la dropdown)
        if (mainInputFilled == true) {
          if (((e.target).toString().indexOf('Menu') === -1)  &&
            (!e.target.contains(li.firstChild)) /* button */ && 
            (!e.target.contains(li.firstChild.firstChild)) /*son span*/ && 
            (!e.target.contains(li.firstChild.firstChild.nextSibling)) /*son input*/ ){
            //console.log("button clické : ",e.target.innerText )
            let a = (e.target).getAttribute('data-advanced-filter')
            let b = e.target.innerText
            
            //console.log({tittle : a, item:b});
            tagsArray.push({tittle : a, item:b})
            //mySet1.add({a: 1, b: 2}) 
            tagsSet.add({tittle : a, item:b})
            //tagsMap.set((e.target).getAttribute('data-advanced-filter'),e.target.innerText)
              //>>tagsMap écrase si la clef est identique, du coup inversé a et b
            tagsMap.set(b,a)
            
              //tagsSet.add([(e.target).getAttribute('data-advanced-filter'), e.target.innerText])
            // >>cette ligne ne marche pas

            //console.log('data récupéré: ', (e.target).getAttribute('data-advanced-filter'));
            // faire l'action:
            //    OK - afficher le tag (cf displayTag())
            //    OK - filtre recipes avec ce mot clef
              displayTag(e.target.innerText, (e.target).getAttribute('data-advanced-filter'))
              console.log(tagCount);
              if (tagCount==0){

                displayRecipes(filterThroughAdvancedInput(e.target.innerText, arrayFromMainInput, (e.target).getAttribute('data-advanced-filter')))
                displayItemsInButtonsBlocks(filterThroughAdvancedInput(e.target.innerText, arrayFromMainInput, (e.target).getAttribute('data-advanced-filter')))
              } else if (tagCount>0){
                // OK créer un tableau qui cumule les tags
                // OK pour chaque item tagged, récupérer la valeur dans un tableau
                // il faudrait un objet clef+valeur
                // OU un Set: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Keyed_collections#les_ensembles"
                // avantage Set: pas de doubles possibles, suppression par valeur (pas de splice complexe avec appel d'index)
                //tagsSet.add([(e.target).getAttribute('data-advanced-filter'), e.target.innerText])
                // OU un MAP
                // OU un tableau sachant qu'on va chercher intersectiona après:
                console.log('le set',tagsSet);
                // Set(3) {{…}, {…}, {…}}
                // [[Entries]]
                // 0:
                // value: {tittle: 'appliance', item: 'blender'}
                // 1:
                // value: {tittle: 'ustensils', item: 'cuillère à soupe'}
                // 2:
                // value: {tittle: 'appliance', item: 'blender'}
                // size: 3
                // [[Prototype]]: Set
                console.log("l'array",tagsArray);
                  // (3) [{…}, {…}, {…}]
                  // 0: {tittle: 'appliance', item: 'blender'}
                  // 1: {tittle: 'ustensils', item: 'cuillère à soupe'}
                  // 2: {tittle: 'appliance', item: 'blender'}
                  // length: 3
                  // [[Prototype]]: Array(0)
                console.log('le map', tagsMap);
                  //Map(2) {'blender' => 'appliance', 'cuillère à soupe' => 'ustensils'}
                  // [[Entries]]
                  // 0: {"blender" => "appliance"}
                  // 1: {"cuillère à soupe" => "ustensils"}
                  // size: 2
                  // [[Prototype]]: Map


                //technique et syntaxe
                // converting between Set and Array
// const mySet2 = new Set([1, 2, 3, 4]);
// console.log("un set :", mySet2);
// console.log(mySet2.size); // 4
// console.log("un array :",[...mySet2]); // [1, 2, 3, 4]

// // intersect can be simulated via
// const intersection = new Set([...mySet1].filter((x) => mySet2.has(x)));
// console.log('intersection',intersection);
              
                // OK récupérer l'array (déjà filtré dans mainInput ou array Recipes)
                // OK récupérer le tittle 
                // filtrer l'un après les autres dans le tableau renvoyé
                // OU filtrer dans le tableau original, cumuler les résultats et supprimer les doublons
                // enfin diplay le dernier array (ça marche ça?)

                // filterThroughAdvancedInput(valeur, array, tittle)
                // displayRecipes(array)
              
                // vvvvvvvTECHNIQUE MAP

                // ^^^^^^^

                // vvvvvvvTECHNIQUE ARRAY:vvvvvv marche en parti
                //   console.log("tagsArray:",tagsArray);
                //   const newarray1 = tagsArray.map(tag => filterThroughAdvancedInput(tag.item, arrayFromMainInput, tag.tittle))
                //    Si utilise forEach, newArra1 est undefined
                //    console.log("newarray1",newarray1);//ça marche 
                //    un tableau dans lequel est poussé un tableau de recette filtré,
                //    alors j'affiche le dernier élément pushé
                //   displayRecipes(newarray1[newarray1.length-1]) // renvoie une undefined card
                //   displayItemsInButtonsBlocks(newarray1[newarray1.length-1])
                //    if (tagCount>1){
                //     console.log("newarray1",newarray1);//ça marche 

                //     const newarray2 = tagsArray.map(tag => filterThroughAdvancedInput(tag.item, newarray1[newarray1.length-1], tag.tittle))
                //     console.log("newarray2",newarray2)
                //     displayRecipes(newarray2[newarray2.length-1]) // renvoie une undefined card
                //     displayItemsInButtonsBlocks(newarray2[newarray2.length-1])
                //     if (tagCount>2){
                //       const newarray3 = tagsArray.map(tag => filterThroughAdvancedInput(tag.item, newarray2[newarray2.length-1], tag.tittle))
                //       console.log("newarray3",newarray3)
                //       displayRecipes(newarray3[newarray3.length-1]) // renvoie une undefined card
                //       displayItemsInButtonsBlocks(newarray3[newarray3.length-1])
                //     } else{
                //       console.log("erreur sur newarray3");
                //     }

    
    
                //   }else{
                //     console.log("erreur sur newarray2");
                //   }
                // } else{
                //   console.log("erreur sur newarray1");
                
                // // *** ça affiche mais ça bug après car un problème de récursivité je pense
                // // *** genre mainInput: sucre = 9 recette
                // // *** filter : blender=2recettes
                // // *** filter2 : presse-citron: 3 recettes (où va-t-il chercher cette 3eme recette???)
                //^^^^^marche en partie
            }
          }
        } else if (mainInputFilled===false){
          // le champs MainInput n'est pas renseigné
          
              // TODO: mettre ce qui suit dans une fonction ?
              // condition : ne pas cliquer sur le menu (dans les espaces autour des boutons)
              // et ne pas cliquer sur le bouton de tête (qui ferme la dropdown)
              // NICOLAS: quel est le else d'un fonction à un seul if?
              if (((e.target).toString().indexOf('Menu') === -1)  &&
              (!e.target.contains(li.firstChild)) /* button */ && 
              (!e.target.contains(li.firstChild.firstChild)) /*son span*/ && 
              (!e.target.contains(li.firstChild.firstChild.nextSibling)) /*son input*/ ){
              //console.log("button clické : ",e.target.innerText )
              //console.log('data récupéré: ', (e.target).getAttribute('data-advanced-filter'));
              // faire l'action:
              //    OK - afficher le tag (cf displayTag())
              //    OK - filtre recipes avec ce mot clef
                displayTag(e.target.innerText, (e.target).getAttribute('data-advanced-filter'))

                let a = (e.target).getAttribute('data-advanced-filter')
                let b = e.target.innerText
                  //tagsArray.push({tittle : a, item:b})
                  //tagsSet.add({tittle : a, item:b})
                  tagsMap.set(b,a)
                  console.log("tagsMap",tagsMap)

                if (tagCount==0){
                displayRecipes(filterThroughAdvancedInput(e.target.innerText, recipes, (e.target).getAttribute('data-advanced-filter')))}
                else if (tagCount>1){
                  // TODO: créer un array spécial (paramètre pour displayRecipes)

                  //Map(2) {'blender' => 'appliance', 'cuillère à soupe' => 'ustensils'}
                  // [[Entries]]
                  // 0: {"blender" => "appliance"}
                  // 1: {"cuillère à soupe" => "ustensils"}
                  // size: 2
                  // [[Prototype]]: Map
                  
                  function intersection(first, second)
                  {
                      let s = new Set(second);
                      return first.filter(item => s.has(item));
                  };

                  let mixedtest=[]
                  for (const [key, value] of tagsMap) {
                    mixedtest.push(filterThroughAdvancedInput(key, recipes, value))}
                    console.log("mixedtest1 juste filtré/pushé",mixedtest)
                   let newmix = intersection(mixedtest[mixedtest.length-2], mixedtest[mixedtest.length-1])
                   console.log("newmix",newmix);
                   mixedtest.push(newmix)
                   displayRecipes(newmix)
                   displayItemsInButtonsBlocks(newmix)
                    // ça marche avec 2 mais pas avec 3 
 
              
                  // avec ceci, j'ai seulement une union des filtres et non une intersection, soit un OU et non &&
                  // par contre crée un nouvel array à chaqye tag (venant de filters 51)
                  // comment faire pour garder que les intersections???
                  // j'ai deux lignes que je dois comparer pour retourner l'intersection
                  // je vide le tableau et push l'intersection dans le tableau


                    // chaque key/value de tagsMap, 
                    //   -filtrer l'array recette
                    //   -prendre le résultat et le mettre dans un array
                    //   -enlever les doubles
                    //   -afficher les résultats

                    

                //     if (value === "ustensils"){
                //       const UsArray = recipes.filter(recipe => recipe.ustensils.some(app=> refit(app).includes(key)))
                //       console.log("usArray", UsArray);
                //       return UsArray
                //   } else if(value === "appliance"){
                //     const ApArray = recipes.filter(recipe => refit(recipe.appliance).includes(key))
                //     console.log("ApArray", ApArray);
                //     return ApArray
                //   }
                //   let mixedArray = [...UsArray,...ApArray]
                //   const setMixes = [...new Set(mixedArray)]
                //   console.log("set mixe", setMixes);

                //     return setMixes
                // }



                //   c    if(tittle === "appliance"){
                //     const filteredArrayAppliance = array.filter(recipe => refit(recipe.appliance).includes(refit(valeur)))
                // console.log("filter appliance : ", filteredArrayAppliance)
                // return filteredArrayAppliance
                // }
                // else if (tittle === "ustensils"){
                //     const filteredArrayUstensils = array.filter(recipe => recipe.ustensils.some(app=> refit(app).includes(refit(valeur))))
                //     console.log("filter ustensils : ", filteredArrayUstensils)
                // return filteredArrayUstensils
                // }
                // else if (tittle === "ingredients"){
                //     const filteredAdvancedArrayIngredients = array.filter(recipe => recipe.ingredients.some( ing => refit(ing.ingredient).includes(refit(valeur))))
                //     console.log("filter ingredients : ", filteredAdvancedArrayIngredients);
                // return filteredAdvancedArrayIngredients
                // }
            

                  // pour chaque tag, faire une liste de recette
                  // pour chaque element de MAPTag, vérifier s'il y a des recette intersections
                  //const filteredArray = array1.filter(value => array2.includes(value));
                  //Map(2) {'blender' => 'appliance', 'cuillère à soupe' => 'ustensils'}
                  // [[Entries]]
                  // 0: {"blender" => "appliance"}
                  // 1: {"cuillère à soupe" => "ustensils"}
                  // size: 2
                  // [[Prototype]]: Map
                  





                }
              
              }
              
        }
      })
    })

    window.addEventListener('click', () => {
      foldDropdown(advancedFiltersLi)
    })
    window.addEventListener('click', (e)=>{console.log(e.target.className.includes("far fa-times-circle"));
      if (e.target.className.includes("far fa-times-circle")){
        //alors supprime le tag
        tagCount--
        suppressTag(e)
        // et modifie le filtre en fonction 
      } else {
        console.log("pas supprimé");
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