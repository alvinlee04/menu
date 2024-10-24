const basket = JSON.parse(localStorage.getItem('basket')) || [];
const basketContainer = document.getElementById('basket-container');
const totalCount = basket.reduce((sum, item) => sum + item.quantity, 0);
document.getElementById('total-count').textContent = totalCount;

// 遍历购物篮中的菜品并显示它们
basket.forEach((recipe, index) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe';

    recipeDiv.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name} (数量: ${recipe.quantity || 1})</h3>
        <button onclick="removeFromBasket(${index})">移除</button>
    `;

    basketContainer.appendChild(recipeDiv);
});

// 移除菜品功能
function removeFromBasket(index) {
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    window.location.reload(); // 刷新页面以更新显示
}

// 清空购物篮功能
document.getElementById('clear-basket').addEventListener('click', () => {
    localStorage.removeItem('basket');
    window.location.reload();
});

// 下单并生成订单 PNG
document.getElementById('place-order').addEventListener('click', () => {
    if (basket.length === 0) {
        alert("购物篮为空，无法下单！");
        return;
    }
    generateOrderPNG();
});

// 使用 HTML2Canvas 将订单生成 PNG
function generateOrderPNG() {
    const element = document.getElementById('basket-container');

    html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = '订单.png';
        link.click();
    });
}