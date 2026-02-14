# AI Coding Tools Reference Guide - Site Architecture

> Next.js 15 (App Router) + TypeScript + Tailwind CSS
> Target: Japanese-speaking programming beginners
> Last updated: 2026-02-12

---

## 1. Page Structure

### 1.1 Complete File Tree

```
app/
  layout.tsx                          # Root layout (HTML, fonts, theme provider, analytics)
  page.tsx                            # Homepage (redirect to /ja or language detection)
  globals.css                         # Global styles + Tailwind directives + CSS variables
  not-found.tsx                       # Custom 404 page

  (marketing)/                        # Marketing route group (shared header/footer layout)
    layout.tsx                        # Shared layout: Header + Footer + Sidebar (mobile drawer)

    page.tsx                          # Homepage: 3-tool overview, hero, quick start CTA
    getting-started/
      page.tsx                        # Tool selection guide (flowchart + quiz)
    compare/
      page.tsx                        # Cross-tool comparison (feature matrix, pricing, use-cases)

    tools/
      cursor/
        page.tsx                      # Cursor overview (what, why, who)
        features/
          page.tsx                    # Cursor all features list
        setup/
          page.tsx                    # Cursor install & initial setup step-by-step
        tips/
          page.tsx                    # Cursor best practices, prompt templates, common mistakes
        shortcuts/
          page.tsx                    # Cursor keyboard shortcuts reference
        pricing/
          page.tsx                    # Cursor pricing plans detail

      claude-code/
        page.tsx                      # Claude Code overview (what, why, who)
        features/
          page.tsx                    # Claude Code all features list
        setup/
          page.tsx                    # Claude Code install & auth setup step-by-step
        tips/
          page.tsx                    # Claude Code best practices, prompt templates, common mistakes
        commands/
          page.tsx                    # Claude Code slash commands & CLI reference
        advanced/
          page.tsx                    # Claude Code advanced (Hooks, MCP, Agents, SDK)
        pricing/
          page.tsx                    # Claude Code pricing models detail

      manus/
        page.tsx                      # Manus AI overview (what, why, who)
        features/
          page.tsx                    # Manus AI all features list
        setup/
          page.tsx                    # Manus AI account creation & getting started
        tips/
          page.tsx                    # Manus AI best practices, task templates, common mistakes
        use-cases/
          page.tsx                    # Manus AI use case gallery (research, data analysis, prototyping)
        pricing/
          page.tsx                    # Manus AI pricing & credits detail

  api/
    og/
      route.tsx                       # Dynamic OG image generation (for social sharing)

components/
  layout/
    header.tsx                        # Site header (logo, nav, theme toggle, mobile menu)
    footer.tsx                        # Site footer (links, copyright, social)
    sidebar.tsx                       # Documentation sidebar navigation (desktop)
    mobile-nav.tsx                    # Mobile navigation drawer
    breadcrumb.tsx                    # Breadcrumb navigation
    table-of-contents.tsx             # In-page ToC (right sidebar, scroll spy)

  ui/
    button.tsx                        # Button component (variants: primary, secondary, ghost, outline)
    card.tsx                          # Card component (base)
    badge.tsx                         # Badge/tag component
    tabs.tsx                          # Tab switcher component
    accordion.tsx                     # Accordion/collapsible component
    dialog.tsx                        # Modal dialog component
    tooltip.tsx                       # Tooltip component
    separator.tsx                     # Visual separator/divider
    scroll-area.tsx                   # Custom scrollable area
    skeleton.tsx                      # Loading skeleton placeholder

  content/
    feature-card.tsx                  # Tool feature card (icon, title, description, link)
    tool-card.tsx                     # Tool overview card for homepage (logo, summary, CTA)
    comparison-table.tsx              # Full-featured comparison table (sortable, filterable)
    pricing-table.tsx                 # Pricing comparison table (highlight recommended)
    code-block.tsx                    # Syntax-highlighted code block (copy button, line numbers)
    inline-code.tsx                   # Inline code snippet styling
    callout.tsx                       # Callout/admonition box (info, warning, tip, danger)
    step-by-step.tsx                  # Numbered step-by-step guide (vertical timeline style)
    keyboard-shortcut.tsx             # Keyboard shortcut display (key caps style)
    shortcut-table.tsx                # Keyboard shortcuts reference table (OS toggle)
    tool-logo.tsx                     # Tool logo/icon renderer
    flowchart.tsx                     # Decision flowchart for tool selection
    quiz.tsx                          # Interactive quiz for tool recommendation
    pros-cons.tsx                     # Pros and cons comparison display
    prompt-example.tsx                # AI prompt example (good vs bad side-by-side)
    external-link.tsx                 # External link with icon indicator

  providers/
    theme-provider.tsx                # Dark/light theme context provider (next-themes)

  icons/
    cursor-icon.tsx                   # Cursor logo SVG
    claude-code-icon.tsx              # Claude Code logo SVG
    manus-icon.tsx                    # Manus AI logo SVG
    tool-icons.tsx                    # Feature category icons (barrel export)

lib/
  tools-data.ts                       # Static data: tool definitions, features, pricing
  comparison-data.ts                  # Static data: comparison matrix
  navigation.ts                       # Navigation structure definition
  constants.ts                        # Site-wide constants (URLs, metadata)
  utils.ts                            # Utility functions (cn, formatDate, etc.)

types/
  tools.ts                            # TypeScript interfaces for tool data
  navigation.ts                       # Navigation type definitions
  comparison.ts                       # Comparison data type definitions

config/
  site.ts                             # Site metadata configuration
  tools.ts                            # Tool-specific configuration (colors, icons)

public/
  images/
    tools/
      cursor-logo.svg
      claude-code-logo.svg
      manus-logo.svg
    hero/
      hero-illustration.svg
    og/
      default-og.png
  fonts/
    (Inter or Noto Sans JP web font files if self-hosted)
```

