

$(document).ready(() => {
    localStorage.getItem("theme") ? setMode() : setLight()
    localStorage.getItem('info') === null ? toolInfo() : localStorage.setItem('info', 'true')
    let whatImage = localStorage.theme
    if (whatImage === 'dark') {
        $('.center-sec').attr('src', './img/undraw_meditation_re_gll0.svg')
    } else {
        $('.center-sec').attr('src', './img/undraw_indoor_bike_pwa4.svg')
    }
})

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
        $('.result').css('display', 'grid')
        $('.welcome-text').css('display', 'none')
        $('.BMI-computation').text(result.toFixed(1))
        changeEplanation(result)
    } else if (hasHeight && hasWeight && useImperial) {
        let height = Number($('.h-input').val())
        let weight = Number($('.w-input').val())
        let result = (weight / (height * height)) * 703
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
function toolInfo() {
    localStorage.setItem('info', 'true')
    setTimeout(() => {
        $('.tool-tip').addClass('fade')
    }, 1000)
    setTimeout(() => {
        $('.tool-tip').removeClass('fade')
    }, 6000)
}

$('#theme-toggle').change((event) => {
    $('img[src="./img/logo.svg"]').addClass('flip');
    setTimeout(() => {
        $('img[src="./img/logo.svg"]').removeClass('flip');
    }, 300);
    if (event.target.checked) {
        setDark()
        $('.center-sec').attr('src', './img/undraw_meditation_re_gll0.svg')
    } else {
        setLight()
        $('.center-sec').attr('src', './img/undraw_indoor_bike_pwa4.svg')
    }
});
function setMode() {
    let mode = localStorage.theme
    if (mode === 'dark') {
        setDark()
    } if (mode === 'light') {
        setLight()
    }
}
function setLight() {
    localStorage.setItem('theme', 'light')
    document.documentElement.classList.replace('dark', 'light')
}
function setDark() {
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.replace('light', 'dark')
}