const levels = ["easy","medium","hard"];
export const guessWords = [
    { id: 1, word: "javascript", hint: "A popular programming language for web development.", level: levels[0]},
    { id: 2, word: "html", hint: "Defines the structure of web pages.", level: levels[0]},
    { id: 3, word: "css", hint: "Styles the layout of web pages.", level: levels[0]},
    { id: 4, word: "python", hint: "Known for its simplicity and readability.", level: levels[0]},
    { id: 5, word: "java", hint: "A widely-used object-oriented programming language.", level: levels[0]},
    { id: 6, word: "ruby", hint: "Emphasizes simplicity and productivity.", level: levels[0]},
    { id: 7, word: "php", hint: "Mainly used for server-side web development.", level: levels[0]},
    { id: 8, word: "swift", hint: "Developed by Apple for iOS, macOS, watchOS, and tvOS app development.", level: levels[1]},
    { id: 9, word: "tailwind", hint: "Utility-first CSS framework", level: levels[0]},
    { id: 10, word: "django", hint: "High-level Python web framework", level: levels[1]},
    { id: 11, word: "laravel", hint: "PHP web framework", level: levels[0]},
    { id: 12, word: "angular", hint: "TypeScript framework for building web applications", level: levels[0]},
    { id: 13, word: "react", hint: "JavaScript library for building user interfaces", level: levels[0]},
    { id: 14, word: "bootstrap", hint: "Popular front-end framework for responsive web design", level: levels[0]},
    { id: 15, word: "docker", hint: "Platform for building, deploying, and running applications in containers", level: levels[1]},
    { id: 16, word: "nextjs", hint: "React framework for server-rendered and statically generated applications", level: levels[0]},
    { id: 17, word: "mysql", hint: "Popular relational database management system", level: levels[0]},
    { id: 18, word: "csharp", hint: "General-purpose, object-oriented programming language", level: levels[0]},
    { id: 19, word: "objectivec", hint: "General-purpose, object-oriented programming language for Apple platforms", level: levels[1]},
    { id: 20, word: "nuxtjs", hint: "Vue.js framework for building web applications", level: levels[0]},
    { id: 21, word: "jupyter", hint: "Interactive notebook environment for scientific computing", level: levels[1]},
    { id: 22, word: "mongodb", hint: "NoSQL document database", level: levels[0]},
    { id: 23, word: "kotlin", hint: "Statically typed programming language for modern Android development", level: levels[0]},
    { id: 24, word: "haskell", hint: "Purely functional programming language", level: levels[2]},
    { id: 25, word: "lisp", hint: "Functional programming language with a long history", level: levels[1]},
    { id: 26, word: "rust", hint: "Systems programming language emphasizing memory safety and performance", level: levels[0]},
    { id: 27, word: "scala", hint: "General-purpose programming language with functional programming features", level: levels[1]},
    { id: 28, word: "perl", hint: "General-purpose programming language for text processing", level: levels[0]},
    { id: 29, word: "assembly", hint: "Low-level programming language specific to a particular computer architecture", level: levels[1]},
    { id: 30, word: "scss", hint: "Superset of CSS with variables, mixins, and nesting", level: levels[0]},
    { id: 31, word: "sass", hint: "Syntactically similar to SCSS, but with different indentation", level: levels[0]},
    { id: 32, word: "less", hint: "Offers nested mixins, variables, and functions", level: levels[0]},
    { id: 33, word: "pug", hint: "Formerly known as Jade, compiles into HTML", level: levels[0]},
    { id: 34, word: "json", hint: "Lightweight, human-readable format for data interchange", level: levels[0]},
    { id: 35, word: "stylus", hint: "CSS preprocessor with a more concise syntax", level: levels[1]},
    { id: 36, word: "postcss", hint: "Tooling for transforming CSS with plugins", level: levels[1]},
    { id: 37, word: "haml", hint: "Concise syntax for HTML, uses indentation", level: levels[0]},
    { id: 38, word: "markdown", hint: "Focuses on readability for writing, easily converts to HTML", level: levels[1]},
    { id: 39, word: "slim", hint: "Similar to HAML, but with a more Ruby-like syntax", level: levels[0]},
    { id: 40, word: "babel", hint: "JavaScript compiler for using modern syntax in older browsers", level: levels[0]},
    { id: 41, word: "typescript", hint: "Statically typed superset of JavaScript", level: levels[0]},
    { id: 42, word: "coffeescript", hint: "Readable syntax that compiles to JavaScript", level: levels[1]},
    { id: 43, word: "livescript", hint: "Dynamically typed language that compiles to JavaScript", level: levels[1]},
    { id: 44, word: "dart", hint: "General-purpose programming language, used for Flutter", level: levels[0]},
    { id: 45, word: "flutter", hint: "Cross-platform framework for building mobile apps", level: levels[1]},
    { id: 46, word: "r", hint: "Programming language for statistical computing", level: levels[0]},
    { id: 47, word: "sql", hint: "Structured Query Language for interacting with relational databases", level: levels[0]},
    { id: 48, word: "jquery", hint: "JavaScript library for DOM manipulation and animations", level: levels[1]},
    { id: 49, word: "xml", hint: "Extensible Markup Language, defines a structure for data", level: levels[0]},
    { id: 50, word: "nodejs", hint: "JavaScript runtime environment for server-side development", level: levels[0]},
    { id: 51, word: "postgresql", hint: "Open-source relational database management system", level: levels[2]},
    { id: 52, word: "go", hint: "Compiled language for building web applications, network servers, and more", level: levels[0]},
    { id: 53, word: "git", hint: "Version control system for tracking changes in code", level: levels[0]},
    { id: 54, word: "numpy", hint: "Python library for numerical computing with arrays", level: levels[0]},
    { id: 55, word: "pandas", hint: "Python library for data analysis and manipulation", level: levels[0]},
    { id: 56, word: "scipy", hint: "Python library for scientific computing with algorithms", level: levels[1]},
    { id: 57, word: "sqlite", hint: "Python library for interacting with SQLite databases", level: levels[1]},
    { id: 58, word: "turtle", hint: "Python library for creating vector graphics", level: levels[0]},
    { id: 59, word: "tkinter", hint: "Python library for creating graphical user interfaces", level: levels[2]},
    { id: 60, word: "lua", hint: "Lightweight scripting language used for game development and embedded systems)", level: levels[0]},
    { id: 61, word: "flask", hint: "Python microframework for building web applications", level: levels[1]},
    { id: 62, word: "clojure", hint: "Functional programming language on the JVM", level: levels[2]},
    { id: 63, word: "pascal", hint: "Imperative programming language, often used for teaching", level: levels[2]},
    { id: 64, word: "julia", hint: "High-performance language for scientific computing", level: levels[1]},
    { id: 65, word: "deno", hint: "Secure runtime environment for JavaScript and TypeScript", level: levels[0]},
    { id: 66, word: "elixir", hint: "Functional language with fault tolerance for building scalable applications", level: levels[2]},
    { id: 67, word: "erlang", hint: "Concurrent programming language for building fault-tolerant systems", level: levels[2]},
    { id: 68, word: "express", hint: "Node.js framework for building web applications and APIs", level: levels[0]},
    { id: 69, word: "groovy", hint: "Object-oriented language for JVM, often used for web development", level: levels[1]},
    { id: 70, word: "ocaml", hint: "Functional language with static typing, used for systems programming", level: levels[2]},
    { id: 71, word: "prolog", hint: "Logic programming language for artificial intelligence applications", level: levels[2]},
    { id: 72, word: "vbscript", hint: "Scripting language for legacy Microsoft applications", level: levels[1]},
    { id: 73, word: "svelte", hint: "Component-based UI framework for web development", level: levels[1]},
    { id: 74, word: "bulma", hint: "Lightweight CSS framework with a focus on mobile-first design", level: levels[0]},
    { id: 75, word: "foundation", hint: "Responsive front-end framework for building websites, emails, and UIs", level: levels[2]},
    { id: 76, word: "materialize", hint: "Implements Google's Material Design for a clean, modern look", level: levels[1]},
    { id: 77, word: "ember", hint: "Mature framework for building ambitious web applications", level: levels[1]},
    { id: 78, word: "backbone", hint: "Lightweight library for building client-side web applications", level: levels[2]},
    { id: 79, word: "meteor", hint: "Full-stack framework for building real-time web applications", level: levels[2]},
    { id: 80, word: "aurelia", hint: "Modern JavaScript framework with a focus on modularity and tooling", level: levels[2]},
    { id: 81, word: "polymer", hint: "Web component library for building reusable UI elements", level: levels[2]},
    { id: 82, word: "gatsby", hint: "React-based framework for building performant websites and web apps", level: levels[2]},
    { id: 83, word: "mithrill", hint: "Minimal footprint library for building modern web applications", level: levels[2]},
    { id: 84, word: "flask", hint: "Python microframework for building web applications", level: levels[0]},
    { id: 85, word: "cherrypy", hint: "Object-oriented web framework for Python, good for small to medium projects", level: levels[2]},
    { id: 86, word: "bottle", hint: "Lightweight WSGI microframework for Python web development", level: levels[1]},
    { id: 87, word: "pyramid", hint: "Python web framework with focus on customization and flexibility", level: levels[1]},
    { id: 88, word: "glsl", hint: "OpenGL Shading Language for programmable shaders on GPUs", level: levels[1]},
    { id: 89, word: "nosql", hint: "Non-relational databases for storing and retrieving data", level: levels[0]},
    { id: 90, word: "bash", hint: "Unix shell for command-line scripting and automation", level: levels[1]},
    { id: 91, word: "matlab", hint: "Proprietary programming language for numerical computing", level: levels[2]},
];
