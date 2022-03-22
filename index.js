// Déclaration des variables
const recipesContainer = document.getElementById('container');
const fullIngredientList = getIngredients(recipes);
let filteredIngredientList = [...fullIngredientList]; // clone d'un tableau avec le "spread operator"
const ingredientsBtn = document.getElementById('ingredients');
const devicesBtn = document.getElementById('devices');
const ustensilsBtn = document.getElementById('ustensils');
const ingredientsListContainer = document.getElementById('ingredients-list-container');
const ingredientsChevronDown = document.getElementById('ingredients-chevron-down');
const ingredientsChevronUp = document.getElementById('ingredients-chevron-up');
const ingredientsList = document.getElementById('ingredients-list');
const tagContainer = document.getElementById('tags-container');
let ingredientsInput = document.getElementById('input-ingredients');

/**
 * Afficher les recettes
 * @param {array} recipes Tableau de recettes
 */
function displayRecipes(recipes) {
    for (let i = 0; i < recipes.length; i++) {
        const article = document.createElement('article');
        article.classList.add('recipe-card');
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('img-card');
        article.appendChild(imageDiv);
        const header = document.createElement('header');
        header.classList.add('padded-container','d-flex','title-container');
        article.appendChild(header);
        const h3 = document.createElement('h3');
        h3.classList.add('lato');
        header.appendChild(h3);
        h3.innerText = recipes[i].name;
        const divTime = document.createElement('div');
        divTime.classList.add('timer-container-card');
        const clock = document.createElement('i');
        clock.classList.add('fa-regular','fa-clock');
        divTime.appendChild(clock);
        const spanTime = document.createElement('span');
        spanTime.classList.add('timer-card','lato');
        spanTime.innerText = `${recipes[i].time} min`;
        divTime.appendChild(spanTime);
        header.appendChild(divTime);
        const divRecipe = document.createElement('div');
        divRecipe.classList.add('d-flex','padded-container','lato');
        article.appendChild(divRecipe);
        const ingredientsContainer = document.createElement('div');
        ingredientsContainer.classList.add('ingredients-container');
        divRecipe.appendChild(ingredientsContainer);

        for (j = 0; j < recipes[i].ingredients.length; j++) {
            const divIngredient = document.createElement('div');
            const spanIngredientTitle = document.createElement('span')
            spanIngredientTitle.classList.add('ingredient-name')
            spanIngredientTitle.innerText = `${recipes[i].ingredients[j].ingredient} `;
            const spanIngredientQuantity = document.createElement('span')
            spanIngredientQuantity.classList.add('ingredient-name','ingredient-quantity')
            if ('unit' in recipes[i].ingredients[j] && 'quantity' in recipes[i].ingredients[j]) {
                spanIngredientQuantity.innerText = `: ${recipes[i].ingredients[j].quantity} ${recipes[i].ingredients[j].unit}`;
            }
            else if ('quantity' in recipes[i].ingredients[j]) {
                spanIngredientQuantity.innerText = `: ${recipes[i].ingredients[j].quantity}`;
            }
            else {
                spanIngredientQuantity.innerText = '';
            }
            divIngredient.appendChild(spanIngredientTitle);
            divIngredient.appendChild(spanIngredientQuantity);
            ingredientsContainer.appendChild(divIngredient);
        }

        const description = document.createElement('p');
        description.classList.add('recipe-description','roboto');
        description.innerText = recipes[i].description;
        divRecipe.appendChild(description);
        recipesContainer.appendChild(article);
    }
}

/**
 * Algorithme qui récupère tous les ingrédients
 * @param {array} recipes Tableau de recettes
 * @returns 
 */
function getIngredients(recipes) {
    let tab = [];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            let ingredientLowerCase = recipes[i].ingredients[j].ingredient.toLowerCase();
            if (tab.indexOf(ingredientLowerCase) === -1 ) {
                tab.push(ingredientLowerCase);
            }
        }
    }
    return tab;
}

/**
 * Affiche les ingrédients
 * @param {array} ingredients Tableau d'ingredient
 */
function displayIngredients(ingredients) {
    // 1 -> vider la liste
    ingredientsList.innerHTML = "";
    // 2 -> remplir la liste
    ingredientsBtn.style.display = "none";
    ingredientsListContainer.style.display = "block";
    devicesBtn.style.position = "inherit";
    devicesBtn.style.left = "620px";
    ustensilsBtn.style.position = "inherit";
    ustensilsBtn.style.left = "620px";
    ingredients.forEach((ingredient) => {
        const spanIngredient = document.createElement('span');
        spanIngredient.classList.add('list-element','lato');
        spanIngredient.innerText = ingredient[0].toUpperCase() + ingredient.slice(1);
        spanIngredient.addEventListener('click', () => {
            // TODO: afficher l'ingredient dans un block au dessus de la recherche
            // TODO: filtrer la liste des recettes
            let newRecipes = filterRecipes(recipes, spanIngredient.innerText.toLocaleLowerCase());
            displayRecipes(newRecipes);
        });
        ingredientsList.appendChild(spanIngredient);
    })  
}

/**
 * Filtre le tableau des ingredients
 * @param {array} fullIngredientsTab le tableau complet des ingredients
 * @param {string} searchInput la valeur à rechercher dans les ingrédients
 * @returns {array} un nouveau tableau d'ingrédient filtré
 */
function filterIngredients(fullIngredientsTab, searchInput) {
    let newIngredientsTab = [];
    for (const ingredient of fullIngredientsTab) {
        if (ingredient.indexOf(searchInput) > -1) {
            newIngredientsTab.push(ingredient)
        }
    }
    return newIngredientsTab;
}

/**
 * Filtre le tableau des recettes
 * @param {array} recipes le tableau des recette
 * @param {string} searchInput valeur de la recherche
 * @returns {array} newRecipesTab - le nouveau tableau de recette filtré
 */
function filterRecipes(recipes, searchInput, type = "ingredients") {
    console.log(recipes, searchInput);
    let newRecipeTab = [];
    for (let i = 0; i < recipes.length; i++) {

        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            const element = recipes[i].ingredients[j].ingredient;

            console.log(element);
            
            if (element.toLocaleLowerCase().indexOf(searchInput) > -1) {
                newRecipeTab.push(recipes[i]);
            }
        }

        /*if (type==='name') {

            if (recipes[i].name.toLocaleLowerCase().indexOf(searchInput) > -1) {
                newRecipeTab.push(recipes[i]);
            }

        } else if (type === 'ingredients') {

        }  else if (type === 'ustensile') {
            */

    }
    console.log(newRecipeTab);
    return newRecipeTab;
}

/**
 * Replier liste ingrédients
 */
function hideIngredients() {
    ingredientsBtn.style.display = "block";
    ingredientsListContainer.style.display = "none";
    devicesBtn.style.position = "initial";
    ustensilsBtn.style.position = "initial";
}

/**
 * Ecouter les événements 
 */
function initEventsListeners() {
    ingredientsChevronDown.addEventListener('click', displayIngredients.bind(this, fullIngredientList));
    ingredientsChevronUp.addEventListener('click', hideIngredients);
    ingredientsInput.addEventListener('keyup', (event) => {
        if (ingredientsInput.value.length > 2 || event.key === "Backspace") {
            let newIngredients = filterIngredients(fullIngredientList, ingredientsInput.value.toLowerCase());
            displayIngredients(newIngredients);
        }
    })
}

function main() {
    displayRecipes(recipes);
    initEventsListeners();
}

main();