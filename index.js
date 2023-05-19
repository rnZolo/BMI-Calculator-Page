// let currentMode = localStorage.getItem('theme') || 'light'; // Initialize currentMode with the value from local storage or 'light' as default
// const modes = document.querySelectorAll('input[type="radio"]');

// modes.forEach((mode, index) => {
//     if (mode.value === currentMode) {
//         mode.checked = true
//     } else {
//         mode.checked = false
//     }
//     mode.addEventListener("click", () => {
//         if (mode.checked && index === 0) {
//             localStorage.setItem("theme", "light");
//             currentMode = 'light';
//             console.log(currentMode);
//         } else if (mode.checked && index === 1) {
//             localStorage.setItem("theme", "dark");
//             currentMode = 'dark';
//             console.log(currentMode);
//         }
//     });
// });
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

// Whenever the user explicitly chooses light mode
localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem('theme')



const metric = $('.metric'),
    imperial = $('.imperial'),
    bmiClassification = {
        Underweight: "Based on your body weight, it appears that you may be classified as underweight.",
        Healthyweight: "Your current body weight falls within a healthy range.",
        Overweight: "Based on your body weight, it appears that you may be considered overweight.",
        Obesity: "Based on your body weight, it appears that you may be classified as having obesity."
    }
// Number($('.w-input').val())
// Number($('.h-input').val())

let useMetric = false,
    useImperial = false,
    hasHeight = false,
    hasWeight = false,
    calculatable = false


$('.metric').prop('checked', true)
defaultText()
selectUom()
$('.metric').click(selectUom)
$('.imperial').click(selectUom)

$('.w-input').on('change', () => {
    if ($('.w-input').val() !== '') {
        hasWeight = true
        calculateBMI()
    } else {
        hasWeight = false
        defaultText()
    }
})
$('.h-input').on('change', () => {
    if ($('.h-input').val() !== '') {
        hasHeight = true
        calculateBMI()
    } else {
        hasHeight = false
        defaultText()
    }
})

function calculateBMI() {
    if (hasHeight && hasWeight && useMetric) {
        let height = Number($('.h-input').val())
        let weight = Number($('.w-input').val())
        let result = weight / ((height / 100) * (height / 100))
        console.log(height)
        console.log(weight)
        console.log(result)
        $('.result').css('display', 'grid')
        $('.welcome-text').css('display', 'none')
        $('.BMI-computation').text(result.toFixed(1))
        changeEplanation(result)
    } else if (hasHeight && hasWeight && useImperial) {
        let height = Number($('.h-input').val())
        let weight = Number($('.w-input').val())
        let result = (weight / (height * height)) * 703
        console.log(height)
        console.log(weight)
        console.log(result)
        $('.result').css('display', 'grid')
        $('.welcome-text').css('display', 'none')
        $('.BMI-computation').text(result.toFixed(1))
        changeEplanation(result.toFixed(1))
    }
}
function selectUom() {
    if ($('.metric').is(':checked')) {
        useMetric = true;
        useImperial = false;
        defaultText()
        $('.h-uom').text('cm')
        $('.w-uom').text('kg')
    } else if ($('.imperial').is(':checked')) {
        useMetric = false;
        useImperial = true;
        defaultText()
        $('.h-uom').text('in')
        $('.w-uom').text('lb')
    }
}
function changeEplanation(result) {
    if (result < 18.5) {
        $('.some-explanation').text(bmiClassification.Underweight)
    } else if (result >= 18.5 && result <= 24.9) {
        $('.some-explanation').text(bmiClassification.Healthyweight)
    } else if (result >= 25.0 && result <= 29.9) {
        $('.some-explanation').text(bmiClassification.Overweight)
    } else if (result >= 30.0) {
        $('.some-explanation').text(bmiClassification.Obesity)
    } else {
        defaultText()
    }
}
function defaultText() {
    $('.result').css('display', 'none')
    $('.welcome-text').css('display', 'block')
    $('.welcome-text').text('Welcome!')
    $('.some-explanation').text('Enter Your Height and Weight to see you BMI Result here')
    $('.h-input').text('')
    $('.w-input').text('')
}
