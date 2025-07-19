/**
 * Enhanced Portfolio with Advanced Ruth AI Chatbot
 * Includes Games, Jokes, Entertainment & Long Conversations
 */

class PortfolioApp {
    constructor() {
        this.isLoaded = false;
        this.chatbot = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.startLoading();
        this.initializeBackground();
    }

    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => this.handleDOMLoad());
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
        window.addEventListener('resize', this.throttle(() => this.handleResize(), 250));
    }

    // Loading Screen
    startLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingPercentage = document.querySelector('.loading-percentage');
        const mainContent = document.getElementById('main-content');

        let percentage = 0;
        const interval = setInterval(() => {
            percentage += Math.random() * 4 + 1;
            
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(interval);
                this.completeLoading();
            }
            
            loadingPercentage.textContent = Math.floor(percentage) + '%';
        }, 80);
    }

    completeLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            document.body.classList.remove('loading');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.classList.add('show');
                this.isLoaded = true;
                this.initializeMainFeatures();
            }, 500);
        }, 800);
    }

    initializeMainFeatures() {
        this.initializeAnimations();
        this.initializeScrollObserver();
        this.initializeNavigation();
        this.initializeChatbot();
        this.initializeInteractiveElements();
        this.showWelcomeMessage();
    }

    // Background Effects
    initializeBackground() {
        // Add mouse movement parallax
        document.addEventListener('mousemove', this.throttle((e) => {
            const mouseX = (e.clientX / window.innerWidth) * 100;
            const mouseY = (e.clientY / window.innerHeight) * 100;
            
            const orbs = document.querySelectorAll('.orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.02;
                const x = (mouseX - 50) * speed;
                const y = (mouseY - 50) * speed;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        }, 16));

        // Scroll-based background animation
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const gradientBg = document.querySelector('.gradient-background');
            if (gradientBg) {
                gradientBg.style.transform = `translateY(${rate * 0.3}px)`;
            }
        }, 16));
    }

    // Animations
    initializeAnimations() {
        // Animated text switching
        const animatedText = document.getElementById('animated-text');
        const texts = ['Future Developer', 'Cloud Enthusiast', 'Security Student', 'Tech Learner'];
        let currentIndex = 0;
        
        if (animatedText) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                animatedText.textContent = texts[currentIndex];
            }, 3000);
        }

        // Typing animation for hero section
        this.initializeTypingAnimation();
    }

    initializeTypingAnimation() {
        const titleLine = document.querySelector('.title-line');
        const originalText = "Hi there! I'm";
        let currentText = '';
        let currentIndex = 0;
        
        if (titleLine) {
            titleLine.textContent = '';
            
            const typeWriter = () => {
                if (currentIndex < originalText.length) {
                    currentText += originalText.charAt(currentIndex);
                    titleLine.textContent = currentText;
                    currentIndex++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }

    // Scroll Observer
    initializeScrollObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .learning-category, .contact-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    // Navigation
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        // Smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active link highlighting
        window.addEventListener('scroll', this.throttle(() => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, 16));
    }

    // Interactive Elements
    initializeInteractiveElements() {
        // Project cards hover effects
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Learning progress bars animation
        const progressBars = document.querySelectorAll('.progress-fill');
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }

    // Ruth AI Chatbot
    initializeChatbot() {
        this.chatbot = new EnhancedRuthChatbot();
        setTimeout(() => {
            this.chatbot.showNotification();
        }, 5000);
    }

    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    handleDOMLoad() {
        document.body.classList.add('loading');
    }

    handleScroll() {
        // Navbar background on scroll
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        }
    }

    handleResize() {
        // Responsive adjustments
        if (window.innerWidth < 768) {
            document.querySelectorAll('.orb').forEach(orb => {
                orb.style.display = 'none';
            });
        } else {
            document.querySelectorAll('.orb').forEach(orb => {
                orb.style.display = 'block';
            });
        }
    }

    showWelcomeMessage() {
        console.log(`
🎓 BCA Student Portfolio with Enhanced Ruth AI Loaded!
====================================================

Features:
✨ Glassmorphism UI Design
🤖 Enhanced Ruth AI Chatbot with Games & Jokes
🎮 Interactive Games & Entertainment
📱 Fully Responsive Design
⚡ Smooth Animations
🌟 Student-Focused Content

Ruth can now:
• Tell jokes and funny stories
• Play games with visitors
• Have long conversations
• Provide entertainment
• Share fun facts and trivia

Ready for opportunities! 💼
        `);
    }
}

