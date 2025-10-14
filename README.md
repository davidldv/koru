# 🌿 Koru - A Space-Based Social Network

<div align="center">

![Koru Logo](https://img.shields.io/badge/Koru-Social_Network-14b8a6?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6c47ff?style=for-the-badge)

**A minimalist social network organized by content spaces, fostering meaningful connections through shared interests.**

[Features](#-features) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**Koru** is a next-generation social media platform that reimagines how people connect and share content online. Unlike traditional social networks, Koru organizes content into distinct **Spaces**, each designed for a specific type of content and interaction style.

### The Koru Philosophy

- **🎯 Focused Spaces**: Separate environments for different content types
- **🌐 Community-Driven**: Optional communities within each space for niche interests
- **🎨 Minimalist Design**: Clean, distraction-free interface
- **🤝 Meaningful Connections**: Quality over quantity in social interactions
- **🔒 Privacy-First**: Your data, your control

---

## 🚀 Features

### Core Features (Current Implementation)

- ✅ **User Authentication**: Secure sign-up/sign-in with Clerk
- ✅ **Photo Space Foundation**: Instagram-style photo sharing interface
- ✅ **Interactive Posts**: Like, comment, share, and bookmark functionality
- ✅ **Responsive Design**: Seamless experience across all devices
- ✅ **Modern UI/UX**: Smooth animations and hover effects

### Planned Features

#### 📸 Photo Space

- [ ] Photo upload with filters and editing
- [ ] Albums and collections
- [ ] Photo stories (24-hour expiring content)
- [ ] Photography-focused communities (Landscape, Portrait, Street, etc.)
- [ ] EXIF data display for camera enthusiasts
- [ ] Collaborative photo challenges

#### 📰 News & Text Space

- [ ] Article publishing with rich text editor
- [ ] Long-form content support
- [ ] Topic-based feeds
- [ ] Bookmarking and reading lists
- [ ] Discussion threads
- [ ] Communities by topics (Technology, Science, Arts, etc.)

#### 📚 Books Space

- [ ] Reading lists and book reviews
- [ ] Virtual book clubs
- [ ] Reading progress tracking
- [ ] Book recommendations engine
- [ ] Author profiles and AMAs
- [ ] Genre-specific communities

#### 🌟 Cross-Space Features

- [ ] Unified profile across all spaces
- [ ] Cross-space search and discovery
- [ ] Personalized content feed
- [ ] Advanced privacy controls
- [ ] Notification system
- [ ] Direct messaging
- [ ] User reputation and badges
- [ ] Analytics dashboard

---

## 🏗️ Architecture

### Space Structure

```
Koru
│
├── 📸 Photo Space
│   ├── 🏞️ Landscape Photography Community
│   ├── 📷 Street Photography Community
│   ├── 🎭 Portrait Photography Community
│   └── 🌅 Wildlife Photography Community
│
├── 📰 News & Text Space
│   ├── 💻 Technology Community
│   ├── 🔬 Science Community
│   ├── 🎨 Arts & Culture Community
│   └── ⚽ Sports Community
│
└── 📚 Books Space
    ├── 📖 Fiction Community
    ├── 📚 Non-Fiction Community
    ├── 🧙 Fantasy & Sci-Fi Community
    └── 📜 Classics Community
```

### Technical Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Frontend Layer                    │
│  Next.js 15 App Router + React 19 + TypeScript     │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                Authentication Layer                  │
│              Clerk (Multi-factor Auth)              │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                   API Layer (Future)                │
│          Next.js API Routes / tRPC / GraphQL        │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                   Database Layer                     │
│        PostgreSQL + Prisma ORM (Configured)         │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                  Storage Layer (Future)             │
│         Cloud Storage for Media (S3/Cloudinary)     │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15.5.4](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.x](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: Custom components with [Lucide React](https://lucide.dev/)
- **Build Tool**: [Turbopack](https://turbo.build/pack)

### Backend & Infrastructure

- **Runtime**: [Bun 1.3.0](https://bun.sh/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Deployment**: Vercel (recommended)

### Development Tools

- **Package Manager**: Bun
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier (configured)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 18.x or higher
- **Bun**: 1.3.0 or higher ([Install Bun](https://bun.sh/))
- **Git**: Latest version
- **PostgreSQL**: 14.x or higher (or use a cloud provider)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/davidldv/koru.git
   cd koru
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your configuration:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key

   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/koru

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Clerk**
   - Visit [dashboard.clerk.com](https://dashboard.clerk.com)
   - Create a new application
   - Copy your API keys to `.env.local`
   - Configure these settings in Clerk Dashboard:
     - Sign-in URL: `/sign-in`
     - Sign-up URL: `/sign-up`
     - After sign-in URL: `/`
     - After sign-up URL: `/`

   See [CLERK_SETUP.md](./CLERK_SETUP.md) for detailed instructions.

5. **Set up the database**

   ```bash
   # Generate Prisma Client
   bunx prisma generate

   # Run migrations
   bunx prisma migrate dev

   # (Optional) Seed the database
   bunx prisma db seed
   ```

6. **Start the development server**

   ```bash
   bun run dev
   ```

7. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
koru/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes (public)
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx
│   │   └── sign-up/
│   │       └── [[...sign-up]]/
│   │           └── page.tsx
│   ├── (root)/                   # Main app routes (protected)
│   │   └── (spaces)/            # Space-specific routes (future)
│   │       ├── photos/
│   │       ├── news/
│   │       └── books/
│   ├── api/                      # API routes (future)
│   ├── layout.tsx                # Root layout with ClerkProvider
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── Header.tsx                # Main navigation header
│   ├── PostCard.tsx              # Post display component
│   └── ui/                       # UI components library (future)
├── lib/                          # Utilities and helpers
│   ├── utils.ts                  # Utility functions
│   └── generated/                # Generated code (Prisma)
├── prisma/                       # Database schema and migrations
│   └── schema.prisma             # Prisma schema definition
├── public/                       # Static assets
│   └── assets/
│       └── images/
├── middleware.ts                 # Route protection middleware
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables (gitignored)
├── bun.lockb                     # Bun lockfile
├── components.json               # Component configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Project dependencies
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── CLERK_SETUP.md               # Clerk setup guide
└── README.md                     # This file
```

---

## 📝 Available Scripts

```bash
# Development
bun run dev              # Start development server with Turbopack
bun run build            # Build for production
bun run start            # Start production server

# Database
bunx prisma studio       # Open Prisma Studio (database GUI)
bunx prisma generate     # Generate Prisma Client
bunx prisma migrate dev  # Run database migrations (dev)
bunx prisma db push      # Push schema changes to DB (dev)
bunx prisma db seed      # Seed database with sample data

# Code Quality
bun run lint             # Run ESLint
bun run format           # Format code with Prettier (if configured)

# Testing (future)
bun run test             # Run tests
bun run test:watch       # Run tests in watch mode
bun run test:coverage    # Generate test coverage report
```

---

## 🎨 Design System

### Color Palette

- **Primary**: Teal (#14b8a6)
- **Secondary**: Cyan (#06b6d4)
- **Background**: Gradient from teal-100 to cyan-100
- **Text**: Gray-900 for primary, Gray-600 for secondary
- **Accent**: Teal-500 for interactive elements

### Typography

- **Headings**: Bold, large sizes with tight tracking
- **Body**: Clean, readable font with proper line height
- **Captions**: Smaller, gray text for metadata

### Components

All components follow a minimalist design philosophy:

- Clean lines and generous whitespace
- Subtle shadows and hover effects
- Smooth transitions and animations
- Mobile-first responsive design

---

## 🔐 Security & Privacy

### Authentication

- Multi-factor authentication via Clerk
- Secure session management
- OAuth support (Google, GitHub, etc.)

### Data Protection

- End-to-end encryption for sensitive data
- Regular security audits
- GDPR compliance ready
- Data export and deletion capabilities

### Content Moderation

- Community guidelines enforcement
- Reporting system for inappropriate content
- AI-powered content filtering (future)
- User blocking and privacy controls

---

## 📚 Documentation

- **[Clerk Setup Guide](./CLERK_SETUP.md)**: Detailed authentication setup
- **[API Documentation](./docs/API.md)**: API endpoints and usage (future)
- **[Component Library](./docs/COMPONENTS.md)**: Component documentation (future)
- **[Database Schema](./docs/SCHEMA.md)**: Database structure and relationships (future)
- **[Contributing Guide](./CONTRIBUTING.md)**: How to contribute (future)

---

## 🗺️ Roadmap

### Phase 1: Foundation (Current)

- [x] Project setup and architecture
- [x] Authentication system with Clerk
- [x] Basic Photo Space UI
- [x] Responsive design implementation
- [ ] Database schema design
- [ ] API foundation

### Phase 2: Photo Space (Q1 2026)

- [ ] Photo upload functionality
- [ ] Image processing and optimization
- [ ] Photo feed with infinite scroll
- [ ] Like, comment, and share features
- [ ] User profiles
- [ ] Photography communities

### Phase 3: News & Text Space (Q2 2026)

- [ ] Rich text editor
- [ ] Article publishing system
- [ ] Topic-based organization
- [ ] Reading list functionality
- [ ] News communities

### Phase 4: Books Space (Q3 2026)

- [ ] Book database integration
- [ ] Review and rating system
- [ ] Reading progress tracking
- [ ] Book club features
- [ ] Book communities

### Phase 5: Advanced Features (Q4 2026)

- [ ] Direct messaging
- [ ] Notification system
- [ ] Advanced search
- [ ] Analytics dashboard
- [ ] Mobile applications

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

### Code of Conduct

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing.

---

## 🐛 Bug Reports & Feature Requests

- **Bug Reports**: [Open an issue](https://github.com/davidldv/koru/issues/new?template=bug_report.md)
- **Feature Requests**: [Open an issue](https://github.com/davidldv/koru/issues/new?template=feature_request.md)
- **Security Issues**: Please email security@koru.app (do not open public issues)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 👥 Team

### Creator & Lead Developer

**David** - [@davidldv](https://github.com/davidldv)

### Contributors

See the list of [contributors](https://github.com/davidldv/koru/contributors) who participated in this project.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Clerk](https://clerk.com/) for authentication infrastructure
- [Vercel](https://vercel.com/) for hosting and deployment
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- The open-source community for inspiration and support

---

## 📞 Support

- **Documentation**: [docs.koru.app](https://docs.koru.app) (future)
- **Email**: support@koru.app
- **Discord**: [Join our community](https://discord.gg/koru) (future)
- **Twitter**: [@KoruApp](https://twitter.com/KoruApp) (future)

---

## 🌟 Star History

If you find Koru useful, please consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=davidldv/koru&type=Date)](https://star-history.com/#davidldv/koru&Date)

---

<div align="center">

**Built with ❤️ by developers, for creators**

[Website](https://koru.app) • [Documentation](https://docs.koru.app) • [Blog](https://blog.koru.app)

© 2025 Koru. All rights reserved.

</div>
