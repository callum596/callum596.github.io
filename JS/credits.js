//Button for going back to menu
document.addEventListener('DOMContentLoaded', function() {
    var backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
        window.location.href = '../index.html'; 
    });
});
