
const languages = {
    html: {
        title: "HTML & CSS lernen",
        desc: "HTML ist das Skelett jeder Website, CSS sorgt für das Aussehen. Jede Website im Internet basiert darauf. Es ist der perfekte Einstieg in die Code-Welt!",
        task: "💡 <b>Aufgabe:</b> Ändere den Text im Editor zwischen den &lt;h1&gt;-Tags in deinen eigenen Namen und schaue, was passiert!",
        url: "https://www.w3schools.com/html/tryit.asp?filename=tryhtml_default_default"
    },
    javascript: {
        title: "JavaScript lernen",
        desc: "JavaScript bringt Leben auf deine Website. Damit kannst du Animationen erstellen, Pop-ups programmieren oder Taschenrechner bauen.",
        task: "💡 <b>Aufgabe:</b> Klicke im Editor auf 'Run', um das Skript auszuführen. Du kannst den Text in den Klammern bei 'console.log' verändern.",
        url: "https://www.w3schools.com/js/tryit.asp?filename=tryjs_compiler"
    },
    python: {
        title: "Python lernen",
        desc: "Python ist extrem beliebt, weil man es fast wie Englisch lesen kann. Es wird für künstliche Intelligenz, Webentwicklung und Automatisierungen genutzt.",
        task: "💡 <b>Aufgabe:</b> Ändere den Text innerhalb der Anführungszeichen bei print(\"...\") und klicke auf 'Run'.",
        url: "https://www.w3schools.com/python/trypython.asp?filename=demo_compiler"
    },
    java: {
        title: "Java lernen",
        desc: "Java ist eine der meistgenutzten Sprachen der Welt. Große Firmen, Banken und auch Android-Apps oder Minecraft wurden damit entwickelt.",
        task: "💡 <b>Aufgabe:</b> Klicke auf 'Run', um den Java-Code zu kompilieren. Es dauert kurz, dann siehst du die Ausgabe auf der rechten Seite.",
        url: "https://www.w3schools.com/java/tryjava.asp?filename=demo_compiler"
    },
    cpp: {
        title: "C++ lernen",
        desc: "C++ ist extrem schnell und wird dort eingesetzt, wo Leistung zählt – zum Beispiel bei High-End-Videospielen (Unreal Engine) oder Betriebssystemen.",
        task: "💡 <b>Aufgabe:</b> C++ nutzt 'std::cout' für Ausgaben. Versuche, den Text in den Anführungszeichen anzupassen und klicke auf 'Run'.",
        url: "https://www.w3schools.com/cpp/trycpp.asp?filename=demo_compiler"
    }
};

function changeLanguage(langKey) {
    document.getElementById('lang-title').innerText = languages[langKey].title;
    document.getElementById('lang-desc').innerText = languages[langKey].desc;
    document.querySelector('.tipp-box').innerHTML = languages[langKey].task;
    document.getElementById('code-compiler').src = languages[langKey].url;

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    event.target.classList.add('active');
}