// data.js - Comprehensive Mock Data for Jobs, Preparation (Aptitude, CS, HR), Companies and DSA

const JOBS_DATA = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: "Google",
    location: "Mountain View, CA (Hybrid)",
    type: "Full-Time",
    experience: "Senior",
    salary: "$160k - $210k",
    logoBg: "#4285F4",
    tags: ["React", "CSS3", "Web Performance"],
    description: "We are looking for a Senior Frontend Engineer to join our Core Search UX team. You will build user-facing search experiences used by billions, working closely with UX designers, product managers, and backend engineers.",
    requirements: [
      "5+ years of experience in professional web development.",
      "Expert knowledge of HTML5, CSS3, modern JavaScript (ES6+), and React.",
      "Experience optimizing web application performance and accessibility (WCAG).",
      "Strong coding skills in data structures and algorithms."
    ],
    benefits: [
      "Competitive equity (GSUs) and annual bonus.",
      "Comprehensive medical, dental, and vision insurance.",
      "On-site meals, gym memberships, and micro-kitchens.",
      "401(k) matching and generous parental leave."
    ]
  },
  {
    id: "job-2",
    title: "Software Engineer II - Cloud",
    company: "Microsoft",
    location: "Redmond, WA (Remote Friendly)",
    type: "Full-Time",
    experience: "Mid-Level",
    salary: "$130k - $170k",
    logoBg: "#00A4EF",
    tags: ["Azure", "C#", "System Design"],
    description: "Join the Azure Kubernetes Service (AKS) team. You will design, develop, and operate hyperscale distributed system services that power millions of enterprise containers worldwide.",
    requirements: [
      "3+ years of experience building scalable backend microservices.",
      "Proficiency in C#, Java, Go, or C++.",
      "Experience with Kubernetes, Docker, and cloud infrastructure.",
      "BS/MS in Computer Science or equivalent practical experience."
    ],
    benefits: [
      "Flexible remote working options.",
      "Health savings account and health insurance.",
      "Microsoft product discounts and gym subsidies.",
      "15% discount on Microsoft stock (ESPP)."
    ]
  },
  {
    id: "job-3",
    title: "MTS Systems Engineer",
    company: "AMD",
    location: "Austin, TX (On-site)",
    type: "Full-Time",
    experience: "Mid-Level",
    salary: "$120k - $155k",
    logoBg: "#ED1C24",
    tags: ["C++", "Linux Kernel", "Driver Development"],
    description: "Develop GPU driver architectures for next-generation gaming and AI hardware. You will collaborate with hardware architects to write low-level code that interfaces directly with custom silicon.",
    requirements: [
      "Strong systems programming experience in C and C++.",
      "Understanding of GPU/CPU architectures and memory management.",
      "Familiarity with Linux kernel development or Windows driver models.",
      "Experience debugging using GDB, WinDbg, or hardware debuggers."
    ],
    benefits: [
      "Stock awards and performance bonuses.",
      "Premium family health plans.",
      "Education assistance / tuition reimbursement.",
      "On-site fitness centers."
    ]
  },
  {
    id: "job-4",
    title: "Full Stack Engineer (Growth)",
    company: "Stripe",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-Time",
    experience: "Mid-Level",
    salary: "$145k - $185k",
    logoBg: "#635BFF",
    tags: ["TypeScript", "Ruby on Rails", "React"],
    description: "Stripe's Growth team is looking for a product-focused Full Stack Engineer. You will design experiments, build onboarding flows, and build APIs that make it frictionless for companies to start businesses.",
    requirements: [
      "Solid experience with React/TypeScript and a backend framework (Ruby, Node, Python).",
      "Obsession with high-quality UI/UX and user interaction metrics.",
      "Experience executing A/B tests and processing growth analytics.",
      "Excellent communication and collaborative problem-solving skills."
    ],
    benefits: [
      "Generous health, dental, and wellness allowance.",
      "Commuter benefits and workspace setup stipend.",
      "Free daily lunches and catered snacks.",
      "Active learning fund for books, conferences, and courses."
    ]
  },
  {
    id: "job-5",
    title: "Data Scientist (Product Analytics)",
    company: "Meta",
    location: "Seattle, WA (Hybrid)",
    type: "Full-Time",
    experience: "Mid-Level",
    salary: "$140k - $190k",
    logoBg: "#0668E1",
    tags: ["Python", "SQL", "A/B Testing"],
    description: "Help shape the future of Instagram Reels. You will work with telemetry data to perform quantitative analysis, model user behavior, run statistical experiments, and guide product roadmap decisions.",
    requirements: [
      "MS or PhD in a quantitative field (Stats, Math, CS) or equivalent experience.",
      "Extensive experience writing complex SQL queries and Python/R analysis scripts.",
      "Deep understanding of statistical concepts, hypothesis testing, and experimental design.",
      "Ability to translate complex data findings into actionable product recommendations."
    ],
    benefits: [
      "Meta health clinics and wellness program.",
      "High equity grant packages.",
      "Generous annual leave and mental health days.",
      "Free shuttle buses and public transit passes."
    ]
  },
  {
    id: "job-6",
    title: "React Developer",
    company: "Netflix",
    location: "Los Gatos, CA (Remote Allowed)",
    type: "Contract",
    experience: "Senior",
    salary: "$180 - $220 / hr",
    logoBg: "#E50914",
    tags: ["React", "WebGL", "TV WebApps"],
    description: "Build immersive media-rich interfaces for the Netflix Smart TV application. Optimize rendering engines to achieve 60fps on low-powered consumer electronics.",
    requirements: [
      "Deep expertise in React core libraries and modern state management.",
      "Experience with canvas drawing, WebGL, or performance tuning for embedded browsers.",
      "Ability to write highly optimized, dependency-free vanilla JS helper libraries.",
      "Independent worker comfortable with high freedom and high responsibility."
    ],
    benefits: [
      "Top-tier compensation rate.",
      "Full access to Netflix's employee benefits program (matching HSA, wellness).",
      "Flexible schedule with unlimited PTO."
    ]
  }
];

