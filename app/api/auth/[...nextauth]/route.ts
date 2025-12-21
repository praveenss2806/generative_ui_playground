import { handlers } from "@/lib/auth";

// Force Node.js runtime for auth routes (Prisma requires it)
export const runtime = "nodejs";

export const { GET, POST } = handlers;