### 1.2 Page Descriptions

| Page | Path | Purpose |
|------|------|---------|
| Home | `/` | Hero section, 3-tool cards, quick comparison, CTA to Getting Started |
| Getting Started | `/getting-started` | Interactive tool selection quiz, decision flowchart |
| Comparison | `/compare` | Feature matrix, pricing comparison, use-case matrix |
| Cursor Overview | `/tools/cursor` | What is Cursor, key features summary, who it's for |
| Cursor Features | `/tools/cursor/features` | All features in detail (Tab, Cmd+K, Chat, Composer, Agent) |
| Cursor Setup | `/tools/cursor/setup` | Step-by-step install guide with screenshots |
| Cursor Tips | `/tools/cursor/tips` | Best practices, prompt templates, common mistakes |
| Cursor Shortcuts | `/tools/cursor/shortcuts` | Complete keyboard shortcut reference |
| Cursor Pricing | `/tools/cursor/pricing` | Free/Pro/Business plan comparison |
| Claude Code Overview | `/tools/claude-code` | What is Claude Code, key features summary |
| Claude Code Features | `/tools/claude-code/features` | All features (Agent, CLAUDE.md, Permissions, MCP, Hooks) |
| Claude Code Setup | `/tools/claude-code/setup` | Install, auth methods, IDE integration |
| Claude Code Tips | `/tools/claude-code/tips` | Best practices, prompt templates, common mistakes |
| Claude Code Commands | `/tools/claude-code/commands` | Slash commands, CLI options, custom commands |
| Claude Code Advanced | `/tools/claude-code/advanced` | Hooks, MCP plugins, Agent SDK, Teams |
| Claude Code Pricing | `/tools/claude-code/pricing` | API pricing, Pro/Max plans, cost optimization |
| Manus Overview | `/tools/manus` | What is Manus, key features summary |
| Manus Features | `/tools/manus/features` | All features (Browser, Code, Files, Planning) |
| Manus Setup | `/tools/manus/setup` | Account creation, first task walkthrough |
| Manus Tips | `/tools/manus/tips` | Task instruction tips, prompt templates, common mistakes |
| Manus Use Cases | `/tools/manus/use-cases` | Gallery of use cases (research, data, web dev) |
| Manus Pricing | `/tools/manus/pricing` | Credit system, plans, cost estimation |

---

## 2. Component Design

### 2.1 Layout Components

#### Header
```
+------------------------------------------------------------------+
| [Logo] AI Coding Tools Guide                                     |
|                                                                   |
| Nav: Home | Cursor | Claude Code | Manus | Compare | Getting Started |
|                                                                   |
| [Theme Toggle: Sun/Moon] [Mobile Menu: Hamburger]                |
+------------------------------------------------------------------+
```
- Sticky header with blur backdrop
- Responsive: horizontal nav on desktop, hamburger drawer on mobile
- Active page indicator
- Theme toggle button (dark/light)

#### Footer
```
+------------------------------------------------------------------+
| Tools           Resources          About                          |
| - Cursor        - Getting Started  - About this site             |
| - Claude Code   - Comparison       - Disclaimer (info accuracy)  |
| - Manus AI      - Official Docs    - Last updated date           |
+------------------------------------------------------------------+
| (c) 2026 AI Coding Tools Guide - Built with Next.js              |
+------------------------------------------------------------------+
```

