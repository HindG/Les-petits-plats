// Déclaration des variables
const recipesContainer = document.getElementById('container');
const fullIngredientList = getIngredients(recipes);
const fullApplianceList = getAppliances(recipes);
const fullUstensilList = getUstensils(recipes);
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
const emptyState = document.getElementById('empty-state');
let filterTab = [];
let filteredRecipesTab = Object.assign([], recipes);
let filteredIngredientList = getIngredients(filteredRecipesTab);
let filteredApplianceList = getAppliances(filteredRecipesTab);
let filteredUstensilList = getUstensils(filteredRecipesTab);

/**
 * Afficher les recettes
 * @param {array} recipes Tableau de recettes
 */
function displayRecipes(recipes) {

    recipesContainer.innerHTML = "";

    recipes.forEach(recipe => {
        const article = document.createElement('article');
        article.classList.add('recipe-card');
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('img-card');
        article.appendChild(imageDiv);
        const header = document.createElement('header');
        header.classList.add('padded-container', 'd-flex', 'title-container');
        article.appendChild(header);
        const h3 = document.createElement('h3');
        h3.classList.add('lato');
        header.appendChild(h3);
        h3.innerText = recipe.name;
        const divTime = document.createElement('div');
        divTime.classList.add('timer-container-card');
        const clock = document.createElement('i');
        clock.classList.add('fa-regular', 'fa-clock');
        divTime.appendChild(clock);
        const spanTime = document.createElement('span');
        spanTime.classList.add('timer-card', 'lato');
        spanTime.innerText = `${recipe.time} min`;
        divTime.appendChild(spanTime);
        header.appendChild(divTime);
        const divRecipe = document.createElement('div');
        divRecipe.classList.add('d-flex', 'padded-container', 'lato');
        article.appendChild(divRecipe);
        const ingredientsContainer = document.createElement('div');
        ingredientsContainer.classList.add('ingredients-container');
        divRecipe.appendChild(ingredientsContainer);

        recipe.ingredients.forEach(ingredient => {
            const divIngredient = document.createElement('div');
            const spanIngredientTitle = document.createElement('span')
            spanIngredientTitle.classList.add('ingredient-name')
            spanIngredientTitle.innerText = `${ingredient.ingredient} `;
            const spanIngredientQuantity = document.createElement('span')
            spanIngredientQuantity.classList.add('ingredient-name', 'ingredient-quantity')
            if ('unit' in ingredient && 'quantity' in ingredient) {
                spanIngredientQuantity.innerText = `: ${ingredient.quantity} ${ingredient.unit}`;
            }
            else if ('quantity' in ingredient) {
                spanIngredientQuantity.innerText = `: ${ingredient.quantity}`;
            }
            else {
                spanIngredientQuantity.innerText = '';
            }
            divIngredient.appendChild(spanIngredientTitle);
            divIngredient.appendChild(spanIngredientQuantity);
            ingredientsContainer.appendChild(divIngredient);
        })

        const description = document.createElement('p');
        description.classList.add('recipe-description', 'roboto');
        description.innerText = recipe.description;
        divRecipe.appendChild(description);
        recipesContainer.appendChild(article);
    })
}

/**
 * Algorithme qui récupère tous les ingrédients
 * @param {array} recipes Tableau de recettes
 * @returns 
 */
function getIngredients(recipes) {
    let tab = [];
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            let ingredientLowerCase = ingredient.ingredient.toLowerCase();
            if (tab.indexOf(ingredientLowerCase) === -1) {
                tab.push(ingredientLowerCase);
            }
        })
    })
    return tab;
}

/**
 * Algorithme qui récupère tous les appareils
 * @param {array} recipes Tableau de recettes
 * @returns 
 */
function getAppliances(recipes) {
    let tab = [];
    recipes.forEach(recipe => {
        let appliancesLowerCase = recipe.appliance.toLowerCase();
        if (tab.indexOf(appliancesLowerCase) === -1) {
            tab.push(appliancesLowerCase);
        }
    })
    return tab;
}

