# Database Documentation - Tom LMS

This document provides a comprehensive overview of the database structure, schema relationships, and data flow for the Tom LMS (Learning Management System) project using Sanity CMS.

## 🗄️ Database Overview

The Tom LMS uses **Sanity** as a headless CMS for content management. Sanity provides a flexible, schema-based approach to content modeling with real-time collaboration and powerful querying capabilities through GROQ (Graph-Relational Object Queries).

### Key Features

- **Schema-based**: Strongly typed content models
- **Real-time**: Live updates and collaboration
- **Flexible**: Easy to modify and extend schemas
- **Developer-friendly**: TypeScript integration with auto-generated types
- **Scalable**: Cloud-hosted with global CDN

## 📊 Schema Architecture

The database consists of 9 main content types that form the core of the learning management system:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Student   │    │ Instructor  │    │  Category   │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐◄───────────────────┐
│ Enrollment  │    │   Course    │                    │
└─────────────┘    └─────────────┘                    │
       │                   │                          │
       │                   │                          │
       ▼                   ▼                          │
┌─────────────┐    ┌─────────────┐                    │
│LessonComple-│    │   Module    │                    │
│    tion     │    └─────────────┘                    │
└─────────────┘            │                          │
       │                   │                          │
       │                   ▼                          │
       │            ┌─────────────┐                   │
       └───────────►│   Lesson    │                   │
                    └─────────────┘                   │
                           │                          │
                           ▼                          │
                    ┌─────────────┐                   │
                    │BlockContent │◄──────────────────┘
                    └─────────────┘
