const translations = {
    en: {
        nav_home: "~/home",
        nav_projects: "~/projects",
        nav_about: "~/about",
        nav_contact: "~/contact",
        home_welcome: "Welcome to my Workspace",
        home_desc: "I'm a Junior Software Developer specializing in building robust backend systems, exploring low-level memory management, and crafting interactive experiences.",
        home_stack_title: "Core Tech Stack",
        projects_title: "My Projects",
        proj_rpg_title: "RPG Character System",
        proj_rpg_desc: "Inheritance, Encapsulation, Polymorphism & Method Overloading in Java.",
        table_concept: "Concept",
        table_impl: "Implementation",
        table_logic: "Core Logic",
        table_logic_desc: "Abstract `GameCharacter` class with sub-classes for Warrior, Mage, and Archer.",
        table_stack: "Tech Stack",
        btn_execute: "Execute",
        term_rpg_idle: "// Press Execute to start battle simulation...",
        status_success: "Status: SUCCESS ~ 100%",
        link_source: "Source Code",
        proj_sudoku_title: "Sudoku Player Management",
        proj_sudoku_desc: "Low-level memory management, pointers, and data structures in C.",
        table_mem: "Memory Logic",
        table_mem_desc: "Dynamic allocation (malloc/free), structs, and pointers to avoid leaks.",
        term_sudoku_idle: "// Press Execute to fetch player data from memory...",
        status_completed: "Status: Completed",
        about_title: "About Me",
        about_intro: "Hello! I am currently studying at STU FIIT (Slovak University of Technology in Bratislava).",
        about_passion: "I have a strong passion for applied informatics, microcircuits, and various programming languages. I enjoy diving deep into how software interacts with hardware to build efficient systems.",
        about_hobbies: "Outside of coding, my hobbies include playing video games and going for walks to clear my head and find new inspiration.",
        btn_cv: "Download CV",
        contact_title: "Get in Touch",
        contact_desc: "If you want to collaborate on a project or just chat about code, feel free to send a message!",
        ph_name: "Your Name",
        ph_email: "Your Email",
        ph_msg: "Your Message...",
        btn_send: "Send Message",
        typewriter: "# Software Developer",
        status_online: "Online",
        status_offline: "Offline"
    },
    sk: {
        nav_home: "~/domov",
        nav_projects: "~/projekty",
        nav_about: "~/o-mne",
        nav_contact: "~/kontakt",
        home_welcome: "Vitajte v mojom priestore",
        home_desc: "Som Junior Software Developer so zameraním na budovanie robustných backendových systémov, nízkoúrovňovú správu pamäte a tvorbu interaktívnych aplikácií.",
        home_stack_title: "Hlavné technológie",
        projects_title: "Moje projekty",
        proj_rpg_title: "RPG Systém postáv",
        proj_rpg_desc: "Dedičnosť, enkapsulácia, polymorfizmus a preťažovanie metód v Jave.",
        table_concept: "Koncept",
        table_impl: "Implementácia",
        table_logic: "Jadro logiky",
        table_logic_desc: "Abstraktná trieda `GameCharacter` s podtriedami pre Bojovníka, Mága a Lukostrelca.",
        table_stack: "Stack technológií",
        btn_execute: "Spustiť",
        term_rpg_idle: "// Stlačením tlačidla Spustiť začnete simuláciu boja...",
        status_success: "Stav: ÚSPECH ~ 100%",
        link_source: "Zdrojový kód",
        proj_sudoku_title: "Správa hráčov Sudoku",
        proj_sudoku_desc: "Nízkoúrovňová správa pamäte, smerníky a dátové štruktúry v jazyku C.",
        table_mem: "Pamäťová logika",
        table_mem_desc: "Dynamická alokácia (malloc/free), štruktúry a smerníky pre zabránenie únikom pamäte.",
        term_sudoku_idle: "// Stlačením tlačidla Spustiť načítate údaje hráča z pamäte...",
        status_completed: "Stav: Dokončené",
        about_title: "O mne",
        about_intro: "Ahoj! Momentálne študujem na STU FIIT (Slovenská technická univerzita v Bratislave).",
        about_passion: "Mám veľkú vášeň pre aplikovanú informatiku, mikroobvody a rôzne programovacie jazyky. Rád skúmam, ako softvér komunikuje s hardvérom pri budovaní efektívnych systémov.",
        about_hobbies: "Mimo kódovania medzi moje záľuby patrí hranie videohier a prechádzky, pri ktorých si čistím hlavu a hľadám novú inšpiráciu.",
        btn_cv: "Stiahnuť CV",
        contact_title: "Kontakt",
        contact_desc: "Ak chcete spolupracovať na projekte alebo len pokecať o kóde, neváhajte mi poslať správu!",
        ph_name: "Vaše meno",
        ph_email: "Váš Email",
        ph_msg: "Vaša správa...",
        btn_send: "Odoslať správu",
        typewriter: "# Softvérový vývojár",
        status_online: "V sieti",
        status_offline: "Nedostupný"
    }
};

