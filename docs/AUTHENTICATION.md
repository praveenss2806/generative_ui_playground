# Authentication System Documentation

This document explains how Google OAuth authentication works in the Generative UI Playground.

## Overview

The app uses **NextAuth.js v5** (Auth.js) with Google OAuth provider and **Prisma** with PostgreSQL (Supabase) for storing user data and tracking login events.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                 │
│   User Browser  │────▶│   Next.js App    │────▶│    Supabase     │
│                 │     │   (NextAuth)     │     │   (PostgreSQL)  │
│                 │◀────│                  │◀────│                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌──────────────────┐
│  Google OAuth   │     │   Middleware     │
│   (Identity)    │     │ (Route Protection)│
└─────────────────┘     └──────────────────┘
```

## Authentication Flow

### 1. User Visits Protected Route

When a user visits any page (e.g., `/`):

1. **Middleware** (`middleware.ts`) intercepts the request
2. Checks for session cookie (`authjs.session-token`)
3. If no session → redirects to `/login`
4. If session exists → allows access

### 2. User Clicks "Sign in with Google"

```
User clicks button
       │
       ▼
SignInButton.tsx calls signIn("google")
       │
       ▼
NextAuth redirects to Google OAuth
       │
       ▼
User authenticates with Google
       │
       ▼
Google redirects back to /api/auth/callback/google
       │
       ▼
NextAuth processes the callback:
  - Creates/updates User in database
  - Creates Account record (links Google to User)
  - Creates Session
  - Logs LoginEvent
       │
       ▼
User redirected to home page (/)
```

### 3. Session Management

- Sessions are stored in the database (`Session` table)
- A session cookie is set in the browser
- The cookie references the database session
- Sessions can be invalidated server-side

## File Structure

```
├── lib/
│   ├── auth.ts          # NextAuth configuration
│   └── prisma.ts        # Prisma client singleton
│
├── app/
│   ├── api/auth/
│   │   └── [...nextauth]/
│   │       └── route.ts # Auth API endpoints
│   ├── login/
│   │   └── page.tsx     # Login page
│   └── layout.tsx       # Root layout with SessionProvider
│
├── components/auth/
│   ├── SessionProvider.tsx  # Client-side session context
│   ├── SignInButton.tsx     # Google sign-in button
│   └── UserMenu.tsx         # User avatar & dropdown
│
├── middleware.ts        # Route protection
│
└── prisma/
    └── schema.prisma    # Database schema
```

## Key Files Explained

### `lib/auth.ts`
The main NextAuth configuration:

```typescript
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),  // Store users in database
  providers: [
    Google({...})                   // Google OAuth provider
  ],
  pages: {
    signIn: "/login",              // Custom login page
  },
  callbacks: {
    session({ session, user }) {
      // Add user ID to session
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    signIn({ user }) {
      // Track login event
      prisma.loginEvent.create({...});
    },
  },
});
```

### `middleware.ts`
Protects routes by checking for session cookie:

```typescript
export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("authjs.session-token")?.value;
  
  if (!sessionToken && !isPublicRoute) {
    return NextResponse.redirect("/login");
  }
}
```

### `components/auth/SessionProvider.tsx`
Wraps the app to provide session context to client components:

```typescript
export function SessionProvider({ children }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
```

### `components/auth/UserMenu.tsx`
Displays the logged-in user's avatar and provides sign-out:

```typescript
export function UserMenu() {
  const { data: session } = useSession();
  // Shows avatar, name, email, and sign-out button
}
```

## Database Schema

### User
Stores authenticated users:
```prisma
model User {
  id            String    @id
  name          String?
  email         String?   @unique
  image         String?
  accounts      Account[]
  sessions      Session[]
  loginEvents   LoginEvent[]
}
```

### Account
Links OAuth providers to users:
```prisma
model Account {
  id                String  @id
  userId            String
  provider          String  // "google"
  providerAccountId String  // Google's user ID
  access_token      String?
  // ... other OAuth tokens
}
```

### Session
Active user sessions:
```prisma
model Session {
  id           String   @id
  sessionToken String   @unique
  userId       String
  expires      DateTime
}
```

### LoginEvent
Tracks when users log in:
```prisma
model LoginEvent {
  id        String   @id
  userId    String
  timestamp DateTime @default(now())
}
```

## Environment Variables

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://..."

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxx"

# NextAuth secret (random string)
AUTH_SECRET="random-32-char-string"
```

## Querying Login Data

### View All Users
```sql
SELECT id, name, email, "createdAt" 
FROM "User" 
ORDER BY "createdAt" DESC;
```

### View Login History
```sql
SELECT 
  u.name,
  u.email,
  le.timestamp
FROM "LoginEvent" le
JOIN "User" u ON le."userId" = u.id
ORDER BY le.timestamp DESC;
```

### Count Logins Per User
```sql
SELECT 
  u.name,
  u.email,
  COUNT(le.id) as login_count,
  MAX(le.timestamp) as last_login
FROM "User" u
LEFT JOIN "LoginEvent" le ON le."userId" = u.id
GROUP BY u.id, u.name, u.email
ORDER BY login_count DESC;
```

## Security Considerations

1. **Session Cookies**: HTTP-only, secure cookies prevent XSS attacks
2. **CSRF Protection**: NextAuth includes built-in CSRF protection
3. **Database Sessions**: Sessions can be revoked server-side
4. **OAuth**: No passwords stored; authentication delegated to Google

## Common Tasks

### Sign Out a User Programmatically
```typescript
import { signOut } from "next-auth/react";
signOut({ callbackUrl: "/login" });
```

### Get Current User in Server Component
```typescript
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
}
```

### Get Current User in Client Component
```typescript
import { useSession } from "next-auth/react";

export function Component() {
  const { data: session } = useSession();
  const user = session?.user;
}
```

### Protect an API Route
```typescript
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  // ... handle authenticated request
}
```

## Troubleshooting

### "NEXT_REDIRECT" Error
This is normal when using `redirect()` in Server Components.

### Session Not Persisting
- Check that `AUTH_SECRET` is set
- Verify cookies are enabled in browser
- Check database connection

### Google OAuth Not Working
- Verify redirect URI in Google Console matches:
  `http://localhost:3000/api/auth/callback/google`
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

### Database Connection Issues
- Use Session mode connection string for migrations
- Use Transaction mode (port 6543) for runtime (optional)
- Ensure password special characters are URL-encoded

