function loadProgressionStyle() {
    //gets knowledge from local storage
    var knowledge = parseInt(localStorage.getItem('knowledge')) || 0;
    
    //base bath to the main page
    var basePath = window.location.href.includes('index.html') ? '' : '../';

    //style sheet based on knowledge 
    var stylePath;
    if (knowledge < 10) {
        stylePath = basePath + 'CSS/ProgressionLevels/Progression1.css';
    } else if (knowledge >= 10) {
        stylePath = basePath + 'CSS/ProgressionLevels/Progression2.css';
    } else {
        stylePath = basePath + 'CSS/ProgressionLevels/Progression1.css'; // default
    }

    // get existing stylesheet by ID and changes style path
    var stylesheetLink = document.getElementById('progressionStyle');
    if (stylesheetLink) {
        stylesheetLink.href = stylePath;
    }
}


document.addEventListener('DOMContentLoaded', loadProgressionStyle);
