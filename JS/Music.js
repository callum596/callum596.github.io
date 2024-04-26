document.addEventListener('DOMContentLoaded', function() {
    const backgroundAudio = document.getElementById('backgroundMusic');
    const audioPermission = document.getElementById('audioPermission');
    const allowAudio = document.getElementById('allowAudio');
    const denyAudio = document.getElementById('denyAudio');

    //this plays music
    function playMusic() {
        if (!backgroundAudio) return; // exits if no audio element is found

        backgroundAudio.play().catch(e => {
            console.error("Audio play failed:", e);
            if (audioPermission) audioPermission.style.display = 'block'; 
        });
    }

    function handleAudioConsent() {
        if (!audioPermission) return; // exits if no permission element is found

        audioPermission.style.display = 'none'; // hides the permission request
        localStorage.setItem('soundEnabled', 'true'); //saves the preference in local storage
        playMusic(); // start playing music
    }

    function handleAudioDenial() {
        if (!audioPermission) return; // exits if no permission element is found

        audioPermission.style.display = 'none';
        localStorage.setItem('soundEnabled', 'false'); // save the preference as denied
        if (backgroundAudio) {
            backgroundAudio.pause(); // ensure audio is paused
            backgroundAudio.currentTime = 0;
        }
    }

    if (allowAudio && denyAudio) {
        allowAudio.addEventListener('click', handleAudioConsent);
        denyAudio.addEventListener('click', handleAudioDenial);
    }

    // check local storage or set default
    if (localStorage.getItem('soundEnabled') === 'true') {
        playMusic();
    } else if (localStorage.getItem('soundEnabled') === null && audioPermission) {
        audioPermission.style.display = 'block'; // show the permission bar if not yet set
    }
});