const APTITUDE_DATA = {
  quantitative: [
    {
      id: "q-quant-1",
      question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
      options: ["120 meters", "150 meters", "324 meters", "180 meters"],
      answerIndex: 1,
      explanation: "Speed of train = 60 km/hr = 60 * (5/18) m/sec = 50/3 m/sec.\nTime taken to cross the pole = 9 seconds.\nLength of the train = Speed * Time = (50/3) * 9 = 150 meters."
    },
    {
      id: "q-quant-2",
      question: "If 15 men can complete a work in 20 days, how many days will 20 men take to complete the same work?",
      options: ["10 days", "12 days", "15 days", "18 days"],
      answerIndex: 2,
      explanation: "Using the formula M1 * D1 = M2 * D2:\n15 * 20 = 20 * D2\n300 = 20 * D2\nD2 = 300 / 20 = 15 days."
    },
    {
      id: "q-quant-3",
      question: "Find the compound interest on Rs. 10,000 for 2 years at 10% per annum, compounded annually.",
      options: ["Rs. 2,000", "Rs. 2,100", "Rs. 1,900", "Rs. 2,200"],
      answerIndex: 1,
      explanation: "Amount = Principal * (1 + R/100)^N\nAmount = 10000 * (1 + 10/100)^2 = 10000 * (1.1)^2 = 10000 * 1.21 = Rs. 12,100.\nCompound Interest (CI) = Amount - Principal = 12,100 - 10,000 = Rs. 2,100."
    }
  ],
  logical: [
    {
      id: "q-log-1",
      question: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
      options: ["1/3", "1/8", "2/8", "1/16"],
      answerIndex: 1,
      explanation: "This is a simple division series. Each number is half of the previous number.\n2 / 2 = 1\n1 / 2 = 1/2\n(1/2) / 2 = 1/4\n(1/4) / 2 = 1/8."
    },
    {
      id: "q-log-2",
      question: "If 'TIGER' is coded as 'QDFHS', how is 'FISH' coded in that language?",
      options: ["GERH", "GRHE", "EHRG", "EGHR"],
      answerIndex: 2,
      explanation: "The coding follows a pattern where each letter of the word is decremented by 1 position (going backward in the alphabet) and reversed:\nT -> S, I -> H, G -> F, E -> D, R -> Q. Reversing 'SHFDQ' yields 'QDFHS'.\nApplying this to FISH:\nF - 1 = E\nI - 1 = H\nS - 1 = R\nH - 1 = G\nReversing 'EHRG' gives 'GRHE'. Wait, let's check:\nReverse order: H-1=G, S-1=R, I-1=H, F-1=E -> GRHE."
    },
    {
      id: "q-log-3",
      question: "Pointing to a photograph, Vipul said, 'She is the daughter of my grandfather's only son.' How is Vipul related to the girl in the photograph?",
      options: ["Brother", "Uncle", "Cousin", "Father"],
      answerIndex: 0,
      explanation: "Vipul's grandfather's only son is Vipul's father. The girl is the daughter of Vipul's father. Therefore, the girl is Vipul's sister, meaning Vipul is her brother."
    }
  ],
  verbal: [
    {
      id: "q-verb-1",
      question: "Choose the word that is most nearly opposite in meaning to: 'OBSTINATE'",
      options: ["Stubborn", "Flexible", "Rigid", "Dogmatic"],
      answerIndex: 1,
      explanation: "'Obstinate' means stubbornly refusing to change one's opinion or chosen course of action. The opposite is 'Flexible', which refers to being compliant or willing to adapt."
    },
    {
      id: "q-verb-2",
      question: "Find the correctly spelled word from the options below:",
      options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
      answerIndex: 2,
      explanation: "The correct spelling is 'Accommodate', which contains a double 'c' and a double 'm'."
    },
    {
      id: "q-verb-3",
      question: "Complete the sentence: 'The manager was __________ about the project success, despite the setbacks.'",
      options: ["despondent", "indifferent", "sanguine", "skeptical"],
      answerIndex: 2,
      explanation: "'Sanguine' means optimistic or positive, especially in an apparently bad or difficult situation. The word 'despite the setbacks' implies a contrast, matching the positive meaning of 'sanguine'."
    }
  ]
};