#### Sidebar (Desktop Documentation)
- Collapsible tree navigation
- Scroll-spy highlighting for current section
- Sticky positioning (follows scroll)
- Nested: Tool > Feature/Setup/Tips/...

#### Table of Contents (Right Sidebar)
- Auto-generated from heading elements
- Scroll spy for active heading
- Click to scroll to section
- Visible on wide screens only (>= 1280px)

#### Breadcrumb
```
Home > Cursor > Features > Tab Completion
```

### 2.2 Content Components

#### FeatureCard
```tsx
// Props: icon, title, description, href, toolColor
+-------------------------------+
| [Icon]                        |
| Feature Title                 |
| Short description of the      |
| feature in 1-2 lines.        |
|                               |
| Learn more ->                 |
+-------------------------------+
```

#### ToolCard (Homepage)
```tsx
// Props: tool (ToolInfo), variant
+-------------------------------+
| [Tool Logo]                   |
| Tool Name                     |
| [Category Badge]              |
|                               |
| One-line description          |
|                               |
| Key highlights:               |
| - Highlight 1                 |
| - Highlight 2                 |
| - Highlight 3                 |
|                               |
| [View Details Button]         |
+-------------------------------+
```

#### ComparisonTable
```tsx
// Props: categories, tools, features
+----------+--------+-------------+--------+
|          | Cursor | Claude Code | Manus  |
+----------+--------+-------------+--------+
| Category |        |             |        |
| Feature1 | Yes    | Yes         | No     |
| Feature2 | Good   | Excellent   | N/A    |
+----------+--------+-------------+--------+
```
- Sticky first column on mobile
- Sortable columns
- Filterable by category
- Color-coded cells (support level)
- Responsive: horizontal scroll on mobile

#### PricingTable
```tsx
// Props: plans[]
+------------------+------------------+------------------+
| Free             | Pro              | Business         |
| $0/month         | $20/month        | $40/month        |
|                  | [Recommended]    |                  |
| - Feature 1      | - Feature 1      | - Feature 1      |
| - Feature 2      | - Feature 2      | - Feature 2      |
|                  | - Feature 3      | - Feature 3      |
|                  |                  | - Feature 4      |
+------------------+------------------+------------------+
```
- Highlight recommended plan
- Toggle annual/monthly pricing
- Tool-specific styling (accent color)

#### CodeBlock
```tsx
// Props: code, language, title?, showLineNumbers?, highlightLines?
+-------------------------------+
| filename.ts          [Copy]   |
|-------------------------------|
| 1 | const greeting = 'Hello'  |
| 2 | console.log(greeting)     |
+-------------------------------+
```
- Syntax highlighting via Shiki or Prism
- Copy to clipboard button
- Optional filename header
- Optional line numbers
- Optional line highlighting
- Language indicator badge

#### Callout
```tsx
// Props: type ('info' | 'warning' | 'tip' | 'danger'), title?, children
+-------------------------------+
| [Icon] TIP                    |
| Content of the callout box.   |
| Can contain rich text.        |
+-------------------------------+
```
- Four variants with distinct colors and icons:
  - `info` (blue): General information
  - `warning` (amber): Caution/attention
  - `tip` (green): Helpful tips
  - `danger` (red): Critical warnings

#### StepByStep
```tsx
// Props: steps[] (each with title, description, code?, image?)
  (1) ------ Step Title 1 ------
  |    Description text here.
  |    [Optional code block]
  |
  (2) ------ Step Title 2 ------
  |    Description text here.
  |    [Optional screenshot]
  |
  (3) ------ Step Title 3 ------
       Description text here.
```
- Vertical timeline layout
- Numbered circles with connecting line
- Each step can contain text, code blocks, or images
- Responsive on mobile

#### KeyboardShortcut
```tsx
// Props: keys[] (e.g., ['Ctrl', 'K'])
[ Ctrl ] + [ K ]
```
- Key cap styled display
- OS toggle (Windows/macOS) switching Ctrl<->Cmd

#### ShortcutTable
```tsx
// Props: shortcuts[], osToggle
+---------------------+------------------+------------------+
| Action              | Windows/Linux    | macOS            |
+---------------------+------------------+------------------+
| Inline Edit         | Ctrl + K         | Cmd + K          |
| Open Chat           | Ctrl + L         | Cmd + L          |
+---------------------+------------------+------------------+
```
- OS toggle at the top
- Grouped by category
- Searchable

