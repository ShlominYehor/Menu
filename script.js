const searchBtn = document.querySelector(".search-btn")

const recipeContent = document.querySelector("#recipe-content")
const recipeContentTitle = document.querySelector(".recipe-content-title")

const recipePopup = document.querySelector(".recipe-popup")
const recipePopupClose = document.querySelector(".recipe-popup-close")
const recipePopupContent= document.querySelector(".recipe-popup-content")

searchBtn.addEventListener('click', getRecipes)


function getRecipes (){
    let searchInput = document.querySelector("#search-input").value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(response =>response.json())
    .then(data=>{
        let html = '';
        if(data.meals){
           
            data.meals.forEach(meal=>{
                html +=`<div class="recipe-item" data-id="${meal.idMeal}">
                <div class="recipe-item-img">
                    <img src="${meal.strMealThumb}" alt="">
                </div>

               
                    <h4 class="recipe-item-title">${meal.strMeal}</h4>
                    <a href="" class="recipe-item-btn">Відкрити рецепт</a>
              
                    </div> `
            })
            recipeContent.innerHTML = html

            
            recipeContentTitle.textContent = "Список ваших рецептів"
            const recipeItemBtn = document.querySelectorAll(".recipe-item-btn")
            console.log(recipeItemBtn);
           
            
            recipeItemBtn.forEach(btn =>{
                btn.addEventListener('click', creatPopUp)
            })
           
        } 
        else  {
            alert("Ми не змогли знайти такий інградіент")
        }
    })
}

recipePopupClose.addEventListener("click",(e)=>{
    recipePopup.style.display = "none"
    e.preventDefault();
})



function creatPopUp(e){
    let recipeId = e.target.parentElement.dataset.id;
    e.preventDefault();
    // recipePopup.style.opacity = "1"
    recipePopup.style.display = "block"
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then(response =>response.json())
    .then(data =>{
        let html = '';
        data.meals.forEach(meal => {
            html +=` <div class="recipe-popup-content-img">

                <img src="${meal.strMealThumb}" alt="">
                    </div>

                    <h3 class="recipe-popup-title">
                    ${meal.strMeal}
                    </h3>
                    <div class="recipe-popup-categogy">
                    Категорія: ${meal.strCategory}
                    </div>

                    <div class="recipe-popup-instructions">
                        ${meal.strInstructions}
                    </div>
                    <a href=${meal.strYoutube} class="recipe-poput-link-video">
                             Відео приготування
                    </a>
         `
        
        })
        recipePopupContent.innerHTML = html
       
        
    })

}

