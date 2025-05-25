# Tom LMS - Learning Management System

A modern Learning Management System built with Next.js 15.3.2, featuring course management, student enrollment, video lessons, and payment integration. This project follows a tutorial from [JavaScript Mastery](https://www.youtube.com/watch?v=17VzlB35Ixw&list=PLpz3Hti6gf5IUJJ-InBZKKtQD-nteabEF&index=9&t=327s).

## 🚀 Features

- **Course Management**: Create and manage courses with modules and lessons
- **User Authentication**: Secure authentication with Clerk
- **Payment Integration**: Stripe payment processing for course purchases
- **Video Lessons**: Support for video content with React Player
- **Content Management**: Sanity CMS for content management and storage
- **Responsive Design**: Modern UI with Tailwind CSS and Radix UI components
- **Type Safety**: Full TypeScript support with auto-generated types
- **Real-time Preview**: Sanity Studio integration with live preview

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.3.2** - React framework with App Router
- **React 19** - Latest React version
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Beautiful icons
- **React Player** - Video player component
- **Next Themes** - Dark/light mode support

### Backend & CMS

- **Sanity** - Headless CMS for content management
- **Sanity Studio** - Content editing interface
- **GROQ** - Query language for Sanity

### Authentication & Payments

- **Clerk** - User authentication and management
- **Stripe** - Payment processing

### Development Tools

- **ESLint** - Code linting
- **pnpm** - Fast package manager
- **Turbopack** - Fast build tool (dev mode)

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Sanity account
- Clerk account
- Stripe account (for payments)

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd tom-lms
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-05-20

# Alternative Sanity Studio environment variables (used in some configurations)
SANITY_STUDIO_PROJECT_ID=your_sanity_project_id
SANITY_STUDIO_DATASET=production

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe Payment Processing
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 4. Set Up Sanity

1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Add your project ID to the environment variables
3. Generate Sanity types:

```bash
pnpm run typegen
```

### 5. Set Up Clerk

1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Add your Clerk keys to the environment variables
3. Configure authentication settings in Clerk dashboard

### 6. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Add your Stripe keys to the environment variables
3. Configure webhooks if needed

### 7. Run the Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 8. Access Sanity Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity Studio for content management.

## 🏗️ Project Structure

```
tom-lms/
├── app/                                # Next.js App Router
│   ├── (admin)/                        # Admin routes
│   ├── (dashboard)/                    # Dashboard routes
│   ├── (user)/                         # User-facing routes
│   │   ├── courses/                    # Course catalog and details
│   │   ├── my-courses/                 # User's enrolled courses
│   │   └── search/                     # Course search
│   ├── api/                            # API routes
│   ├── actions/                        # Server actions
│   ├── globals.css                     # Global styles
│   └── layout.tsx                      # Root layout
├── actions/                            # Server actions
│   └── createStripeCheckout.ts         # Stripe checkout creation
├── components/                         # Reusable UI components
├── lib/                                # Utility functions and configurations
├── sanity/                             # Sanity CMS configuration
│   ├── schemaTypes/                    # Content schemas
│   │   ├── courseType.ts               # Course schema
│   │   ├── moduleType.ts               # Module schema
│   │   ├── lessonType.ts               # Lesson schema
│   │   ├── studentType.tsx             # Student schema
│   │   ├── instructorType.ts           # Instructor schema
│   │   ├── enrollmentType.tsx          # Enrollment schema
│   │   ├── lessonCompletionType.tsx    # Lesson completion schema
│   │   └── categoryType.ts             # Category schema
│   ├── lib/                            # Sanity utilities
│   ├── structure.ts                    # Studio structure
│   └── env.ts                          # Environment configuration
├── public/                             # Static assets
├── middleware.ts                       # Clerk middleware
├── sanity.config.ts                    # Sanity configuration
├── package.json                        # Dependencies and scripts
└── README.md                           # This file
```

## 📚 Database Schema

For detailed information about the database structure, schema relationships, and data flow, please refer to [DATABASE.md](./DATABASE.md).

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Sanity
pnpm typegen          # Generate TypeScript types from Sanity schemas
pnpm prebuild         # Run before build (generates types)
```

## 🚀 Deployment

### Deploying to Vercel

This project is optimized for deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add all environment variables in Vercel dashboard
3. **Domain Configuration**: Configure your custom domain (if applicable)
4. **Build Settings**: Vercel automatically detects Next.js and uses optimal settings

#### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_BASE_URL` (your production URL)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

#### Build Configuration

The project includes a `prebuild` script that automatically generates Sanity types before building. No additional configuration is needed.

### Other Deployment Options

The project can also be deployed to:

- Netlify
- Railway
- DigitalOcean App Platform
- Any Node.js hosting service

## 🎯 Features Roadmap

### ✅ Completed Features

- User authentication with Clerk
- Course catalog and browsing
- Sanity CMS integration
- Basic payment setup with Stripe
- Responsive design
- Video lesson support

### 🚧 In Progress / TODO

- **Stripe Integration Completion**
  - Complete payment flow implementation
  - Webhook handling for payment events
  - Course access management after purchase
  - **Tutorial Reference**: [Stripe Integration Tutorial](https://www.youtube.com/watch?v=17VzlB35Ixw&t=11738s) (timestamps: 11738s - 14270s)

### 🔮 Future Enhancements

- Course progress tracking
- Quizzes and assessments
- Certificate generation
- Discussion forums
- Mobile app
- Advanced analytics
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the React framework
- [Sanity](https://sanity.io) for the excellent CMS
- [Clerk](https://clerk.com) for authentication
- [Stripe](https://stripe.com) for payment processing
- [Vercel](https://vercel.com) for hosting and deployment

## 📞 Support

If you have any questions or run into issues:

1. Check the [tutorial video](https://www.youtube.com/watch?v=17VzlB35Ixw&list=PLpz3Hti6gf5IUJJ-InBZKKtQD-nteabEF&index=9&t=327s)
2. Review the documentation
3. Check existing issues in the repository
4. Create a new issue with detailed information

---

**Note**: This project is built following the tutorial by Sonny Sangha. The codebase serves as both a learning resource and a foundation for building production-ready LMS applications.
