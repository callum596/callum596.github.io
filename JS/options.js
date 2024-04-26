
document.addEventListener('DOMContentLoaded', function() {
    applySavedSettings();

    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = '../index.html';
    });

    document.getElementById('soundToggle').addEventListener('change', function() {
        localStorage.setItem('soundEnabled', this.checked ? 'true' : 'false');
    });

    document.getElementById('textReadabilityToggle').addEventListener('change', function() {
        localStorage.setItem('textReadability', this.checked ? 'large' : 'small');
    });

    document.getElementById('difficultyToggle').addEventListener('change', function() {
        localStorage.setItem('difficulty', this.checked ? 'hard' : 'easy');
    });
});

function applySavedSettings() {
    const soundEnabled = localStorage.getItem('soundEnabled') === 'true';
    document.getElementById('soundToggle').checked = soundEnabled;

    const textReadability = localStorage.getItem('textReadability') === 'large';
    document.getElementById('textReadabilityToggle').checked = textReadability;

    const difficulty = localStorage.getItem('difficulty') === 'hard';
    document.getElementById('difficultyToggle').checked = difficulty;
}