#### Flowchart (Tool Selection)
```tsx
// Props: nodes[], edges[]
What do you want to do?
  |
  +-- Code editing -> Do you prefer GUI?
  |                     +-- Yes -> Cursor
  |                     +-- No  -> Claude Code
  |
  +-- Research/Data -> Manus AI
  |
  +-- Prototyping -> How complex?
                       +-- Simple -> Manus AI
                       +-- Full app -> Cursor or Claude Code
```
- Interactive SVG-based flowchart
- Click nodes to navigate
- Responsive layout

#### Quiz (Interactive Tool Recommender)
```tsx
// Props: questions[], results
Question 1 of 5:
What is your experience level?
  ( ) Complete beginner
  ( ) Some programming experience
  ( ) Professional developer

[Next ->]
```
- Multi-step quiz form
- Progress indicator
- Result card with recommended tool(s) and reasoning

#### PromptExample
```tsx
// Props: bad, good, explanation
+-----------------------------+-----------------------------+
| Bad Example                 | Good Example                |
| "Fix the bug"              | "Fix the pagination bug     |
|                             |  in src/UserList.tsx..."    |
+-----------------------------+-----------------------------+
| Explanation: Be specific about the file and issue...      |
+-----------------------------------------------------------+
```
- Side-by-side comparison
- Color-coded (red for bad, green for good)
- Explanation below

#### ProsCons
```tsx
// Props: pros[], cons[]
+-----------------------------+-----------------------------+
| Strengths                   | Weaknesses                  |
| + Feature A                 | - Limitation X              |
| + Feature B                 | - Limitation Y              |
+-----------------------------+-----------------------------+
```

---

## 3. Data Model

### 3.1 Core Types (`types/tools.ts`)

```typescript
/** Supported tool identifiers */
export type ToolId = 'cursor' | 'claude-code' | 'manus'

/** Supported operating systems */
export type OperatingSystem = 'windows' | 'macos' | 'linux' | 'web'

/** Feature support level */
export type SupportLevel = 'full' | 'partial' | 'none' | 'via-plugin'

/** Pricing plan type */
export type PlanType = 'free' | 'pro' | 'business' | 'enterprise'

/** Pricing model */
export type PricingModel = 'subscription' | 'usage-based' | 'credit-based'

/** Callout severity */
export type CalloutType = 'info' | 'warning' | 'tip' | 'danger'

/** Tool basic information */
export interface ToolInfo {
  readonly id: ToolId
  readonly name: string
  readonly nameEn: string
  readonly tagline: string
  readonly description: string
  readonly developer: string
  readonly category: string
  readonly officialUrl: string
  readonly docsUrl: string
  readonly logoPath: string
  readonly accentColor: string
  readonly supportedOs: ReadonlyArray<OperatingSystem>
  readonly releaseYear: number
  readonly pricingModel: PricingModel
}

/** Feature within a tool */
export interface ToolFeature {
  readonly id: string
  readonly toolId: ToolId
  readonly name: string
  readonly description: string
  readonly detailedDescription: string
  readonly icon: string
  readonly category: FeatureCategory
  readonly keyboardShortcut?: KeyboardShortcut
  readonly usageExamples: ReadonlyArray<UsageExample>
  readonly tips: ReadonlyArray<string>
}

/** Feature category */
export type FeatureCategory =
  | 'code-completion'
  | 'code-editing'
  | 'chat'
  | 'agent'
  | 'file-operations'
  | 'shell-execution'
  | 'context-management'
  | 'browser-control'
  | 'data-analysis'
  | 'customization'
  | 'collaboration'
  | 'model-selection'

/** Keyboard shortcut definition */
export interface KeyboardShortcut {
  readonly action: string
  readonly windows: ReadonlyArray<string>
  readonly macos: ReadonlyArray<string>
  readonly category: string
}

/** Usage example with good/bad comparison */
export interface UsageExample {
  readonly title: string
  readonly good: string
  readonly bad: string
  readonly explanation: string
}

/** Pricing plan */
export interface PricingPlan {
  readonly toolId: ToolId
  readonly name: string
  readonly type: PlanType
  readonly price: PlanPrice
  readonly features: ReadonlyArray<PlanFeature>
  readonly recommended: boolean
  readonly ctaText: string
  readonly ctaUrl: string
}

/** Plan price (supports multiple billing periods) */
export interface PlanPrice {
  readonly monthly: number | null
  readonly annual: number | null
  readonly currency: string
  readonly note?: string
}

/** Individual plan feature */
export interface PlanFeature {
  readonly name: string
  readonly value: string | boolean
  readonly highlight: boolean
}

/** Setup step for step-by-step guide */
export interface SetupStep {
  readonly stepNumber: number
  readonly title: string
  readonly description: string
  readonly code?: string
  readonly codeLanguage?: string
  readonly imagePath?: string
  readonly callout?: {
    readonly type: CalloutType
    readonly message: string
  }
}

/** Setup guide for a tool */
export interface SetupGuide {
  readonly toolId: ToolId
  readonly prerequisites: ReadonlyArray<string>
  readonly steps: ReadonlyArray<SetupStep>
  readonly verificationSteps: ReadonlyArray<SetupStep>
  readonly troubleshooting: ReadonlyArray<TroubleshootingItem>
}

/** Troubleshooting Q&A */
export interface TroubleshootingItem {
  readonly question: string
  readonly answer: string
  readonly code?: string
}

/** Common mistake entry */
export interface CommonMistake {
  readonly title: string
  readonly description: string
  readonly badExample: string
  readonly goodExample: string
  readonly explanation: string
}

/** Tip/Best practice entry */
export interface BestPractice {
  readonly title: string
  readonly description: string
  readonly category: string
  readonly priority: 'essential' | 'recommended' | 'advanced'
}

/** FAQ entry */
export interface FaqItem {
  readonly question: string
  readonly answer: string
  readonly toolId?: ToolId
  readonly category: string
}

/** External reference link */
export interface ReferenceLink {
  readonly title: string
  readonly url: string
  readonly description: string
  readonly toolId?: ToolId
}

/** Prompt template */
export interface PromptTemplate {
  readonly title: string
  readonly toolId: ToolId
  readonly category: string
  readonly template: string
  readonly variables: ReadonlyArray<string>
  readonly example: string
}

/** Use case definition (primarily for Manus) */
export interface UseCase {
  readonly title: string
  readonly toolId: ToolId
  readonly description: string
  readonly steps: ReadonlyArray<string>
  readonly suitability: 'ideal' | 'good' | 'possible' | 'not-recommended'
}
```

