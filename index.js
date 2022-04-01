// Déclaration des variables
const recipesContainer = document.getElementById('container');
const fullIngredientList = getIngredients(recipes);
const fullApplianceList = getAppliances(recipes);
const fullUstensilList = getUstensils(recipes);
let filteredIngredientList = [...fullIngredientList]; // clone d'un tableau avec le "spread operator"
let filteredAppliancesList = [...fullApplianceList]; 
let filteredUstensilsList = [...fullUstensilList]; 
const ingredientsBtn = document.getElementById('ingredients');
const appliancesBtn = document.getElementById('appliances');
const ustensilsBtn = document.getElementById('ustensils');
const ingredientsListContainer = document.getElementById('ingredients-list-container');
const appliancesListContainer = document.getElementById('appliances-list-container');
const ustensilsListContainer = document.getElementById('ustensils-list-container');
const ingredientsChevronDown = document.getElementById('ingredients-chevron-down');
const ingredientsChevronUp = document.getElementById('ingredients-chevron-up');
const appliancesChevronDown = document.getElementById('appliances-chevron-down');
const appliancesChevronUp = document.getElementById('appliances-chevron-up');
const ustensilsChevronDown = document.getElementById('ustensils-chevron-down');
const ustensilsChevronUp = document.getElementById('ustensils-chevron-up');
const ingredientsList = document.getElementById('ingredients-list');
const appliancesList = document.getElementById('appliances-list');
const ustensilsList = document.getElementById('ustensils-list');
const tagContainer = document.getElementById('tags-container');
let ingredientsInput = document.getElementById('input-ingredients');
let appliancesInput = document.getElementById('input-appliances');
let ustensilsInput = document.getElementById('input-ustensils');
let mainSearchInput = document.getElementById('search');

/**
 * Afficher les recettes
 * @param {array} recipes Tableau de recettes
 */