const CS_FUNDAMENTALS_DATA = [
  {
    topic: "Operating Systems (OS)",
    notes: [
      {
        title: "Process vs Thread",
        content: "A <b>Process</b> is an active execution of a program with its own dedicated memory address space (text, data, heap, stack). Processes are isolated and communicate via IPC (Inter-Process Communication). <br><br>A <b>Thread</b> is a lightweight execution unit inside a process. Multiple threads share the process's code, data, and heap memory, but maintain their own registers, program counter, and stack. Thread context switching is faster than process context switching."
      },
      {
        title: "Virtual Memory & Paging",
        content: "<b>Virtual Memory</b> is a storage allocation scheme in which secondary memory can be addressed as though it were part of main memory. It creates the illusion of a large contiguous RAM. <br><br><b>Paging</b> is a memory management scheme that eliminates the need for contiguous physical allocation. The virtual address space is broken down into fixed-sized blocks called <b>pages</b>, and physical memory is divided into <b>frames</b>. A Page Table maps pages to frames, throwing Page Fault exceptions if the page is not loaded in RAM."
      },
      {
        title: "Deadlocks",
        content: "A <b>Deadlock</b> is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process in the set.<br><br><b>Four Coffman Conditions</b> required for deadlock: <br>1. <b>Mutual Exclusion:</b> Only one process can use a resource at a time.<br>2. <b>Hold and Wait:</b> Process holding resources can request new resources without releasing current ones.<br>3. <b>No Preemption:</b> Resources cannot be forcibly taken from a process.<br>4. <b>Circular Wait:</b> A closed chain of processes exists where each process waits for a resource held by the next process."
      }
    ],
    quiz: [
      {
        question: "Which of the following scheduler selects processes from pool and loads them into memory for execution?",
        options: ["Long-term Scheduler", "Short-term Scheduler", "Medium-term Scheduler", "Thread Scheduler"],
        answerIndex: 0,
        explanation: "The Long-term Scheduler (or job scheduler) determines which programs are admitted to the system for processing. It selects processes from the queue and loads them into memory."
      },
      {
        question: "What is thrashing in OS?",
        options: ["An error state of disk drive formatting", "High CPU utilization caused by concurrent background tasks", "A state where the CPU spends more time paging/swapping than executing instructions", "Forcible termination of deadlocked processes"],
        answerIndex: 2,
        explanation: "Thrashing occurs when the virtual memory of a system is overused, causing constant page faults and leading the OS to spend more time swapping pages in and out of disk rather than running actual process calculations."
      }
    ]
  },
  {
    topic: "Database Management Systems (DBMS)",
    notes: [
      {
        title: "ACID Properties",
        content: "Transactions in DBMS must guarantee ACID properties: <br><br>1. <b>Atomicity:</b> The entire transaction succeeds or fails as a single unit ('All or Nothing').<br>2. <b>Consistency:</b> A transaction must transition the database from one valid state to another, maintaining all schema constraints.<br>3. <b>Isolation:</b> Concurrent execution of transactions yields the same state as if they were run sequentially.<br>4. <b>Durability:</b> Once committed, the transaction's changes survive any subsequent system failures."
      },
      {
        title: "Indexes (B-Trees)",
        content: "An <b>Index</b> is a data structure (commonly B-Tree or B+ Tree) that improves the speed of data retrieval operations on a table at the cost of slower write speeds and additional disk space. B+ Trees store data pointers only at leaf nodes, resulting in high fan-out, shallow tree heights, and efficient range scans."
      },
      {
        title: "Normalization vs Denormalization",
        content: "<b>Normalization</b> is the process of organizing database fields to reduce data redundancy and dependency by splitting tables (First, Second, Third, and Boyce-Codd Normal Forms). <br><br><b>Denormalization</b> is the strategic process of adding redundant data back into a schema to optimize read performance and avoid expensive multi-table joins in high-traffic applications."
      }
    ],
    quiz: [
      {
        question: "Which SQL join returns all rows from the left table, and the matched rows from the right table?",
        options: ["Inner Join", "Full Outer Join", "Left Join", "Cross Join"],
        answerIndex: 2,
        explanation: "A LEFT JOIN returns all records from the left table (table1), and the matched records from the right table (table2). If there is no match, NULL values are returned for the right table columns."
      },
      {
        question: "What is a key difference between B-Trees and B+ Trees?",
        options: ["B-Trees are binary search trees, B+ Trees are not", "B+ Trees store data records only in leaf nodes; B-Trees store data pointers in internal nodes as well", "B-Trees are faster for range query operations", "B+ Trees do not support indexing"],
        answerIndex: 1,
        explanation: "In a B+ Tree, keys and data records are only stored in the leaf nodes, while the internal nodes contain only routing keys. Leaf nodes are also linked sequentially, making range queries highly efficient compared to standard B-Trees."
      }
    ]
  },
  {
    topic: "Computer Networks (CN)",
    notes: [
      {
        title: "OSI Model Layers",
        content: "The OSI Model partitions network communication into 7 logical layers: <br>1. <b>Physical:</b> Transmits raw bitstreams over physical mediums.<br>2. <b>Data Link:</b> Defines frames, physical MAC addressing, and error detection (Ethernet, Wi-Fi).<br>3. <b>Network:</b> Packet routing and logical IP addressing (IP, ICMP).<br>4. <b>Transport:</b> End-to-end communication reliability, segmentation, flow control (TCP, UDP).<br>5. <b>Session:</b> Manages connections and sessions between applications.<br>6. <b>Presentation:</b> Data formatting, syntax conversion, and encryption (SSL/TLS).<br>7. <b>Application:</b> User interaction layer protocols (HTTP, DNS, SMTP, FTP)."
      },
      {
        title: "TCP vs UDP",
        content: "<b>TCP (Transmission Control Protocol):</b> Connection-oriented protocol. Guarantees message delivery, packet ordering, and flow control using a 3-way handshake (SYN, SYN-ACK, ACK). Heavy overhead.<br><br><b>UDP (User Datagram Protocol):</b> Connectionless protocol. Unreliable delivery, packets can arrive out of order or get lost. No handshake, low overhead, ideal for real-time applications (streaming, gaming, DNS)."
      },
      {
        title: "DNS (Domain Name System)",
        content: "DNS acts as the phonebook of the internet, translating human-readable domain names (e.g. google.com) into machine-readable IP addresses (e.g. 142.250.190.46). It utilizes a hierarchical distributed cache system across Root servers, TLD (Top-Level Domain) servers, and Authoritative Name Servers."
      }
    ],
    quiz: [
      {
        question: "Which TCP handshake flag is sent first to initialize a connection?",
        options: ["ACK", "SYN", "FIN", "RST"],
        answerIndex: 1,
        explanation: "The TCP connection is initialized with a 'SYN' (Synchronize) flag packet sent by the client. The server responds with 'SYN-ACK', and the client finishes with 'ACK'."
      },
      {
        question: "Which port does HTTPS default to?",
        options: ["80", "22", "443", "8080"],
        answerIndex: 2,
        explanation: "HTTPS (HTTP Secure) uses port 443 by default, whereas unencrypted HTTP uses port 80."
      }
    ]
  }
];

