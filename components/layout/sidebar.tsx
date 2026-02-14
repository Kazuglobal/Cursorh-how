"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { mainNavigation } from "@/lib/navigation"

export function Sidebar() {
  const pathname = usePathname()

  const toolNavItems = mainNavigation.filter((item) => item.children)

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-5rem)] pb-8">
        <nav className="space-y-6">
          {toolNavItems.map((section) => (
            <div key={section.href}>
              <h4 className={cn(
                "text-sm font-semibold mb-2 px-3",
                section.toolId === "cursor" && "text-cursor-accent",
                section.toolId === "claude-code" && "text-claude-accent",
                section.toolId === "manus" && "text-manus-accent",
              )}>
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.children?.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-3 py-1.5 text-sm rounded-md transition-colors",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold mb-2 px-3">その他</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/compare"
                  className={cn(
                    "block px-3 py-1.5 text-sm rounded-md transition-colors",
                    pathname === "/compare"
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  ツール比較
                </Link>
              </li>
              <li>
                <Link
                  href="/getting-started"
                  className={cn(
                    "block px-3 py-1.5 text-sm rounded-md transition-colors",
                    pathname === "/getting-started"
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  はじめに
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}
