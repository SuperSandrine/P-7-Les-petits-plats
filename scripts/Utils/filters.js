import { recipes } from "../../data/recipes.js"

//const mainInput = document.getElementById('searchBar')

// une fonction doit vérifier l'input et retourner visuellement une erreur
//

const test1= recipes.filter((recipe) => recipe.description.includes("oeuf"))

// should filter in main input, in different list: description, name & ingredients
//      OK -description
//      OK -name
//      OK -ingredients
//      OK -concatene those array in a same one (spread)
//      OK -display the new array
//      (est-ce qu'il peut être intéressant de place le display
//      dans la méthode input pour associer ces actions ?? )
// could be great if i can use it in the second array lists with another verification code
//      -> gérer les accents en vérification de input? (faudrait virer 
// les accents des listes et virer les accents à la tape)
//      -> OU juste prévenir qu'il peut y avoir un problème d'accent

export function filterThroughInput(e, array){
    const filteredArrayDescription = array.filter(recipe => recipe.description.toLowerCase().trim().includes((e.target.value).toLowerCase().trim()))
    const filteredArrayName = array.filter(recipe => recipe.name.toLowerCase().trim().includes((e.target.value).toLowerCase().trim()))
    const filteredArrayIngredients = array.filter(recipe => recipe.ingredients.some( ing => ing.ingredient.toLowerCase().trim().includes((e.target.value).toLowerCase().trim())))
    let mixedfilteredArrayFromSearchBar = [...filteredArrayDescription,...filteredArrayName, ...filteredArrayIngredients]
    const setOfMainSearchInput = [...new Set(mixedfilteredArrayFromSearchBar)]

    console.log(setOfMainSearchInput) 
    return setOfMainSearchInput
}

export function actionsOnInputSearch(){
    toLowerCase().trim()
}


// mainInput.addEventListener('input', (e) =>{
    
// //    console.log(e.target.value)
// filterThroughInput()
// displayR

// })


//export {mainInput}
//export{setOfMainSearchInput}
