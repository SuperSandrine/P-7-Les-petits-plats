import { recipes } from "../../data/recipes.js"

//const mainInput = document.getElementById('searchBar')

// une fonction doit vérifier l'input et retourner visuellement une erreur
//

const test1= recipes.filter((recipe) => recipe.description.includes("oeuf"))

// should filter in main input, in different list: description, name & ingredient
// could be great if i can use it in the second array lists with another verification code
export function filterThroughInput(){
    //const filteredArrayDescription = recipes.filter(recipe=> recipe.description.includes(e.target.value))
    //const filteredArrayName = recipes.filter((recipe) => recipe.name.includes(e.target.value))
    //const filteredArrayIngredients = recipes.filter((recipe) => recipe.name.includes(e.target.value))
    const test14 = recipes.map((recipe)=> recipe.ingredients.filter(element => element.ingredient.includes("coco")))
//recipes[0].ingredients.filter((item) => item.ingredient.includes("coco"))
    console.log(test14) 
    return test14
}


// mainInput.addEventListener('input', (e) =>{
    
// //    console.log(e.target.value)
// filterThroughInput()
// displayR

// })


//export {mainInput}
