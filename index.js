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