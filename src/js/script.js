"use strict";

const popupLink = "popup__link",
    popupOpen = "popup__open",
    popupClose = "popup__close";



const workItem = document.querySelectorAll('.work__item'),
    popup = document.querySelector('#popup');


workItem.forEach(element => {
    element.classList.add(popupLink);
    element.addEventListener('click', function (elem) {
        let target = elem.target;
        //console.log(elem.target.closest(this));
        let tar = target.cloneNode(false);
        if (element === target.closest('.' + popupLink)) {
            Open(popup, tar);
        }
    });
});

popup.addEventListener('click', function (elem) {
    let target = elem.target;
    if (target.className === "modal__body") {
        Close(popup);
    }
});

function Close(obj) {
    //obj.classList.remove(popupOpen);
    //obj.classList.add(popupClose);
    obj.querySelector(".image--size").remove();

    obj.style.opacity = 0;
    obj.style.visibility = 'hidden';
}

function Open(obj, elem) {
    //obj.classList.remove(popupClose);
    //obj.classList.add(popupOpen);
    obj.style.opacity = 1;
    obj.style.visibility = 'visible';
    obj.querySelector(".modal__content").append(elem);
    let element = elem;

    console.log(element);
    element.classList.remove('img__item');
    element.classList.add("image--size");

    let style = getComputedStyle(obj.querySelector(".modal__content")); //! Считываем стили
    let width = style.getPropertyValue("width"); //! Получаем размер width
    let height = style.getPropertyValue("height");//! Получаем размер height

    element.style.width = "100%";
    element.style.height = "100%";
    element.style.objectFit = 'cover'; 
}
// document.addEventListener("DOMContentLoader", function(){
//     //
// });