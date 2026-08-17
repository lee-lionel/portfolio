/* ---------------------------------------------------------------------------
   Single source of truth for the whole site.
   Edit this file and every section updates — no component changes needed.

   Populated from docs/Lionel_Resume_2025.pdf.
   Remaining TODOs are things the résumé predates or doesn't cover.
--------------------------------------------------------------------------- */

export const profile = {
  /* Résumé header reads "LEE LIONEL". Flip to 'Lionel Lee' if you'd rather
     lead with the given name — it's this one string. */
  name: 'Lee Lionel',
  role: 'Software Engineer',
  /* The hero thesis. One sentence, first person, concrete. */
  thesis:
    'I came to software from immigration casework and tutoring — work where getting the details right mattered to someone who could not afford them wrong. I build full-stack web applications with the same instinct.',
  location: 'Singapore',
  /* Set to null to hide the availability chip. */
  availability: 'Recently started a software engineering role',
  email: 'lee_lionel_96@hotmail.com',
  /* Deliberately not rendered — a phone number on a public page is a spam
     magnet. It's on the résumé PDF for anyone who needs it.
     Résumé line: (+65) 9630 4685 */
  phone: null as string | null,
  /* Copy the PDF into /public/ and point here to show the download button,
     e.g. '/Lionel_Resume_2025.pdf' */
  resumeUrl: null as string | null,
} as const

export const socials = [
  { label: 'GitHub', href: 'https://github.com/lee-lionel', handle: 'lee-lionel' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/lee-lionel',
    handle: 'in/lee-lionel',
  },
  { label: 'Email', href: `mailto:${profile.email}`, handle: profile.email },
] as const

/* ---------------------------------------------------------------------------
   The at-a-glance panel in the hero — a spec block for a person. Keep it to
   five rows; it's for the reader who gives the page ten seconds.
--------------------------------------------------------------------------- */

export const facts: { label: string; value: string; live?: boolean }[] = [
  { label: 'Currently', value: 'Software Engineer', live: true },
  { label: 'Based', value: 'Singapore' },
  { label: 'Works in', value: 'TypeScript, React, Node, Prisma' },
  { label: 'Trained', value: 'General Assembly SEI, 2024' },
  { label: 'Before this', value: 'Immigration and tax administration' },
]

/* --------------------------------------------------------------------------- */

/* Adapted from the résumé summary into first person — tune the voice to taste. */
export const about: string[] = [
  'I spent four years in immigration and tax administration, then a year and a half writing PR and citizenship applications for more than a hundred clients, then a year tutoring primary mathematics. Different jobs, same underlying work: understand a person’s situation, find what actually matters in it, and put it in a form that holds up under scrutiny.',
  'I went through General Assembly’s Software Engineering Immersive in 2024 and have been building full-stack applications since — React on the front, Node and Express over MongoDB behind it. I like the parts of the job that reward patience: modelling data properly the first time, handling the error case, writing the thing so the next person can read it.',
]

/* --------------------------------------------------------------------------- */

export type Role = {
  company: string
  title: string
  start: string
  /** null renders as "Present" and marks the row as current. */
  end: string | null
  location?: string
  summary?: string
  points: string[]
  stack?: string[]
}

export const experience: Role[] = [
  {
    /* TODO — not on the 2025 résumé. Fill in company, title, start month,
       and what you actually work on. */
    company: 'TODO — current employer',
    title: 'Software Engineer',
    start: '2026',
    end: null,
    location: 'Singapore',
    points: [
      'TODO — what you own day to day.',
      'TODO — something you shipped, with the outcome attached.',
      'TODO — the stack and the team you work in.',
    ],
    stack: ['TODO'],
  },
  {
    company: 'Mobot',
    title: 'Customer Service Officer',
    /* TODO — résumé says "Present"; set the real end month now you've moved on. */
    start: 'Jul 2025',
    end: '2026',
    location: 'Singapore',
    points: [
      'Managed after-sales service and resolved customer issues end to end.',
      'Handled disputes through clear communication while holding customer satisfaction.',
      'Coordinated with technical teams on troubleshooting and release updates.',
      'Maintained case documentation and improved workflow processes.',
    ],
  },
  {
    company: 'Self-employed',
    title: 'Full-Time Home Tutor',
    start: 'Feb 2024',
    end: 'Jun 2025',
    location: 'Singapore',
    points: [
      'Taught primary mathematics and built self-directed learning habits.',
      'Worked with parents to customise learning plans per student.',
      'Introduced basic coding concepts to spark an early interest in tech.',
    ],
  },
  {
    company: 'Singapore Professional Immigration Consultancy',
    title: 'Immigration Writer',
    start: 'Aug 2023',
    end: 'Mar 2024',
    location: 'Singapore',
    points: [
      'Prepared personalised PR and citizenship documents for 100+ clients.',
      'Drafted cover letters argued against the published immigration criteria.',
    ],
  },
  {
    company: 'Deloitte Tax Solutions',
    title: 'Immigration Administrator',
    start: 'Oct 2021',
    end: 'Jul 2023',
    location: 'Singapore',
    points: [
      'Generated reports and drafted work passes.',
      'Maintained documentation for audit and compliance purposes.',
    ],
  },
]

