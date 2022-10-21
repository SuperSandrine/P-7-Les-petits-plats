import { recipes } from "../../data/recipes.js"

// PLAN
// should filter in main input, in different list: description, name & ingredients
//      OK -description
//      OK -name
//      OK -ingredients
//      OK -concatene those array in a same one (spread)
//      OK -display the new array
//     !!(est-ce qu'il peut être intéressant de place le display dans la méthode input pour associer ces actions ?? )
//     !! could be great if i can use it in the second array lists with another verification code
//      -> PAS DEMANDE:une fonction doit vérifier l'input et retourner visuellement une erreur
//en tout cas l'affichage de message d'erreur de non match doit faire ce travail
//      OK - gérer les 3 caractères
//      -> PAS DEMANDE: gérer les accents en vérification de input? (faudrait virer 
// les accents des listes et virer les accents à la tape)
//      -> OU juste prévenir qu'il peut y avoir un problème d'accent ou d'orthographe
//dans le message d'erreur?


// change input text and datas to find a match despite space or case values
const refit = (x => x.trim().toLowerCase())

export function filterThroughMainInput(e, array){
    const filteredArrayDescription = array.filter(recipe => refit(recipe.description).includes(refit(e.target.value)))
    const filteredArrayName = array.filter(recipe => refit(recipe.name).includes(refit(e.target.value)))
    const filteredArrayIngredients = array.filter(recipe => recipe.ingredients.some( ing => refit(ing.ingredient).includes(refit(e.target.value))))
    let mixedfilteredArrayFromSearchBar = [...filteredArrayDescription,...filteredArrayName, ...filteredArrayIngredients]
    const setOfMainSearchInput = [...new Set(mixedfilteredArrayFromSearchBar)]
    console.log(setOfMainSearchInput) 
    return setOfMainSearchInput
}

//console.log(setOfMainSearchInput)
// si SEt Of Main Search est vide, alors il n'y a pas de correspondance
// setOfMainSearchInput.length == 0 
// alors setattribute display flex/ removeattribute display none
// sinon affiché les recettes

    // const filteredArrayDescription = array.filter(recipe => refit(recipe.description).includes(refit(e.target.value)))
    // const filteredArrayName = array.filter(recipe => refit(recipe.name).includes(refit(e.target.value)))
    // const filteredArrayIngredients = array.filter(recipe => recipe.ingredients.some( ing => refit(ing.ingredient).includes(refit(e.target.value))))
    

// - trouver le moyen de conditionner le filtre à appliquer en fonction de l'input
export function filterThroughAdvancedInput(e, array, tittle){
    if(tittle === "appliance"){
        const filteredArrayAppliance = array.filter(recipe => refit(recipe.appliance).includes(refit(e.target.value)))
    console.log("filter appliance : ", filteredArrayAppliance)
    return filteredArrayAppliance
    }
    else if (tittle === "ustensils"){
        const filteredArrayUstensils = array.filter(recipe => recipe.ustensils.some(app=> refit(app).includes(refit(e.target.value))))
        console.log("filter ustensils : ", filteredArrayUstensils)
    return filteredArrayUstensils
    }
    else if (tittle === "ingredients"){
        const filteredAdvancedArrayIngredients = array.filter(recipe => recipe.ingredients.some( ing => refit(ing.ingredient).includes(refit(e.target.value))))
        console.log("filter ingredients : ", filteredAdvancedArrayIngredients);
    return filteredAdvancedArrayIngredients
    }
}


export{refit}