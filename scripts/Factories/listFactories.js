import { refit } from "../Utils/filters.js"

const advancedFiltersMenu= document.getElementById('advancedFilters-list')


// pour chaque recette, la factory récupère les datas et les mets dans une liste
// globale ici??

// crée un tableau des titres des listes
export function createList(array){
    const listTitleApp = (Object.keys(array[0]))[6]
    const listTitleUst = (Object.keys(array[0]))[7]
    const listTitleIng = (Object.keys(array[0]))[3]
    const listTitles = [ listTitleApp,listTitleUst,listTitleIng]
//    console.log(listTitles)
    return listTitles
}


// le paramètre est l'ensemble des recettes mapé par recette, donc recipeDatas= 1 recette
export function createAListFactory(recipeDatas){

    const { id, name, ingredients , time, description, appliance, ustensils} = recipeDatas  


//     function getItemsList(TitreList){
//    const applianceItem = appliance.toLowerCase().trim()
//    console.log('appItem:', applianceItem)
// return applianceItem
// }

    // en paramètre element est le titre de la liste: appliance, austensils ou ingredients
    function getListBlock(element){
        //console.log(name)
        //console.log(appliance)
        // une li
            // une div: span + input (l'un desparait à la faveur de l'autre)
            // ul : ttes les li
        //ferme li
        // 3 blocks sont crée
        // je dois le mettre dans ul

    const liBlock = document.createElement('li')
    liBlock.className='advancedFilters'
    const divButton = document.createElement('button')
    divButton.setAttribute('class',`advancedFilters-button ${element}-color`)
    const divButtonName = document.createElement('span')
    divButtonName.setAttribute('id',`span-${element}`)
    divButtonName.innerText = element
    const divButtonSearchBar = document.createElement('input')
    divButtonSearchBar.setAttribute('class',`${element}-color advancedSearch`)
    divButtonSearchBar.setAttribute('type', 'search')
    divButtonSearchBar.setAttribute('id',`search-${element}`)
    divButtonSearchBar.setAttribute('placeholder',`Rechercher dans ${element}`)
    const menuBlock = document.createElement('menu')
    menuBlock.setAttribute('class',`${element}-color`)
    menuBlock.setAttribute('id',`${element}-list`)
    // const listElement = document.createElement('li') // à créer dynamiquement
    // listElement.setAttribute('class','list')
    // const listElementButton=document.createElement('button')
    // listElementButton.innerText = "grille pain"
    
    
    advancedFiltersMenu.appendChild(liBlock)
    liBlock.appendChild(divButton)
    divButton.appendChild(divButtonName)
    divButton.appendChild(divButtonSearchBar)
    liBlock.appendChild(menuBlock)
    
    
//        return menuBlock
    }
    // une fonction qui prend element (appl, ust ou ing) et 
    // et qui fait un tableau de ces élémenets
    // et qui crée le bouton ci-dessous
    // cette action doit être répété autant de fois que d'élément dans la liste
    
    
    // une fonction qui va chercher dans chaque recette
    // les items de ust, app et ingredients
    // et les met dans un tableau pour affichage
//     function getListElement(recipe, elementName){
//     const { id, name, ingredients , time, description, appliance, ustensils} = recipe  
    
    
//     const applianceItemsList= appliance
// //    [...new Set(array.map((recipe) => refit(recipe.appliance)))]
// //console.log("test20", applianceItemsList)
//     return applianceItemsList
//     }

//  function getListTemplate(itemsArray){
//     const tablooo= itemsArray.map(item =>{
//         const listElement = document.createElement('li') // à créer dynamiquement
//         listElement.setAttribute('class','list')    
//         const listElementButton=document.createElement('button')
//         listElementButton.innerText = item    
//     console.log(listElementButton) // j'ai bien les buttons avec le nom des item
//     })


    function getListTemplate(item, itemTittleList){
        
            const listElement = document.createElement('li') // à créer dynamiquement
            listElement.setAttribute('class','list')    
            const listElementButton=document.createElement('button')
            listElementButton.innerText = item    
            //console.log(listElementButton) // j'ai bien les buttons avec le nom des item
        
        // ça Marche: 
        //  OK - reste à enlever les element en double :)
        //  OK - rendre dynamique en prenant le tableau de résultat de recherche
        //pour créer la liste et non le tableau recipes
        const menuBlock = document.querySelector(`menu #${itemTittleList}-list`)
        menuBlock.appendChild(listElement)
        listElement.appendChild(listElementButton)
        return item
    }


    return{ 
        getListBlock,
        getListTemplate,
    //    getItemsList, 
    }
  }
  