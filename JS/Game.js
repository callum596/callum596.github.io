//this runs whenever the website is loaded and it sets up the navigation updates the stats and checks what is purchased
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    updateStatsDisplay();
    checkPurchasedItems();
    //sets the social life to 20 if its noot existing
    localStorage.getItem('socialLife') === null && localStorage.setItem('socialLife', '20');
});

//gets the stats from local storage or gets 0 if they arent there and updates the display element
function updateStatsDisplay() {
    var knowledge = parseInt(localStorage.getItem('knowledge')) || 0;
    var money = parseInt(localStorage.getItem('money')) || 0;
    var socialLife = parseInt(localStorage.getItem('socialLife')) || 20;
    document.getElementById('knowledge').textContent = knowledge;
    document.getElementById('money').textContent = money;
    document.getElementById('socialLife').textContent = socialLife;
}

//buttons for everything
function setupNavigation() {
    document.getElementById('toLessons').addEventListener('click', function() {
        window.location.href = '../HTML/Lessons.html';
    });

    document.getElementById('tutorial').addEventListener('click', function() {
        window.location.href = '../HTML/Tutorial.html';
    });

    document.getElementById('options').addEventListener('click', function() {
        window.location.href = '../HTML/Options.html';
    });

    document.getElementById('returnMenu').addEventListener('click', function() {
        window.location.href = '../index.html';
    });

    document.getElementById('shop').addEventListener('click', function() {
        window.location.href = '../HTML/Shop.html';
    });

    document.getElementById('break').addEventListener('click', function() {
        takeBreak();
    });

}

// this function checks whats been purchased from local storage and it hides it if it hasnt beenn
function checkPurchasedItems() {
    const items = ['window', 'rug', 'sofa'];
    items.forEach(item => {
        let itemPurchased = localStorage.getItem(item);
        if (itemPurchased) {
            document.getElementById(item).style.display = 'block';
        } else {
            document.getElementById(item).style.display = 'none';
        }
    });
}

//This function is for the take a break button which takes money from local storage and increases socail life and displays alerts
function takeBreak() {
    let currentMoney = parseInt(localStorage.getItem('money'), 10) || 0;
    let currentSocialLife = parseInt(localStorage.getItem('socialLife'), 10) || 0;

    if (currentMoney >= 60) {
        currentMoney -= 60;
        currentSocialLife += 3;
        localStorage.setItem('money', currentMoney.toString());
        localStorage.setItem('socialLife', currentSocialLife.toString());
        updateStatsDisplay();
        alert('You have taken a break! -$60 and +3 social life.');
    } else {
        alert('Not enough money to take a break.');
    }
}
