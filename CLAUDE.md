# Ctrl+Fiction Development Guidelines

## Build Commands
- `npm run dev`: Run dev server with Turbopack
- `npm run build`: Build the project
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run ts-check`: Typecheck with TypeScript
- `npm run db:init`: Initialize database

## Code Style Guidelines
- **Types**: Use PascalCase for interfaces and types. Prefix DB entity interfaces with "Db"
- **Imports**: External dependencies first, then internal imports with @/ path alias
- **Components**: Use PascalCase for component names, kebab-case for UI component files
- **Error Handling**: Use try/catch in API routes with appropriate NextResponse status codes
- **Formatting**: 2-space indentation with Next.js core-web-vitals linting
- **React Patterns**: Functional components with props destructuring, "use client" directive for client components
- **File Structure**: Pages in src/app, components in src/components, shared utilities in src/lib
- **Tailwind**: Use cn utility function for class name merging
- **Strict TypeScript**: Required - strict mode is enabled in tsconfig.json