const HR_DATA = [
  {
    id: "hr-1",
    question: "Tell me about yourself.",
    category: "Introduction",
    strategy: "Use the Present-Past-Future framework: Describe your current role and recent achievements, pivot to how you got there (past key skills/projects), and end with why you are excited about this specific opportunity.",
    sampleAnswer: "I am a frontend software engineer with over three years of experience building responsive, high-performance web applications. In my current role at TechCorp, I led the redesign of our client portal, which improved loading times by 40% and user engagement by 15%. Before that, I graduated with a degree in Computer Science and worked at a fintech startup where I developed real-time dashboard grids. While I love my current job, I'm ready for a new challenge, and I'm highly interested in this role because of your focus on expanding cloud infrastructure accessibility."
  },
  {
    id: "hr-2",
    question: "What is your greatest strength and weakness?",
    category: "Self-Reflection",
    strategy: "Strength: Highlight a professional skill backed by a concrete metric or result. Weakness: State a real but non-critical weakness that you are actively working to improve, describing the steps you are taking.",
    sampleAnswer: "My greatest strength is my problem-solving ability under high pressure. During an API outage last year, I coordinated cross-functional responses and identified the database lock issue, restoring service within 15 minutes. \n\nMy weakness is delegation. In early projects, I took on too many details myself, which caused bottlenecks. To address this, I started using JIRA mapping to assign tasks based on team expertise, which has drastically improved team performance and deadlines."
  },
  {
    id: "hr-3",
    question: "Describe a conflict you had with a team member and how you resolved it.",
    category: "Behavioral",
    strategy: "Use the STAR method. Keep it professional, focus on communication, avoid speaking negatively of the coworker, and emphasize the positive compromise.",
    sampleAnswer: "<b>Situation:</b> During a project kickoff, a backend designer and I disagreed on the API structure. They wanted to send flat data, while I needed a nested hierarchy to optimize client rendering. \n<b>Task:</b> I needed to resolve the schema design without delaying the release timeline. \n<b>Action:</b> I set up a 15-minute whiteboard session. I demonstrated that nesting data would cut client payload parsing calls in half, while they explained their concerns about DB queries. We compromised by creating a database view that generated the nested payload efficiently without database overhead. \n<b>Result:</b> The feature shipped on time, client performance met targets, and we established a collaborative design protocol for future features."
  }
];