const flags = {
    en: "🇺🇸",
    sk: "🇸🇰"
};

let currentLang = localStorage.getItem('lang') || 'en';
const langToggle = document.getElementById('langToggle');
const DISCORD_ID = "592700820785463306";
const typeTarget = document.getElementById("typewriter-text");
let charIndex = 0;
let typewriterTimeout;

function updateLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[currentLang][key];
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = translations[currentLang][key];
    });

    langToggle.textContent = currentLang === 'en' ? flags.sk : flags.en;
    
    charIndex = 0;
    typeTarget.textContent = "";
    clearTimeout(typewriterTimeout);
    typeText();
    getDiscordStatus(); 
}

async function getDiscordStatus() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const data = await response.json();
        if (!data.success) return;

        const status = data.data.discord_status;
        const dot = document.getElementById('status-dot');
        const text = document.getElementById('status-text');

        const colors = { 
            online: '#4ade80', 
            idle: '#ffbd2e', 
            dnd: '#ff5f56', 
            offline: '#666' 
        };
        
        dot.style.color = colors[status] || colors.offline;

        if (status === 'offline') {
            text.textContent = translations[currentLang].status_offline;
        } else {
            text.textContent = translations[currentLang].status_online;
        }
    } catch (err) { 
        console.error("Status error:", err);
    }
}

function typeText() {
    const fullText = translations[currentLang].typewriter;
    if (charIndex < fullText.length) {
        typeTarget.textContent += fullText.charAt(charIndex);
        charIndex++;
        typewriterTimeout = setTimeout(typeText, 100);
    }
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'sk' : 'en';
    localStorage.setItem('lang', currentLang);
    updateLanguage();
});

const toggleBtn = document.getElementById('themeToggle');
const body = document.body;
if (localStorage.getItem('theme') === 'light') body.classList.add('light-theme');
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
});

const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        const targetSection = document.getElementById(btn.getAttribute('data-target'));
        targetSection.classList.remove('active');
        void targetSection.offsetWidth; 
        targetSection.classList.add('active');
    });
});

