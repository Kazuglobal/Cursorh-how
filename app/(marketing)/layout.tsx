import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Sidebar } from "@/components/layout/sidebar"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { ScrollProgress } from "@/components/content/scroll-progress"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Header />
      <div className="flex flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1 py-8 lg:pl-8 min-w-0">
          <Breadcrumbs />
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}
