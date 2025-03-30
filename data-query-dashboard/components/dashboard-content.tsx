"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import QueryInput from "@/components/query-input"
import ResultsDisplay from "@/components/results-display"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function DashboardContent() {
  const { loading, error } = useSelector((state: RootState) => state.queries)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="border-b bg-background p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <motion.h1
            className="text-xl font-semibold flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span>Data Query Dashboard</span>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 5,
              }}
            >
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </motion.div>
          </motion.h1>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-6 bg-gradient-to-b from-background to-background/50">
        <div className="mx-auto max-w-5xl space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <QueryInput />
          </motion.div>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-64 items-center justify-center rounded-lg border border-dashed bg-card/50 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="h-6 w-6 text-primary" />
                  </motion.div>
                </div>
                <p className="font-medium">Processing your query with AI...</p>
                <p className="text-sm max-w-md text-center">
                  Our AI is analyzing your request and preparing insightful visualizations
                </p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-64 items-center justify-center rounded-lg border border-dashed border-destructive bg-destructive/10"
            >
              <div className="text-center text-destructive max-w-md p-6">
                <p className="font-semibold text-lg mb-2">Error processing query</p>
                <p className="text-sm mb-4">{error}</p>
                <div className="p-4 bg-destructive/5 rounded-lg text-sm">
                  <p>Try rephrasing your query or check our examples for guidance.</p>
                </div>
              </div>
            </motion.div>
          )}

          {!loading && !error && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <ResultsDisplay />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