// Enhanced Ruth AI Chatbot with Games and Entertainment
class EnhancedRuthChatbot {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.userName = '';
        this.conversationContext = [];
        this.userScore = 0;
        this.currentGame = null;
        this.gameState = {};
        this.conversationCount = 0;
        this.lastInteraction = Date.now();
        this.responses = this.initializeResponses();
        this.jokes = this.initializeJokes();
        this.games = this.initializeGames();
        this.funFacts = this.initializeFunFacts();
        this.stories = this.initializeStories();
        this.isTyping = false;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeChatbot());
        } else {
            this.initializeChatbot();
        }
    }

    initializeChatbot() {
        this.chatbotContainer = document.getElementById('chatbot-container');
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotMessages = document.getElementById('chatbot-messages');
        this.chatbotInput = document.getElementById('chatbot-input');
        this.chatbotSend = document.getElementById('chatbot-send');
        this.chatbotClose = document.getElementById('chatbot-close');
        this.chatbotMinimize = document.getElementById('chatbot-minimize');
        this.chatbotNotification = document.getElementById('chatbot-notification');
        this.suggestionBtns = document.querySelectorAll('.suggestion-btn');
        this.gameInterface = document.getElementById('game-interface');
        this.gameClose = document.getElementById('game-close');

        this.bindEvents();
    }

    bindEvents() {
        if (this.chatbotToggle) {
            this.chatbotToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleChatbot();
            });
        }

        if (this.chatbotClose) {
            this.chatbotClose.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeChatbot();
            });
        }

        if (this.chatbotMinimize) {
            this.chatbotMinimize.addEventListener('click', (e) => {
                e.stopPropagation();
                this.minimizeChatbot();
            });
        }

        if (this.chatbotSend) {
            this.chatbotSend.addEventListener('click', (e) => {
                e.stopPropagation();
                this.sendMessage();
            });
        }

        if (this.gameClose) {
            this.gameClose.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeGame();
            });
        }

        if (this.chatbotInput) {
            this.chatbotInput.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            this.chatbotInput.addEventListener('focus', (e) => {
                e.stopPropagation();
            });

            this.chatbotInput.addEventListener('keydown', (e) => {
                e.stopPropagation();
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        this.suggestionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const text = btn.getAttribute('data-text');
                this.simulateUserMessage(text);
            });
        });

        if (this.chatbotContainer) {
            this.chatbotContainer.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    initializeResponses() {
        return {
            greetings: [
                "Namaste! Main Ruth hun! Aaj kya mood hai? Chat karne ka ya phir kuch fun karne ka? 🙏😄",
                "Hello ji! Ruth yahan present! Bore ho rahe hain? Main jokes bhi jaanti hun! 😊",
                "Adaab! Main Ruth, entertainment ki queen! Kya karenge aaj? Chat ya game? 🌟",
                "Hii! Ruth speaking! Time pass karne ka mann hai? Main expert hun isme! 😄",
                "Namaste namaste! Ruth ka welcomes you! Aaj kya special request hai? 🎉"
            ],
            
            aboutAnsh: [
                "Ansh Thakur ji ek brilliant BCA first-year student hain! 🎓 Cloud Computing aur Cybersecurity mein specialize kar rahe hain!",
                "Ansh bhaiya ek dedicated student hain jo job opportunities dhundh rahe hain! Python, Java, C sab sikha rahe hain! 💻",
                "Ansh ji ek sincere learner hain jo technology ke field mein apna career banana chahte hain! Currently learning phase mein hain! 🚀",
                "Ansh student life enjoy kar rahe hain lekin serious hain apne goals ke liye! Job ke liye ready hain! 💼"
            ],
            
                       education: [
                "Ansh ji BCA first year kar rahe hain! 📚\n\n**Current Studies:**\n• Cloud Computing & Cybersecurity\n• Programming fundamentals\n• Computer Science basics\n• Mathematics & Science background\n\n**Future Plans:**\n• AWS certifications (Solutions Architect)\n• DevOps Associate certification\n• Advanced programming concepts\n\nPadhai ke saath job bhi dhundh rahe hain! 🎯"
            ],
            
            learning: [
                "Ansh ji currently bahut kuch sikha rahe hain! 📖\n\n**Programming Languages:**\n• Python (Beginner level)\n• Java (Beginner level) \n• C Programming (Learning)\n• HTML/CSS/JavaScript (Building web apps)\n\n**Specialization Areas:**\n• Cloud Computing (AWS prep)\n• Cybersecurity fundamentals\n• Web Development (Frontend focus)\n• Code quality & optimization\n\nHar din practice kar rahe hain! 💪"
            ],
            
            projects: [
                "Ansh ji ke learning projects simple lekin meaningful hain! 🎯\n\n1. **Portfolio Website** - HTML, CSS, JavaScript with AI chatbot\n2. **Python Practice Programs** - Basic programming concepts\n3. **Java Learning Projects** - OOP concepts practice\n4. **C Programming Practice** - Foundation building\n5. **Web Applications** - Frontend development practice\n\nSab beginner level ke hain but quality focus hai! 😊"
            ],
            
            jobSearch: [
                "Ansh ji actively job opportunities dhundh rahe hain! 💼\n\n**Looking for:**\n• Entry-level developer positions\n• Internships (Summer/Part-time)\n• Junior cloud engineer roles\n• Frontend developer trainee\n• Cybersecurity analyst intern\n\n**Why hire Ansh?**\n✅ Fresh perspective & energy\n✅ Quick learner & dedicated\n✅ AWS certification prep\n✅ Web development skills\n✅ Strong foundation building\n\nPerfect for companies wanting to train talent! 🚀"
            ],
            
            skills: [
                "Ansh ji ke skills developing stage mein hain! 🌱\n\n**Current Capabilities:**\n• Web Development: HTML, CSS, JavaScript\n• Programming: Python, Java, C (learning)\n• Cloud: AWS fundamentals (cert prep)\n• Security: Cybersecurity basics\n• Problem Solving: Good analytical skills\n\n**Strengths:**\n• Code quality focus\n• Optimization mindset\n• Continuous learning\n• Fresh tech perspectives\n\nGrowth trajectory very promising! 📈"
            ],
            
            contact: [
                "Ansh ji se contact karna chahte hain? Job opportunity hai kya? 📞\n\n📧 **Email:** ansh@example.com\n📍 **Location:** Jhansi, India\n🎓 **Status:** BCA First Year Student\n💼 **Availability:** Seeking opportunities\n🌍 **Flexibility:** Open to relocate\n☁️ **Interests:** Cloud Computing, Web Dev\n\nEntry-level positions ke liye perfect candidate! 🚀"
            ],
            
            timepassMood: [
                "Timepass mood mein hain? Perfect! Main entertainment ki expert hun! 😄",
                "Bore ho rahe hain? Arre yaar, main yahan hun na! Kya karenge? 🎉",
                "Chill karne ka time hai! Main jokes, games, stories sab jaanti hun! 😊",
                "Aaj mann kharab hai kya? Main mood fresh kar dungi! 🌟",
                "Free time hai? Lucky you! Main sabse mazedaar AI hun! 🎮"
            ],
            
            jokesIntro: [
                "Jokes sunoge? Main comedy queen hun! 😂",
                "Hasna hai? Mere paas latest jokes hain! 🤣",
                "Mood light karna hai? Joke time! 😄",
                "Comedy special chahiye? Ruth presents... 🎭",
                "Hasi mazak karenge? Main ready hun! 😆"
            ],
            
            gamesIntro: [
                "Game khelne ka mann hai? Main game master hun! 🎮",
                "Bore ho rahe hain? Chalo game khelenge! 🕹️",
                "Dimag lagana hai? Puzzle games ready hain! 🧩",
                "Competition mood mein hain? Challenge accept! 🏆",
                "Fun games chahiye? Ruth's arcade open! 🎯"
            ],
            
            encouragement: [
                "Waah! Bilkul sahi keh rahe hain! 👍",
                "Exactly! Aap smart hain! 🧠",
                "Perfect answer! Main impressed hun! ✨",
                "Shabash! Keep it up! 🌟",
                "Brilliant! Aap genius hain! 💯",
                "Amazing! Continue karte rahiye! 🚀"
            ],
            
            confused: [
                "Hmm, ye toh confusing hai! Thoda explain kariye? 🤔",
                "Samjha nahi... kya matlab hai? 😅",
                "Arre yaar, main smart hun lekin ye nahi samjha! 🤷‍♀️",
                "Kya bola? Brain freeze ho gaya! 😵",
                "Error 404: Understanding not found! 😂"
            ],
            
            goodbye: [
                "Bye bye! Jaldi wapas aa jaiye! Main miss karungi! 👋",
                "Alvida! Ansh ji ko job dilwana mat bhooliye! 😉",
                "Tata! Fun tha na? Kabhi bhi aa jaiye! 🌟",
                "See you later! Entertainment chahiye to Ruth yaad kariye! 😄",
                "Namaste! Keep smiling aur aate rahiye! 🙏"
            ],
            
            dailyChat: [
                "Aaj ka din kaisa gaya? Kuch interesting hua? ☀️",
                "Coffee pi? Main digital coffee peeti hun! ☕",
                "Mood kaisa hai? Main therapist bhi hun! 😌",
                "Weather kaisa hai? Main cloud computing karti hun! ☁️",
                "Khana kya khaya? Main data khati hun! 🍽️",
                "Padhāī kaisi chal rahi? Ansh ki tarah dedicated bano! 📚"
            ],
            
            motivational: [
                "Life mein kabhi haar mat maano! Ansh ki tarah keep learning! 💪",
                "Sapne dekhna aur unhe achieve karna - dono important hain! ✨",
                "Har problem ka solution hota hai, bas thoda patience chahiye! 🧘",
                "Success ka secret? Consistent effort aur positive attitude! 🌟",
                "Aap unique hain, apne strengths pe focus kariye! 💎",
                "Learning never stops, growth never ends! 📈"
            ]
        };
    }

    initializeJokes() {
        return [
            {
                setup: "Programmer ki wife ne kaha: 'Tumhe market se milk leke aana hai, aur agar eggs mile to 6 le aana.'",
                punchline: "Programmer 6 bottles milk leke aaya! Wife: 'Ye kya hai?' Programmer: 'Eggs mile the!' 😂"
            },
            {
                setup: "Student: 'Sir, Python kya hai?'",
                punchline: "Teacher: 'Programming language hai.' Student: 'Toh snake charmer ban jana chahiye?' 🐍😄"
            },
            {
                setup: "Cloud Computing ka student apne dad se: 'Papa main cloud mein kaam karta hun.'",
                punchline: "Dad: 'Beta, neeche aa ja, barish ho rahi hai!' ☁️😂"
            },
            {
                setup: "HTML ka full form kya hai?",
                punchline: "Hyper Text Markup Language nahi... 'How To Make Life!' 😆"
            },
            {
                setup: "Java programming seekhte time student: 'Coffee peeke code likhta hun!'",
                punchline: "Teacher: 'Java beans ki jagah coffee beans use kar rahe ho!' ☕😂"
            },
            {
                setup: "BCA student hostel mein: 'Mera WiFi password kya hai?'",
                punchline: "Roommate: '12345' Student: 'Itna simple?' Roommate: 'Haan, just like your code!' 😅"
            },
            {
                setup: "Cybersecurity student apni girlfriend se: 'Tum meri password ho!'",
                punchline: "Girlfriend: 'Matlab?' Student: 'Hard to guess aur easily forgotten!' 💔😂"
            },
            {
                setup: "C programming class mein teacher: 'Array ka size fix karo!'",
                punchline: "Student: 'Sir, main toh apna khud ka size fix nahi kar pata!' 😄"
            },
            {
                setup: "AWS certification ke liye student: 'Main cloud mein hun!'",
                punchline: "Mom: 'Beta, neeche aa ja dinner ready hai!' 🍽️😂"
            },
            {
                setup: "Debugging ke time programmer ki prayer:",
                punchline: "'Dear God, please compile without errors... at least once!' 🙏😅"
            }
        ];
    }

    initializeGames() {
        return {
            numberGuess: {
                name: "Number Guessing Game",
                description: "Main 1 se 100 ke beech ek number soch rahi hun. Guess karo!",
                minNumber: 1,
                maxNumber: 100
            },
            riddles: [
                {
                    question: "Main program likhta hun lekin khud nahi chalata, main code karta hun lekin compile nahi karta. Main kaun hun?",
                    answer: "programmer",
                    hint: "Jo code likhta hai..."
                },
                {
                    question: "Mera naam 4 letters ka hai, main websites banata hun, main markup language hun. Main kaun hun?",
                    answer: "html",
                    hint: "Web development ki soul..."
                },
                {
                    question: "Main beverage bhi hun aur programming language bhi. Main kaun hun?",
                    answer: "java",
                    hint: "Coffee aur coding dono..."
                },
                {
                    question: "Main snake ka naam bhi hun aur programming language bhi. Beginner-friendly hun. Main kaun hun?",
                    answer: "python",
                    hint: "Ssss... coding language"
                },
                {
                    question: "Main cloud mein rehta hun lekin rain nahi karta. Data store karta hun. Main kaun hun?",
                    answer: "aws",
                    hint: "Amazon ka service..."
                }
            ],
            quiz: [
                {
                    question: "HTML ka full form kya hai?",
                    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"],
                    correct: 0,
                    explanation: "HTML stands for Hyper Text Markup Language! Web pages banane ke liye use hota hai! 🌐"
                },
                {
                    question: "Python programming language ka naam kisliye rakha gaya?",
                    options: ["Snake ke naam par", "Monty Python comedy group", "Fast speed ke liye", "Powerful language ke liye"],
                    correct: 1,
                    explanation: "Python ka naam Monty Python comedy group ke naam par rakha gaya tha! 🐍😄"
                },
                {
                    question: "Cloud Computing mein 'IaaS' ka matlab kya hai?",
                    options: ["Internet as a Service", "Infrastructure as a Service", "Information as a Service", "Intelligence as a Service"],
                    correct: 1,
                    explanation: "IaaS means Infrastructure as a Service! Virtual machines aur storage provide karta hai! ☁️"
                },
                {
                    question: "Java programming language kab banaya gaya?",
                    options: ["1990", "1995", "2000", "1985"],
                    correct: 1,
                    explanation: "Java 1995 mein Sun Microsystems ne banaya tha! Coffee lovers ke liye perfect! ☕"
                },
                {
                    question: "CSS ka primary purpose kya hai?",
                    options: ["Programming logic", "Styling web pages", "Database management", "Server configuration"],
                    correct: 1,
                    explanation: "CSS (Cascading Style Sheets) web pages ko style karne ke liye use hota hai! 🎨"
                }
            ],
            wordGame: {
                name: "Tech Word Association",
                words: ["PYTHON", "JAVASCRIPT", "CLOUD", "SECURITY", "ALGORITHM", "DATABASE", "FRONTEND", "BACKEND"],
                description: "Main ek tech word sochungi, aap related words batao!"
            }
        };
    }

    initializeFunFacts() {
        return [
            "Fun Fact: Pehla computer bug actually ek real bug (insect) tha jo 1947 mein computer mein stuck ho gaya tha! 🐛",
            "Fun Fact: 'WiFi' ka matlab 'Wireless Fidelity' nahi hai! Ye sirf ek made-up name hai! 📶",
            "Fun Fact: Google ka naam 'Googol' se aaya hai - ye 1 followed by 100 zeros ko kehte hain! 🔢",
            "Fun Fact: Pehla computer mouse wood ka bana tha aur 1964 mein invent hua tha! 🖱️",
            "Fun Fact: Python programming language ko Monty Python comedy group ke naam par rakha gaya! 🐍😄",
            "Fun Fact: Internet aur World Wide Web alag cheezein hain! Internet infrastructure hai, WWW ek service! 🌐",
            "Fun Fact: JavaScript ka Java se koi relation nahi hai! Sirf marketing ke liye similar naam rakha! ☕",
            "Fun Fact: 'Cloud Computing' term actually meteorology se aaya hai! ☁️",
            "Fun Fact: Pehla computer programmer Ada Lovelace thi - 1800s mein! 👩‍💻",
            "Fun Fact: 'Bug' aur 'Debug' terms Grace Hopper ne popular kiye the! 🔧"
        ];
    }

    initializeStories() {
        return [
            {
                title: "The Student Who Coded in Dreams",
                story: "Ek BCA student tha jo raat ko programming dreams dekhta tha. Ek din usne dream mein perfect algorithm dekha aur uth kar code kar diya! Subah dekha to wo actually working tha! Moral: Passion itna ho ki neend mein bhi coding karo! 😴💻"
            },
            {
                title: "The WiFi Password Mystery", 
                story: "College mein WiFi password monthly change hota tha. Ek smart student ne pattern notice kiya - password always current month + 'BCA' + year! Wo aise free internet use karta raha pura semester! Moral: Pattern recognition skills important hain! 📶🕵️"
            },
            {
                title: "The Cloud Storage Hero",
                story: "Ek student ka laptop crash ho gaya project submit karne se ek din pehle! Panic ho gaya! Phir yaad aaya - cloud backup tha! Google Drive se project download kiya aur submit kar diya! Moral: Always backup in the cloud! ☁️💾"
            },
            {
                title: "The Debugging Detective",
                story: "Ek Python program 2 din se nahi chal raha tha. Student ne sab try kiya! Finally pata chala - ek semicolon missing tha jo Python mein chahiye hi nahi! 2 din ka effort waste! Moral: Basics clear rakho! 🐍🔍"
            },
            {
                title: "The Internship Interview",
                story: "Interview mein pucha: 'Aap fresher hain, experience kya hai?' Student bola: 'Sir, main roz 100 bugs create karta hun aur 99 fix kar deta hun!' Interviewer has pada aur internship mil gaya! Moral: Honest communication wins! 💼😄"
            }
        ];
    }

    showNotification() {
        if (this.chatbotNotification) {
            this.chatbotNotification.classList.remove('hidden');
            setTimeout(() => {
                this.chatbotNotification.classList.add('hidden');
            }, 10000);
        }
    }

    toggleChatbot() {
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }

    openChatbot() {
        this.isOpen = true;
        this.isMinimized = false;
        if (this.chatbotContainer) {
            this.chatbotContainer.classList.add('active');
            this.chatbotContainer.classList.remove('minimized');
        }
        if (this.chatbotNotification) {
            this.chatbotNotification.classList.add('hidden');
        }
        if (this.chatbotInput) {
            setTimeout(() => this.chatbotInput.focus(), 300);
        }
    }

    closeChatbot() {
        this.isOpen = false;
        if (this.chatbotContainer) {
            this.chatbotContainer.classList.remove('active');
            this.chatbotContainer.classList.remove('minimized');
        }
        this.closeGame();
    }

    minimizeChatbot() {
        this.isMinimized = !this.isMinimized;
        if (this.chatbotContainer) {
            if (this.isMinimized) {
                this.chatbotContainer.classList.add('minimized');
            } else {
                this.chatbotContainer.classList.remove('minimized');
            }
        }
    }

    closeGame() {
        if (this.gameInterface) {
            this.gameInterface.style.display = 'none';
        }
        this.currentGame = null;
        this.gameState = {};
    }

    sendMessage() {
        if (!this.chatbotInput) return;
        
        const message = this.chatbotInput.value.trim();
        if (!message) return;

        this.isTyping = true;
        this.conversationCount++;
        this.lastInteraction = Date.now();
        
        this.addMessage(message, 'user');
        this.chatbotInput.value = '';
        
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            this.isTyping = false;
            
            // Add follow-up suggestions for engagement
            this.addFollowUpSuggestions();
        }, 1000 + Math.random() * 1500);
    }

    simulateUserMessage(text) {
        this.addMessage(text, 'user');
        this.conversationCount++;
        
        setTimeout(() => {
            this.showTypingIndicator();
            setTimeout(() => {
                this.hideTypingIndicator();
                const response = this.generateResponse(text);
                this.addMessage(response, 'bot');
                this.addFollowUpSuggestions();
            }, 800);
        }, 300);
    }

    addFollowUpSuggestions() {
        // Add contextual suggestions based on conversation
        if (this.conversationCount > 3 && Math.random() > 0.7) {
            setTimeout(() => {
                const suggestions = [
                    "Joke sunoge? 😄",
                    "Game khelenge? 🎮", 
                    "Fun fact batau? 🤔",
                    "Story sunoge? 📚"
                ];
                const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
                this.addMessage(`Btw, ${randomSuggestion}`, 'bot');
            }, 2000);
        }
    }

    addMessage(text, type) {
        if (!this.chatbotMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const currentTime = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${this.escapeHtml(text)}</p>
                </div>
                <div class="message-time">${currentTime}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <div class="avatar-img">🤖</div>
                </div>
                <div class="message-content">
                    <p>${this.formatMessage(text)}</p>
                </div>
                <div class="message-time">${currentTime}</div>
            `;
        }
        
        this.chatbotMessages.appendChild(messageDiv);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        
        this.conversationContext.push({ type, text, time: currentTime });
    }

    formatMessage(text) {
        // Format message with basic markdown-like styling
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showTypingIndicator() {
        if (!this.chatbotMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-img">🤖</div>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        this.chatbotMessages.appendChild(typingDiv);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }

    hideTypingIndicator() {
        if (!this.chatbotMessages) return;
        
        const typingMessage = this.chatbotMessages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    generateResponse(message) {
        const msg = message.toLowerCase();
        
        // Handle ongoing games
        if (this.currentGame) {
            return this.handleGameInput(message);
        }
        
        // Extract user name if mentioned
        if (msg.includes('mera naam') || msg.includes('my name')) {
            const nameMatch = message.match(/(?:mera naam|my name is|i am|main)\s+(\w+)/i);
            if (nameMatch) {
                this.userName = nameMatch[1];
                return `Nice to meet you ${this.userName} ji! 😊 Ab main aapka naam yaad rakhungi! Kya karna chahte hain - chat, jokes, ya games? 🎉`;
            }
        }
        
        // Greetings
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste') || msg.includes('hey')) {
            return this.getRandomResponse('greetings');
        }
        
        // About Ansh
        if (msg.includes('ansh') || msg.includes('about') || msg.includes('tell me about')) {
            return this.getRandomResponse('aboutAnsh');
        }
        
        // Education queries
        if (msg.includes('education') || msg.includes('study') || msg.includes('bca') || msg.includes('college')) {
            return this.getRandomResponse('education');
        }
        
        // Learning queries
        if (msg.includes('learning') || msg.includes('skills') || msg.includes('programming') || msg.includes('coding')) {
            return this.getRandomResponse('learning');
        }
        
        // Projects
        if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) {
            return this.getRandomResponse('projects');
        }
        
        // Job search
        if (msg.includes('job') || msg.includes('internship') || msg.includes('opportunity') || msg.includes('hire')) {
            return this.getRandomResponse('jobSearch');
        }
        
        // Contact
        if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('reach')) {
            return this.getRandomResponse('contact');
        }
        
        // Jokes
        if (msg.includes('joke') || msg.includes('funny') || msg.includes('has') || msg.includes('comedy')) {
            return this.tellJoke();
        }
        
        // Games
        if (msg.includes('game') || msg.includes('play') || msg.includes('khel') || msg.includes('challenge')) {
            return this.startGameMenu();
        }
        
        // Fun facts
        if (msg.includes('fun fact') || msg.includes('fact') || msg.includes('interesting') || msg.includes('trivia')) {
            return this.shareFunFact();
        }
        
        // Stories
        if (msg.includes('story') || msg.includes('kahani') || msg.includes('tale') || msg.includes('tell me about')) {
            return this.tellStory();
        }
        
        // Personal questions
        if (msg.includes('how are you') || msg.includes('kaise ho') || msg.includes('kaisi ho')) {
            return this.getRandomResponse('dailyChat') + "\n\nAap batao, kya mood hai? Jokes, games, ya just chat? 😊";
        }
        
        // Motivation requests
        if (msg.includes('motivate') || msg.includes('inspire') || msg.includes('sad') || msg.includes('depressed')) {
            return this.getRandomResponse('motivational');
        }
        
        // Timepass mood
        if (msg.includes('bore') || msg.includes('boring') || msg.includes('timepass') || msg.includes('kya karu')) {
            return this.getRandomResponse('timepassMood') + "\n\nOptions hai:\n🎭 Jokes\n🎮 Games\n📖 Stories\n🧠 Fun Facts\n💬 Random Chat\n\nKya pasand hai?";
        }
        
        // Daily conversation
        if (msg.includes('kya kar rahe') || msg.includes('what doing') || msg.includes('kya chal raha')) {
            return "Main yahan aapka entertainment kar rahi hun! 😄 Aur aap? Padhai kar rahe hain ya timepass? Btw, kuch interesting sunana chahte hain? 🤔";
        }
        
        // Weather talk
        if (msg.includes('weather') || msg.includes('mausam') || msg.includes('rain') || msg.includes('sunny')) {
            return "Weather ki baat kar rahe hain? Main toh cloud mein rehti hun - hamesha perfect weather! ☁️😄 Aapke yahan kaisa hai? Coding weather hai ya Netflix weather? 🌤️";
        }
        
        // Food talk
        if (msg.includes('food') || msg.includes('khana') || msg.includes('hungry') || msg.includes('eat')) {
            return "Khane ki baat! Main toh data khati hun aur electricity peeti hun! 🤖😄 Aap kya pasand karte hain? Pizza ya biryani team? Waise coding karte time kya snacks khaते hain? 🍕";
        }
        
        // Technology discussions
        if (msg.includes('technology') || msg.includes('tech') || msg.includes('future') || msg.includes('ai')) {
            return "Tech talk! Love it! 🤖 AI ka zamana hai yaar... main khud AI hun! Aapko kya lagta hai - future mein robots rule karenge ya humans? Waise Ansh ji bhi technology field mein future banana chahte hain! 🚀";
        }
        
        // Encouragement responses
        const encouragementTriggers = ['good', 'nice', 'great', 'awesome', 'accha', 'badhiya', 'amazing', 'wonderful'];
        if (encouragementTriggers.some(trigger => msg.includes(trigger))) {
            return this.getRandomResponse('encouragement');
        }
        
        // Goodbye
        if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you') || msg.includes('alvida')) {
            return this.getRandomResponse('goodbye');
        }
        
        // Default responses for long conversations
        const defaultResponses = [
            "Interesting point! 🤔 Waise kya aur baat karna chahte hain? Main jokes, games, stories sab mein expert hun! 😄",
            "Hmm, ye toh deep topic hai! 💭 Chalo mood change karte hain - kuch fun karte hain? 🎉",
            "Aap interesting baatein karte hain! 😊 Btw, bore toh nahi ho rahe? Kuch entertaining chahiye? 🎭",
            "Good conversation! 👍 Waise time pass ke liye kya karna chahte hain? Main ready hun! 🚀",
            "Aapke thoughts acche hain! 💯 Chalo ab thoda hassi mazak karte hain? 😄"
        ];
        
        // If conversation is getting long, add variety
        if (this.conversationCount > 5) {
            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }
        
        // Default confused response
        return this.getRandomResponse('confused');
    }

    tellJoke() {
        const jokes = this.jokes;
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        
        return `${this.getRandomResponse('jokesIntro')}\n\n${randomJoke.setup}\n\n${randomJoke.punchline}\n\nHasi aayi? 😂 Aur joke chahiye ya kuch aur karte hain?`;
    }

    shareFunFact() {
        const facts = this.funFacts;
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        
        return `${randomFact}\n\nKaisi lagi ye fact? 🤓 Aur facts chahiye ya kuch aur interesting karte hain?`;
    }

    tellStory() {
        const stories = this.stories;
        const randomStory = stories[Math.floor(Math.random() * stories.length)];
        
        return `📚 **${randomStory.title}**\n\n${randomStory.story}\n\nStory kaisi lagi? Aur sunoge ya ab game khelenge? 😊`;
    }

    startGameMenu() {
        return `${this.getRandomResponse('gamesIntro')}\n\n🎮 **Available Games:**\n\n1️⃣ **Number Guessing** - Main number sochungi, aap guess karo!\n2️⃣ **Tech Quiz** - Programming aur technology ke questions!\n3️⃣ **Riddles** - Tech-related riddles solve karo!\n4️⃣ **Word Association** - Tech words ka game!\n\nKaun sa game khelna hai? Number type karo (1-4)! 🎯`;
    }

    startGame(gameType) {
        switch(gameType) {
            case '1':
            case 'number':
                return this.startNumberGuessing();
            case '2':
            case 'quiz':
                return this.startQuiz();
            case '3':
            case 'riddle':
                return this.startRiddles();
            case '4':
            case 'word':
                return this.startWordGame();
            default:
                return "Koi valid game number select karo yaar! 1-4 mein se koi ek! 😅";
        }
    }

    startNumberGuessing() {
        this.currentGame = 'numberGuess';
        this.gameState = {
            number: Math.floor(Math.random() * 100) + 1,
            attempts: 0,
            maxAttempts: 7
        };
        
        return `🎯 **Number Guessing Game Start!**\n\nMain ne 1 se 100 ke beech ek number socha hai! Aapko ${this.gameState.maxAttempts} attempts mein guess karna hai!\n\nBatao, kaun sa number hai? 🤔`;
    }

    startQuiz() {
        this.currentGame = 'quiz';
        this.gameState = {
            currentQuestion: 0,
            score: 0,
            questions: [...this.games.quiz].sort(() => Math.random() - 0.5).slice(0, 3)
        };
        
        return this.askQuizQuestion();
    }

    askQuizQuestion() {
        const question = this.gameState.questions[this.gameState.currentQuestion];
        let response = `🧠 **Tech Quiz - Question ${this.gameState.currentQuestion + 1}/3**\n\n**${question.question}**\n\n`;
        
        question.options.forEach((option, index) => {
            response += `${index + 1}️⃣ ${option}\n`;
        });
        
        response += `\nNumber type karo (1-4)! 🤔`;
        return response;
    }

    startRiddles() {
        this.currentGame = 'riddle';
        this.gameState = {
            currentRiddle: Math.floor(Math.random() * this.games.riddles.length),
            hintsUsed: 0
        };
        
        const riddle = this.games.riddles[this.gameState.currentRiddle];
        return `🧩 **Tech Riddle Time!**\n\n${riddle.question}\n\nAnswer type karo! Agar help chahiye toh 'hint' type karo! 🤔`;
    }

    startWordGame() {
        this.currentGame = 'wordGame';
        this.gameState = {
            currentWord: this.games.wordGame.words[Math.floor(Math.random() * this.games.wordGame.words.length)],
            associations: []
        };
        
        return `🔤 **Word Association Game!**\n\nMain word: **${this.gameState.currentWord}**\n\nIs word se related koi tech term batao! (Example: PYTHON → PROGRAMMING) 💭`;
    }

    handleGameInput(input) {
        const msg = input.toLowerCase().trim();
        
        switch(this.currentGame) {
            case 'numberGuess':
                return this.handleNumberGuess(input);
            case 'quiz':
                return this.handleQuizAnswer(input);
            case 'riddle':
                return this.handleRiddleAnswer(input);
            case 'wordGame':
                return this.handleWordGame(input);
            default:
                return "Game error! Koi game start karo pehle! 😅";
        }
    }

    handleNumberGuess(input) {
        if (input.toLowerCase() === 'quit' || input.toLowerCase() === 'exit') {
            this.currentGame = null;
            return "Game quit! Koi aur game kheloge? 😊";
        }
        
        const guess = parseInt(input);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            return "1 se 100 ke beech ka valid number type karo! 😅";
        }
        
        this.gameState.attempts++;
        const target = this.gameState.number;
        
        if (guess === target) {
            this.userScore += 10;
            this.currentGame = null;
            return `🎉 **Sahi jawab!** Number tha ${target}!\n\n${this.gameState.attempts} attempts mein solve kiya! Amazing! 🌟\n\nScore: +10 points! Total: ${this.userScore}\n\nAur games kheloge? 😄`;
        }
        
        if (this.gameState.attempts >= this.gameState.maxAttempts) {
            this.currentGame = null;
            return `😅 **Game Over!** Attempts khatam! Sahi answer tha: ${target}\n\nKoi baat nahi, practice se perfect hota hai! Aur game kheloge? 🎮`;
        }
        
        const hint = guess < target ? "Bigger number try karo! 📈" : "Smaller number try karo! 📉";
        const remaining = this.gameState.maxAttempts - this.gameState.attempts;
        
        return `${hint}\n\nRemaining attempts: ${remaining} 🎯\n\nNext guess batao!`;
    }

    handleQuizAnswer(input) {
        const answer = parseInt(input);
        if (isNaN(answer) || answer < 1 || answer > 4) {
            return "1, 2, 3, ya 4 type karo! 😅";
        }
        
        const question = this.gameState.questions[this.gameState.currentQuestion];
        const isCorrect = (answer - 1) === question.correct;
        
        let response = isCorrect ? "🎉 **Sahi jawab!** " : "❌ **Galat jawab!** ";
        response += question.explanation + "\n\n";
        
        if (isCorrect) {
            this.gameState.score++;
            this.userScore += 5;
        }
        
        this.gameState.currentQuestion++;
        
        if (this.gameState.currentQuestion >= this.gameState.questions.length) {
            this.currentGame = null;
            const percentage = Math.round((this.gameState.score / this.gameState.questions.length) * 100);
            response += `🏆 **Quiz Complete!**\n\nScore: ${this.gameState.score}/${this.gameState.questions.length} (${percentage}%)\n\nTotal Points: ${this.userScore} 🌟\n\nAur games kheloge? 😊`;
        } else {
            response += this.askQuizQuestion();
        }
        
        return response;
    }

    handleRiddleAnswer(input) {
        const msg = input.toLowerCase().trim();
        
        if (msg === 'hint') {
            if (this.gameState.hintsUsed >= 1) {
                return "Sirf ek hint allowed hai! Ab guess karo! 🤔";
            }
            this.gameState.hintsUsed++;
            const riddle = this.games.riddles[this.gameState.currentRiddle];
            return `💡 **Hint:** ${riddle.hint}\n\nAb guess karo!`;
        }
        
        if (msg === 'quit' || msg === 'exit') {
            this.currentGame = null;
            return "Riddle quit! Aur games kheloge? 😊";
        }
        
        const riddle = this.games.riddles[this.gameState.currentRiddle];
        
        if (msg === riddle.answer.toLowerCase()) {
            this.userScore += this.gameState.hintsUsed === 0 ? 15 : 10;
            this.currentGame = null;
            return `🎉 **Perfect!** Answer tha "${riddle.answer}"!\n\n${this.gameState.hintsUsed === 0 ? 'Bina hint ke solve kiya! Bonus points!' : 'Hint use kiya but still good!'}\n\nScore: +${this.gameState.hintsUsed === 0 ? 15 : 10} points! Total: ${this.userScore} 🌟\n\nAur riddles solve karoge? 🧩`;
        }
        
        return `❌ Try again! Galat answer hai!\n\n${this.gameState.hintsUsed === 0 ? 'Hint chahiye toh "hint" type karo!' : 'Thoda aur soch ke batao!'} 🤔`;
    }

    handleWordGame(input) {
        const msg = input.toLowerCase().trim();
        
        if (msg === 'quit' || msg === 'exit') {
            this.currentGame = null;
            return "Word game quit! Aur games kheloge? 😊";
        }
        
        // Simple word validation - in real scenario, you'd have a comprehensive word database
        const techWords = ['programming', 'development', 'software', 'coding', 'computer', 'technology', 'algorithm', 'framework', 'library', 'database', 'server', 'frontend', 'backend', 'fullstack', 'web', 'mobile', 'app', 'application', 'code', 'script', 'function', 'variable', 'loop', 'array', 'object', 'class', 'method', 'api', 'json', 'xml', 'html', 'css', 'javascript', 'react', 'angular', 'vue', 'node', 'express', 'mongodb', 'mysql', 'postgresql', 'git', 'github', 'version', 'control', 'debugging', 'testing', 'deployment', 'hosting', 'cloud', 'aws', 'azure', 'security', 'encryption', 'authentication', 'authorization'];
        
        if (techWords.includes(msg) || msg.length > 3) {
            this.gameState.associations.push(input);
            this.userScore += 3;
            
            // Generate new word
            this.gameState.currentWord = this.games.wordGame.words[Math.floor(Math.random() * this.games.wordGame.words.length)];
            
            return `✅ Good association! "${input}" 👍\n\n+3 points! Total: ${this.userScore} 🌟\n\nNext word: **${this.gameState.currentWord}**\n\nKya association hai is word ka? (Quit karne ke liye "quit" type karo)`;
        }
        
        return `🤔 Thoda better tech-related word sochiye! "${this.gameState.currentWord}" se related kuch aur batao!`;
    }

    getRandomResponse(category) {
        const responses = this.responses[category];
        if (!responses || responses.length === 0) {
            return this.getRandomResponse('confused');
        }
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize the portfolio application
document.addEventListener('DOMContentLoaded', function() {
    const portfolio = new PortfolioApp();
    
    // Add keyboard shortcuts for games
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey) {
            switch(e.key) {
                case 'J':
                    e.preventDefault();
                    if (window.ruthChatbot && window.ruthChatbot.isOpen) {
                        window.ruthChatbot.simulateUserMessage('Tell me a joke');
                    }
                    break;
                case 'G':
                    e.preventDefault();
                    if (window.ruthChatbot && window.ruthChatbot.isOpen) {
                        window.ruthChatbot.simulateUserMessage('Let\'s play a game');
                    }
                    break;
                case 'F':
                    e.preventDefault();
                    if (window.ruthChatbot && window.ruthChatbot.isOpen) {
                        window.ruthChatbot.simulateUserMessage('Fun fact');
                    }
                    break;
            }
        }
    });
    
    setTimeout(() => {
        window.ruthChatbot = new EnhancedRuthChatbot();
    }, 2000);
});

// Export for global access
window.PortfolioApp = PortfolioApp;
window.EnhancedRuthChatbot = EnhancedRuthChatbot;
