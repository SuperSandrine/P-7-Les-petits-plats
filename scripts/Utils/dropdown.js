

export function foldDropdown (elementMenu) {
    for (let i = 0; i < elementMenu.length; i++) {
    elementMenu[i].classList.remove('active')
  }}

export function unfoldAndFoldDropdown(li, e){
    if (li.classList.contains('active') && (li.firstChild === e.target)){
        li.classList.remove('active')
    }else if(!li.classList.contains('active')){
        li.classList.add('active')
    }

    
}


// const advancedSearchButtons = document.getElementsByClassName("advancedFilters")
// console.log(advancedSearchButtons)

// vvv //Pas optimal car ne gère que l'ouverture:
// export function animateDropdown(e, button){
//     //const arrowMoves = document.querySelector(`button.advancedFilters-button.${e.target.innerHTML}-color`)
//     //console.log(arrowMoves)
//     const ulToBeDeployed = document.getElementById(`${e.target.innerText}-list`)
//     console.log(ulToBeDeployed)
//     const advancedFilterInput = document.getElementById(`search-${e.target.innerText}`)
//     console.log(advancedFilterInput)
//     const advancedFilterSpan = document.getElementById(`span-${e.target.innerText}`)
//     console.log(advancedFilterSpan)


//     // rajouter classe hide, pour ça enlever les id 
//     // et utiliser plutôt des classe? ...
//     // trouver un moyen de faire une dropdown
//     //  - rajouter des conditions
//     //  - au click sur le bouton: je la déploie
//     //  - au click sur le bouton: si elle est déployé, je la cache
//     //  - si je clique en dehors de la fenêtre, toutes les dropdown se ferment

// //    if (ulToBeDeployed.style.display === "none"){
//     console.log(e.target.innerText)
//     button.classList.toggle('clicked')
//     ulToBeDeployed.style.display="flex"
//     advancedFilterInput.style.display="block"
//     advancedFilterSpan.style.display="none"
// }
//^^^ênd animate