const runBtn = document.getElementById('runBtn');
const cliArgs = document.getElementById('cliArgs');
const termOutput = document.getElementById('termOutput');
runBtn.addEventListener('click', () => {
    termOutput.innerHTML = '';
    runBtn.disabled = true;
    const args = cliArgs.value.trim().split(/\s+/);
    const warriorName = args[0] || "Warrior";
    const attackDmg = parseInt(args[1]) || 25;
    const mageName = args[2] || "Mage";
    const mageHp = parseInt(args[3]) || 100;
    const remainingHp = Math.max(0, mageHp - attackDmg);
    const linesToPrint = [
        "<span style='color: #8da3c7;'>> Task :compileJava</span>",
        "<span style='color: #4ade80;'>> BUILD SUCCESSFUL in 142ms</span>",
        "----------------------------------------",
        `Battle Log Initiated...`,
        `<span style='color: #569cd6;'>[Warrior] ${warriorName}</span> engages <span style='color: #ce9178;'>[Mage] ${mageName}</span>!`,
        `> ${warriorName} strikes with base attack: ${attackDmg}`,
        `> ${mageName} takes ${attackDmg} physical damage!`,
        `<span style='color: #ffbd2e;'>${mageName}'s remaining HP: ${remainingHp} / ${mageHp}</span>`,
        "----------------------------------------",
        "Process finished with exit code 0"
    ];
    let i = 0;
    function printNextLine() {
        if (i < linesToPrint.length) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'output-line';
            lineDiv.innerHTML = linesToPrint[i];
            termOutput.appendChild(lineDiv);
            i++;
            setTimeout(printNextLine, 200);
        } else {
            runBtn.disabled = false;
        }
    }
    printNextLine();
});

const runSudokuBtn = document.getElementById('runSudokuBtn');
const sudokuInput = document.getElementById('sudokuInput');
const sudokuOutput = document.getElementById('sudokuOutput');
runSudokuBtn.addEventListener('click', () => {
    sudokuOutput.innerHTML = '';
    runSudokuBtn.disabled = true;
    const arg = sudokuInput.value.trim();
    const playerName = arg.replace('--load', '').trim() || 'Unknown';
    const lines = [
        `<span style="color: #8da3c7;">> Allocating memory for Player struct... [OK]</span>`,
        `<span style="color: #8da3c7;">> Reading data for '${playerName}' from save.dat...</span>`,
        ` `,
        `<span style="color: #ffbd2e;">=== PLAYER PROFILE ===</span>`,
        `Name: ${playerName} | Rating: 1450 | Puzzles Solved: 42`,
        ` `,
        `Last Board State (Memory Address: 0x7FFE9B):`,
        `<span style="color: #e6e6e6;"> 5 3 . | . 7 . | . . .</span>`,
        `<span style="color: #e6e6e6;"> 6 . . | 1 9 5 | . . .</span>`,
        `<span style="color: #e6e6e6;"> . 9 8 | . . . | . 6 .</span>`,
        `<span style="color: #569cd6;">-------+-------+-------</span>`,
        `<span style="color: #e6e6e6;"> 8 . . | . 6 . | . . 3</span>`,
        `<span style="color: #e6e6e6;"> 4 . . | 8 . 3 | . . 1</span>`,
        `<span style="color: #e6e6e6;"> 7 . . | . 2 . | . . 6</span>`,
        `<span style="color: #569cd6;">-------+-------+-------</span>`,
        `<span style="color: #e6e6e6;"> . 6 . | . . . | 2 8 .</span>`,
        `<span style="color: #e6e6e6;"> . . . | 4 1 9 | . . 5</span>`,
        `<span style="color: #e6e6e6;"> . . . | . 8 . | . 7 9</span>`,
        ` `,
        `<span style="color: #4ade80;">> free(player_data) executed successfully. Exit code 0.</span>`
    ];
    let j = 0;
    function printSudoku() {
        if (j < lines.length) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'output-line';
            lineDiv.innerHTML = lines[j];
            sudokuOutput.appendChild(lineDiv);
            j++;
            setTimeout(printSudoku, 80);
        } else {
            runSudokuBtn.disabled = false;
        }
    }
    printSudoku();
});

setTimeout(updateLanguage, 600); 
setInterval(getDiscordStatus, 30000);

const backToTopBtn = document.getElementById('backToTop');
const mainContent = document.querySelector('.main-content');

function checkScroll() {
       const scrolled = mainContent.scrollTop || window.pageYOffset || document.documentElement.scrollTop;

    if (scrolled > 150) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

mainContent.addEventListener('scroll', checkScroll);
window.addEventListener('scroll', checkScroll);

backToTopBtn.addEventListener('click', () => {
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
});