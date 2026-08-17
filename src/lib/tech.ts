/**
 * What kind of thing each technology is.
 *
 * The chips are coloured by this, the way an editor colours a token by its
 * role — so scanning a card tells you the shape of the stack (is this mostly
 * language, framework, data, or infrastructure?) before you read a word.
 * Colour that encodes something, rather than decorating.
 */
export type TechKind = 'language' | 'framework' | 'data' | 'tooling'

const KINDS: Record<string, TechKind> = {
  // Languages
  TypeScript: 'language',
  JavaScript: 'language',
  Python: 'language',
  HTML: 'language',
  CSS: 'language',

  // Frameworks and libraries
  React: 'framework',
  'React 18': 'framework',
  'React.js': 'framework',
  Express: 'framework',
  'Express 4': 'framework',
  'Express.js': 'framework',
  'Node.js': 'framework',
  'React Router': 'framework',
  'Tailwind CSS': 'framework',

  // Data and persistence
  MongoDB: 'data',
  Mongoose: 'data',
  Prisma: 'data',
  SQLite: 'data',
  Airtable: 'data',
  'REST APIs': 'data',
  REST: 'data',

  // Everything that carries or guards it
  Docker: 'tooling',
  Playwright: 'tooling',
  Vercel: 'tooling',
  Render: 'tooling',
  Git: 'tooling',
  JWT: 'tooling',
  Cloudinary: 'tooling',
  Multer: 'tooling',
  Axios: 'tooling',
  'Fetch API': 'tooling',
  Vite: 'tooling',
  Postman: 'tooling',
}

export function techKind(name: string): TechKind {
  return KINDS[name] ?? 'tooling'
}

/** Class for a chip, e.g. `chip chip-data`. */
export function chipClass(name: string) {
  return `chip chip-${techKind(name)}`
}