### 3.2 Comparison Types (`types/comparison.ts`)

```typescript
import type { ToolId, SupportLevel } from './tools'

/** Comparison category */
export interface ComparisonCategory {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly features: ReadonlyArray<ComparisonFeature>
}

/** Individual comparison feature */
export interface ComparisonFeature {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly values: Readonly<Record<ToolId, ComparisonValue>>
}

/** Comparison cell value */
export interface ComparisonValue {
  readonly support: SupportLevel
  readonly label: string
  readonly detail?: string
}

/** Cross-tool recommendation */
export interface ToolRecommendation {
  readonly scenario: string
  readonly description: string
  readonly recommended: ToolId
  readonly alternatives: ReadonlyArray<ToolId>
  readonly reasoning: string
}

/** Quiz question */
export interface QuizQuestion {
  readonly id: string
  readonly question: string
  readonly options: ReadonlyArray<QuizOption>
}

/** Quiz option with scoring */
export interface QuizOption {
  readonly label: string
  readonly scores: Readonly<Record<ToolId, number>>
}

/** Quiz result */
export interface QuizResult {
  readonly toolId: ToolId
  readonly score: number
  readonly reasoning: string
}
```

### 3.3 Navigation Types (`types/navigation.ts`)

```typescript
import type { ToolId } from './tools'

/** Navigation item */
export interface NavItem {
  readonly title: string
  readonly href: string
  readonly icon?: string
  readonly toolId?: ToolId
  readonly children?: ReadonlyArray<NavItem>
  readonly external?: boolean
  readonly badge?: string
}

/** Sidebar section */
export interface SidebarSection {
  readonly title: string
  readonly items: ReadonlyArray<NavItem>
  readonly collapsible: boolean
  readonly defaultOpen: boolean
}

/** Breadcrumb item */
export interface BreadcrumbItem {
  readonly title: string
  readonly href: string
}
```

---

## 4. Design System

### 4.1 Color Palette

#### Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#FFFFFF` | Page background |
| `--foreground` | `#0F172A` | Primary text (slate-900) |
| `--muted` | `#F1F5F9` | Muted backgrounds (slate-100) |
| `--muted-foreground` | `#64748B` | Secondary text (slate-500) |
| `--card` | `#FFFFFF` | Card background |
| `--card-foreground` | `#0F172A` | Card text |
| `--border` | `#E2E8F0` | Borders (slate-200) |
| `--input` | `#E2E8F0` | Input borders |
| `--ring` | `#3B82F6` | Focus ring (blue-500) |
| `--primary` | `#2563EB` | Primary actions (blue-600) |
| `--primary-foreground` | `#FFFFFF` | Primary button text |
| `--secondary` | `#F1F5F9` | Secondary actions |
| `--secondary-foreground` | `#0F172A` | Secondary button text |
| `--accent` | `#F1F5F9` | Accent backgrounds |
| `--accent-foreground` | `#0F172A` | Accent text |
| `--destructive` | `#EF4444` | Error/danger (red-500) |

#### Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#0F172A` | Page background (slate-900) |
| `--foreground` | `#F8FAFC` | Primary text (slate-50) |
| `--muted` | `#1E293B` | Muted backgrounds (slate-800) |
| `--muted-foreground` | `#94A3B8` | Secondary text (slate-400) |
| `--card` | `#1E293B` | Card background (slate-800) |
| `--card-foreground` | `#F8FAFC` | Card text |
| `--border` | `#334155` | Borders (slate-700) |
| `--input` | `#334155` | Input borders |
| `--ring` | `#60A5FA` | Focus ring (blue-400) |
| `--primary` | `#3B82F6` | Primary actions (blue-500) |
| `--primary-foreground` | `#FFFFFF` | Primary button text |
| `--secondary` | `#1E293B` | Secondary actions |
| `--secondary-foreground` | `#F8FAFC` | Secondary button text |
| `--accent` | `#1E293B` | Accent backgrounds |
| `--accent-foreground` | `#F8FAFC` | Accent text |
| `--destructive` | `#F87171` | Error/danger (red-400) |

#### Tool Accent Colors

Each tool has a unique accent color used for its branded sections.

| Tool | Light Mode | Dark Mode | Usage |
|------|-----------|-----------|-------|
| Cursor | `#00B4D8` (cyan-500) | `#22D3EE` (cyan-400) | Cursor-related cards, borders, badges |
| Claude Code | `#D97706` (amber-600) | `#FBBF24` (amber-400) | Claude Code-related cards, borders, badges |
| Manus AI | `#7C3AED` (violet-600) | `#A78BFA` (violet-400) | Manus-related cards, borders, badges |

#### Callout Colors

| Type | Light Background | Light Border | Dark Background | Dark Border |
|------|-----------------|-------------|-----------------|-------------|
| Info | `#EFF6FF` (blue-50) | `#3B82F6` (blue-500) | `#1E3A5F` | `#60A5FA` (blue-400) |
| Warning | `#FFFBEB` (amber-50) | `#F59E0B` (amber-500) | `#422006` | `#FBBF24` (amber-400) |
| Tip | `#F0FDF4` (green-50) | `#22C55E` (green-500) | `#052E16` | `#4ADE80` (green-400) |
| Danger | `#FEF2F2` (red-50) | `#EF4444` (red-500) | `#450A0A` | `#F87171` (red-400) |

#### Support Level Colors (Comparison Table)

| Level | Light | Dark | Label |
|-------|-------|------|-------|
| Full | `#DCFCE7` (green-100) | `#166534` (green-800) | Supported |
| Partial | `#FEF9C3` (yellow-100) | `#854D0E` (yellow-800) | Partial |
| None | `#FEE2E2` (red-100) | `#991B1B` (red-800) | Not supported |
| Via Plugin | `#E0E7FF` (indigo-100) | `#3730A3` (indigo-800) | Via plugin |

### 4.2 Typography

#### Font Stack

```css
/* Primary: Inter (Latin) + Noto Sans JP (Japanese) */
--font-sans: 'Inter', 'Noto Sans JP', system-ui, -apple-system, sans-serif;

/* Code: JetBrains Mono or Fira Code */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
```

#### Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `h1` | 2.25rem (36px) | 2.5rem (40px) | 800 (extrabold) | Page titles |
| `h2` | 1.875rem (30px) | 2.25rem (36px) | 700 (bold) | Section headings |
| `h3` | 1.5rem (24px) | 2rem (32px) | 600 (semibold) | Subsection headings |
| `h4` | 1.25rem (20px) | 1.75rem (28px) | 600 (semibold) | Card titles, feature names |
| `body` | 1rem (16px) | 1.75rem (28px) | 400 (normal) | Body text |
| `body-sm` | 0.875rem (14px) | 1.5rem (24px) | 400 (normal) | Secondary text, captions |
| `caption` | 0.75rem (12px) | 1rem (16px) | 500 (medium) | Badges, labels |
| `code` | 0.875rem (14px) | 1.625rem (26px) | 400 (normal) | Code blocks |
| `code-sm` | 0.8125rem (13px) | 1.5rem (24px) | 400 (normal) | Inline code |

#### Japanese Text Considerations

- Body line-height: 1.75 (wider than English default for Japanese readability)
- Inter for Latin characters, Noto Sans JP for Japanese
- Font feature settings: `"palt" 1` for proportional alternates in Japanese
- word-break: `break-all` for Japanese text wrapping

