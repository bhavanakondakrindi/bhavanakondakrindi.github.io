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
    },
    {
      id: "proj-algo-visualizer",
      title: "Algorithmic Graph & Path Visualizer",
      subtitle: "Interactive Data Structures & Graph Traversal Explorer",
      category: "CS Foundations & Tools",
      featured: false,
      color: "#FECDD3", // soft rose
      accent: "#E11D48",
      washiColor: "rgba(254, 205, 211, 0.9)",
      rotation: 0.8,
      summary: "An interactive computer science visualization tool to trace and demonstrate graph algorithms, tree traversals, and dynamic pathfinding in real time.",
      problemStatement: "Understanding complex graph traversal and shortest-path state mutations can be challenging without step-by-step visual feedback and execution control.",
      objectives: [
        "Provide real-time step-by-step visualization for BFS, DFS, Dijkstra, and A* algorithms.",
        "Allow interactive graph creation with weighted edges and barrier placements.",
        "Compare computational time and space complexity across varying graph topologies."
      ],
      features: [
        "Interactive node and weighted edge placement canvas.",
        "Step-by-step traversal playback with play, pause, and speed scrub controls.",
        "Real-time visual node coloring denoting visited, queued, and optimal paths.",
        "Comparative metrics dashboard showing total operations and memory states."
      ],
      technologies: ["JavaScript", "HTML5 Canvas", "DSA", "Graph Theory", "Algorithms"],
      implementationDetails: "Engineered using HTML5 Canvas with custom animation scheduler and event-driven state updates to demonstrate classical graph algorithm executions.",
      challenges: "Synchronizing visual rendering loops with algorithmic step generators without lagging during large node graph executions.",
      image: "https://images.unsplash.com/photo-1516116211227-bbc3834f8e56?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/bhavanakondakrindi",
      demoUrl: "",
      badge: "DSA & Tools"
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
    individualStickers: {
      // HERO SECTION
      hero_cherries: { id: "hero_cherries", section: "hero", label: "Cherries Sticker over Masthead", category: "sticker", type: "cherries", size: 42, rotate: 0, visible: true },
      hero_sparkle: { id: "hero_sparkle", section: "hero", label: "Golden Sparkle Star near Title", category: "sparkle", type: "sparkle-star", size: 34, color: "#FBBF24", rotate: 12, visible: true },
      hero_postmark: { id: "hero_postmark", section: "hero", label: "KLH CSE Dept Postmark Stamp", category: "stamp", type: "postmark", text: "KLH CSE DEPT", date: "HYDERABAD • 2025", color: "#DC2626", rotate: -8, visible: true },
      hero_barcode: { id: "hero_barcode", section: "hero", label: "Editorial Barcode Top-Right", category: "stamp", type: "barcode", visible: true },
      hero_polaroid_tape: { id: "hero_polaroid_tape", section: "hero", label: "Yellow Washi Tape on Polaroid", category: "washi", type: "washi", color: "yellow", rotate: 3, visible: true },
      hero_polaroid_gem: { id: "hero_polaroid_gem", section: "hero", label: "Ruby Gem on Polaroid Corner", category: "gem", type: "ruby", size: 24, rotate: 6, visible: true },
      hero_polaroid_bow: { id: "hero_polaroid_bow", section: "hero", label: "Red Ribbon Bow on Polaroid", category: "sticker", type: "ribbon-bow", rotate: -8, visible: true },
      hero_cv_tape: { id: "hero_cv_tape", section: "hero", label: "Lavender Washi Tape on CV Folio", category: "washi", type: "washi", color: "lavender", rotate: -2, visible: true },
      hero_cv_wax: { id: "hero_cv_wax", section: "hero", label: "Golden Wax Seal on CV Folio", category: "stamp", type: "wax-seal", visible: true },

      // ABOUT SECTION
      about_gem_moon: { id: "about_gem_moon", section: "about", label: "Pink Crystal Moon (Top Left)", category: "gem", type: "pink-moon", size: 36, rotate: -4, visible: true },
      about_gem_butterfly: { id: "about_gem_butterfly", section: "about", label: "Emerald Butterfly Gem (Top Right)", category: "gem", type: "butterfly", size: 34, rotate: 8, visible: true },
      about_gem_topaz: { id: "about_gem_topaz", section: "about", label: "Golden Topaz Gem (Bottom Left)", category: "gem", type: "topaz", size: 30, rotate: 12, visible: true },
      about_sparkle: { id: "about_sparkle", section: "about", label: "Sparkle Star over Heading", category: "sparkle", type: "sparkle-star", size: 24, color: "#FDE047", rotate: 0, visible: true },
      about_tape_top: { id: "about_tape_top", section: "about", label: "Pink Washi Tape on Journal Spread", category: "washi", type: "washi", color: "pink", rotate: -2, visible: true },
      about_ribbon_top: { id: "about_ribbon_top", section: "about", label: "Red Ribbon Bow on Journal Spread", category: "sticker", type: "ribbon-bow", rotate: 6, visible: true },
      about_clip_top: { id: "about_clip_top", section: "about", label: "Black Binder Clip on Journal Spine", category: "clip", type: "binder-clip", color: "black-clip", rotate: -2, visible: true },
      about_postmark: { id: "about_postmark", section: "about", label: "Field Log Postmark Stamp", category: "stamp", type: "postmark", text: "FIELD LOG", date: "HYDERABAD • 2025", color: "#0284C7", rotate: -2, visible: true },
      about_polaroid_tape: { id: "about_polaroid_tape", section: "about", label: "Yellow Washi Tape on Snapshot", category: "washi", type: "washi", color: "yellow", rotate: 3, visible: true },
      about_polaroid_gem: { id: "about_polaroid_gem", section: "about", label: "Ruby Gem on Snapshot Corner", category: "gem", type: "ruby", size: 24, rotate: -6, visible: true },
      about_clip_sticky: { id: "about_clip_sticky", section: "about", label: "Pink Binder Clip on Philosophy Sticky Note", category: "clip", type: "binder-clip", color: "pink-binder", rotate: 4, visible: true },
      about_amethyst: { id: "about_amethyst", section: "about", label: "Amethyst Heart Gem on Page 02", category: "gem", type: "amethyst", size: 20, rotate: 0, visible: true },

      // SKILLS SECTION
      skills_gem_diamond: { id: "skills_gem_diamond", section: "skills", label: "Cyan Diamond Gem (Top Right)", category: "gem", type: "diamond", size: 34, rotate: 4, visible: true },
      skills_gem_amethyst: { id: "skills_gem_amethyst", section: "skills", label: "Amethyst Heart Gem (Bottom Left)", category: "gem", type: "amethyst", size: 32, rotate: -8, visible: true },
      skills_sparkle: { id: "skills_sparkle", section: "skills", label: "Sparkle Star over Heading", category: "sparkle", type: "sparkle-star", size: 24, color: "#86EFAC", rotate: 0, visible: true },
      skills_postmark: { id: "skills_postmark", section: "skills", label: "Competency Archive Postmark Stamp", category: "stamp", type: "postmark", text: "COMPETENCY ARCHIVE", date: "CSE 2025 • VERIFIED", color: "#059669", rotate: -3, visible: true },
      skills_tape_tray1: { id: "skills_tape_tray1", section: "skills", label: "Yellow Washi Tape on Languages Tray", category: "washi", type: "washi", color: "yellow", rotate: -2, visible: true },
      skills_tape_tray2: { id: "skills_tape_tray2", section: "skills", label: "Pink Washi Tape on Web Dev Tray", category: "washi", type: "washi", color: "pink", rotate: 2, visible: true },
      skills_tape_tray3: { id: "skills_tape_tray3", section: "skills", label: "Blue Washi Tape on CS Foundations Tray", category: "washi", type: "washi", color: "blue", rotate: -2, visible: true },

      // PROJECTS SECTION
      proj_gem_diamond: { id: "proj_gem_diamond", section: "projects", label: "Cyan Diamond Gem (Top Left)", category: "gem", type: "diamond", size: 32, rotate: 0, visible: true },
      proj_gem_moon: { id: "proj_gem_moon", section: "projects", label: "Pink Crystal Moon (Top Right)", category: "gem", type: "pink-moon", size: 36, rotate: 6, visible: true },
      proj_gem_butterfly: { id: "proj_gem_butterfly", section: "projects", label: "Emerald Butterfly (Bottom Left)", category: "gem", type: "butterfly", size: 34, rotate: -6, visible: true },
      proj_gem_topaz: { id: "proj_gem_topaz", section: "projects", label: "Golden Topaz (Bottom Right)", category: "gem", type: "topaz", size: 30, rotate: 10, visible: true },
      proj_sparkle: { id: "proj_sparkle", section: "projects", label: "Sparkle Star over Heading", category: "sparkle", type: "sparkle-star", size: 24, color: "#FDE047", rotate: 0, visible: true },
      proj_postmark: { id: "proj_postmark", section: "projects", label: "Field Spec 2025 Postmark Stamp", category: "stamp", type: "postmark", text: "FIELD SPEC", date: "2025", color: "#0284C7", rotate: -4, visible: true },
      proj_tape_p1: { id: "proj_tape_p1", section: "projects", label: "Yellow Sticky Tape on Project 1", category: "washi", type: "washi", color: "yellow", rotate: 1, visible: true },
      proj_tape_p4: { id: "proj_tape_p4", section: "projects", label: "Green Sticky Tape on Project 4", category: "washi", type: "washi", color: "green", rotate: -1, visible: true },
      proj_tape_p2: { id: "proj_tape_p2", section: "projects", label: "Blue Sticky Tape on Project 2", category: "washi", type: "washi", color: "blue", rotate: -1, visible: true },
      proj_tape_p5: { id: "proj_tape_p5", section: "projects", label: "Coral Sticky Tape on Project 5", category: "washi", type: "washi", color: "coral", rotate: -2, visible: true },
      proj_tape_p6: { id: "proj_tape_p6", section: "projects", label: "Pink Sticky Tape on Project 6", category: "washi", type: "washi", color: "pink", rotate: 2, visible: true },
      proj_tape_p3: { id: "proj_tape_p3", section: "projects", label: "Lavender Sticky Tape on Project 3", category: "washi", type: "washi", color: "lavender", rotate: -1, visible: true },
      proj_clip_p3: { id: "proj_clip_p3", section: "projects", label: "Lavender Binder Clip on Project 3", category: "clip", type: "binder-clip", color: "lavender", rotate: 4, visible: true },

      // EDUCATION SECTION
      edu_gem_topaz: { id: "edu_gem_topaz", section: "education", label: "Golden Topaz Gem (Top Right)", category: "gem", type: "topaz", size: 32, rotate: 0, visible: true },
      edu_gem_amethyst: { id: "edu_gem_amethyst", section: "education", label: "Amethyst Heart Gem (Bottom Left)", category: "gem", type: "amethyst", size: 36, rotate: -5, visible: true },
      edu_sparkle: { id: "edu_sparkle", section: "education", label: "Sparkle Star over Heading", category: "sparkle", type: "sparkle-star", size: 24, color: "#C084FC", rotate: 0, visible: true },
      edu_postmark: { id: "edu_postmark", section: "education", label: "Academic Merit Postmark Stamp", category: "stamp", type: "postmark", text: "ACADEMIC MERIT", date: "KLH CSE • 2025", color: "#7C3AED", rotate: 3, visible: true },
      edu_tape_diploma: { id: "edu_tape_diploma", section: "education", label: "Lavender Washi Tape on Degree", category: "washi", type: "washi", color: "lavender", rotate: -2, visible: true },
      edu_ribbon_diploma: { id: "edu_ribbon_diploma", section: "education", label: "Red Ribbon Bow on Degree", category: "sticker", type: "ribbon-bow", rotate: -6, visible: true },
      edu_tape_achievements: { id: "edu_tape_achievements", section: "education", label: "Yellow Washi Tape on Achievements", category: "washi", type: "washi", color: "yellow", rotate: 1, visible: true },
      edu_tape_certifications: { id: "edu_tape_certifications", section: "education", label: "Green Washi Tape on Certifications", category: "washi", type: "washi", color: "green", rotate: -2, visible: true },

      // CONTACT SECTION
      contact_gem_diamond: { id: "contact_gem_diamond", section: "contact", label: "Cyan Diamond Gem (Top Left)", category: "gem", type: "diamond", size: 36, rotate: 0, visible: true },
      contact_gem_butterfly: { id: "contact_gem_butterfly", section: "contact", label: "Emerald Butterfly Gem (Bottom Right)", category: "gem", type: "butterfly", size: 32, rotate: 6, visible: true },
      contact_sparkle: { id: "contact_sparkle", section: "contact", label: "Sparkle Star over Heading", category: "sparkle", type: "sparkle-star", size: 24, color: "#FDA4AF", rotate: 0, visible: true },
      contact_tape_top: { id: "contact_tape_top", section: "contact", label: "Coral Washi Tape on Airmail Parcel", category: "washi", type: "washi", color: "coral", rotate: -1, visible: true },
      contact_postmark: { id: "contact_postmark", section: "contact", label: "Air Mail Cancellation Stamp", category: "stamp", type: "postmark", text: "AIR MAIL", date: "HYD • 2025", color: "#DC2626", rotate: -5, visible: true },
      contact_ribbon_bottom: { id: "contact_ribbon_bottom", section: "contact", label: "Red Ribbon Bow at Sign-Off", category: "sticker", type: "ribbon-bow", rotate: 0, visible: true },
      contact_gem_ruby: { id: "contact_gem_ruby", section: "contact", label: "Ruby Gem at Sign-Off", category: "gem", type: "ruby", size: 32, rotate: 0, visible: true },
    },
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
