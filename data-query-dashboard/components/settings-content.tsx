"use client"

import type React from "react"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/store"
import { updateSettings } from "@/lib/features/settings/settingsSlice"
import { clearHistory } from "@/lib/features/queries/queriesSlice"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Check, Moon, Palette, RotateCcw, Sun, Volume2, VolumeX } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SettingsContent() {
  const dispatch = useDispatch()
  const { settings } = useSelector((state: RootState) => state.settings)
  const { queryHistory } = useSelector((state: RootState) => state.queries)

  const handleToggleSetting = (key: string) => {
    dispatch(updateSettings({ [key]: !settings[key] }))
  }

  const handleClearHistory = () => {
    dispatch(clearHistory())
  }

  const themeOptions = [
    { id: "light", name: "Light", icon: Sun },
    { id: "dark", name: "Dark", icon: Moon },
    { id: "system", name: "System", icon: Palette },
  ]

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="border-b bg-background p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <motion.h1
            className="text-xl font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Settings
          </motion.h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6 bg-gradient-to-b from-background to-background/50">
        <div className="mx-auto max-w-4xl space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="appearance" className="gap-2">
                  <Palette className="h-4 w-4" />
                  <span>Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="gap-2">
                  <Volume2 className="h-4 w-4" />
                  <span>Preferences</span>
                </TabsTrigger>
                <TabsTrigger value="data" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>Data Management</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>Customize how the dashboard looks and feels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {themeOptions.map((theme) => {
                          const Icon = theme.icon
                          const isActive = settings.theme === theme.id

                          return (
                            <motion.div
                              key={theme.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => dispatch(updateSettings({ theme: theme.id }))}
                              className={`relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                isActive
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              {isActive && (
                                <div className="absolute top-2 right-2 text-primary">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}
                              <Icon className="h-8 w-8" />
                              <span className="text-sm font-medium">{theme.name}</span>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Color Scheme</Label>
                      <div className="grid grid-cols-4 gap-4">
                        {["blue", "purple", "green", "orange"].map((color) => (
                          <motion.div
                            key={color}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => dispatch(updateSettings({ colorScheme: color }))}
                            className={`relative h-12 rounded-lg cursor-pointer transition-all ${
                              settings.colorScheme === color ? "ring-2 ring-primary ring-offset-2" : ""
                            }`}
                            style={{
                              background:
                                color === "blue"
                                  ? "linear-gradient(to right, #3b82f6, #2563eb)"
                                  : color === "purple"
                                    ? "linear-gradient(to right, #8b5cf6, #6d28d9)"
                                    : color === "green"
                                      ? "linear-gradient(to right, #10b981, #059669)"
                                      : "linear-gradient(to right, #f97316, #ea580c)",
                            }}
                          >
                            {settings.colorScheme === color && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check className="h-6 w-6 text-white" />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="animations" className="text-base">
                            Animations
                          </Label>
                          <p className="text-sm text-muted-foreground">Enable smooth animations and transitions</p>
                        </div>
                        <Switch
                          id="animations"
                          checked={settings.enableAnimations}
                          onCheckedChange={() => handleToggleSetting("enableAnimations")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="reduced-motion" className="text-base">
                            Reduced Motion
                          </Label>
                          <p className="text-sm text-muted-foreground">Minimize non-essential animations</p>
                        </div>
                        <Switch
                          id="reduced-motion"
                          checked={settings.reducedMotion}
                          onCheckedChange={() => handleToggleSetting("reducedMotion")}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Customize your dashboard experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sound-effects" className="text-base">
                            Sound Effects
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Play sounds for interactions and notifications
                          </p>
                        </div>
                        <Switch
                          id="sound-effects"
                          checked={settings.enableSoundEffects}
                          onCheckedChange={() => handleToggleSetting("enableSoundEffects")}
                          icon={settings.enableSoundEffects ? Volume2 : VolumeX}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="auto-suggestions" className="text-base">
                            Auto Suggestions
                          </Label>
                          <p className="text-sm text-muted-foreground">Show AI-powered suggestions while typing</p>
                        </div>
                        <Switch
                          id="auto-suggestions"
                          checked={settings.enableAutoSuggestions}
                          onCheckedChange={() => handleToggleSetting("enableAutoSuggestions")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="save-queries" className="text-base">
                            Save Queries
                          </Label>
                          <p className="text-sm text-muted-foreground">Automatically save your recent queries</p>
                        </div>
                        <Switch
                          id="save-queries"
                          checked={settings.saveQueries}
                          onCheckedChange={() => handleToggleSetting("saveQueries")}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Chart Default View</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {["bar", "line", "pie"].map((chartType) => {
                          const Icon =
                            chartType === "bar" ? BarChart3 : chartType === "line" ? LineChartIcon : PieChartIcon

                          return (
                            <motion.div
                              key={chartType}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => dispatch(updateSettings({ defaultChartType: chartType }))}
                              className={`relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                settings.defaultChartType === chartType
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <Icon className="h-8 w-8" />
                              <span className="text-sm font-medium capitalize">{chartType} Chart</span>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>Manage your data and query history</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Query History</Label>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">Saved Queries</p>
                            <p className="text-sm text-muted-foreground">
                              You have {queryHistory.length} saved queries
                            </p>
                          </div>
                          <Button variant="outline" onClick={handleClearHistory} disabled={queryHistory.length === 0}>
                            Clear History
                          </Button>
                        </div>

                        {queryHistory.length > 0 ? (
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {queryHistory.map((query, index) => (
                              <div
                                key={query.id}
                                className="p-2 text-sm rounded-md bg-muted/50 flex justify-between items-center"
                              >
                                <span className="truncate">{query.text}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(query.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-4 text-muted-foreground">
                            <p>No saved queries</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Alert variant="destructive" className="bg-destructive/5 text-destructive border-destructive/20">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Danger Zone</AlertTitle>
                      <AlertDescription>
                        These actions cannot be undone. This will permanently delete your data.
                      </AlertDescription>
                      <div className="mt-4">
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

// Simple Switch component since we don't have access to the actual shadcn Switch
function Switch({
  checked,
  onCheckedChange,
  id,
  icon: Icon,
}: {
  checked: boolean
  onCheckedChange: () => void
  id?: string
  icon?: React.ElementType
}) {
  return (
    <div
      className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${checked ? "bg-primary" : "bg-muted"}`}
      onClick={onCheckedChange}
      id={id}
    >
      <div
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
      >
        {Icon && <Icon className="h-3 w-3 text-primary absolute top-0.5 left-0.5" />}
      </div>
    </div>
  )
}

// Missing imports
import { BarChart3, LineChartIcon, PieChartIcon } from "lucide-react"