function displayRecipes(recipes) {
    
    recipesContainer.innerHTML = "";

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
 * Algorithme qui récupère tous les appareils
 * @param {array} recipes Tableau de recettes
 * @returns 
 */
 function getAppliances(recipes) {
    let tab = [];
    for (let i = 0; i < recipes.length; i++) {
        let appliancesLowerCase = recipes[i].appliance.toLowerCase();
        if (tab.indexOf(appliancesLowerCase) === -1 ) {
            tab.push(appliancesLowerCase);
        }
    }
    return tab;
}

/**
 * Algorithme qui récupère tous les ustensiles
 * @param {array} recipes Tableau de recettes
 * @returns 
 */
 function getUstensils(recipes) {
    let tab = [];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            let ustensilsLowerCase = recipes[i].ustensils[j].toLowerCase();
            if (tab.indexOf(ustensilsLowerCase) === -1 ) {
                tab.push(ustensilsLowerCase);
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

    ingredientsList.innerHTML = "";
    closeApplianceModal();
    closeUstensilModal();

    ingredientsBtn.style.display = "none";
    ingredientsListContainer.style.display = "block";
    appliancesBtn.style.position = "inherit";
    ustensilsBtn.style.position = "inherit";
    appliancesBtn.classList.add('unfold-ingredients');
    ustensilsBtn.classList.add('unfold-ingredients');
    ingredients.forEach((ingredient) => {
        const spanIngredient = document.createElement('span');
        spanIngredient.classList.add('list-element','lato');
        spanIngredient.innerText = ingredient[0].toUpperCase() + ingredient.slice(1);
        spanIngredient.addEventListener('click', () => {

            closeIngredientModal();
            tagContainer.innerHTML = "";
            ingredientsInput.value = "";
            const ingredientTag = document.createElement('button');
            ingredientTag.classList.add('btn','ingredients','lato','tags');
            ingredientTag.innerText = ingredient[0].toUpperCase() + ingredient.slice(1);
            const closeIcon = document.createElement('i');
            closeIcon.classList.add('fa-regular','fa-circle-xmark');
            closeIcon.addEventListener('click', () => { 
                ingredientTag.style.display = 'none';
                displayRecipes(recipes);
            })
            ingredientTag.appendChild(closeIcon);
            tagContainer.appendChild(ingredientTag);

            let newRecipesIngredients = filterRecipes(recipes, spanIngredient.innerText.toLocaleLowerCase(), "ingredients");
            displayRecipes(newRecipesIngredients);
        });
        ingredientsList.appendChild(spanIngredient);
    })  
}

/**
 * Affiche les ingrédients
 * @param {array} appliances Tableau des appareils
 */
 function displayAppliances(appliances) {

    appliancesList.innerHTML = "";
    closeIngredientModal();
    closeUstensilModal();

    appliancesBtn.style.display = "none";
    appliancesListContainer.style.display = "block";
    appliancesListContainer.classList.add('main-unfold-appliances');
    ustensilsBtn.style.position = "inherit";
    ustensilsBtn.classList.add('unfold-appliances');
    appliances.forEach((appliance) => {
        const spanAppliance = document.createElement('span');
        spanAppliance.classList.add('list-element','lato');
        spanAppliance.innerText = appliance[0].toUpperCase() + appliance.slice(1);
        spanAppliance.addEventListener('click', () => {

            closeApplianceModal();
            tagContainer.innerHTML = "";
            appliancesInput.value = "";
            const applianceTag = document.createElement('button');
            applianceTag.classList.add('btn','appliances','lato','tags');
            applianceTag.innerText = appliance[0].toUpperCase() + appliance.slice(1);
            const closeIcon = document.createElement('i');
            closeIcon.classList.add('fa-regular','fa-circle-xmark');
            closeIcon.addEventListener('click', () => { 
                applianceTag.style.display = 'none';
                displayRecipes(recipes);
            })
            applianceTag.appendChild(closeIcon);
            tagContainer.appendChild(applianceTag);

            let newRecipesAppliances = filterRecipes(recipes, spanAppliance.innerText.toLocaleLowerCase(), "appliances");
            displayRecipes(newRecipesAppliances);
        });
        appliancesList.appendChild(spanAppliance);
    })  
}

/**
 * Affiche les ingrédients
 * @param {array} ustensiles Tableau d'ustensiles
 */
 function displayUstensils(ustensils) {

    ustensilsList.innerHTML = "";
    closeIngredientModal();
    closeApplianceModal();

    ustensilsBtn.style.display = "none";
    ustensilsListContainer.style.display = "block";
    ustensilsListContainer.classList.add('main-unfold-ustensils');

    ustensils.forEach((ustensil) => {
        const spanUstensil = document.createElement('span');
        spanUstensil.classList.add('list-element','lato');
        spanUstensil.innerText = ustensil[0].toUpperCase() + ustensil.slice(1);
        spanUstensil.addEventListener('click', () => {

            closeUstensilModal();
            tagContainer.innerHTML = "";
            ustensilsInput.value = "";
            const ustensilTag = document.createElement('button');
            ustensilTag.classList.add('btn','ustensils','lato','tags');
            ustensilTag.innerText = ustensil[0].toUpperCase() + ustensil.slice(1);
            const closeIcon = document.createElement('i');
            closeIcon.classList.add('fa-regular','fa-circle-xmark');
            closeIcon.addEventListener('click', () => { 
                ustensilTag.style.display = 'none';
                displayRecipes(recipes);
            })
            ustensilTag.appendChild(closeIcon);
            tagContainer.appendChild(ustensilTag);

            let newRecipesUstensils = filterRecipes(recipes, spanUstensil.innerText.toLocaleLowerCase(), "ustensils");
            displayRecipes(newRecipesUstensils);
        });
        ustensilsList.appendChild(spanUstensil);
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
 * Filtre le tableau des appareils
 * @param {array} fullAppliancesTab le tableau complet des appareils
 * @param {string} searchInput la valeur à rechercher dans les appareils
 * @returns {array} un nouveau tableau d'appareils filtré
 */
 function filterAppliances(fullAppliancesTab, searchInput) {
    let newAppliancesTab = [];
    for (const appliance of fullAppliancesTab) {
        if (appliance.indexOf(searchInput) > -1) {
            newAppliancesTab.push(appliance)
        }
    }
    return newAppliancesTab;
}

/**
 * Filtre le tableau des ustensiles
 * @param {array} fullUstensilsTab le tableau complet des ustensiles
 * @param {string} searchInput la valeur à rechercher dans les ustensiles
 * @returns {array} un nouveau tableau d'ustensiles filtré
 */
 function filterUstensils(fullUstensilsTab, searchInput) {
    let newUstensilsTab = [];
    for (const ustensil of fullUstensilsTab) {
        if (ustensil.indexOf(searchInput) > -1) {
            newUstensilsTab.push(ustensil)
        }
    }
    return newUstensilsTab;
}

/**
 * Filtre le tableau des recettes
 * @param {array} recipes le tableau des recette
 * @param {string} searchInput valeur de la recherche
 * @returns {array} newRecipesTab - le nouveau tableau de recette filtré
 */
function filterRecipes(recipes, searchInput, type) {
    let newRecipeTab = [];

    if (type === "ingredients") {
        for (let i = 0; i < recipes.length; i++) {
            for (let j = 0; j < recipes[i].ingredients.length; j++) {
                const element = recipes[i].ingredients[j].ingredient;
                
                if (element.toLocaleLowerCase().indexOf(searchInput) > -1) {
                    newRecipeTab.push(recipes[i]);
                }
            }
        }
    }

    if (type === "appliances") {
        for (let i = 0; i < recipes.length; i++) {
            const element = recipes[i].appliance;
            if (element.toLocaleLowerCase().indexOf(searchInput) > -1) {
                newRecipeTab.push(recipes[i]);
            }
        }
    }

    if (type === "ustensils") {
        for (let i = 0; i < recipes.length; i++) {
            for (let j = 0; j < recipes[i].ustensils.length; j++) {
                const element = recipes[i].ustensils[j];
                if (element.toLocaleLowerCase().indexOf(searchInput) > -1) {
                    newRecipeTab.push(recipes[i]);
                }
            }
        }
    }

    if (type === "all") {
        for (let i = 0; i < recipes.length; i++) {
             for (let j = 0; j < recipes[i].ingredients.length; j++) {
                 const elementIngredient = recipes[i].ingredients[j].ingredient;
                
                 if (elementIngredient.toLocaleLowerCase().indexOf(searchInput) > -1) {
                     newRecipeTab.push(recipes[i]);
                 }
            }

            const elementName = recipes[i].name;
            if (elementName.toLocaleLowerCase().indexOf(searchInput) > -1) {
                newRecipeTab.push(recipes[i]);
            }

             const elementDescription = recipes[i].description;
             if (elementDescription.toLocaleLowerCase().indexOf(searchInput) > -1) {
                 newRecipeTab.push(recipes[i]);
            }
            
            for (let j = 0; j < newRecipeTab.length; j++) {
                if (newRecipeTab[j] === newRecipeTab[j+1]) {
                    newRecipeTab.splice(j, 1);
                }
            }
        }
    }
    
    return newRecipeTab;
}

/**
 * Replier liste ingrédients
 */
function closeIngredientModal() {
    ingredientsBtn.style.display = "block";
    ingredientsListContainer.style.display = "none";
    appliancesBtn.style.position = "initial";
    ustensilsBtn.style.position = "initial";
}

/**
 * Replier liste appareils
 */
 function closeApplianceModal() {
    appliancesBtn.style.display = "block";
    appliancesListContainer.style.display = "none";
    ingredientsBtn.style.position = "initial";
    ustensilsBtn.style.position = "initial";
}


/**
 * Replier liste ustensiles
 */
 function closeUstensilModal() {
    ustensilsBtn.style.display = "block";
    ustensilsListContainer.style.display = "none";
    appliancesBtn.style.position = "initial";
    ingredientsBtn.style.position = "initial";
}


/**
 * Ecouter les événements 
 */
function initEventsListeners() {
    mainSearchInput.addEventListener('keyup', (event) => {
        if (mainSearchInput.value.length > 2 || event.key === "Backspace") {
            let mainSearchTab = filterRecipes(recipes, mainSearchInput.value, "all");
            displayRecipes(mainSearchTab);
        }
    })

    ingredientsChevronDown.addEventListener('click', displayIngredients.bind(this, fullIngredientList));
    ingredientsChevronUp.addEventListener('click', closeIngredientModal);
    ingredientsInput.addEventListener('keyup', (event) => {
        if (ingredientsInput.value.length > 2 || event.key === "Backspace") {
            let newIngredients = filterIngredients(fullIngredientList, ingredientsInput.value.toLowerCase());
            displayIngredients(newIngredients);
        }
    });

    appliancesChevronDown.addEventListener('click', displayAppliances.bind(this, fullApplianceList));
    appliancesChevronUp.addEventListener('click', closeApplianceModal);
    appliancesInput.addEventListener('keyup', (event) => {
        if (appliancesInput.value.length > 2 || event.key === "Backspace") {
            let newAppliances = filterAppliances(fullApplianceList, appliancesInput.value.toLowerCase());
            displayAppliances(newAppliances);
        }
    });

    ustensilsChevronDown.addEventListener('click', displayUstensils.bind(this, fullUstensilList));
    ustensilsChevronUp.addEventListener('click', closeUstensilModal);
    ustensilsInput.addEventListener('keyup', (event) => {
        if (ustensilsInput.value.length > 2 || event.key === "Backspace") {
            let newUstensils = filterUstensils(fullUstensilList, ustensilsInput.value.toLowerCase());
            displayUstensils(newUstensils);
        }
    });
}

function main() {
    displayRecipes(recipes);
    initEventsListeners();
}

main();


// Filtrer à la fois sur ustensils, ingredients et appliances, merger les tableaux sans doublons
// TODO: filtrer la liste des recettes
// let newRecipesIngredients = filterRecipes(recipes, spanIngredient.innerText.toLocaleLowerCase(), "ingredients");
// let newRecipesUstensiles = filterRecipes(recipes, spanIngredient.innerText.toLocaleLowerCase(), "ustensils");
// let newRecipesTitle = filterRecipes(recipes, spanIngredient.innerText.toLocaleLowerCase(), "ustensile");
// console.log(newRecipesIngredients);
// let newRecipes = [...new Set([...newRecipesIngredients ,...newRecipesUstensiles, ...newRecipesTitle])]
// console.log(newRecipes);
// displayRecipes(newRecipes);