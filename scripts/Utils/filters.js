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

// renvoie une liste de recettes
export function filterThroughMainInput(e, array){
    const filteredArrayDescription = array.filter(recipe => refit(recipe.description).includes(refit(e.target.value)))
    const filteredArrayName = array.filter(recipe => refit(recipe.name).includes(refit(e.target.value)))
    const filteredArrayIngredients = array.filter(recipe => recipe.ingredients.some( ing => refit(ing.ingredient).includes(refit(e.target.value))))
    let mixedfilteredArrayFromSearchBar = [...filteredArrayDescription,...filteredArrayName, ...filteredArrayIngredients]
    const setOfMainSearchInput = [...new Set(mixedfilteredArrayFromSearchBar)]
    console.log("ensemble des results de mainInput : ", setOfMainSearchInput) 
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
    

    // il ne faudrait pas que ça cherche dans recipe, mais plutôt dans l'array qui affiche les listes
export function filterAdvancedItemsListThroughAdvancedInput(valeur, tittle, arraydeslistes){
    if(tittle === "appliance"){
        const filteredWithInputInAppliance = (arraydeslistes.appliance).filter(item => item.includes(refit(valeur)))
    //console.log("filter appliance : ", filteredWithInputInAppliance)
    return filteredWithInputInAppliance
    } 
    // appliance ça marche car un seul appliance par recette

    else if (tittle === "ustensils"){

        const filteredWithInputInUstensils = (arraydeslistes.ustensils).filter(item => item.includes(refit(valeur)))
        //console.log("ça marche ", filteredWithInputInUstensils);
        //const filteredArrayUstensils = array.filter(recipe => recipe.ustensils.some(app=> refit(app).includes(refit(valeur))))
        //console.log("comment ça marche 1:", recipes[0].ustensils);
        //console.log("filter ustensils : ", filteredArrayUstensils)
    return filteredWithInputInUstensils
    }
    else if (tittle === "ingredients"){
//        console.log("araydeslistes.ingredients", arraydeslistes.ingredients);
        const filteredWithInputInIngredients = (arraydeslistes.ingredients).filter(item => item.includes(refit(valeur)))
        //console.log("filter ingredients : ", filteredWithInputInIngredients);
    return filteredWithInputInIngredients
    }
}


// - trouver le moyen de conditionner le filtre à appliquer en fonction de l'input
// renvoie une liste de recettes (veleur peut être e.target de input ou de click)
export function filterThroughAdvancedField(valeur, array, tittle){
    if(tittle === "appliance"){
        const filteredArrayAppliance = array.filter(recipe => refit(recipe.appliance).includes(refit(valeur)))
    console.log("filter appliance : ", filteredArrayAppliance)
    return filteredArrayAppliance
    }
    else if (tittle === "ustensils"){
        const filteredArrayUstensils = array.filter(recipe => recipe.ustensils.some(app=> refit(app).includes(refit(valeur))))
        console.log("filter ustensils : ", filteredArrayUstensils)
    return filteredArrayUstensils
    }
    else if (tittle === "ingredients"){
        const filteredAdvancedArrayIngredients = array.filter(recipe => recipe.ingredients.some( ing => refit(ing.ingredient).includes(refit(valeur))))
        console.log("filter ingredients : ", filteredAdvancedArrayIngredients);
    return filteredAdvancedArrayIngredients
    }
}






export{refit}