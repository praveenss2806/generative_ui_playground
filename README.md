# Generative UI Application

A Next.js application that dynamically generates user interfaces using Gemini 2.5 Flash. Instead of pre-defined screens, the UI is created on-the-fly based on natural language conversations.

## Features

- **Chat-Driven UI Generation**: Describe what you want, and the AI generates the interface
- **Interactive Components**: Generated UIs are fully interactive - buttons, forms, tables, charts, and more
- **Bidirectional Communication**: User interactions with the generated UI are fed back to the LLM, enabling contextual UI updates
- **Rich Component Library**: 16+ component types including cards, forms, tables, charts, lists, tabs, grids, and more
- **Beautiful Dark Theme**: Modern glass-morphism design with smooth animations

## Getting Started

### Prerequisites

- Node.js 18+
- A Google AI Studio API key (for Gemini 2.5 Flash)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

Get your API key from [Google AI Studio](https://aistudio.google.com/apikey)

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Basic Examples

Try these prompts to see the generative UI in action:

- **"Create a contact form"** - Generates a form with name, email, and message fields
- **"Show me a dashboard"** - Creates a dashboard with stats, charts, and recent activity
- **"Build a todo list"** - Generates an interactive task list with add/delete functionality
- **"Display a pricing table"** - Creates a comparison table with pricing tiers

### Interaction Flow

1. Type a message describing the UI you want
2. The AI generates components based on your description
3. Interact with the generated UI (click buttons, submit forms, etc.)
4. Your interactions are automatically sent to the AI, which generates the next appropriate UI state

## Component Types

| Component | Description |
|-----------|-------------|
| `text` | Text display with variants (heading, body, caption, code) |
| `card` | Container with title, content, and actions |
| `button` | Interactive button with click handlers |
| `form` | Input forms with various field types |
| `table` | Data tables with pagination and row actions |
| `chart` | Visualizations (bar, line, pie, doughnut) |
| `list` | Lists with items and actions |
| `tabs` | Tabbed interface with nested content |
| `grid` | Grid layout (1-6 columns) |
| `container` | Flex container for layout control |
| `stat` | Statistics display with change indicators |
| `alert` | Notifications (info, success, warning, error) |
| `progress` | Progress bars |
| `divider` | Visual separator |
| `image` | Image display |
| `empty` | Empty state placeholder |

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Chat Input    │────▶│   Gemini API    │────▶│   JSON Schema   │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Interaction    │◀────│   Generated UI  │◀────│   UI Renderer   │
│    Events       │     │   (React)       │     │                 │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         └──────────────────────────────────────────────▲
                    (fed back to Gemini)
```

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **AI Integration**: Vercel AI SDK with `@ai-sdk/google`
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript with Zod schemas
- **Fonts**: DM Sans + JetBrains Mono

## Project Structure

```
├── app/
│   ├── api/chat/route.ts    # Gemini API endpoint
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page
│   └── globals.css          # Global styles
├── components/
│   ├── chat/                # Chat interface components
│   ├── generative-ui/       # UI rendering system
│   │   ├── components/      # Renderable components
│   │   ├── UIRenderer.tsx   # Component renderer
│   │   └── registry.ts      # Component registry
│   └── layout/              # Layout components
├── lib/
│   ├── ui-schema.ts         # TypeScript/Zod schemas
│   ├── gemini-prompt.ts     # System prompt
│   └── interaction-handler.ts
└── hooks/
    └── useGenerativeUI.ts   # Main hook
```

## License

MIT
