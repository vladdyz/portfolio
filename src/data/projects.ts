// Data-driven project list. To add a project later: append an object to
// the `projects` array below — no component changes needed.
const BASE = import.meta.env.BASE_URL;


export type ProjectCategory = 'webapp' | 'repository' | 'game';

export type ProjectStatus =
  | 'live'              // deployed and browsable right now
  | 'source-only'       // not deployed; repo (+ maybe a demo recording) tells the story
  | 'browser-playable'  // e.g. a WebGL build, playable without downloading anything
  | 'download-to-play'; // ships as an installer/executable

export interface VideoMediaItem {
  type: 'video';
  src: string;    // e.g. '/videos/desert-storm-clip.mp4'
  poster: string; // thumbnail shown before play, e.g. '/images/desert-storm-poster.jpg'
}

export type MediaItem = string | VideoMediaItem;

export interface ProjectLinks {
  demo?: string;    // live deployed URL
  repo?: string;    // primary source repo
  uiRepo?: string;  // companion UI/client repo, if the project is split like Fragments
  video?: string;   // short demo/walkthrough recording
  itch?: string;    // itch.io page (games)
  download?: string; // build/installer download (GitHub Releases, etc.)
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  period?: string;        // e.g. "Sep 2025 – Present"
  tagline: string;        // one line, shown under the title
  description: string;    // a few sentences — purpose + approach
  stack: string[];
  highlights?: string[];  // short, specific, resume-bullet-style call-outs
  images?: MediaItem[];    // screenshots for the card media area; 2+ enables the carousel - now supporting videos
  links: ProjectLinks;
  status: ProjectStatus;
  statusLabel?: string;   // override the default label derived from `status`
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  webapp: 'Web App',
  repository: 'Repository',
  game: 'Game',
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: 'Live',
  'source-only': 'Source available',
  'browser-playable': 'Play in browser',
  'download-to-play': 'Download to play',
};

