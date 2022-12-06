const themeToggles = document.querySelectorAll('.theme');
themeToggles.forEach(item => {
    item.addEventListener('click', function (e) {
        switchTheme(String(e.target.value));
    }); 
});

export default function firstLoadTheme() {
    // selecting theme on first load either by saved selection or system prefrence
    let storedTheme = localStorage.getItem('theme');
    let systemTheme = window.matchMedia('(prefers-color-shceme: dark)');

    if (storedTheme == null) {
        if (systemTheme.matches) {
            switchTheme('dark');
        } else switchTheme('light');
    } else switchTheme(storedTheme);
}

export function switchTheme(theme = 'light') {
    // toggling 'selected' class on the theme buttons and adding chosen theme to local sotrage
    themeToggles.forEach(el => {
        el.classList.remove('selected');
        if (el.classList.contains(theme)) {
            el.classList.add('selected');
        }
    });
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
}