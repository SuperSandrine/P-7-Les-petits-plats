

// pour les suites de caractères, supprimer espaces et mettre en case minuscule
const refit = (x => x.trim().toLowerCase())

// renvoie une liste de recettes filtrés en de event (e.tagert.value)
export function filterThroughMainInput(e, array){
    const filteredArrayDescription = array.filter(recipe => refit(recipe.description).includes(refit(e.target.value)))
    const filteredArrayName = array.filter(recipe => refit(recipe.name).includes(refit(e.target.value)))
    const filteredArrayIngredients = array.filter(recipe => recipe.ingredients.some( ing => refit(ing.ingredient).includes(refit(e.target.value))))
    let mixedfilteredArrayFromSearchBar = [...filteredArrayDescription,...filteredArrayName, ...filteredArrayIngredients]
    const setOfMainSearchInput = [...new Set(mixedfilteredArrayFromSearchBar)]
    console.log("ensemble des results de mainInput : ", setOfMainSearchInput) 
    return setOfMainSearchInput
}

// renvoie une liste de recettes filtrés en de event (e.tagert.value)
export function loopThroughMainInput(e, array){
    let mixedShortenedArray=[]

    for (let i = 0; i < array.length; i++) {
        if (refit(array[i].description).includes(refit(e.target.value))===true){
            if (!mixedShortenedArray.includes(array[i])){
            mixedShortenedArray.push(array[i])
        }
    }
        else if (refit(array[i].name).includes(refit(e.target.value))===true){
            if (!mixedShortenedArray.includes(array[i])){
                mixedShortenedArray.push(array[i])
            }
        }
        for (let j = 0; j < array[i].ingredients.length; j++){
            if(refit(array[i].ingredients[j].ingredient).includes(refit(e.target.value))===true){
                if (!mixedShortenedArray.includes(array[i])){
                    mixedShortenedArray.push(array[i])
                }
            }
        }
    }
    console.log("mixed test", mixedShortenedArray);
    return mixedShortenedArray
}



// du tableau de liste, 
// recherche une suite de caractère venant d'un input dit valeur (e.target.value) 
// et renvoie une liste filtrée d'items
export function filterAdvancedItemsListThroughAdvancedInput(valeur, tittle, arraydeslistes){
    if(tittle === "appliance"){
        const filteredWithInputInAppliance = (arraydeslistes.appliance).filter(item => item.includes(refit(valeur)))
    return filteredWithInputInAppliance
    } 
    else if (tittle === "ustensils"){
        const filteredWithInputInUstensils = (arraydeslistes.ustensils).filter(item => item.includes(refit(valeur)))
    return filteredWithInputInUstensils
    }
    else if (tittle === "ingredients"){
        const filteredWithInputInIngredients = (arraydeslistes.ingredients).filter(item => item.includes(refit(valeur)))
        //console.log("filter with input ingredients : ", filteredWithInputInIngredients);
    return filteredWithInputInIngredients
    }
}


// à partir d'un tableau (array) de recettes (filtrées ou non), cherche une valeur dans sa liste (tittle)
// filtre le tableau en gardant les recette ayant cette valeur, 
// renvoie la liste des recette contenant la valeur
export function filterThroughAdvancedField(valeur, array, tittle){
    if(tittle === "appliance"){
        const filteredArrayAppliance = array.filter(recipe => refit(recipe.appliance).includes(refit(valeur)))
        //console.log("filter appliance : ", filteredArrayAppliance)
    return filteredArrayAppliance
    }
    else if (tittle === "ustensils"){
        const filteredArrayUstensils = array.filter(recipe => recipe.ustensils.some(app=> refit(app).includes(refit(valeur))))
        //console.log("filter ustensils : ", filteredArrayUstensils)
    return filteredArrayUstensils
    }
    else if (tittle === "ingredients"){
        const filteredAdvancedArrayIngredients = array.filter(recipe => recipe.ingredients.some( ing => refit(ing.ingredient).includes(refit(valeur))))
        //console.log("filter recipe through ingredients : ", filteredAdvancedArrayIngredients);
    return filteredAdvancedArrayIngredients
    }
}

//  Dans un tableau de tableaux filtrés,(au moins 2 index)
//  cette fonction va vérifier l'intersection entre chaque tableau 
//  et la renvoyer (tableau de recettes filtrées sur intersection)
export function intersection2(array){
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

export{refit}