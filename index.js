// Afficher les recettes
function getRecipe() {
    const container = document.getElementById('container');
    for (let i = 0; i < recipes.length; i++) {
        const article = document.createElement('article');
        article.classList.add('recipe-card');
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('img-card');
        article.appendChild(imageDiv);
        const header = document.createElement('header');
        header.classList.add('padded-container','d-flex');
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
        container.appendChild(article);
    }
}

getRecipe();

// Algorithme qui récupère tous les ingrédients
const ingredientsTab = getIngredients(recipes);

function getIngredients(recipes) {
    let tab = [];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            //vérifier que l'ingrédient n'est pas déjà là
            tab.push(recipes[i].ingredients[j].ingredient);
        }
    }
    console.log(tab);
    return tab;
}