/* --------------------------------------------------------------------------- */

export type Project = {
  name: string
  year: string
  blurb: string
  stack: string[]
  live?: string
  repo?: string
  /** Screenshot in /public/shots. Omit and the card falls back to type. */
  image?: string
  /** Alt text for the screenshot — describe what the interface shows. */
  imageAlt?: string
  /** What the thing actually does. Shown when there's no screenshot yet. */
  features?: string[]
  /** Extra screens for the lead project's strip. */
  gallery?: { src: string; alt: string }[]
  /** Real states of the app, cycled in the card. First one is the poster. */
  shots?: { src: string; alt: string }[]
  /** Renders larger, ahead of the rail. */
  lead?: boolean
  /** Honest caveat rendered on the card, e.g. why there's no link. */
  note?: string
  /** Shown in the browser frame's address pill. */
  domain?: string
}

export const projects: Project[] = [
  {
    /* Found on GitHub, not on the résumé. By far the strongest work here —
       but the repo is private and there's no deployment, so nobody can see
       it. Making it public or deploying it is the highest-value thing you
       can do for this page. */
    name: "Sanji's Kitchen",
    year: '2026',
    blurb:
      'A restaurant that runs on one login. Diners read the menu in their own language, are seated automatically, order, and settle a bill that only opens once every dish has arrived. The kitchen works a queue; managers run the floor, the staff records, the rota and the reports. Two servers, one SQLite file, and 386 automated tests across API, UI and end-to-end.',
    stack: [
      'TypeScript',
      'React 18',
      'Express 4',
      'Prisma',
      'SQLite',
      'Playwright',
      'Docker',
    ],
    features: [
      'Menu and ordering in English and 中文',
      'Automatic table seating and sittings',
      'Bills that lock until every dish arrives',
      'Kitchen queue, staff records and rota',
      'Manager reports across the floor',
    ],
    lead: true,
    domain: 'sanjis.kitchen',
    image: '/shots/sanjis-menu.jpg',
    imageAlt:
      "Sanji's Kitchen menu manager: a dark service screen with breakfast, lunch and dinner periods, dinner marked now serving, and dishes listed with photographs and prices.",
    gallery: [
      {
        src: '/shots/sanjis-tables.jpg',
        alt: 'The floor view: twelve table cards showing seats and status, with a legend for just sat, with the kitchen, and served.',
      },
      {
        src: '/shots/sanjis-orders.jpg',
        alt: "The kitchen's order queue.",
      },
      {
        src: '/shots/sanjis-reports.jpg',
        alt: 'Manager reports across the floor.',
      },
    ],
    note: 'Private repo, not yet deployed.',
  },
  {
    name: 'Tutors Connect',
    year: '2024',
    blurb:
      'A full-stack matching platform that connects parents directly to tutors, cutting the agency out of the loop. Built from planning through deployment: React on Vercel against an Express and MongoDB API on Render, with JWT auth and bcrypt-hashed credentials.',
    stack: ['React', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Vercel', 'Render'],
    live: 'https://capstone-project-fe-two.vercel.app/',
    repo: 'https://github.com/lee-lionel/tutor-connect-fe',
    domain: 'capstone-project-fe-two.vercel.app',
    image: '/shots/tutors-connect-1.jpg',
    imageAlt:
      'The Tutors Connect sign-in screen: a centred card with email and password fields above a Login button.',
    shots: [
      {
        src: '/shots/tutors-connect-1.jpg',
        alt: 'Sign in: a centred card with email and password fields above a Login button.',
      },
      {
        src: '/shots/tutors-connect-2.jpg',
        alt: 'Sign up: name, email, password and phone, with a role selector for tutor or parent.',
      },
    ],
  },
  {
    /* TODO — there is no Rent Haven repo on GitHub at all, public or private,
       and no deployment. It's on the résumé with nothing behind it. Push the
       code and add `live`, `repo` and an `image`, or drop it from both. */
    name: 'Rent Haven',
    year: '2024',
    blurb:
      'A rental listing platform for uploading and browsing apartments. Responsive React front end over an Express and MongoDB backend, with Cloudinary and Multer handling image upload and storage.',
    stack: ['React', 'Axios', 'Express', 'MongoDB', 'Cloudinary', 'Multer'],
    note: 'No public repo yet.',
    domain: 'not deployed',
  },
  {
    name: 'NérdyDex',
    year: '2024',
    blurb:
      'A team builder in the spirit of Pokémon Showdown. React front end over an Airtable backend, with form state mirroring the database schema so a team round-trips cleanly.',
    stack: ['React', 'Airtable', 'Vercel'],
    live: 'https://nerdy-dex.vercel.app/',
    repo: 'https://github.com/lee-lionel/NerdyDex',
    domain: 'nerdy-dex.vercel.app',
    image: '/shots/nerdydex-3.jpg',
    imageAlt:
      'The NérdyDex team builder listing a saved VGC team, each Pokémon paired with its held item.',
    shots: [
      {
        src: '/shots/nerdydex-3.jpg',
        alt: 'The team builder listing a saved VGC team, each Pokémon paired with its held item.',
      },
      {
        src: '/shots/nerdydex-2.jpg',
        alt: 'The Pokédex after a search, showing the returned Pokémon.',
      },
      {
        src: '/shots/nerdydex-1.jpg',
        alt: 'The home screen featuring a Pokémon of the moment with its flavour text.',
      },
    ],
  },
  {
    name: 'BarCarRat',
    year: '2024',
    blurb:
      'Browser Baccarat against the house — wagering, draw logic, and win/loss resolution written in vanilla JavaScript with no framework underneath. The first thing I built.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    live: 'https://lee-lionel.github.io/BarCarRat/',
    repo: 'https://github.com/lee-lionel/BarCarRat',
    domain: 'lee-lionel.github.io/BarCarRat',
    image: '/shots/barcarrat-2.jpg',
    imageAlt:
      'The BarCarRat betting screen on a green felt table: four coloured chips valued 5 to 20 above a $200 balance.',
    shots: [
      {
        src: '/shots/barcarrat-2.jpg',
        alt: 'Place your bets: four coloured chips valued 5 to 20 above a $200 balance.',
      },
      {
        src: '/shots/barcarrat-3.jpg',
        alt: 'The hand in play after a wager is staked.',
      },
      {
        src: '/shots/barcarrat-1.jpg',
        alt: 'The entry screen on green felt, asking the player to choose a name.',
      },
    ],
  },
]

/* --------------------------------------------------------------------------- */

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['JavaScript', 'Python', 'HTML', 'CSS'] },
  { group: 'Front end', items: ['React.js', 'Fetch API', 'Axios'] },
  { group: 'Back end', items: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'] },
  { group: 'Tooling', items: ['Git', 'Vercel', 'Render', 'Cloudinary'] },
]

/* --------------------------------------------------------------------------- */

export type Education = {
  school: string
  credential: string
  start: string
  end: string
  note?: string
}

export const education: Education[] = [
  {
    school: 'General Assembly',
    credential: 'Software Engineering Immersive',
    start: 'Dec 2023',
    end: 'Jun 2024',
  },
  {
    school: 'University of London',
    credential: 'Certificate of Higher Education in Computing',
    start: '2017',
    end: '2021',
  },
  {
    school: 'Nanyang Junior College',
    credential: 'GCE A-Levels',
    start: '2013',
    end: '2014',
  },
]

/* --------------------------------------------------------------------------- */

/** Nav + left-rail index. Order here is the order on the page. */
export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const
