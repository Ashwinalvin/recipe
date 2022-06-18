const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


searchBtn.addEventListener('click',getMealList);
mealList.addEventListener('click',getMealRecipe);
function getMealList(){
    let searchInputText = document.getElementById('search-input').value.trim();
    console.log(searchInputText);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`).then(response=>response.json()).then(data=>{
        let html="";
        
        if(data.meals){
            data.meals.forEach(meal=>{
                html+=` <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                   <img src="${meal.strMealThumb}" alt="food">

                </div>

                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get receipe</a>
                </div>
                
            </div>`
            })
        }else{
            html="Sorry No Results"
        }
        mealList.innerHTML = html;
    })
}
//as soon as we click search button in console we can see the result
//from 25:00


function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(response=>response.json()).then(data=>{
            mealRecipeModal(data.meals);
        })
    }
}


//create a modal
function mealRecipeModal(meal){
    meal=meal[0]

    console.log(meal);
    let mh=`<h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
        
    </div>
    <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">

            
       </div>
       <div class="recipe-link">
           <a href="${meal.strYoutube}" target="_blank"> Watch Videos</a>
       </div>`
       mealDetailsContent.innerHTML= mh;
       mealDetailsContent.parentElement.classList.add('showRecipe');
    }
//35:00