const COMPANY_DATA = [
  {
    name: "Google",
    slug: "google",
    logoBg: "#4285F4",
    difficulty: "Hard",
    salaryAvg: "$150k - $240k",
    overview: "Google interviews focus heavily on core CS fundamentals, coding speed, and problem-solving, with a strong emphasis on clean code structure and performance optimization.",
    rounds: [
      {
        name: "Round 1: Online Assessment (OA)",
        details: "Timed coding challenges on a platform like HackerRank. Usually 2 algorithmic problems (Medium-Hard) focusing on array manipulations or dynamic programming."
      },
      {
        name: "Round 2: Technical Phone Screen",
        details: "45-minute coding session with a Google engineer using an online whiteboard. Expect questions about trees, graphs, or design analysis. You must explain your approach and compute Big O complexity before writing code."
      },
      {
        name: "Round 3: Onsite Loops (3-4 Coding + 1 Googliness)",
        details: "Three to four technical interviews covering algorithms, data structures, and system design (for senior roles), plus one behavioral round covering googliness (leadership, conflict resolution, ethics)."
      }
    ],
    tips: [
      "Practice graph algorithms (DFS, BFS, Dijkstra's) and Tree traversals thoroughly.",
      "Google engineers love it when you talk out loud, dry-run your solution with custom test inputs, and write modular code.",
      "Be prepared to code in a Google Doc-like bare text editor (no autocomplete, no syntax highlighting)."
    ]
  },
  {
    name: "Microsoft",
    slug: "microsoft",
    logoBg: "#00A4EF",
    difficulty: "Medium-Hard",
    salaryAvg: "$130k - $190k",
    overview: "Microsoft interviews place significant emphasis on system design, practical developer skills, and debugging, in addition to standard algorithmic challenges.",
    rounds: [
      {
        name: "Round 1: Screening",
        details: "Initial call with recruiter followed by a technical screen covering basic data structures, OOP concepts, or web services."
      },
      {
        name: "Round 2: Coding Loop",
        details: "2 algorithmic interviews focusing on string manipulations, linked lists, or tree queries. Clean modular code is highly valued."
      },
      {
        name: "Round 3: Design & Architecture",
        details: "System design session where you build a high-level system (e.g. Design a URL Shortener or Azure File Storage monitor) focusing on scalability, load balancers, and partition keys."
      }
    ],
    tips: [
      "Review basic OOP principles, design patterns (Singleton, Factory), and memory models.",
      "Understand multi-threading concepts, resource synchronization, and mutexes.",
      "Focus on explaining edge cases and debugging your own code systematically."
    ]
  },
  {
    name: "Amazon",
    slug: "amazon",
    logoBg: "#FF9900",
    difficulty: "Hard",
    salaryAvg: "$140k - $210k",
    overview: "Amazon interviews are unique due to the strict evaluation of candidates against the 16 Leadership Principles (LPs). Every single round will contain 15-20 minutes of behavioral questions.",
    rounds: [
      {
        name: "Round 1: Online Assessment",
        details: "Coding assessment (debugging, coding algorithms) and a Work Simulation round replicating daily tasks as an Amazon developer."
      },
      {
        name: "Round 2: Technical & Leadership Screening",
        details: "1-hour phone call split between a coding problem (linked lists, queues, or maps) and STAR-method questions focusing on Customer Obsession and Bias for Action."
      },
      {
        name: "Round 3: Onsite Loop (4 Interviews)",
        details: "Four interviews focusing on Coding/Algorithms, System Design, Object-Oriented Design, and System Architecture. Each round evaluates specific Leadership Principles."
      }
    ],
    tips: [
      "Prepare 2 distinct stories for each of Amazon's 16 Leadership Principles using the STAR framework.",
      "Be prepared for deep follow-ups on your behavioral stories (e.g., 'What would you do differently?').",
      "Excel in system design and data modeling (SQL vs NoSQL decisions)."
    ]
  }
];

