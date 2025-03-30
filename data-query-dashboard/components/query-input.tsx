"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { submitQuery } from "@/lib/features/queries/queriesSlice"
import { Search, Sparkles, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { RootState } from "@/lib/store"

// Mock AI suggestions based on input
const getAiSuggestions = (input: string): string[] => {
  if (!input.trim()) return []

  const suggestions = [
    `${input} by country`,
    `${input} over time`,
    `${input} compared to last year`,
    `${input} breakdown by category`,
    `${input} top performers`,
  ]

  return suggestions.slice(0, 3)
}

// Example queries for inspiration
const exampleQueries = [
  "Show me sales trends over the last 6 months",
  "What's the distribution of users by region?",
  "Compare revenue by product category",
  "Analyze customer satisfaction ratings",
  "Display marketing campaign performance",
]

export default function QueryInput() {
  const dispatch = useDispatch()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { settings } = useSelector((state: RootState) => state.settings)

  useEffect(() => {
    if (query.trim()) {
      setSuggestions(getAiSuggestions(query))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [query])

  // Cycle through example queries in the placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExampleIndex((prev) => (prev + 1) % exampleQueries.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      dispatch(submitQuery(query))
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    dispatch(submitQuery(suggestion))
    setShowSuggestions(false)
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="relative space-y-2">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-4 text-center"
      >
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent inline-block">
          Ask anything about your data
        </h2>
        <p className="text-muted-foreground">Use natural language to query your data and get instant insights</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="flex gap-2"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="relative flex-1 group" onClick={focusInput}>
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Try: "${exampleQueries[currentExampleIndex]}"`}
            className="h-14 pl-12 pr-12 text-lg shadow-lg transition-all duration-200 border-primary/20 group-hover:border-primary/50 focus-visible:ring-primary/20"
          />
          <Search className="absolute left-4 top-4.5 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />

          <AnimatePresence>
            {settings.enableAnimations && query.length === 0 && (
              <motion.div
                className="absolute right-4 top-4.5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }}
              >
                <Sparkles className="h-5 w-5 text-primary/70" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-14 px-6 text-lg font-medium shadow-lg bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 transition-all duration-300"
        >
          <span>Query</span>
          <Zap className="ml-2 h-5 w-5" />
        </Button>
      </motion.form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="absolute z-10 w-full shadow-lg border-primary/20">
              <CardContent className="p-2">
                <div className="flex items-center gap-2 mb-2 px-2 pt-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-xs font-medium text-primary">AI Suggestions:</p>
                </div>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left hover:bg-primary/10 hover:text-primary transition-all duration-200"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