export const projects: Project[] = [
  {
    id: 'fragments',
    title: 'Fragments',
    category: 'repository',
    images: [ `${BASE}images/fragmentsUI.png`, 
         `${BASE}images/fragments2.png`, 
         `${BASE}images/fragmentsTypes.png`, 
         `${BASE}images/fragmentsTypesConvert.png`,
         `${BASE}images/fragmentslcloudwatch.png`,
         `${BASE}images/fragmentslcov.png`,
         `${BASE}images/fragmentsTests.png` ],
    //period: 'Sep 2025 – Dec 2025',
    tagline:
      'Cloud-based microservice (AWS) for handling and transforming data with Cognito Authentication, CI/CD, and a separate front-end UI',
    description:
      'A Node.js/Express REST API for creating, converting, and retrieving small pieces of user content ' +
      '("fragments"), backed by AWS S3 and DynamoDB, paired with a companion Fragments-UI client that ' +
      'authenticates through Amazon Cognito. Both services are independently containerized and shipped ' +
      'through their own CI/CD pipelines to Amazon ECR/ECS.',
    stack: ['Node.js', 'Express', 'AWS S3', 'DynamoDB', 'ECS/ECR', 'Cognito', 'Docker', 'GitHub Actions', 'Jest'],
    highlights: [
      'Two independently pipelined services (API & UI) wired together through Cognito auth',
      'Automated build & deploy to Amazon ECR/ECS on every push',
      'Test suite spanning Jest, Hurl, and Supertest',
      'Process and transform text, app, and image based data into other supported formats',
      'Cloudwatch log tracking',
      'File data stored in Amazon S3 bucket and corresponding metadata in DynamoDB',
      'Deploys using a load balancer'
    ],
    links: {
      repo: 'https://github.com/vladdyz/fragments', 
      uiRepo: 'https://github.com/vladdyz/fragments-ui',
      video: 'https://youtu.be/4rko1W3KC9I', 
    },
    status: 'source-only',
    statusLabel: 'Source + demo video',
  },
  {
    id: 'offroad-adventures',
    title: 'Offroad Adventures',
    category: 'webapp',
    //period: 'Jul 2024 – Present',
    images: [ `${BASE}images/OffroadHome.png`, 
         `${BASE}images/OffroadMap.png`, 
         `${BASE}images/OffroadLogin.png`, 
         `${BASE}images/OffroadCamp.png`,
         `${BASE}images/OffroadAlgon.png`,
     ],
    tagline: 'Full-stack location-based review platform architecture with live map and lazy-loaded browsing.',
    description:
      'A full-stack campground review application built with Node.js, Express, MongoDB, and EJS. ' +
      'This project demonstrates a full-stack location-based review platform architecture.' +
      'The underlying design can be adapted to support other location-based domains' +
      'such as restaurants, hotels, museums, heritage sites, or attractions,',
    stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Jest', 'Supertest', 'GitHub Actions'],
    highlights: [
      '42 passing tests in CI (Jest, Supertest, mongodb-memory-server) with ~80% coverage',
      'Lazy-loaded pagination via the Fetch API and IntersectionObserver',
      'Live cluster map (MapTiler) that stays independent of the current results page',
      'Full authentication system using Passport.js and passport-local-mongoose',
      'Image uploads and cloud storage integration using Cloudinary',
      //'Request validation using Joi',
      //'Security middleware using Helmet and express-mongo-sanitize',
       'Request validation (Joi) and security hardening (Helmet, express-mongo-sanitize)',
      ' MVC-inspired structure with separation of route definitions, business logic, database models, and presentation',
    ],
    links: {
      demo: 'https://offroadadventures.onrender.com/', 
      repo: 'https://github.com/vladdyz/offroad-adventures', 
    },
    status: 'live',
  },
  {
    id: 'desert-storm-1991',
    title: 'Desert Storm: 1991',
    category: 'game',
    //period: 'Sep 2025 – Present',
    tagline: '2D tactical roguelike with procedurally generated missions, built solo as a capstone project.',
    description:
      'A Unity/C# tactical roguelike where every mission is assembled from node-graph level templates, ' +
      'so no two playthroughs lay out the same. Built as a capstone project, serving as lead designer, ' +
      'programmer, and QA tester.',
    stack: ['Unity', 'C#', 'Procedural generation'],
    highlights: [
      'Node-graph template system drives procedural level generation',
      'Solo end-to-end ownership: design, implementation, and QA',
    ],
    links: {
      download: 'https://github.com/YOUR_USERNAME/desert-storm-1991/releases', // TODO: your release URL
      // itch: '', // TODO: add once the WebGL build is live — flip status to 'browser-playable'
    },
    status: 'download-to-play',
  },
{
    id: 'self-driving-car-simulator',
    title: 'Self Driving Car Simulation', 
    category: 'repository',
    images: [ `${BASE}images/selfdrive1.png`],
    tagline: 'Convolutional Neural Network to simulate a self-driving car',
    /*
    This way way too verbose

    description: 'Autonomous driving model using recorded camera images and steering angles ' +
    'gathered from the Udacity Self-Driving Car Simulator as the dataset. Trains CNN model +' +
    ' applies a pipeline of pre-processing + data augmentation. Raw images are pre-processed ' +
    'and noise reduction applied using Gaussian Blur. Randomized augmentation techniques ' +
    'are applied to the dataset to prevent ' +
    'overfitting and improve model generalization. Follows an NVIDIA-style end-to-end ' +
    'architecture, resizing frames to default dimensions and progressing from normalized input planes ' +
    'through five convolutional feature maps (using 5x5 and 3x3 kernels) down to a series of' +
    'fully-connected layers. The neural network uses an Exponential Linear Unit (ELU) activation ' +
    'function instead of RELU for smoother gradients near zero and lower validation MSE. The exported ' +
    'model drives the simulator in real time.',
    */
    description: 'An autonomous driving model trained on camera images and steering angles recorded from the Udacity ' +
      'Self-Driving Car Simulator. A preprocessing and augmentation pipeline prepares the dataset before ' +
      'training an NVIDIA-style end-to-end CNN, using ELU activation for smoother convergence. The exported ' +
      'model drives the simulator in real time.',
    stack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'Pandas', 'Jupyter', 'Conda'],
    highlights: [
      'Preprocessing pipeline: isolating the road area, YUV color conversion, Gaussian blur, and resize to the NVIDIA 200x66x3 input shape',
      'Random data augmentation (flip, pan, zoom, rotate, brightness, contrast) to improve generalization from a limited driving dataset',
      'NVIDIA-style end-to-end CNN with five convolutional layers (5x5 and 3x3 kernels) feeding into fully-connected layers',
      'Chose ELU over ReLU for smoother gradients near zero, avoiding the dying neuron problem and achieving a lower validation MSE',
      //'Modular architecture with a single entrypoint (application.py) supporting train, test, and simulate modes for independent parallel development',
      //'Diagnosed and resolved Conda/global Python path conflicts, an OpenCV install failure, and a NumPy/TensorFlow version mismatch by pinning exact dependency versions',
      //'Wrote a custom script to patch a newer Keras model config (batch_shape, DTypePolicy) back to an older format so it would run on a pinned TensorFlow 2.3.0 environment',
      'Modular single-entrypoint architecture (train, test, simulate modes) with Jupyter notebooks for dataset distribution analysis, training/validation loss and MAE visualization',
    ],
    links: {
      repo: 'https://github.com/vladdyz/Self-Driving-Car-Simulator',
      video: 'https://youtu.be/tD7LDySRsUQ',
    },
    status: 'source-only',
    statusLabel: 'Source + demo video',
  },
   {
    id: 'come-on-inn',
    title: 'Come On Inn',
    category: 'repository',
    images: [ `${BASE}images/ComeOnInn1.png`, `${BASE}images/ComeOnInn3.png`, 
         `${BASE}images/ComeOnInn4.png`,  `${BASE}images/ComeOnInn5.png`,  `${BASE}images/ComeOnInn6.png`,
         `${BASE}images/ComeOnInn7.png`,  `${BASE}images/ComeOnInn8.png`,
    ],
    tagline: '3-tier JavaFX hotel management system with Hibernate ORM, Guice dependency injection, and role-based admin controls.',
    description:
      'A full desktop hotel management system built entirely in Java, covering the guest lifecycle ' +
      'from a self-serve booking kiosk through checkout, loyalty points, and post-stay feedback. ' +
      'Follows a 3-tier MVC architecture — JavaFX/FXML views, a service/controller layer enforcing ' +
      'business rules, and a Hibernate-mapped H2 database — with Guice handling dependency injection ' +
      'throughout. Role-based admin accounts manage reservations, inventory, and configurable pricing ' +
      'policies, with full audit logging and export to PDF, CSV, and TXT.',
    stack: ['Java', 'JavaFX', 'Hibernate', 'Guice', 'H2', 'Maven', 'BCrypt', 'SLF4J'],
    highlights: [
      '3-tier MVC architecture (JavaFX views, service/controller layer, Hibernate-mapped H2 database) with Guice dependency injection binding repositories and services as singletons',
      'Full ORM data model (JPA/Hibernate) across a dozen entities with explicit relationship mapping, cascading deletes, and column-level validation constraints',
      'Role-based admin authentication (Admin/Manager) with BCrypt password hashing and an audit log recording every administrative action',
      'Configurable business rules engine — loyalty point earning/redemption rates, role-capped discount policies, and dynamic pricing — adjustable by admins at runtime',
      'Observer-pattern waitlist system that automatically notifies admins and converts entries to reservations when a room becomes available',
      'Rotating file-based logging (SLF4J) plus data export to PDF, CSV, and TXT for audit logs, feedback, and occupancy reports',
    ],
    links: {
      repo: 'https://github.com/vladdyz/ComeOnInn',
      video: 'https://www.youtube.com/watch?v=eSIzd_ONONo', 
    },
    status: 'source-only',
    statusLabel: 'Source + demo video',
  },
  {
    id: 'kens-lab',
    title: 'Kens Labyrinth Modded OpenGL', // TODO: real title
    category: 'game',
    tagline: 'Source code modification of the MS-DOS game ',
    description: 'Currently in Development',
    stack: ['C', 'OpenGL'],
    links: {
      // download: '', // TODO: zip/installer via GitHub Releases
    },
    status: 'download-to-play',
  },
  {
    id: 'merchstore',
    title: 'Merch Apparel Store',
    category: 'webapp',
    images: [ `${BASE}images/Merch1.png`, 
         `${BASE}images/Merch2.png`, 
         `${BASE}images/Merch3.png`, 
         `${BASE}images/Merch4.png`,
        `${BASE}images/Merch5.png`
     ],
    //period: 'May - Aug 2024',
    tagline: 'React e-commerce app with auth integration and cypress/jest.',
    description:
      'A full-stack e-commerce web app built using the MERN stack with integrated QA architecture ' +
      'using Jest and Cypress, and UI designed with Tailwind CSS and DaisyUI. ' +
      'Supports authenticated checkout with JSON Web Tokens and BCrypt encryption / hashing.',
    stack: ['Node.js', 'MongoDB', 'Mongoose', 'React', 'Next.js', 'Jest', 'Cypress', 'Tailwind', 'DaisyUI', 'JWT', 'Jotai'],
    highlights: [
      'Custom-built JWT authentication, bcrypt-hashed passwords, signed 1-hour JWTs, route protection via a withAuth HOC backed by global Jotai state',
      //'Route protection via a withAuth higher-order component backed by global Jotai state',
      'Auth state stays in sync across open browser tabs by listening for the storage event on login/logout',
      //'Client-side shopping cart (Jotai atoms) built on a live product catalog pulled from a public REST API',
      //'Product search by ID via query string, plus a modal detail view showing rating, price, description, and category',
      'Client-side shopping cart (Jotai atoms) with search-by-ID and a modal product detail view, built on a public REST product catalog',
      'Cypress E2E suite covering auth-gated routing, the login/logout flow, and the full add-to-cart journey with mocked API calls',
      'Jest and React Testing Library component tests with mocked fetch responses (jest-fetch-mock) verifying key UI renders correctly',
      'Styled with Tailwind CSS and DaisyUI components',
    ],
    links: {
      demo: 'https://seneca-store-akwz1zorn-vladislav-zs-projects.vercel.app/', 
      repo: 'https://github.com/vladdyz/MerchStore', 
    },
    status: 'live',
  },
  {
    id: 'assembly-line',
    title: 'Assembly Line', 
    category: 'repository',
    images: [ `${BASE}images/Assembly1.png`],
    tagline: 'Simulates an assembly line system for processing and fulfilling customer orders',
    description: 'A program created to simulate an assembly line system for processing and ' +
    'fulfilling customer orders through various stations. The assembly line consists of a set ' +
    'of workstations each of which holds a set of stock items, which are specific to the station. ' +
    'A line manager moves orders along the line filling them at each station as requested. ' +
    'Each station processes a queue of orders by filling the next order in the queue if in ' +
    'stock until all orders have been processed. Orders are listed as either completed or ' +
    'incomplete due to a lack of inventory at one or more stations. Orders extracted from CSV' +
    'data. Incorporates various object-oriented programming concepts: inheritance, polymorphism, ' +
    'encapsulation, STL containers and algorithms, dynamic memory handling and resource management, ' +
    'lambdas, error handling, copy and move semantics, and namespaces.' ,
    stack: ['C++'],
    highlights: [
        'Multi-station assembly line simulation — a line manager routes a queue of orders through workstations, each stocked with station-specific inventory',
        'Orders are parsed from CSV input and resolved as completed or incomplete based on per-station stock availability',
        'Applies core C++ OOP concepts: inheritance, polymorphism, encapsulation, and namespaces',
        'Uses STL containers and algorithms alongside manual dynamic memory management, copy/move semantics, and lambdas',

    ],
    links: {
      repo: 'https://github.com/vladdyz/assemblyLine',
    },
    status: 'source-only',
    statusLabel: 'Source',
  },
    {
    id: 'emergency-aid',
    title: 'Emergency Aid Management', 
    category: 'repository',
    tagline: 'Management system that reads and writes to files, registering inventory and shipping order data',
    description: 'Reads and writes pharmaceutical product records from/to multiple data files containing ' +
    'pertinent information regarding their usage, handling instructions, price, expiry dates, and availability. ' +
    'Discriminates between perishable and non-perishable items based on SKU, storing the data differently ' +
    'depending on the type. Creates a copy of the file it reads (by default named "data.dat") into a placeholder ' +
    'to avoid directly modifying the original data. See placeholder.dat for an example.',
    stack: ['C++'],
    highlights: [
        'Reads and writes pharmaceutical inventory records across multiple data files (usage, handling instructions, price, expiry, availability)',
        'Discriminates perishable from non-perishable items by SKU, storing each differently based on type',
        'Copies the source data file to a placeholder before any modification, preserving the original dataset',
    ],
    links: {
      repo: 'https://github.com/vladdyz/emergencyAid',
    },
    status: 'source-only',
    statusLabel: 'Source',
  },
   
];
