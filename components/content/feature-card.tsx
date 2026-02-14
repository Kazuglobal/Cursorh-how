import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Keyboard, Pencil, MessageSquare, Layers, Bot, Search,
  FileText, Shield, Plug, GitBranch, Users, ListTodo,
  Globe, Code, FileDown, Map, Image as ImageIcon,
  Monitor, Smartphone, Table2, Laptop, Network, Chrome,
} from "lucide-react"
import type { ReactNode } from "react"

const iconMap: Record<string, ReactNode> = {
  Keyboard: <Keyboard className="h-6 w-6" />,
  Pencil: <Pencil className="h-6 w-6" />,
  MessageSquare: <MessageSquare className="h-6 w-6" />,
  Layers: <Layers className="h-6 w-6" />,
  Bot: <Bot className="h-6 w-6" />,
  Search: <Search className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  Plug: <Plug className="h-6 w-6" />,
  GitBranch: <GitBranch className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  ListTodo: <ListTodo className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
  Code: <Code className="h-6 w-6" />,
  FileDown: <FileDown className="h-6 w-6" />,
  Map: <Map className="h-6 w-6" />,
  Image: <ImageIcon className="h-6 w-6" />,
  Monitor: <Monitor className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
  Table2: <Table2 className="h-6 w-6" />,
  Laptop: <Laptop className="h-6 w-6" />,
  Network: <Network className="h-6 w-6" />,
  Chrome: <Chrome className="h-6 w-6" />,
}

interface FeatureCardProps {
  readonly icon: string
  readonly title: string
  readonly description: string
  readonly href?: string
  readonly accentColor?: string
}

export function FeatureCard({ icon, title, description, href, accentColor }: FeatureCardProps) {
  const content = (
    <div className={cn(
      "group rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:shadow-md hover:border-primary/30",
      href && "cursor-pointer"
    )}>
      <div className={cn(
        "mb-4 inline-flex items-center justify-center rounded-lg p-2 transition-transform duration-300 group-hover:rotate-12",
        accentColor === "cursor-accent" && "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
        accentColor === "claude-accent" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        accentColor === "manus-accent" && "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
        !accentColor && "bg-primary/10 text-primary"
      )}>
        {iconMap[icon] ?? <Code className="h-6 w-6" />}
      </div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      {href && (
        <span className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:underline">
          詳しく見る &rarr;
        </span>
      )}
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
