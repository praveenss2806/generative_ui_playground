# Gen UI Playground

An interactive Next.js playground that turns natural language prompts into live user interfaces using Gemini 2.5 Flash. Describe what you need, see the UI assemble in real time, and keep iterating through chat and interactions.

## What It Does

- Chat-driven UI generation: prompts become component trees rendered on the fly.
- Interactive updates: user actions are sent back to Gemini to evolve the UI.
- Rich component set: forms, tables, charts, lists, grids, stats, alerts, tabs, images, and more.
- Polished experience: animated dark theme, responsive layout, and inline chat history.

## How It Works

1. You describe a UI in the chat.
2. The API (`app/api/chat/route.ts`) calls Gemini 2.5 Flash with a schema-guided prompt (`lib/gemini-prompt.ts`, `lib/ui-schema.ts`).
3. Gemini returns a JSON description of components plus optional follow-up messages.
4. `useGenerativeUI` (hooks/useGenerativeUI.ts) manages chat state, calls the API, and forwards user interactions back to Gemini.
5. `UIRenderer` (components/generative-ui/UIRenderer.tsx) maps the JSON schema to React components from the registry and renders them inside the app shell.

## Architecture at a Glance

```
Chat Input → Gemini (via API route) → UI JSON → UIRenderer → React components
    ↑                                                  ↓
    └─────────────── User interactions fed back to Gemini ────────────────┘
```

## Key Files

- `app/layout.tsx`: root layout, metadata, fonts, theme bootstrap.
- `app/page.tsx`: main experience; chat, empty/loading states, and preview shell.
- `app/api/chat/route.ts`: server route that calls Gemini with the prompt + schema.
- `hooks/useGenerativeUI.ts`: orchestrates chat, loading, errors, and interaction feedback.
- `components/generative-ui/registry.ts`: maps schema component types to React components.
- `components/generative-ui/UIRenderer.tsx`: renders component trees returned by Gemini.
- `lib/ui-schema.ts`: Zod schemas defining the allowed component shapes.
- `lib/gemini-prompt.ts`: system prompt steering Gemini’s responses.

## Component Types

`text`, `card`, `button`, `form`, `table`, `chart`, `list`, `tabs`, `grid`, `container`, `stat`, `alert`, `progress`, `divider`, `image`, `empty`

## Tech Stack

- Next.js 14+ (App Router), TypeScript, Tailwind CSS
- Vercel AI SDK with `@ai-sdk/google` (Gemini 2.5 Flash)
- Zod for schema validation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add `.env.local`:
   ```bash
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```
   Get a key from [Google AI Studio](https://aistudio.google.com/apikey).
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Interaction Tips

- Try prompts like “Create a contact form”, “Show me a dashboard”, or “Build a todo app”.
- Interact with generated UI elements; actions are sent back to Gemini to refine the layout.