### 4.3 Spacing Scale

Based on Tailwind's default 4px grid system:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 0.25rem (4px) | Tight gaps (icon-text) |
| `space-2` | 0.5rem (8px) | Compact element spacing |
| `space-3` | 0.75rem (12px) | Button padding (y-axis) |
| `space-4` | 1rem (16px) | Standard element gap |
| `space-6` | 1.5rem (24px) | Section padding (cards) |
| `space-8` | 2rem (32px) | Component gap |
| `space-12` | 3rem (48px) | Section gap |
| `space-16` | 4rem (64px) | Page section gap |
| `space-20` | 5rem (80px) | Major section gap |
| `space-24` | 6rem (96px) | Hero/footer padding |

### 4.4 Layout

#### Breakpoints

| Name | Min Width | Content | Sidebar |
|------|-----------|---------|---------|
| `sm` | 640px | Full width, single column | Hidden (drawer) |
| `md` | 768px | Full width, columns possible | Hidden (drawer) |
| `lg` | 1024px | Max 768px content | Left sidebar visible |
| `xl` | 1280px | Max 768px content | Left + Right ToC visible |
| `2xl` | 1536px | Max 768px content | Left + Right ToC, generous spacing |

#### Content Width

```css
/* Maximum content widths */
--max-width-content: 768px;    /* Article/documentation content */
--max-width-page: 1280px;      /* Page container (with sidebars) */
--max-width-wide: 1536px;      /* Full-width sections (comparison tables) */

/* Sidebar widths */
--sidebar-width: 256px;        /* Left navigation sidebar */
--toc-width: 220px;            /* Right table of contents */
```

#### Page Layout Structure

```
+------------------------------------------------------------------+
| Header (sticky, full-width, h-16)                                |
+----------+-------------------------------+-----------------------+
| Sidebar  | Main Content                  | Table of Contents     |
| 256px    | max 768px                     | 220px                 |
| (sticky) | (centered)                    | (sticky, scroll-spy)  |
|          |                               |                       |
| Nav tree | Article content               | H2 heading 1          |
|          | with full typography          | H2 heading 2          |
|          |                               |   H3 subheading       |
|          |                               | H2 heading 3          |
+----------+-------------------------------+-----------------------+
| Footer (full-width)                                              |
+------------------------------------------------------------------+
```

### 4.5 Shadows & Borders

```css
/* Light mode shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

/* Dark mode shadows */
--shadow-sm-dark: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
--shadow-md-dark: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);

/* Border radius */
--radius-sm: 0.375rem (6px);    /* Badges, small elements */
--radius-md: 0.5rem (8px);      /* Cards, buttons */
--radius-lg: 0.75rem (12px);    /* Large cards, dialogs */
--radius-xl: 1rem (16px);       /* Hero sections */
--radius-full: 9999px;          /* Rounded buttons, avatars */
```

### 4.6 Motion & Animation

```css
/* Transitions */
--transition-fast: 150ms ease-in-out;    /* Hover states, toggles */
--transition-normal: 200ms ease-in-out;  /* Sidebar, accordions */
--transition-slow: 300ms ease-in-out;    /* Page transitions, modals */

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

### 4.7 Accessibility

- All interactive elements: minimum 44x44px touch target
- Focus indicators: 2px ring with `--ring` color
- Color contrast: WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Semantic HTML: proper heading hierarchy (h1 > h2 > h3)
- ARIA labels on icon-only buttons
- Skip-to-content link
- Keyboard navigation for all interactive components

---

## 5. Navigation Structure

### 5.1 Main Navigation

```typescript
const mainNav: NavItem[] = [
  { title: 'Home', href: '/' },
  {
    title: 'Cursor',
    href: '/tools/cursor',
    toolId: 'cursor',
    children: [
      { title: 'Overview', href: '/tools/cursor' },
      { title: 'Features', href: '/tools/cursor/features' },
      { title: 'Setup', href: '/tools/cursor/setup' },
      { title: 'Tips', href: '/tools/cursor/tips' },
      { title: 'Shortcuts', href: '/tools/cursor/shortcuts' },
      { title: 'Pricing', href: '/tools/cursor/pricing' },
    ],
  },
  {
    title: 'Claude Code',
    href: '/tools/claude-code',
    toolId: 'claude-code',
    children: [
      { title: 'Overview', href: '/tools/claude-code' },
      { title: 'Features', href: '/tools/claude-code/features' },
      { title: 'Setup', href: '/tools/claude-code/setup' },
      { title: 'Tips', href: '/tools/claude-code/tips' },
      { title: 'Commands', href: '/tools/claude-code/commands' },
      { title: 'Advanced', href: '/tools/claude-code/advanced' },
      { title: 'Pricing', href: '/tools/claude-code/pricing' },
    ],
  },
  {
    title: 'Manus AI',
    href: '/tools/manus',
    toolId: 'manus',
    children: [
      { title: 'Overview', href: '/tools/manus' },
      { title: 'Features', href: '/tools/manus/features' },
      { title: 'Setup', href: '/tools/manus/setup' },
      { title: 'Tips', href: '/tools/manus/tips' },
      { title: 'Use Cases', href: '/tools/manus/use-cases' },
      { title: 'Pricing', href: '/tools/manus/pricing' },
    ],
  },
  { title: 'Compare', href: '/compare' },
  { title: 'Getting Started', href: '/getting-started', badge: 'Start Here' },
]
```

---

## 6. Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` (15.x) | Framework (App Router) |
| `react` (19.x) | UI library |
| `typescript` (5.x) | Type safety |
| `tailwindcss` (4.x) | Utility-first CSS |
| `next-themes` | Dark mode provider (system preference + manual toggle) |
| `shiki` | Syntax highlighting for code blocks |
| `lucide-react` | Icon library (consistent, tree-shakable) |
| `clsx` + `tailwind-merge` | Conditional class merging utility |
| `framer-motion` | Page transitions & micro-animations (optional) |

