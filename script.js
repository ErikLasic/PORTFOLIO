// ========================================
// Navigation Toggle
// ========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========================================
// Email Copy Functionality
// ========================================
function copyEmail(event) {
    event.preventDefault(); // Prevent mailto from opening
    const email = event.currentTarget.dataset.email || 'lasic.erik@gmail.com';
    
    // Try to copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
        // Show toast notification
        showToast('📧 ' + email + ' - Kopirano! / Copied!');
    }).catch(() => {
        // Fallback - show the email in alert
        showToast('📧 ' + email);
    });
}

// Toast notification function
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.copy-toast');
    if (existingToast) existingToast.remove();
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast styles
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    .copy-toast {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #2c3e50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s ease;
    }
    .copy-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
`;
document.head.appendChild(toastStyle);

// ========================================
// Language Toggle - Default to Slovenian
// ========================================
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = localStorage.getItem('language') || 'sl'; // Default to Slovenian

// Function to switch language
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update button states
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-en][data-sl]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.textContent = text;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'sl' ? 'sl' : 'en';
}

// Language button click handlers
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
    });
});

// Initialize language on page load (default to Slovenian)
setLanguage(currentLang);

// ========================================
// Magnetic Button Effect for Nav Links
// ========================================
document.querySelectorAll('.nav-magnetic').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// ========================================
// Magnetic Effect for Skill Items
// ========================================
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll Reveal Animation
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Add reveal animation to elements
document.querySelectorAll('.stat-card, .experience-card, .skill-category, .edu-card, .contact-item, .project-card, .github-projects-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add revealed class styles
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ========================================
// Active Navigation Link
// ========================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-magnetic');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ========================================
// Floating Scroll Down Button
// ========================================
const scrollDownBtn = document.getElementById('scrollDownBtn');
const allSections = Array.from(document.querySelectorAll('section'));

// Function to scroll to next section
function scrollToNextSection() {
    const scrollPosition = window.scrollY + 150; // Add offset for navbar
    
    // Find the next section
    let nextSection = null;
    for (const section of allSections) {
        if (section.offsetTop > scrollPosition) {
            nextSection = section;
            break;
        }
    }
    
    // If no next section found (at the bottom), scroll to top
    if (!nextSection) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        return;
    }
    
    // Scroll to next section
    window.scrollTo({
        top: nextSection.offsetTop - 80,
        behavior: 'smooth'
    });
}

// Click event for desktop
scrollDownBtn.addEventListener('click', scrollToNextSection);

// Touch event for mobile - prevent double trigger
scrollDownBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    scrollToNextSection();
});

// Hide button when at footer/bottom
window.addEventListener('scroll', () => {
    const footer = document.querySelector('.footer');
    const footerTop = footer.offsetTop;
    const windowBottom = window.scrollY + window.innerHeight;
    
    if (windowBottom >= footerTop - 100) {
        scrollDownBtn.classList.add('hidden');
    } else {
        scrollDownBtn.classList.remove('hidden');
    }
}, { passive: true }); // Passive for better scroll performance on mobile

// ========================================
// Console Easter Egg
// ========================================
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #4a5568;');
console.log('%c💼 Thanks for checking out my portfolio!', 'font-size: 14px; color: #64748b;');
console.log('%c📧 Contact: lasic.erik@gmail.com', 'font-size: 12px; color: #94a3b8;');

// ========================================
// PDF Export Function
// ========================================
async function exportToPDF() {
    showToast('Ustvarjam PDF... / Generating PDF...');
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;
        const contentWidth = pageWidth - (margin * 2);
        let yPosition = margin;
        
        // Helper function to check page break
        function checkPageBreak(neededSpace) {
            if (yPosition + neededSpace > pageHeight - margin) {
                pdf.addPage();
                yPosition = margin;
            }
        }
        
        // Helper function to add section title
        function addSectionTitle(text) {
            checkPageBreak(15);
            pdf.setFontSize(13);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(90, 108, 125);
            pdf.text(text.toUpperCase(), margin, yPosition);
            yPosition += 2;
            pdf.setDrawColor(90, 108, 125);
            pdf.line(margin, yPosition, margin + 40, yPosition);
            yPosition += 7;
            pdf.setTextColor(44, 62, 80);
        }
        
        // Helper function to add text
        function addText(text, fontSize, isBold = false, indent = 0) {
            pdf.setFontSize(fontSize);
            pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
            const lines = pdf.splitTextToSize(text, contentWidth - indent);
            lines.forEach(line => {
                checkPageBreak(fontSize * 0.5);
                pdf.text(line, margin + indent, yPosition);
                yPosition += fontSize * 0.45;
            });
        }
        
        // Function to create CV page
        function createCVPage(lang) {
            // Header
            pdf.setFillColor(90, 108, 125);
            pdf.rect(0, 0, pageWidth, 35, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(22);
            pdf.setFont('helvetica', 'bold');
            pdf.text('ERIK LASIC', margin, 18);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'normal');
            pdf.text(lang === 'sl' ? 'Razvijalec programske opreme' : 'Software Developer', margin, 28);
            
            // Contact bar
            pdf.setFillColor(232, 226, 217);
            pdf.rect(0, 35, pageWidth, 10, 'F');
            pdf.setTextColor(74, 85, 104);
            pdf.setFontSize(9);
            pdf.text('lasic.erik@gmail.com', margin, 41);
            pdf.text('070 799 277', margin + 50, 41);
            pdf.text(lang === 'sl' ? 'Starse, Slovenija' : 'Starse, Slovenia', margin + 85, 41);
            pdf.text('github.com/ErikLasic', margin + 130, 41);
            
            pdf.setTextColor(44, 62, 80);
            yPosition = 55;
            
            // ABOUT
            addSectionTitle(lang === 'sl' ? 'O meni' : 'About Me');
            const aboutText = lang === 'sl' 
                ? 'Sem razvijalec programske opreme iz Slovenije, trenutno zakljucujem magistrski studij Informatike in podatkovnih tehnologij na Univerzi v Mariboru. Z mocnimi temelji v racunalnistvu in prakticnimi izkusnjami pri razvoju poslovnih resitev se specializiram za sistemske integracije, namizne aplikacije in storitve obdelave podatkov. V prostem casu razvijam igro v Unity s C#.'
                : 'I am a software developer from Slovenia, currently pursuing my Masters degree in Informatics and Data Technology at the University of Maribor. With a strong foundation in computer science and hands-on experience in building enterprise solutions, I specialize in system integration, desktop applications, and data processing services. In my free time, I am developing a game in Unity with C#.';
            addText(aboutText, 10);
            yPosition += 5;
            
            // WORK EXPERIENCE
            addSectionTitle(lang === 'sl' ? 'Delovne izkusnje' : 'Work Experience');
            addText(lang === 'sl' ? 'IT Oddelek - Podjetje za tunelsko gradnjo (6 mesecev)' : 'IT Department - Tunnelling Production Company (6 months)', 11, true);
            yPosition += 4;
            
            // Experience 1
            addText(lang === 'sl' ? 'SQL-Odoo integracijski sistem' : 'SQL-Odoo Integration System', 10, true, 3);
            yPosition += 1;
            addText(lang === 'sl' 
                ? 'Razvil integracijske resitve med SQL podatkovno bazo in Odoo ERP sistemom, ki sinhronizirajo podatke in zagotavljajo konsistentnost med obema platformama.'
                : 'Developed an integration solution between SQL database and Odoo ERP system that synchronizes data ensuring consistency between both platforms.', 9, false, 3);
            addText('SQL, Odoo, Python, API Integration', 8, false, 3);
            yPosition += 4;
            
            // Experience 2
            addText(lang === 'sl' ? 'Offline aplikacija za racune' : 'Offline Billing Application', 10, true, 3);
            yPosition += 1;
            addText(lang === 'sl'
                ? 'Razvil namizno aplikacijo z Visual Studio in C#, ki deluje v offline nacinu ter upravlja ustvarjanje racunov s postavkami in kolicinami, dodeljenimi zaposlenim.'
                : 'Built a desktop application using Visual Studio and C# that operates in offline mode, managing bill creation with itemized entries and quantities assigned to employees.', 9, false, 3);
            addText('C#, Visual Studio, .NET, WinForms', 8, false, 3);
            yPosition += 4;
            
            // Experience 3
            addText(lang === 'sl' ? 'Odoo podatkovni scraperji' : 'Odoo Data Scrapers', 10, true, 3);
            yPosition += 1;
            addText(lang === 'sl'
                ? 'Ustvaril Windows storitve, ki pridobivajo podatke iz Odoo sistema, jih razclenjujejo in oblikujejo v strukturirane CSV datoteke za porocanje in analizo.'
                : 'Created Windows services that scrape data from Odoo, parsing and formatting the information into structured CSV files for reporting and analysis.', 9, false, 3);
            addText('C#, Windows Services, Odoo API, CSV', 8, false, 3);
            yPosition += 6;
            
            // PROJECTS
            addSectionTitle(lang === 'sl' ? 'Osebni projekti' : 'Personal Projects');
            addText(lang === 'sl' ? 'Razvoj iger v Unity (V razvoju)' : 'Unity Game Development (In Development)', 10, true, 3);
            yPosition += 1;
            addText(lang === 'sl'
                ? 'Oblikujem in razvijam igro v Unity kot hobi projekt, kjer zdruzujem programerske vescine s kreativnim oblikovanjem iger.'
                : 'Designing and developing a game in Unity as a hobby project, combining programming skills with creative game design.', 9, false, 3);
            addText('Unity, C#, Game Design', 8, false, 3);
            yPosition += 6;
            
            // SKILLS
            addSectionTitle(lang === 'sl' ? 'Tehnicne vescine' : 'Technical Skills');
            
            const skills = [
                { sl: 'Spletni vmesnik', en: 'Frontend', items: 'Angular, JavaScript, CSS, HTML' },
                { sl: 'Zaledni sistem', en: 'Backend', items: 'Node.js, Express.js, Python, Java' },
                { sl: 'Podatkovne baze', en: 'Database', items: 'MongoDB, MySQL, Firebase' },
                { sl: 'Programski jeziki', en: 'Languages', items: 'C, C#, C++, Kotlin' },
                { sl: 'Orodja', en: 'Tools', items: 'Git, GitHub, Docker, JSON, Postman' },
                { sl: 'API vmesniki', en: 'APIs', items: 'REST, SOAP, gRPC' },
                { sl: 'Mobilne aplikacije', en: 'Mobile', items: 'Android Studio, React Native' }
            ];
            
            skills.forEach(skill => {
                const label = lang === 'sl' ? skill.sl : skill.en;
                addText(label + ': ' + skill.items, 9, false, 3);
                yPosition += 1;
            });
            yPosition += 5;
            
            // EDUCATION
            addSectionTitle(lang === 'sl' ? 'Izobrazba' : 'Education');
            
            addText(lang === 'sl' ? 'Magisterij iz informatike in podatkovnih tehnologij' : 'Masters Degree in Informatics and Data Technology', 10, true, 3);
            yPosition += 1;
            addText(lang === 'sl' ? 'Univerza v Mariboru, FERI (2024 - danes)' : 'University of Maribor, FERI (2024 - Present)', 9, false, 3);
            yPosition += 4;
            
            addText(lang === 'sl' ? 'Diploma iz racunalnistva in informacijskih tehnologij' : 'Bachelors Degree in Computer Science and Information Technologies', 10, true, 3);
            yPosition += 1;
            addText(lang === 'sl' ? 'Univerza v Mariboru, FERI (2020 - 2024)' : 'University of Maribor, FERI (2020 - 2024)', 9, false, 3);
            yPosition += 5;
            
            // LANGUAGES
            addSectionTitle(lang === 'sl' ? 'Jeziki' : 'Languages');
            addText(lang === 'sl' ? 'Slovenscina (materni), Anglescina (tekoce)' : 'Slovenian (Native), English (Fluent)', 9, false, 3);
            
            // Footer
            pdf.setFontSize(8);
            pdf.setTextColor(150, 150, 150);
            pdf.text('Erik Lasic | 2025', pageWidth / 2, pageHeight - 8, { align: 'center' });
        }
        
        // Create Slovenian version (page 1)
        createCVPage('sl');
        
        // Create English version (page 2)
        pdf.addPage();
        yPosition = margin;
        createCVPage('en');
        
        // Save the PDF
        pdf.save('Erik_Lasic_CV.pdf');
        showToast('PDF prenesen! / PDF downloaded!');
        
    } catch (error) {
        console.error('PDF generation error:', error);
        showToast('Napaka pri ustvarjanju PDF / Error generating PDF');
    }
}
