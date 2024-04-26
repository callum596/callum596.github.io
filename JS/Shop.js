document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.purchase-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.dataset.item;
            let money = parseInt(localStorage.getItem('money')) || 0; // gets the monney or defaults to 0
            const cost = getCost(item);

            if (money >= cost) {
                localStorage.setItem(item, 'purchased'); // marks the item as purchased
                money -= cost; // subtracts cost from money
                localStorage.setItem('money', money.toString()); // update money in localStorage
                this.textContent = 'Purchased';
                this.disabled = true;

                updateDisplayedMoney(money);
            } else {
                alert('Not enough money to purchase!');
            }
        });
    });


    // Navigation
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = '../HTML/Game.html';
        });
    }
});

function getCost(item) {
    switch(item) {
        case 'sofa': return 100;
        case 'window': return 50;
        case 'rug': return 75;
        default: return 0;
    }
}

