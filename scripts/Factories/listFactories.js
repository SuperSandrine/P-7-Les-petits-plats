    // PLAN (todo: plan à modifier car les tableaux ont été fait ailleurs)
    // une fonction qui prend element (appl, ust ou ing) et 
    // et qui fait un tableau de ces élémenets
    // et qui crée le bouton ci-dessous
    // cette action doit être répété autant de fois que d'élément dans la liste
    
    // une fonction qui va chercher dans chaque recette
    // les items de ust, app et ingredients
    // et les met dans un tableau pour affichage
    // function getListElement(recipe, elementName){
    // const { id, name, ingredients , time, description, appliance, ustensils} = recipe  


// ----------------- DOM
const advancedFiltersMenu= document.getElementById('advancedFilters-list')


// ----------------- functions

// crée un tableau des titres des listes pour affichage en tête de liste
export function createList(array){
    const listTitleApp = (Object.keys(array[0]))[6]
    const listTitleUst = (Object.keys(array[0]))[7]
    const listTitleIng = (Object.keys(array[0]))[3]
    const listTitles = [ listTitleApp,listTitleUst,listTitleIng]
//    console.log(listTitles)
    return listTitles
}


// le paramètre est l'ensemble des recettes mapé par recette, donc recipeDatas= 1 recette
// ou en paramètre est mis une liste mapé, donc on travaille par élément de cette liste
export function createAListFactory(recipeDatas){
    // const { id, name, ingredients , time, description, appliance, ustensils} = recipeDatas  

    // en paramètre element est le titre de la liste: appliance, ustensils ou ingredients
    // fabrique la partie bouton de tête de liste
    function getListBlock(element){
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
        
        advancedFiltersMenu.appendChild(liBlock)
        liBlock.appendChild(divButton)
        divButton.appendChild(divButtonName)
        divButton.appendChild(divButtonSearchBar)
        liBlock.appendChild(menuBlock)
        // return menuBlock
        // TODO: qu'est que je retourne?
    }

    function getListTemplate(item, itemTittleList){
        const listElement = document.createElement('li')
        listElement.setAttribute('class','list')    
        const listElementButton=document.createElement('button')
        listElementButton.innerText = item    
        //console.log(listElementButton) // j'ai bien les buttons avec le nom des item

        const menuBlock = document.querySelector(`menu #${itemTittleList}-list`)
        menuBlock.appendChild(listElement)
        listElement.appendChild(listElementButton)
        return item
    }


    return{ 
        getListBlock,
        getListTemplate,
    }
}
