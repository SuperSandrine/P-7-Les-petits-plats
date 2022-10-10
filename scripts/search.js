import { recipes } from '../data/recipes.js'
import { recipesFactory } from './Factories/recipefactories.js'
import { filterThroughInput } from './Utils/filters.js'

const mainInput = document.getElementById('searchBar')

// 1 - récupérer les données avec fetch : pour se faire, il faudra
// faudrait changer le fichier .js en .json
//async function getRecipesDatas () {
    //await
    //  fetch("./data/recipes.js"
    //  //, {
    //     // headers : { 
    //     //   'Content-Type': 'application/json',
    //     //   'Accept': 'application/json'
    //     //  }
    //     )
     
    //   .then((response) => response.js())
    //   .then((response2) => console.log(response2)
      // .then((response2) => {
      //   recipes = response2
      //   console.log(recipes)
      //)
  //  return { recipes }
//  }


// OK= import/export 2 - Passer les données à une variable 

// 3 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 4 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
//coutry.name.includes(inputSearch.value);

// 3 - Gérer les 3 boutons pour trier (méthode sort()) les pays

const recipesContainer = document.getElementById('resultRecipes-container')

async function displayRecipes(array){
  const allRecipes = array.map( recipe => recipesFactory(recipe).createRecipeCard())
  return allRecipes
}



function init(){
  displayRecipes(recipes)
  
}


init()

mainInput.addEventListener('input', (e) =>{
    
  //    console.log(e.target.value)
  
  displayRecipes(filterThroughInput())
  
  })