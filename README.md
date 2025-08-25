# Book Explorer - AI-Powered Ebook Discovery Platform

A modern, full-stack web application built with Next.js that helps users discover, search, and interact with ebooks through an intelligent AI chatbot and comprehensive search functionality.

## 🚀 Features

### Core Functionality

- **Ebook Search & Discovery**: Advanced search capabilities with suggestions and filters
- **AI Chatbot**: Intelligent conversation interface for book recommendations and queries
- **User Authentication**: Secure login/registration system with JWT tokens
- **Download Management**: Track and manage ebook downloads
- **Search History**: Personalized search history for users

### Admin Dashboard

- **User Management**: Comprehensive user administration tools
- **Analytics**: Detailed insights into platform usage and popular books
- **Report Generation**: Export data and generate comprehensive reports
- **Book Management**: Monitor book searches and download patterns

### Technical Features

- **Modern UI/UX**: Built with Tailwind CSS and Radix UI components
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Theme**: Theme switching with system preference detection
- **Real-time Updates**: Live data updates and notifications
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Backend & Database

- **Turso (LibSQL)** - Edge database for global performance
- **NextAuth.js** - Authentication framework
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing and security

### AI & External Services

- **Ollama** - Local AI model integration
- **Together AI** - Cloud AI model access
- **Cheerio** - Web scraping capabilities
- **Resend** - Email delivery service

### Development Tools

- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **Turbopack** - Fast development builds

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js 18+** installed
- **Git** for version control
- **Turso CLI** for database management
- **Environment variables** configured (see setup section)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd cfiction
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
TURSO_DATABASE_URL=your_turso_database_url
TURSO_AUTH_TOKEN=your_turso_auth_token

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# AI Services
OLLAMA_BASE_URL=http://localhost:11434
TOGETHER_API_KEY=your_together_ai_key

# Email
RESEND_API_KEY=your_resend_api_key
```

### 4. Initialize Database

```bash
npm run db:init
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🗄️ Database Setup

### Turso Database Configuration

1. Install Turso CLI: `curl -sSfL https://get.tur.so/install.sh | bash`
2. Login: `turso auth login`
3. Create database: `turso db create cfiction`
4. Get connection details: `turso db tokens create cfiction`

### Database Schema

The application uses the following main tables:

- `users` - User accounts and authentication
- `books` - Ebook metadata and information
- `searches` - User search history
- `downloads` - Download tracking

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:init      # Initialize database schema

# Type Checking
npm run ts-check     # TypeScript compilation check

# Email Development
npm run emmail       # Start email development server
```

## 📱 Application Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (admin)/          # Admin routes (protected)
│   ├── (auth)/           # Authentication routes
│   ├── (pages)/          # Main application pages
│   └── api/              # API endpoints
├── components/            # Reusable UI components
│   ├── admin/            # Admin-specific components
│   ├── home/             # Homepage components
│   ├── ui/               # Base UI components
│   └── user/             # User-related components
├── lib/                   # Utility libraries
├── db/                    # Database configuration
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions
```

## 🔐 Authentication & Authorization

### User Roles

- **Regular Users**: Can search books, use AI chatbot, download ebooks
- **Admin Users**: Full access to admin dashboard and user management

### Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Session management with NextAuth.js

## 🤖 AI Features

### AI Chatbot

- Natural language book queries
- Personalized recommendations
- Context-aware conversations
- Integration with Ollama and Together AI

### Ebook Search

- Intelligent search algorithms
- Search suggestions
- Filtering and sorting options
- Search history tracking

## 📊 Admin Dashboard

### Analytics

- User registration trends
- Popular book searches
- Download statistics
- Platform usage metrics

### Management Tools

- User account administration
- Book metadata management
- Report generation
- System monitoring

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Other Platforms

- **Netlify**: Compatible with Next.js static export
- **Railway**: Full-stack deployment with database
- **Docker**: Containerized deployment

## 🔧 Configuration

### Environment Variables

All configuration is handled through environment variables. See the setup section for required variables.

### Database Configuration

- Configure Turso database connection
- Set up authentication tokens
- Initialize database schema

### AI Service Configuration

- Configure Ollama for local AI models
- Set up Together AI for cloud models
- Configure API keys and endpoints

## 🧪 Testing

```bash
# Run type checking
npm run ts-check

# Run linting
npm run lint

# Build verification
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the code examples in the `/examples` folder

## 🔮 Roadmap

- [ ] Enhanced AI recommendations
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Social features and book clubs
- [ ] Advanced search filters
- [ ] Book rating and reviews system

---

**Built with ❤️ using Next.js, React, and modern web technologies**
