

export function foldDropdown (elementMenu) {
    for (let i = 0; i < elementMenu.length; i++) {
    elementMenu[i].classList.remove('active')
    }
}

export function unfoldAndFoldDropdown(li, e){
    if (li.classList.contains('active') && (li.firstChild === e.target)){
        li.classList.remove('active')
    }else if(!li.classList.contains('active')){
        li.classList.add('active')
    }
}



