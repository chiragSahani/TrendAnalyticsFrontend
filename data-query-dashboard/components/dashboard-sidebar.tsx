"use client"

import { useSelector } from "react-redux"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar"
import type { RootState } from "@/lib/store"
import { Clock, Home, Settings, User, BarChart3, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function DashboardSidebar() {
  const { queryHistory } = useSelector((state: RootState) => state.queries)
  const { user } = useSelector((state: RootState) => state.profile)
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-3">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Gen AI Analytics
          </h1>
        </motion.div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <Link href={item.path} passHref legacyBehavior>
                    <SidebarMenuButton
                      isActive={pathname === item.path}
                      className="transition-all duration-200 hover:translate-x-1"
                    >
                      <item.icon className={pathname === item.path ? "text-primary" : ""} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>Query History</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {queryHistory.length === 0 ? (
                <div className="px-2 py-3 text-sm text-muted-foreground">No queries yet. Try asking something!</div>
              ) : (
                queryHistory.map((query, index) => (
                  <motion.div
                    key={query.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton className="group">
                        <span className="truncate group-hover:text-primary transition-colors">{query.text}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-primary">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/20 text-primary">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-primary/10 hover:text-primary"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

