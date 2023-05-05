document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
      document.getElementById('stylesheet').setAttribute('href', '/stylesheets/darkmode-styles.css');
    } else {
      document.getElementById('stylesheet').setAttribute('href', '/stylesheets/styles.css');
    }
});

function toggleDarkMode() {
    var styleSheet = document.getElementById("stylesheet");
    if (localStorage.getItem("darkMode") === "true") {
      localStorage.setItem("darkMode", "false");
      styleSheet.setAttribute("href", "/stylesheets/styles.css");
    } else {
      localStorage.setItem("darkMode", "true");
      styleSheet.setAttribute("href", "/stylesheets/darkmode-styles.css");
    }
}
