"use client"

import type React from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardContent from "@/components/dashboard-content"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Dashboard({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()

  // Determine which content to show based on the current path
  const renderContent = () => {
    if (children) {
      return children
    }
    return <DashboardContent />
  }

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-screen w-full overflow-hidden bg-background">
            <DashboardSidebar />
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-hidden"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </Provider>
  )
}

