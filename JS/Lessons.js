document.addEventListener('DOMContentLoaded', function() {
    const showCSSLessonsButton = document.getElementById('showCSSLessons');
    const showHTMLLessonsButton = document.getElementById('showHTMLLessons');
    const lessonModal = document.getElementById('lessonModal');
    const closeModalButton = document.getElementById('closeModal');
    const lessonsList = document.getElementById('lessonsList');
    const lessonTitle = document.getElementById('lessonTitle');
    const lessonText = document.getElementById('lessonText');
    const testSection = document.getElementById('testSection');
    const backButton = document.getElementById('backButton');

    let currentLesson = null;

    updateStatsDisplay();
    //this stores all the lessons
    const lessons = {
        'CSS': [
            {
                title: 'Introduction to CSS',
                content: 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. CSS controls how elements should be rendered on screen, on paper, or in other media.',
                quiz: [
                    { question: 'Does CSS stand for Cascading Style Sheets?', correctAnswer: 'true' },
                    { question: 'Can CSS control the layout of multiple web pages?', correctAnswer: 'true' }
                ]
            },
            {
                title: 'CSS Selectors and Properties',
                content: 'CSS selectors define which part of the HTML structure the CSS rules will affect. Each selector can apply style properties to HTML elements, such as color, font, width, and more. Properties are set within declarations, forming a statement with a property and a value.',
                quiz: [
                    { question: 'Do CSS selectors target HTML elements?', correctAnswer: 'true' },
                    { question: 'Is \"color\" a CSS property that can change the text color?', correctAnswer: 'true' }
                ]
            },
            {
                title: 'Understanding the CSS Box Model',
                content: 'The CSS box model is a fundamental concept that involves margins, borders, padding, and the content area itself. Each element on a page is represented as a box and can be manipulated with CSS.',
                quiz: [
                    { question: 'Does the CSS box model include padding?', correctAnswer: 'true' },
                    { question: 'Is the margin the outermost layer of the box model?', correctAnswer: 'true' }
                ]
            },
            {
                title: 'Background-Color Property',
                content: 'The background-color property in CSS specifies the background color of an element. This color fills the entire area of the block, including the padding and content area but not the margin.',
                quiz: [
                    { question: 'Does the background-color property color the margin of a box?', correctAnswer: 'false' },
                    { question: 'Can the background-color be applied to inline elements?', correctAnswer: 'false' }
                ]
            },
            {
                title: 'Positioning Elements with CSS',
                content: 'CSS positioning properties allow you to position an element in a specific place on the page. You can use properties like position: absolute, relative, fixed, or sticky to determine the flow and placement of elements.',
                quiz: [
                    { question: 'Can CSS position an element absolutely within its parent container?', correctAnswer: 'true' },
                    { question: 'Does a fixed position element move when a page is scrolled?', correctAnswer: 'false' }
                ]
            },
            {
                title: 'CSS Display Property',
                content: 'The display property determines the display behavior of an element. Common values include block, inline, inline-block, flex, and none. Each value affects the layout of elements in different ways.',
                quiz: [
                    { question: 'Does setting display to \"none\" remove an element from the document flow?', correctAnswer: 'true' },
                    { question: 'Can the display property make an element behave like a block-level element?', correctAnswer: 'true' }
                ]
            }
            
        ],
        'HTML': [
            {
                title: 'Introduction to HTML',
                content: 'HTML (Hypertext Markup Language) is the standard markup language for creating web pages and web applications. HTML elements are the building blocks of HTML pages, and they are represented by tags.',
                quiz: [
                    { question: 'Is HTML used for creating web pages?', correctAnswer: 'true' },
                    { question: 'Do HTML elements represent the building blocks of web pages?', correctAnswer: 'true' }
                ]
            },
            {
                title: 'HTML Tags and Elements',
                content: 'HTML tags label pieces of content such as "heading", "paragraph", "table", and so on. Tags are enclosed in angle brackets. An HTML element consists of a start tag, content, and an end tag.',
                quiz: [
                    { question: 'Do HTML tags define the structure of web pages?', correctAnswer: 'true' },
                    { question: 'Is an HTML element made up of a start tag, content, and an end tag?', correctAnswer: 'true' }
                ]
            },
            {
                title: 'HTML Attributes',
                content: 'Attributes provide additional information about HTML elements. They are always specified in the start tag and usually come in name/value pairs like name="value".',
                quiz: [
                    { question: 'Do HTML attributes provide additional information about elements?', correctAnswer: 'true' },
                    { question: 'Are attributes placed within the end tag of elements?', correctAnswer: 'false' }
                ]
            },
            {
                title: 'HTML Links',
                content: 'HTML links are defined with the <a> tag, which stands for "anchor". The most important attribute of the <a> tag is the href attribute, which indicates the link\'s destination.',
                quiz: [
                    { question: 'Is the <a> tag used for creating links?', correctAnswer: 'true' },
                    { question: 'Does the href attribute specify the link\'s destination?', correctAnswer: 'true' }
                ]
            },
            {
                title: 'HTML Images',
                content: 'HTML images are defined with the <img> tag. The src attribute specifies the URL of the image, and the alt attribute provides an alternate text for an image, if the image cannot be displayed.',
                quiz: [
                    { question: 'Is the <img> tag used to embed images in an HTML page?', correctAnswer: 'true' },
                    { question: 'Does the alt attribute specify the image source URL?', correctAnswer: 'false' }
                ]
            },
            {
                title: 'HTML Lists',
                content: 'HTML provides several types of lists, including ordered lists (<ol>), unordered lists (<ul>), and description lists (<dl>). These lists are used to group a set of related items, in a specific order or not.',
                quiz: [
                    { question: 'Can <ol> be used to create an ordered list?', correctAnswer: 'true' },
                    { question: 'Does <ul> stand for "unordered list"?', correctAnswer: 'true' }
                ]
            }
        ]
    };

    //back button that sends you back the main game page
    backButton.addEventListener('click', function() {
        window.location.href = '..//HTML/Game.html';
    });


    //this displays the lessonns for each language
    function displayLessons(lessonsType) {
        lessonsList.innerHTML = ''; // this clears the contennt in lessons list to make sure theres nno overlapping of lessonns
        let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || []; //if theres no completed lessons it defaults to an empty array(nothing)
        lessons[lessonsType].forEach(lesson => { //looops through each lesson of the specified type
            if (!completedLessons.includes(lesson.title)) { //if the completed lessons doesnt include the title
                const lessonButton = document.createElement('button'); // Creates a lesson button
                lessonButton.textContent = lesson.title; // takes the lesson title and applies it to the button to show what lesson you are clicking onn
                lessonButton.addEventListener('click', () => { // opens a modal with the current lessons contents when clicked
                    currentLesson = lesson;
                    currentLesson.type = lessonsType;
                    openLessonModal(lesson);
                });
                lessonsList.appendChild(lessonButton); 
            }
        });
        lessonsList.classList.toggle('hidden', lessonsList.children.length === 0);
    }

    //
    function openLessonModal(lesson) {
        lessonTitle.textContent = lesson.title;// sets the contennt & title of the modal
        lessonText.innerHTML = lesson.content;
        testSection.innerHTML = ''; 

        lesson.quiz.forEach((quizItem, index) => { //creates hte bones of the modal like the radio inputs and the questions
            const questionDiv = document.createElement('div');
            questionDiv.textContent = quizItem.question;
            const trueButton = document.createElement('input');
            trueButton.type = 'radio';
            trueButton.name = 'answer' + index;
            trueButton.value = 'true';
            const falseButton = document.createElement('input');
            falseButton.type = 'radio';
            falseButton.name = 'answer' + index;
            falseButton.value = 'false';
            questionDiv.appendChild(trueButton);
            questionDiv.appendChild(document.createTextNode('True'));
            questionDiv.appendChild(falseButton);
            questionDiv.appendChild(document.createTextNode('False'));
            testSection.appendChild(questionDiv);
        });

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit Test';
        submitButton.addEventListener('click', submitTest);
        testSection.appendChild(submitButton);

        lessonModal.classList.remove('hidden');
    }

    function submitTest() { // this function submits the test and checks the answers 
        let score = 0;
        currentLesson.quiz.forEach((quizItem, index) => {
            const userAnswer = document.querySelector(`input[name="answer${index}"]:checked`)?.value;
            if (userAnswer === quizItem.correctAnswer) {
                score++;
            }
        });


        const resultPercentage = (score / currentLesson.quiz.length) * 100;
        lessonModal.classList.add('hidden');

        if (resultPercentage >= 70) {//If the result is over 70% then its a pass and it alerts if yoou passed of failed
            alert(`Congratulations! You passed with a score of ${resultPercentage}%.`);
            updateStats(3, 60, 3);
            markLessonAsCompleted(currentLesson.title);
            displayLessons(currentLesson.type);
        } else {
            alert(`You scored ${resultPercentage}%. Try again to improve your score.`);
        }
    }


    function markLessonAsCompleted(lessonTitle) { //this just marks the lesson as completed in localstorage by adding it to comppleted lessons array
        let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
        if (!completedLessons.includes(lessonTitle)) {
            completedLessons.push(lessonTitle);
            localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        }
    }

    function updateStatsDisplay() { //this updates the display for stats by retrieving from loocal storage and setting element contents to display this
        let currentKnowledge = parseInt(localStorage.getItem('knowledge')) || 0;
        let currentMoney = parseInt(localStorage.getItem('money')) || 0;
        let currentSocialLife = parseInt(localStorage.getItem('socialLife')) || 20;

        document.getElementById('knowledge').textContent = currentKnowledge;
        document.getElementById('money').textContent = currentMoney;
        document.getElementById('socialLife').textContent = currentSocialLife;
    }

    function updateStats(knowledgeIncrement, moneyIncrement, socialLifeDecrement) { // this updates the stats in local storage rather than just the display it updates it based on the increments passed through from above
        let currentKnowledge = parseInt(localStorage.getItem('knowledge')) || 0;
        let currentMoney = parseInt(localStorage.getItem('money')) || 0;
        let currentSocialLife = parseInt(localStorage.getItem('socialLife')) || 0;

        currentKnowledge += knowledgeIncrement;
        currentMoney += moneyIncrement;
        currentSocialLife -= socialLifeDecrement;

        localStorage.setItem('knowledge', currentKnowledge);
        localStorage.setItem('money', currentMoney);
        localStorage.setItem('socialLife', currentSocialLife);

        updateStatsDisplay();
    }

    closeModalButton.addEventListener('click', function() {
        lessonModal.classList.add('hidden');
        displayLessons(currentLesson.type);
    });

    showCSSLessonsButton.addEventListener('click', function() {
        displayLessons('CSS');
    });

    showHTMLLessonsButton.addEventListener('click', function() {
        displayLessons('HTML');
    });
});
