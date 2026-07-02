let editor;
let currentLanguage = 'html';

const startCode = {
    html: `<!DOCTYPE html>\n<html>\n<head>\n<style>\n  h1 { color: #00adb5; }\n</style>\n</head>\n<body>\n  <h1>Hallo Welt!</h1>\n  <p>Willkommen auf CodeCraft.de</p>\n</body>\n</html>`,
    javascript: `// Schreibe JavaScript Code\nlet name = "Entwickler";\nconsole.log("Hallo " + name + "!");\n\nfor(let i = 1; i <= 3; i++) {\n    console.log("Schleife läuft: " + i);\n}`,
    python: `# Python Code direkt ausführen\nprint("Hallo aus der Python-Welt!")\n\n衝 = 5\nif 衝 > 3:\n    print("Python funktioniert perfekt!")`
};

const languages = {
    html: { title: "HTML & CSS lernen", desc: "Verändere das Skelett der Seite links im Editor.", task: "💡 <b>Aufgabe:</b> Ändere den Text 'Hallo Welt!' in deinen Namen." },
    javascript: { title: "JavaScript lernen", desc: "Nutze JavaScript, um Logik im Browser auszuführen.", task: "💡 <b>Aufgabe:</b> Ändere den Wert der Variable 'name'." },
    python: { title: "Python lernen", desc: "Python läuft normalerweise auf Servern, hier direkt bei dir.", task: "💡 <b>Aufgabe:</b> Erstelle eine eigene Print-Ausgabe." }
};

window.onload = function() {
    editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: startCode.html,
        language: 'html',
        theme: 'vs-dark',
        fontSize: 14,
        automaticLayout: true
    });
    runCode();
};

function changeLanguage(langKey) {
    currentLanguage = langKey;
    
    document.getElementById('lang-title').innerText = languages[langKey].title;
    document.getElementById('lang-desc').innerText = languages[langKey].desc;
    document.getElementById('lang-task').innerHTML = languages[langKey].task;

    const model = editor.getModel();
    monaco.editor.setModelLanguage(model, langKey === 'html' ? 'html' : langKey);
    editor.setValue(startCode[langKey]);

    if(langKey === 'html') {
        document.getElementById('preview-frame').style.display = "block";
        document.getElementById('console-output').style.display = "none";
    } else {
        document.getElementById('preview-frame').style.display = "none";
        document.getElementById('console-output').style.display = "block";
        document.getElementById('console-output').innerText = "Klicke auf 'Code ausführen'...";
    }

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    runCode();
}

async function runCode() {
    const code = editor.getValue();

    if (currentLanguage === 'html') {
        const iframe = document.getElementById('preview-frame');
        iframe.srcdoc = code;
    } 
    else if (currentLanguage === 'javascript') {
        const consoleOut = document.getElementById('console-output');
        consoleOut.innerText = "";
        
        const originalLog = console.log;
        console.log = function(msg) {
            consoleOut.innerText += msg + "\n";
        };

        try {
            eval(code);
        } catch (err) {
            consoleOut.innerText = "Fehler: " + err.message;
        }
        console.log = originalLog;
    } 
    else if (currentLanguage === 'python') {
        const consoleOut = document.getElementById('console-output');
        consoleOut.innerText = "Führe Python-Code aus...";

        try {
            const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: 'python',
                    version: '3.10.0',
                    files: [{ content: code }]
                })
            });
            const data = await response.json();
            consoleOut.innerText = data.run.output || "Code erfolgreich ausgeführt (Keine Textausgabe).";
        } catch (err) {
            consoleOut.innerText = "Verbindungsfehler zur Python-Engine.";
        }
    }
}
