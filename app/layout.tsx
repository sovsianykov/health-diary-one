import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Navigation } from "@/components/layout/Navigation"
import { ToastProvider } from "@/components/ui/Toast"
import layoutStyles from "@/components/layout/layout.module.scss"

export const metadata: Metadata = {
  title: "Дневник здоровья",
  description:
    "Персональный дневник здоровья — отслеживайте приём лекарств, питание, прогулки, стресс и общее самочувствие",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <Header />
          <main className={layoutStyles.main}>{children}</main>
          <Navigation />
        </ToastProvider>
      </body>
    </html>
  )
}