/**
 * Algorithme qui récupère tous les ustensiles
 * @param {array} recipes Tableau de recettes
 * @returns 
 */
function getUstensils(recipes) {
    let tab = [];
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            let ustensilsLowerCase = ustensil.toLowerCase();
            if (tab.indexOf(ustensilsLowerCase) === -1) {
                tab.push(ustensilsLowerCase);
            }
        })
    })
    return tab;
}

/**
 * Affiche les ingrédients
 * @param {array} ingredients Tableau d'ingredient
 */
function displayIngredients(ingredients) {

    ingredientsList.innerHTML = "";
    appliancesBtn.style.display = "block";
    appliancesListContainer.style.display = "none";
    ustensilsBtn.style.display = "block";
    ustensilsListContainer.style.display = "none";

    ingredients.forEach(ingredient => {
        const spanIngredient = document.createElement('span');
        spanIngredient.classList.add('list-element', 'lato');
        spanIngredient.innerText = ingredient[0].toUpperCase() + ingredient.slice(1);
        spanIngredient.addEventListener('click', () => {

            let ingredientObject = { ingredient: spanIngredient.innerText.toLocaleLowerCase() }
            filterTab.push(ingredientObject);
            closeIngredientModal();

            ingredientsInput.value = "";
            const ingredientTag = document.createElement('button');
            ingredientTag.classList.add('btn', 'ingredients', 'lato', 'tags');
            ingredientTag.innerText = ingredient[0].toUpperCase() + ingredient.slice(1);
            const closeIcon = document.createElement('i');
            closeIcon.classList.add('fa-regular', 'fa-circle-xmark');
            closeIcon.addEventListener('click', () => {
                ingredientTag.style.display = 'none';
                let myIndex = filterTab.indexOf(ingredientObject);
                if (myIndex !== -1) {
                    filterTab.splice(myIndex, 1);
                }
                filterRecipes();
                displayRecipes(filteredRecipesTab);
            })
            ingredientTag.appendChild(closeIcon);
            tagContainer.appendChild(ingredientTag);

            // Faire un for sur filter tab pour filtrer sur tous les éléments du tableau filterTab
            let newRecipesIngredients = filterRecipes();
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
    ingredientsBtn.style.display = "block";
    ingredientsListContainer.style.display = "none";
    ustensilsBtn.style.display = "block";
    ustensilsListContainer.style.display = "none";

    appliances.forEach(appliance => {
        const spanAppliance = document.createElement('span');
        spanAppliance.classList.add('list-element', 'lato');
        spanAppliance.innerText = appliance[0].toUpperCase() + appliance.slice(1);
        spanAppliance.addEventListener('click', () => {

            let applianceObject = { appliance: spanAppliance.innerText.toLocaleLowerCase() };
            filterTab.push(applianceObject);

            displayIngredients(filteredIngredientList);
            displayAppliances(filteredApplianceList);
            displayUstensils(filteredUstensilList);

            closeApplianceModal();
            appliancesInput.value = "";
            const applianceTag = document.createElement('button');
            applianceTag.classList.add('btn', 'appliances', 'lato', 'tags');
            applianceTag.innerText = appliance[0].toUpperCase() + appliance.slice(1);
            const closeIcon = document.createElement('i');
            closeIcon.classList.add('fa-regular', 'fa-circle-xmark');
            closeIcon.addEventListener('click', () => {
                applianceTag.style.display = 'none';

                let myIndex = filterTab.indexOf(applianceObject);
                if (myIndex !== -1) {
                    filterTab.splice(myIndex, 1);
                }

                filterRecipes();
                displayRecipes(filteredRecipesTab);
            })
            applianceTag.appendChild(closeIcon);
            tagContainer.appendChild(applianceTag);

            let newRecipesAppliances = filterRecipes();
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
    ingredientsBtn.style.display = "block";
    ingredientsListContainer.style.display = "none";
    appliancesBtn.style.display = "block";
    appliancesListContainer.style.display = "none";

    ustensils.forEach(ustensil => {
        const spanUstensil = document.createElement('span');
        spanUstensil.classList.add('list-element', 'lato');
        spanUstensil.innerText = ustensil[0].toUpperCase() + ustensil.slice(1);
        spanUstensil.addEventListener('click', () => {

            let ustensilObject = { ustensil: spanUstensil.innerText.toLocaleLowerCase() };
            filterTab.push(ustensilObject);

            displayIngredients(filteredIngredientList);
            displayAppliances(filteredApplianceList);
            displayUstensils(filteredUstensilList);

            closeUstensilModal();
            ustensilsInput.value = "";
            const ustensilTag = document.createElement('button');
            ustensilTag.classList.add('btn', 'ustensils', 'lato', 'tags');
            ustensilTag.innerText = ustensil[0].toUpperCase() + ustensil.slice(1);
            const closeIcon = document.createElement('i');
            closeIcon.classList.add('fa-regular', 'fa-circle-xmark');
            closeIcon.addEventListener('click', () => {
                ustensilTag.style.display = 'none';

                let myIndex = filterTab.indexOf(ustensilObject);
                if (myIndex !== -1) {
                    filterTab.splice(myIndex, 1);
                }

                filterRecipes();
                displayRecipes(filteredRecipesTab);
            })
            ustensilTag.appendChild(closeIcon);
            tagContainer.appendChild(ustensilTag);

            let newRecipesUstensils = filterRecipes();
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
    let newIngredientsTab = fullIngredientsTab.filter(ingredient => ingredient.indexOf(searchInput) > -1)
    return newIngredientsTab;
}

/**
 * Filtre le tableau des appareils
 * @param {array} fullAppliancesTab le tableau complet des appareils
 * @param {string} searchInput la valeur à rechercher dans les appareils
 * @returns {array} un nouveau tableau d'appareils filtré
 */
function filterAppliances(fullAppliancesTab, searchInput) {
    let newAppliancesTab = fullAppliancesTab.filter(appliance => appliance.indexOf(searchInput) > -1)
    return newAppliancesTab;
}

/**
 * Filtre le tableau des ustensiles
 * @param {array} fullUstensilsTab le tableau complet des ustensiles
 * @param {string} searchInput la valeur à rechercher dans les ustensiles
 * @returns {array} un nouveau tableau d'ustensiles filtré
 */
function filterUstensils(fullUstensilsTab, searchInput) {
    let newUstensilsTab = fullUstensilsTab.filter(ustensil => ustensil.indexOf(searchInput) > -1)
    return newUstensilsTab;
}

/**
 * Filtre le tableau des recettes
 * @returns {array} filteredRecipesTab - le nouveau tableau de recette filtré
 */
function filterRecipes() {

    let newfilteredRecipesTab = [...recipes];
    
    filterTab.forEach(filter => {
        if (filter.ingredient) {
            newfilteredRecipesTab = newfilteredRecipesTab.filter(recipe => recipe.ingredients.some(ingredient => filter.ingredient.toLocaleLowerCase() === ingredient.ingredient.toLocaleLowerCase() ));
        }

        if (filter.appliance) {
            newfilteredRecipesTab = newfilteredRecipesTab.filter(recipe => recipe.appliance.toLocaleLowerCase() === filter.appliance.toLocaleLowerCase() );
        }

        if (filter.ustensil) {
            newfilteredRecipesTab = newfilteredRecipesTab.filter(recipe => recipe.ustensils.some(ustensil => filter.ustensil.toLocaleLowerCase() === ustensil.toLocaleLowerCase()));
        }

        if (filter.all) {
            let newfilteredRecipesTabName = newfilteredRecipesTab.filter( recipe => recipe.name.toLocaleLowerCase().includes(filter.all.toLocaleLowerCase()) );
            let newfilteredRecipesTabDescription = newfilteredRecipesTab.filter( recipe => recipe.description.toLocaleLowerCase().includes(filter.all.toLocaleLowerCase()) );
            let concatNewfilteredRecipesTab = newfilteredRecipesTabName.concat(newfilteredRecipesTabDescription);
            newfilteredRecipesTab = [...new Set(concatNewfilteredRecipesTab)];
        }
        
    })
    filteredRecipesTab = newfilteredRecipesTab;

    return newfilteredRecipesTab;
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
        filterTab.forEach(filter => {
            let myIndex = filterTab.indexOf(filter);
            if (filter.all && myIndex !== -1) {
                filterTab.splice(myIndex, 1);
            }
        })
        if (mainSearchInput.value.length > 2 || event.key === "Backspace") {
            filterTab.push({ all: mainSearchInput.value });
        }
        filterRecipes();
        displayRecipes(filteredRecipesTab);
    })

    ingredientsChevronDown.addEventListener('click', () => {
        filteredIngredientList = getIngredients(filteredRecipesTab);
        filteredApplianceList = getAppliances(filteredRecipesTab);
        filteredUstensilList = getUstensils(filteredRecipesTab);
        displayIngredients(filteredIngredientList);
        displayAppliances(filteredApplianceList);
        displayUstensils(filteredUstensilList);
        ingredientsBtn.style.display = "none";
        ustensilsBtn.style.display = "block";
        appliancesBtn.style.display = "block";
        ingredientsListContainer.style.display = "block";
        appliancesListContainer.style.display = "none";
        ustensilsListContainer.style.display = "none";
        appliancesBtn.style.position = "inherit";
        ustensilsBtn.style.position = "inherit";
        appliancesBtn.classList.add('unfold-appliances');
        ustensilsBtn.classList.add('unfold-ustensils');

    });
    ingredientsChevronUp.addEventListener('click', closeIngredientModal);
    ingredientsInput.addEventListener('keyup', (event) => {
        if (ingredientsInput.value.length > 2 || event.key === "Backspace") {
            let newIngredients = filterIngredients(fullIngredientList, ingredientsInput.value.toLowerCase());
            displayIngredients(newIngredients);
        }
    });

    appliancesChevronDown.addEventListener('click', () => {
        filteredIngredientList = getIngredients(filteredRecipesTab);
        filteredApplianceList = getAppliances(filteredRecipesTab);
        filteredUstensilList = getUstensils(filteredRecipesTab);
        displayIngredients(filteredIngredientList);
        displayAppliances(filteredApplianceList);
        displayUstensils(filteredUstensilList);
        appliancesBtn.style.display = "none";
        ustensilsBtn.style.display = "block";
        ingredientsBtn.style.display = "block";
        appliancesListContainer.style.display = "block";
        ustensilsListContainer.style.display = "none";
        ingredientsListContainer.style.display = "none";
        appliancesListContainer.classList.add('main-unfold-appliances');
        ustensilsBtn.style.position = "inherit";
        ustensilsBtn.classList.add('unfold-ustensils');
    });
    appliancesChevronUp.addEventListener('click', closeApplianceModal);
    appliancesInput.addEventListener('keyup', (event) => {
        if (appliancesInput.value.length > 2 || event.key === "Backspace") {
            let newAppliances = filterAppliances(fullApplianceList, appliancesInput.value.toLowerCase());
            displayAppliances(newAppliances);
        }
    });

    ustensilsChevronDown.addEventListener('click', () => {
        filteredIngredientList = getIngredients(filteredRecipesTab);
        filteredApplianceList = getAppliances(filteredRecipesTab);
        filteredUstensilList = getUstensils(filteredRecipesTab);
        displayIngredients(filteredIngredientList);
        displayAppliances(filteredApplianceList);
        displayUstensils(filteredUstensilList);
        ustensilsBtn.style.display = "none";
        ingredientsBtn.style.display = "block";
        appliancesBtn.style.display = "block";
        ustensilsListContainer.style.display = "block";
        appliancesListContainer.style.display = "none";
        ingredientsListContainer.style.display = "none";
        ustensilsListContainer.classList.add('main-unfold-ustensils');
        appliancesBtn.style.position = "inherit";
        appliancesBtn.classList.remove('unfold-appliances');
    });
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
    displayIngredients(fullIngredientList);
    displayAppliances(fullApplianceList);
    displayUstensils(fullUstensilList);
}

main();