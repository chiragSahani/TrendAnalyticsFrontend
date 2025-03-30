"use client"

import type React from "react"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/store"
import { updateProfile } from "@/lib/features/profile/profileSlice"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Camera, Edit, Mail, MapPin, Save, User, Search, BarChart3 } from "lucide-react"

export default function ProfileContent() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.profile)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    location: user.location,
    bio: user.bio,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updateProfile(formData))
    setIsEditing(false)
  }

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
            Profile
          </motion.h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6 bg-gradient-to-b from-background to-background/50">
        <div className="mx-auto max-w-4xl space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="border-primary/20 shadow-lg overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary/20 to-purple-500/20"></div>
              <div className="px-6 pb-6 relative">
                <div className="absolute -top-16 left-6 ring-4 ring-background rounded-full">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-4xl bg-primary/20 text-primary">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-primary hover:bg-primary/90"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-16 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {user.role}
                      </Badge>
                      <span className="mx-2">•</span>
                      <MapPin className="h-3 w-3" /> {user.location}
                    </p>
                  </div>

                  <Button variant="outline" className="gap-2" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    {isEditing ? "Save" : "Edit Profile"}
                  </Button>
                </div>

                <p className="mt-4 text-muted-foreground">{user.bio}</p>

                <div className="flex gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{user.stats.queries}</p>
                    <p className="text-xs text-muted-foreground">Queries</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{user.stats.visualizations}</p>
                    <p className="text-xs text-muted-foreground">Visualizations</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{user.stats.savedReports}</p>
                    <p className="text-xs text-muted-foreground">Saved Reports</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="details" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>Details</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Activity</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Preferences</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription>Manage your personal information and account settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" name="role" value={formData.role} onChange={handleChange} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" value={formData.location} onChange={handleChange} />
                          </div>
                          <div className="space-y-2 col-span-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Input id="bio" name="bio" value={formData.bio} onChange={handleChange} />
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                            <p>{user.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                            <p>{user.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Role</p>
                            <p>{user.role}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Location</p>
                            <p>{user.location}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm font-medium text-muted-foreground">Bio</p>
                            <p>{user.bio}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset Password</Button>
                    {isEditing && (
                      <Button type="submit" onClick={handleSubmit}>
                        Save Changes
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent queries and interactions with the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.recentActivity.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div
                            className={`rounded-full p-2 ${activity.type === "query" ? "bg-primary/10 text-primary" : "bg-purple-500/10 text-purple-500"}`}
                          >
                            {activity.type === "query" ? (
                              <Search className="h-4 w-4" />
                            ) : (
                              <BarChart3 className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.notificationPreferences.map((pref, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{pref.name}</p>
                            <p className="text-sm text-muted-foreground">{pref.description}</p>
                          </div>
                          <Switch checked={pref.enabled} />
                        </div>
                      ))}
                    </div>
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
function Switch({ checked }: { checked: boolean }) {
  return (
    <div className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}>
      <div
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </div>
  )
}

