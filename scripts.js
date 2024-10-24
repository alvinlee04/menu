const recipes = [
    { name: "炒饭", image: "images/fried_rice.jpg" },
    { name: "意大利面", image: "images/pasta.jpg" }
];

const recipeContainer = document.getElementById('recipe-container');

recipes.forEach(recipe => {
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe';

    recipeDiv.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
        <button onclick='addToBasket(${JSON.stringify(recipe)})'>加入购物篮</button>
    `;

    recipeContainer.appendChild(recipeDiv);
});

function addToBasket(recipe) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    const existingItem = basket.find(item => item.name === recipe.name);

    if (existingItem) {
        existingItem.quantity += 1; // 增加数量
    } else {
        recipe.quantity = 1; // 初始化数量为 1
        basket.push(recipe);
    }

    localStorage.setItem('basket', JSON.stringify(basket));
    alert(`${recipe.name} 已加入购物篮！`);
}