---

## 7. SEO & Metadata Strategy

### 7.1 Per-Page Metadata

Each page exports `generateMetadata()` providing:
- `title`: "{Page Title} | AI Coding Tools Guide"
- `description`: Japanese-language description (120-160 chars)
- `openGraph`: title, description, image (dynamic OG via `/api/og`)
- `twitter`: card type, image
- `alternates.canonical`: canonical URL

### 7.2 Structured Data

- `WebSite` schema on homepage
- `BreadcrumbList` on all pages
- `FAQPage` on tool tips pages and getting-started
- `SoftwareApplication` on each tool overview page

### 7.3 Sitemap

Auto-generated via `next-sitemap` or Next.js built-in `sitemap.ts`:
- All pages included
- Tool pages marked as high priority
- Comparison and getting-started as high priority

---

## 8. Content Strategy Summary

### Per-Tool Content Coverage

Based on the research data, each tool page covers:

#### Cursor (6 pages)
1. **Overview**: VSCode fork, AI-first editor, Anysphere, multi-model
2. **Features**: Tab completion, Cmd+K inline edit, Chat, Composer, Agent mode, Context management (@symbols), Model selection
3. **Setup**: Download, initial wizard, VSCode migration, .cursorrules
4. **Tips**: Prompt templates (bug fix, new feature, refactor), common mistakes (5 items), best practices (dev flow, Git integration, context management)
5. **Shortcuts**: Full keyboard shortcut table (AI + general, Windows/macOS)
6. **Pricing**: Free/Pro/Business comparison, Premium requests explanation

#### Claude Code (7 pages)
1. **Overview**: Terminal-based agentic coding, Anthropic, tools list
2. **Features**: Agentic coding, CLAUDE.md, Permissions, MCP, Hooks, Session management, Slash commands, Thinking mode
3. **Setup**: npm install, auth methods (API key, Pro/Max, Bedrock/Vertex), IDE integration
4. **Tips**: Prompt templates, common mistakes (5 items), best practices (CLAUDE.md, Hooks, custom commands, cost management)
5. **Commands**: Built-in slash commands, custom commands, CLI options
6. **Advanced**: Agent SDK, Custom agents, Agent Teams, Plan mode, Task tool, Skills system
7. **Pricing**: API token pricing (Opus/Sonnet/Haiku), Pro/Max subscription, Bedrock/Vertex, cost optimization

#### Manus AI (6 pages)
1. **Overview**: General-purpose AI agent, Monica.im, sandbox, GAIA benchmark
2. **Features**: Autonomous agent, Browser control, Code generation, File operations, Multi-step planning, Sandbox, Multimodal
3. **Setup**: Account creation, waitlist/access, first task walkthrough
4. **Tips**: Task instruction tips, good/bad examples, common failures, credit optimization
5. **Use Cases**: Web development, Data analysis, Research, Document creation (with examples)
6. **Pricing**: Credit-based system, Free/Plus/Pro plans, credit consumption guide

#### Cross-Tool (2 pages)
1. **Compare**: Feature matrix (12+ categories), pricing comparison, use-case suitability matrix, strengths/weaknesses
2. **Getting Started**: Interactive quiz (5 questions), decision flowchart, scenario-based recommendations
