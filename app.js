const mealInput = document.querySelector("#meal-input");
const mealSearchBtn = document.querySelector("#search-btn");


mealSearchBtn.addEventListener("click" , ()=>{
    const mealResults = document.querySelector(".row");
    mealResults.innerHTML = "";

    if (!mealInput.value) {
    alert("Please enter an ingredient");
    }else{
        fetchMeal(mealInput.value);
    }

    mealInput.value="";

})


function fetchMeal(ingName){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`).then(res =>{
        console.log(res)
        if(!res.ok){
            // fetchError(); //!UNUTMA
            throw new Error("Meal could not be fetched")
        }
        return res.json();
    }).then(data => renderMeals(data)).catch((err)=> console.log(err))
}

const renderMeals = (data)=>{
    console.log(data.meals)
    const mealResults = document.querySelector(".row");

    data.meals.forEach(meal => {
        const { strMealThumb, idMeal, strMeal } = meal;

        mealResults.innerHTML += `<div class="card col-md-6 col-lg-4 col-xl-3" style="width: 18rem;">
                    <img src="${strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${strMeal}</h5>                    
                        
                        <button type="button" class="btn btn-danger mt-2 w-50 " data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="${idMeal}">Recipe</button>
                    </div>

                </div>`;
    });

    mealResults.addEventListener("click" , (e)=>{
        e.preventDefault();
        if(e.target.classList.contains("btn")){
            fetchDetails(e.target.id);
        }
    })    
}

const fetchDetails = async function(id){
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    try {
        const res = await fetch(url);
        if(!res.ok){
            throw new Error("something went wrong")
        }
        const myData = await res.json();
        renderDetails(myData)
    }
    catch(error) {
        console.log(error) //!EN SON BAK
    }   
}

const renderDetails = function(data){

 console.log(data.meals[0])

const mealName = document.querySelector(".modal-title")
mealName.textContent = `${data.meals[0].strMeal}`; 

const categoryName = document.querySelector(".category-name")
categoryName.textContent = `${data.meals[0].strCategory}`;

const mealInstructions = document.querySelector(".meal-recipe");
mealInstructions.textContent = `${data.meals[0].strInstructions}`;

const mealImage = document.querySelector(".img-circle img")
mealImage.src = `${data.meals[0].strMealThumb}`;

const btnYoutube = document.querySelector(".modal-footer button a");
btnYoutube.href = `${data.meals[0].strYoutube}`;

}