const DSA_SHEET_DATA = [
  {
    category: "Arrays",
    questions: [
      {
        id: "arr-1",
        title: "Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou should return the answer as an array containing the two indices, e.g. `[0, 1]`.",
        starterCode: `function twoSum(nums, target) {
  // Write your code here
  
}`,
        testCode: `
        // Test runner block
        try {
          const res1 = twoSum([2, 7, 11, 15], 9);
          const res2 = twoSum([3, 2, 4], 6);
          const res3 = twoSum([3, 3], 6);
          
          const pass1 = Array.isArray(res1) && res1.sort().join(',') === '0,1';
          const pass2 = Array.isArray(res2) && res2.sort().join(',') === '1,2';
          const pass3 = Array.isArray(res3) && res3.sort().join(',') === '0,1';
          
          if (pass1 && pass2 && pass3) {
            return { success: true, message: "All 3 test cases passed successfully!" };
          } else {
            return { 
              success: false, 
              message: "Test cases failed. Double check your indexes.",
              debug: "Input: [2,7,11,15], 9 -> Expected: [0,1], Got: " + JSON.stringify(res1) + 
                     "\\nInput: [3,2,4], 6 -> Expected: [1,2], Got: " + JSON.stringify(res2)
            };
          }
        } catch (e) {
          return { success: false, message: "Execution Error: " + e.message };
        }
        `
      },
      {
        id: "arr-2",
        title: "Maximum Subarray (Kadane's)",
        difficulty: "Medium",
        description: "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        starterCode: `function maxSubArray(nums) {
  // Write your code here
  
}`,
        testCode: `
        try {
          const res1 = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
          const res2 = maxSubArray([1]);
          const res3 = maxSubArray([5, 4, -1, 7, 8]);
          
          const pass1 = res1 === 6; // [4,-1,2,1]
          const pass2 = res2 === 1;
          const pass3 = res3 === 23;
          
          if (pass1 && pass2 && pass3) {
            return { success: true, message: "All test cases passed! Kadane's algorithm works correctly." };
          } else {
            return {
              success: false,
              message: "Incorrect sum calculated.",
              debug: "Input: [-2,1,-3,4,-1,2,1,-5,4] -> Expected: 6, Got: " + res1 +
                     "\\nInput: [5,4,-1,7,8] -> Expected: 23, Got: " + res3
            };
          }
        } catch (e) {
          return { success: false, message: "Execution Error: " + e.message };
        }
        `
      }
    ]
  },
  {
    category: "Strings",
    questions: [
      {
        id: "str-1",
        title: "Valid Palindrome",
        difficulty: "Easy",
        description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
        starterCode: `function isPalindrome(s) {
  // Write your code here
  
}`,
        testCode: `
        try {
          const res1 = isPalindrome("A man, a plan, a canal: Panama");
          const res2 = isPalindrome("race a car");
          const res3 = isPalindrome(" ");
          
          const pass1 = res1 === true;
          const pass2 = res2 === false;
          const pass3 = res3 === true;
          
          if (pass1 && pass2 && pass3) {
            return { success: true, message: "All palindrome test cases passed!" };
          } else {
            return {
              success: false,
              message: "Test evaluation failed.",
              debug: "Input: 'A man, a plan, a canal: Panama' -> Expected: true, Got: " + res1 +
                     "\\nInput: 'race a car' -> Expected: false, Got: " + res2
            };
          }
        } catch (e) {
          return { success: false, message: "Execution Error: " + e.message };
        }
        `
      }
    ]
  },
  {
    category: "Linked Lists",
    questions: [
      {
        id: "ll-1",
        title: "Reverse Linked List",
        difficulty: "Easy",
        description: "Given the root of a singly linked list, reverse the list, and return the reversed list. \n\n*Note on layout:* In this mock editor, you will receive a JavaScript object representing a list node where each node has a `.val` property and a `.next` pointer. Return the reversed list node head.\n\nStructure example: `{ val: 1, next: { val: 2, next: null } }`",
        starterCode: `function reverseList(head) {
  // Write your code here
  
}`,
        testCode: `
        try {
          // Helper to create list
          const createList = (arr) => {
            if (arr.length === 0) return null;
            let head = { val: arr[0], next: null };
            let curr = head;
            for (let i = 1; i < arr.length; i++) {
              curr.next = { val: arr[i], next: null };
              curr = curr.next;
            }
            return head;
          };
          const toArr = (head) => {
            let res = [];
            let curr = head;
            while(curr) {
              res.push(curr.val);
              curr = curr.next;
            }
            return res;
          };
          
          const l1 = createList([1,2,3,4,5]);
          const rev1 = reverseList(l1);
          const res1 = toArr(rev1);
          
          const pass1 = res1.join(',') === '5,4,3,2,1';
          
          if (pass1) {
            return { success: true, message: "List reversed successfully! Excellent pointer manipulation." };
          } else {
            return {
              success: false,
              message: "Incorrect list order.",
              debug: "Input: [1,2,3,4,5] -> Expected: [5,4,3,2,1], Got: " + JSON.stringify(res1)
            };
          }
        } catch(e) {
          return { success: false, message: "Execution Error: " + e.message };
        }
        `
      }
    ]
  },
  {
    category: "Dynamic Programming",
    questions: [
      {
        id: "dp-1",
        title: "Climbing Stairs",
        difficulty: "Easy",
        description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
        starterCode: `function climbStairs(n) {
  // Write your code here
  
}`,
        testCode: `
        try {
          const res1 = climbStairs(2);
          const res2 = climbStairs(3);
          const res3 = climbStairs(5);
          
          const pass1 = res1 === 2;
          const pass2 = res2 === 3;
          const pass3 = res3 === 8;
          
          if (pass1 && pass2 && pass3) {
            return { success: true, message: "Climbing Stairs logic is fully correct! Dynamic Programming success." };
          } else {
            return {
              success: false,
              message: "Incorrect calculations.",
              debug: "Input: 2 -> Expected: 2, Got: " + res1 +
                     "\\nInput: 5 -> Expected: 8, Got: " + res3
            };
          }
        } catch (e) {
          return { success: false, message: "Execution Error: " + e.message };
        }
        `
      }
    ]
  }
];