```

## 🏗️ Schema Definitions

### 1. Student Schema (`studentType.tsx`)

Represents users who enroll in courses.

```typescript
{
  name: "student",
  title: "Student",
  type: "document",
  fields: [
    {
      name: "clerkId",
      title: "Clerk ID",
      type: "string",
      validation: (rule) => rule.required()
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required()
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email()
    }
  ]
}
```

**Key Features:**

- Links to Clerk authentication via `clerkId`
- Stores basic user information
- Email validation for communication

### 2. Instructor Schema (`instructorType.ts`)

Represents course creators and teachers.

```typescript
{
  name: "instructor",
  title: "Instructor",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required()
    },
    {
      name: "bio",
      title: "Bio",
      type: "text"
    },
    {
      name: "image",
      title: "Profile Image",
      type: "image"
    }
  ]
}
```

**Key Features:**

- Profile information for course creators
- Bio and image for instructor pages
- Referenced by courses

### 3. Category Schema (`categoryType.ts`)

Organizes courses into different subject areas.

```typescript
{
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Category Name",
      type: "string",
      validation: (rule) => rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    }
  ]
}
```

**Key Features:**

- URL-friendly slugs for routing
- Hierarchical course organization
- SEO-friendly descriptions

### 4. Course Schema (`courseType.ts`)

The main content entity representing a complete course.

```typescript
{
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    },
    {
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (rule) => rule.min(0)
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    },
    {
      name: "image",
      title: "Course Image",
      type: "image"
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required()
    },
    {
      name: "modules",
      title: "Modules",
      type: "array",
      of: [{ type: "reference", to: { type: "module" } }]
    },
    {
      name: "instructor",
      title: "Instructor",
      type: "reference",
      to: { type: "instructor" }
    }
  ]
}
```

**Key Features:**

- Pricing information for Stripe integration
- SEO-optimized with slugs and descriptions
- References to category and instructor
- Array of module references for course structure

### 5. Module Schema (`moduleType.ts`)

Represents course sections or chapters.

```typescript
{
  name: "module",
  title: "Module",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    },
    {
      name: "lessons",
      title: "Lessons",
      type: "array",
      of: [{ type: "reference", to: { type: "lesson" } }]
    }
  ]
}
```

**Key Features:**

- Simple structure for course organization
- Contains array of lesson references
- Hierarchical content structure

### 6. Lesson Schema (`lessonType.ts`)

Individual learning units within modules.

```typescript
{
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    },
    {
      name: "content",
      title: "Content",
      type: "blockContent"
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "URL for the lesson video"
    },
    {
      name: "duration",
      title: "Duration (minutes)",
      type: "number",
      validation: (rule) => rule.min(0)
    },
    {
      name: "isFree",
      title: "Is Free",
      type: "boolean",
      description: "Whether this lesson is free to preview"
    }
  ]
}
```

**Key Features:**

- Rich content with block content support
- Video integration with React Player
- Duration tracking for progress calculation
- Free preview functionality

### 7. Enrollment Schema (`enrollmentType.tsx`)

Tracks student course enrollments and purchases.

```typescript
{
  name: "enrollment",
  title: "Enrollment",
  type: "document",
  fields: [
    {
      name: "student",
      title: "Student",
      type: "reference",
      to: { type: "student" },
      validation: (rule) => rule.required()
    },
    {
      name: "course",
      title: "Course",
      type: "reference",
      to: { type: "course" },
      validation: (rule) => rule.required()
    },
    {
      name: "enrolledAt",
      title: "Enrolled At",
      type: "datetime",
      validation: (rule) => rule.required()
    },
    {
      name: "stripePaymentId",
      title: "Stripe Payment ID",
      type: "string",
      description: "Stripe payment intent ID for this enrollment"
    }
  ]
}
```

**Key Features:**

- Links students to purchased courses
- Timestamp for enrollment tracking
- Stripe payment integration
- Prevents duplicate enrollments

### 8. Lesson Completion Schema (`lessonCompletionType.tsx`)

Tracks individual lesson progress for students.

```typescript
{
  name: "lessonCompletion",
  title: "Lesson Completion",
  type: "document",
  fields: [
    {
      name: "student",
      title: "Student",
      type: "reference",
      to: { type: "student" },
      validation: (rule) => rule.required()
    },
    {
      name: "lesson",
      title: "Lesson",
      type: "reference",
      to: { type: "lesson" },
      validation: (rule) => rule.required()
    },
    {
      name: "completedAt",
      title: "Completed At",
      type: "datetime",
      validation: (rule) => rule.required()
    },
    {
      name: "watchTime",
      title: "Watch Time (seconds)",
      type: "number",
      description: "Total time spent watching this lesson"
    }
  ]
}
```

**Key Features:**

- Granular progress tracking
- Watch time analytics
- Completion timestamps
- Foundation for progress calculations

### 9. Block Content Schema (`blockContent.ts`)

Rich text content structure for lessons and descriptions.

```typescript
{
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" }
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" }
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url"
              }
            ]
          }
        ]
      }
    }
  ]
}
```

**Key Features:**

- Rich text editing capabilities
- Multiple heading levels
- Link support
- Extensible for future content types

## 🔄 Data Flow & Relationships

### User Journey Flow

1. **User Registration**

   ```
   Clerk Authentication → Student Document Creation
   ```

2. **Course Discovery**

   ```
   Category Browsing → Course Listing → Course Details
   ```

3. **Course Purchase**

   ```
   Course Selection → Stripe Checkout → Enrollment Creation
   ```

4. **Learning Progress**
   ```
   Lesson Access → Video Watching → Completion Tracking
   ```

### Key Relationships

#### One-to-Many Relationships

- **Category** → **Courses**: One category can have multiple courses
- **Instructor** → **Courses**: One instructor can create multiple courses
- **Course** → **Modules**: One course can have multiple modules
- **Module** → **Lessons**: One module can have multiple lessons
- **Student** → **Enrollments**: One student can have multiple enrollments
- **Student** → **Lesson Completions**: One student can complete multiple lessons

#### Many-to-Many Relationships

- **Students** ↔ **Courses**: Through Enrollment entity
- **Students** ↔ **Lessons**: Through Lesson Completion entity

## 🔍 GROQ Queries

### Common Query Patterns

#### Get All Courses with Category and Instructor

```groq
*[_type == "course"] {
  _id,
  title,
  slug,
  description,
  price,
  image,
  category->{
    name,
    slug
  },
  instructor->{
    name,
    bio,
    image
  }
}
```

#### Get Course with Full Module and Lesson Structure

```groq
*[_type == "course" && slug.current == $slug][0] {
  _id,
  title,
  description,
  price,
  image,
  modules[]->{
    _id,
    title,
    lessons[]->{
      _id,
      title,
      slug,
      duration,
      isFree,
      videoUrl
    }
  }
}
```

#### Get Student Enrollments

```groq
*[_type == "enrollment" && student._ref == $studentId] {
  _id,
  enrolledAt,
  course->{
    _id,
    title,
    slug,
    image,
    modules[]->{
      lessons[]->{ _id }
    }
  }
}
```

#### Get Lesson Completion Progress

```groq
*[_type == "lessonCompletion" && student._ref == $studentId] {
  _id,
  completedAt,
  watchTime,
  lesson->{
    _id,
    title,
    duration
  }
}
```

## 🚀 Performance Considerations

### Indexing Strategy

- **Slug fields**: Automatically indexed for fast lookups
- **Reference fields**: Optimized for relationship queries
- **DateTime fields**: Indexed for chronological sorting

### Query Optimization

- Use projection to limit returned fields
- Leverage Sanity's CDN for cached responses
- Implement pagination for large datasets
- Use reference expansion judiciously

### Caching Strategy

- **Static content**: Cached at CDN level
- **User-specific data**: Cache with appropriate TTL
- **Real-time updates**: Use Sanity's real-time subscriptions

## 🔧 Development Workflow

### Schema Management

1. **Local Development**: Modify schemas in `sanity/schemaTypes/`
2. **Type Generation**: Run `pnpm typegen` to update TypeScript types
3. **Studio Testing**: Test changes in local Sanity Studio
4. **Deployment**: Deploy schema changes to production dataset

### Data Migration

- Use Sanity's migration tools for schema changes
- Implement data transformation scripts when needed
- Test migrations on development dataset first

### Backup Strategy

- Sanity provides automatic backups
- Export critical data regularly
- Version control schema definitions

## 🔐 Security & Access Control

### Authentication Integration

- **Clerk Integration**: Seamless user authentication
- **Student Linking**: Automatic student document creation
- **Session Management**: Secure session handling

### Data Access Patterns

- **Public Data**: Course catalog, free lessons
- **Protected Data**: Enrolled courses, progress tracking
- **Admin Data**: Analytics, user management

### API Security

- Environment variable protection
- Secure API key management
- CORS configuration for production

## 📈 Analytics & Reporting

### Trackable Metrics

- **Course Performance**: Enrollment numbers, completion rates
- **Student Engagement**: Watch time, lesson completion
- **Revenue Analytics**: Course sales, payment tracking
- **Content Analytics**: Popular courses, lesson engagement

### Future Enhancements

- **Advanced Progress Tracking**: Detailed analytics dashboard
- **Recommendation Engine**: AI-powered course suggestions
- **Certification System**: Automated certificate generation
- **Discussion Forums**: Community features integration

---

This database structure provides a solid foundation for a scalable learning management system while maintaining flexibility for future enhancements and integrations.
