const textInput = document.getElementById("textInput");
const rangeInput = document.getElementById("rangeInput");
const displayRange = document. getElementById("displayRange");
const cardContainer = document.getElementById("card-container");
const btn = document.querySelector("button");

let meals = [];
let sortMethod = false;
const fetchMeals = () => {
    let search = "chicken";
    if (textInput.value) search = textInput.value;
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
.then(response => response.json())
.then((data) => {
     meals = data.meals
     if (meals) displayMeals();
    });
};

const displayMeals = () => {
    cardContainer.innerHTML = "";
    meals
    .sort((a, b) => {
        if (sortMethod) {
            return a.strMeal.toLowerCase().localeCompare(b.strMeal.toLowerCase());
        }
        return b.strMeal.toLowerCase().localeCompare(a.strMeal.toLowerCase());
    })
    .slice(0,rangeInput.value)
    .map((m) => {
        cardContainer.innerHTML += `
        <div class="card">
        <h3>${m.strMeal}</h3>
        <img src="${m.strMealThumb}" alt="">
        <span>Origine : ${m.strArea} </span>
        <p>
        ${m.strInstructions}
        </p>
        </div>
        `;
    })
}

rangeInput.addEventListener("input",(e) => {
    displayRange.textContent = e.target.value;
    displayMeals();
});


textInput.addEventListener("change", fetchMeals);

btn.addEventListener("click", () => {
    btn.innerHTML = sortMethod? "A-Z" : "Z-A"
    sortMethod = !sortMethod;
    displayMeals();
})

fetchMeals();