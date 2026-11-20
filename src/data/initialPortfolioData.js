export const initialPortfolioData = {
  profile: {
    name: "Bhavana Kondakrindi",
    role: "Computer Science Student & Creative Developer",
    tagline: "Exploring code, designing interactive software & solving practical problems.",
    subheading: "A digital scrapbook of code, curiosity, and crafted interfaces.",
    educationStatus: "2nd Year B.Tech Computer Science & Engineering",
    university: "KLH Deemed to be University",
    cgpa: "9.5",
    intro: "I am a Computer Science Engineering student interested in software development, problem-solving and building practical technology solutions. I enjoy exploring new technologies, developing user-focused applications, working on projects and continuously improving my technical skills.",
    bioParagraphs: [
      "Currently pursuing my second year in Computer Science and Engineering at KLH Deemed to be University, maintaining a strong academic foundation with a CGPA of approximately 9.5.",
      "My passion lies in bridging clean software architecture with thoughtful, user-centric interfaces. Whether building real-time operational simulation dashboards or designing intelligent routing algorithms, I approach each challenge with curiosity and systematic engineering.",
      "When I am not coding, I love exploring emerging web technologies, sketching UI interactions, analyzing classical algorithms, and documenting my continuous journey in technology."
    ],
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    avatarCaption: "Bhavana Kondakrindi • CSE 2nd Year @ KLH",
    resumeUrl: "#",
    socialLinks: {
      github: "https://github.com/bhavanakondakrindi",
      linkedin: "https://linkedin.com/in/bhavana-kondakrindi-26bb57379",
      email: "bhavanakondakrindi@example.com", // clearly marked placeholder
    }
  },

  skills: [
    {
      id: "cat-languages",
      category: "Programming Languages",
      color: "#FEF08A", // warm yellow
      borderColor: "#CA8A04",
      items: [
        { id: "java", name: "Java", level: "Core", notes: "Object-oriented software development & algorithms" },
        { id: "python", name: "Python", level: "Core", notes: "AI pathfinding, simulations & scripting" },
        { id: "javascript", name: "JavaScript", level: "Modern", notes: "ES6+, dynamic interactive web apps" }
      ]
    },
    {
      id: "cat-web",
      category: "Web Development",
      color: "#FBCFE8", // soft pink
      borderColor: "#DB2777",
      items: [
        { id: "html", name: "HTML5", level: "Semantic", notes: "Accessible markup & modern web standards" },
        { id: "css", name: "CSS3", level: "Styling", notes: "Responsive layouts, Flexbox/Grid, animations" },
        { id: "react", name: "React.js", level: "Frontend", notes: "Component state, hooks & interactive UIs" }
      ]
    },
    {
      id: "cat-cs",
      category: "Computer Science",
      color: "#BAE6FD", // sky blue
      borderColor: "#0284C7",
      items: [
        { id: "dsa", name: "Data Structures & Algorithms", level: "Foundational", notes: "Problem solving, time/space complexity" },
        { id: "oop", name: "Object-Oriented Programming", level: "Architecture", notes: "Encapsulation, inheritance, modular design" }
      ]
    }
  ],

  projects: [
    {
      id: "proj-airline-disruption",
      title: "Airline Disruption Management System",
      subtitle: "Frontend Operations Dashboard for Delay & Cancellation Mitigation",
      category: "Web Application",
      featured: true,
      color: "#FEF9C3", // soft butter
      accent: "#EAB308",
      washiColor: "rgba(254, 240, 138, 0.9)",
      rotation: -1.5,
      summary: "A frontend-focused airline operations dashboard designed to help manage flight disruptions such as delays and cancellations.",
      problemStatement: "Airlines face unpredictable flight disruptions caused by adverse weather, technical maintenance, or airspace congestion. Ground operations teams often struggle with disjointed legacy tools, leading to passenger frustration, delayed hotel vouchers, and chaotic gate environments.",
      objectives: [
        "Provide real-time visibility into disrupted, delayed, and cancelled flights.",
        "Streamline passenger re-accommodation into an intuitive digital simulation.",
        "Automate hotel and meal voucher generation based on disruption severity.",
        "Implement passenger prioritization logic (e.g., connecting passengers, loyalty status)."
      ],
      features: [
        "Disrupted flight overview with real-time status indicators and delay metrics.",
        "Affected passenger management directory with filtering by flight and itinerary.",
        "Interactive passenger re-accommodation simulation with seat reassignment logic.",
        "Automated hotel and meal voucher generation and tracking.",
        "Passenger prioritisation scoring based on tight connections and special assistance.",
        "Mock passenger communication updates (SMS & email simulated notifications).",
        "Operational status tracking and chronological audit history."
      ],
      technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Component Architecture"],
      implementationDetails: "Engineered using React component architecture with modular state management to simulate rapid operational changes. Designed responsive operational tables, interactive dispatch modals, and automated voucher generation logic.",
      challenges: "Balancing dense operational data with a clean, high-stress-friendly user interface that prevents operator fatigue during major airline disruption events.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/bhavanakondakrindi",
      demoUrl: "",
      badge: "Featured System"
    },
    {
      id: "proj-skyroute-drone",
      title: "SkyRoute: AI Smart Drone Delivery",
      subtitle: "Intelligent Routing & Delivery Optimization Simulation",
      category: "AI & Simulation",
      featured: true,
      color: "#BBF7D0", // sage mint
      accent: "#16A34A",
      washiColor: "rgba(187, 247, 208, 0.9)",
      rotation: 1.2,
      summary: "A Python-based drone delivery simulation that explores intelligent routing, dynamic weather avoidance, and delivery optimisation.",
      problemStatement: "Urban drone delivery faces stringent constraints including limited battery capacity, sudden wind gusts, changing weather conditions, and competing delivery priorities across dense metropolitan zones.",
      objectives: [
        "Implement intelligent A* pathfinding to calculate optimal multi-point flight trajectories.",
        "Model dynamic weather conditions that realistically alter drag and energy consumption.",
        "Formulate autonomous battery management and proactive charging pad decisions.",
        "Develop priority-based dispatch scheduling with eco-mode delivery merging."
      ],
      features: [
        "A* Pathfinding algorithm tailored for dynamic 2D airspace grid navigation.",
        "Dynamic weather conditions (wind vectors, rainfall, turbulence) affecting route viability.",
        "Battery discharge curves and autonomous return-to-charging pad decisions.",
        "Priority-based delivery scheduling differentiating medical emergencies from standard parcels.",
        "Eco-mode delivery merging to combine close-proximity consignments.",
        "Interactive visual simulation built with Pygame allowing real-time waypoint injection."
      ],
      technologies: ["Python", "Pygame", "A* Algorithm", "Classical AI", "Simulation Modeling"],
      implementationDetails: "Structured as an object-oriented Python architecture simulating agent state machines for drones, charging stations, and dispatch queues. Pathfinding incorporates cost heuristics accounting for both Euclidean distance and weather resistance.",
      challenges: "Dynamically recalculating paths in real-time when sudden weather cells block existing flight corridors without stalling the frame rate.",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/bhavanakondakrindi",
      demoUrl: "",
      badge: "AI Simulation"
    },
    {
      id: "proj-studyforge",
      title: "StudyForge",
      subtitle: "Collaborative Study Platform for Academic Synergy",
      category: "Web Platform",
      featured: true,
      color: "#DDD6FE", // lavender
      accent: "#7C3AED",
      washiColor: "rgba(221, 214, 254, 0.9)",
      rotation: -1.0,
      summary: "A collaborative study platform designed to support students with collaborative learning, resource sharing, and study group coordination.",
      problemStatement: "Students often experience fragmented study communication across disparate messaging apps, lost lecture notes, and difficulties organizing focused peer study groups.",
      objectives: [
        "Centralize academic study sessions into organized, subject-specific spaces.",
        "Facilitate peer resource sharing with collaborative note annotation.",
        "Provide structured focus sessions and collaborative accountability."
      ],
      features: [
        "Subject-specific study hubs with organized discussion threads.",
        "Shared digital workspace for structured study materials.",
        "Real-time study session scheduling and group milestones.",
        "Collaborative task checklists and peer progress tracking."
      ],
      technologies: ["React.js", "JavaScript", "HTML5", "CSS3"],
      implementationDetails: "Designed with responsive UI principles and modular component architecture focusing on student collaboration workflows.",
      challenges: "Designing an intuitive, clutter-free workspace that promotes concentration while still enabling rich group collaboration.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/bhavanakondakrindi",
      demoUrl: "",
      badge: "Collaboration"
    },
    {
      id: "proj-ecoquest",
      title: "EcoQuest",
      subtitle: "Waste Management Platform for Sustainable Communities",
      category: "Web Platform",
      featured: false,
      color: "#BAE6FD", // sky blue
      accent: "#0284C7",
      washiColor: "rgba(186, 230, 253, 0.9)",
      rotation: 1.5,
      summary: "A waste-management web platform focused on encouraging better waste-management practices, recycling awareness, and community action.",
      problemStatement: "Inconsistent waste sorting guidelines and a lack of community engagement lead to high contamination rates in municipal recycling streams.",
      objectives: [
        "Provide clear, actionable classification guides for household and electronic waste.",
        "Engage users with interactive sustainability challenges and community goals.",
        "Promote responsible disposal through local collection center mapping."
      ],
      features: [
        "Interactive waste classification search and sorting guidance.",
        "Community recycling challenges and collective environmental milestone tracking.",
        "Educational guides on sustainable consumption and composting.",
        "Drop-off center directory and scheduled collection reminders."
      ],
      technologies: ["React.js", "JavaScript", "HTML5", "CSS3"],
      implementationDetails: "Constructed with accessible, modern web interfaces and intuitive categorization filters to make waste guidelines easy to navigate for all users.",
      challenges: "Presenting detailed recycling guidelines in an engaging, non-overwhelming visual format that encourages everyday adoption.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/bhavanakondakrindi",
      demoUrl: "",
      badge: "Sustainability"
    },
    {
      id: "proj-personal-finance",
      title: "Personal Finance Manager",
      subtitle: "Robust Java-Based Financial Ledger & Budget Tracker",
      category: "Software Application",
      featured: false,
      color: "#FED7AA", // warm peach
      accent: "#EA580C",
      washiColor: "rgba(254, 215, 170, 0.9)",
      rotation: -1.2,
      summary: "A Java-based personal finance management project built to track income, categorize expenditures, and promote mindful budgeting.",
      problemStatement: "Managing daily expenses without structured financial software makes it difficult to maintain budgets, identify unnecessary spending, and forecast monthly savings.",
      objectives: [
        "Provide a structured object-oriented ledger to log multi-category transactions.",
        "Implement automated calculations for running balances, savings ratios, and budget limits.",
        "Ensure data integrity through robust file I/O and transaction serialization."
      ],
      features: [
        "Categorized transaction logging (Income, Fixed Expenses, Discretionary).",
        "Monthly budget limit alerts and variance analysis.",
        "Summary reporting with category breakdowns and savings metrics.",
        "Persistent data storage with structured file handling."
      ],
      technologies: ["Java", "Object-Oriented Programming", "File I/O", "Data Structures"],
      implementationDetails: "Built using classical OOP principles with encapsulation of accounts and transactions, inheritance for transaction types, and algorithmic sorting for statement generation.",
      challenges: "Ensuring consistent state serialization and edge-case handling for recurring calculations.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/bhavanakondakrindi",
      demoUrl: "",
      badge: "Java Core"
    }
  ],

  education: [
    {
      id: "edu-1",
      institution: "KLH Deemed to be University",
      degree: "B.Tech in Computer Science and Engineering",
      status: "Currently in 2nd Year (Undergraduate)",
      cgpa: "9.5",
      period: "Present",
      location: "Hyderabad, India",
      description: "Focusing on core computer science foundations including Data Structures & Algorithms, Object-Oriented Programming, Database Systems, and Web Technologies.",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming in Java",
        "Python Programming & Problem Solving",
        "Web Development & Modern Frameworks",
        "Discrete Mathematics & Logic",
        "Database Management Systems"
      ]
    }
  ],

  achievements: [
    {
      id: "ach-1",
      title: "Strong Academic Standing (CGPA ~9.5)",
      issuer: "KLH Deemed to be University",
      category: "Academic",
      date: "Ongoing",
      description: "Consistent academic performance reflecting disciplined problem-solving and dedication to computer science coursework."
    },
    {
      id: "ach-2",
      title: "Active Technical Builder",
      issuer: "Independent & University Projects",
      category: "Engineering",
      date: "2024 - Present",
      description: "Designed and implemented multiple end-to-end applications including Airline Disruption Manager and AI SkyRoute drone simulation."
    }
  ],

  certifications: [
    // Empty editable slots as requested by user prompt
  ],

  appearance: {
    activeTheme: "warm-editorial", // "warm-editorial", "rose-sage", "denim-daisy", "matcha-cream", "bold-mono"
    themes: [
      {
        id: "warm-editorial",
        name: "Warm Editorial Paper",
        bgPrimary: "#FAF7F2",
        bgSurface: "#FFFFFF",
        textPrimary: "#1E1E24",
        textMuted: "#64748B",
        accent: "#F43F5E",
        paperType: "graph-paper",
        tag: "Recommended"
      },
      {
        id: "rose-sage",
        name: "Rose & Sage Scrapbook",
        bgPrimary: "#FFF8F8",
        bgSurface: "#FFFFFF",
        textPrimary: "#1C1917",
        textMuted: "#78716C",
        accent: "#DB2777",
        paperType: "graph-paper-fine",
        tag: "Playful"
      },
      {
        id: "denim-daisy",
        name: "Denim & Daisy Journal",
        bgPrimary: "#F0F4F8",
        bgSurface: "#FFFFFF",
        textPrimary: "#0F172A",
        textMuted: "#475569",
        accent: "#2563EB",
        paperType: "dot-grid",
        tag: "Creative"
      },
      {
        id: "matcha-cream",
        name: "Matcha & Buttercream",
        bgPrimary: "#F8FAF5",
        bgSurface: "#FFFFFF",
        textPrimary: "#1B2A1E",
        textMuted: "#526B57",
        accent: "#16A34A",
        paperType: "lined-paper",
        tag: "Serene"
      },
      {
        id: "bold-mono",
        name: "Classic Mono & Amber",
        bgPrimary: "#F5F5F4",
        bgSurface: "#FFFFFF",
        textPrimary: "#0C0A09",
        textMuted: "#57534E",
        accent: "#D97706",
        paperType: "graph-paper",
        tag: "Minimal"
      }
    ],
    fontFamilyHeading: "editorial",
    fontFamilyBody: "sans",
    borderRadius: "16px",
    scrapbookStickersEnabled: true,
    washiTapeEnabled: true,
    binderClipsEnabled: true,
    paperGridIntensity: "medium",
    customCursorEnabled: true,
  },

  animations: {
    entranceStyle: "editorial-reveal", // "editorial-reveal", "gentle-fade", "playful-bounce"
    duration: 0.6,
    intensity: "normal", // "subtle", "normal", "playful"
    reducedMotion: false,
    hoverScale: true,
  },

  sectionsVisibility: {
    hero: true,
    about: true,
    skills: true,
    projects: true,
    education: true,
    achievements: true,
    contact: true
  },

  contactInfo: {
    heading: "Let's Build Something Meaningful Together",
    subheading: "Whether you want to discuss a project, collaborative opportunity, or just say hello — my inbox is always open.",
    email: "bhavanakondakrindi@example.com",
    github: "https://github.com/bhavanakondakrindi",
    linkedin: "https://linkedin.com/in/bhavana-kondakrindi-26bb57379",
    closingMessage: "Thank you for flipping through my digital scrapbook! Built with care, code, and curiosity.",
    formPlaceholderNotes: "Note: Real email delivery requires connecting a backend service (e.g. Supabase Edge Function, Formspree, or EmailJS). This form currently demonstrates complete client-side validation and state tracking."
  }
};
