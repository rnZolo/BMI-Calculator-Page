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
