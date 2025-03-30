"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { BarChart3, LineChartIcon, PieChartIcon, TableIcon, Download, Share2, Maximize2 } from "lucide-react"
import DataTable from "@/components/data-table"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ResultsDisplay() {
  const { currentQuery, currentResults } = useSelector((state: RootState) => state.queries)
  const [activeView, setActiveView] = useState("chart")
  const { settings } = useSelector((state: RootState) => state.settings)

  if (!currentResults) {
    return (
      <motion.div
        className="flex h-96 items-center justify-center rounded-lg border border-dashed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center text-muted-foreground max-w-md p-8">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary/30" />
          <h3 className="text-lg font-medium mb-2">No results to display</h3>
          <p className="text-sm mb-6">Try submitting a query using the search bar above to visualize your data</p>

          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground/80">
            <div className="flex items-center gap-1 p-2 rounded-md bg-muted/50">
              <LineChartIcon className="h-3 w-3" />
              <span>Trend Analysis</span>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md bg-muted/50">
              <PieChartIcon className="h-3 w-3" />
              <span>Distribution Data</span>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md bg-muted/50">
              <BarChart3 className="h-3 w-3" />
              <span>Comparison Charts</span>
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md bg-muted/50">
              <TableIcon className="h-3 w-3" />
              <span>Detailed Tables</span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const { title, description, data, chartType } = currentResults

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-background to-muted/30 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                {title}
                <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-xs">
                  {chartType.toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
            <div className="border-b px-6 bg-muted/20">
              <TabsList className="bg-transparent h-12">
                <TabsTrigger
                  value="chart"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none h-12"
                >
                  {chartType === "bar" && <BarChart3 className="h-4 w-4 mr-2" />}
                  {chartType === "line" && <LineChartIcon className="h-4 w-4 mr-2" />}
                  {chartType === "pie" && <PieChartIcon className="h-4 w-4 mr-2" />}
                  Chart View
                </TabsTrigger>
                <TabsTrigger
                  value="table"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none h-12"
                >
                  <TableIcon className="h-4 w-4 mr-2" />
                  Table View
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="chart" className="p-6 m-0">
              <div className="h-[400px] w-full">
                {chartType === "bar" && <BarChartDisplay data={data} animated={settings.enableAnimations} />}
                {chartType === "line" && <LineChartDisplay data={data} animated={settings.enableAnimations} />}
                {chartType === "pie" && <PieChartDisplay data={data} animated={settings.enableAnimations} />}
              </div>
            </TabsContent>
            <TabsContent value="table" className="p-6 m-0">
              <DataTable data={data} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Maximize2 className="h-4 w-4 text-primary" />
              AI Insights
            </h3>
            <p className="text-sm text-muted-foreground">
              {chartType === "bar" &&
                "The bar chart shows significant variations across categories. The highest value is in Category A, which is 33% higher than the average."}
              {chartType === "line" &&
                "The trend line indicates steady growth over time with a notable peak in June. Consider investigating the factors that contributed to this performance."}
              {chartType === "pie" &&
                "The distribution shows that Group A and Group B together account for over 50% of the total. This concentration may present both opportunities and risks."}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function BarChartDisplay({ data, animated }: { data: any[]; animated: boolean }) {
  return (
    <motion.div
      className="h-full"
      initial={animated ? { opacity: 0, y: 20 } : false}
      animate={animated ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
    >
      <BarChart
        data={data}
        index="name"
        categories={["value"]}
        colors={["primary"]}
        valueFormatter={(value) => `${value.toLocaleString()}`}
        yAxisWidth={80}
      />
    </motion.div>
  )
}

function LineChartDisplay({ data, animated }: { data: any[]; animated: boolean }) {
  return (
    <motion.div
      className="h-full"
      initial={animated ? { opacity: 0, y: 20 } : false}
      animate={animated ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
    >
      <LineChart
        data={data}
        index="name"
        categories={["value"]}
        colors={["primary"]}
        valueFormatter={(value) => `${value.toLocaleString()}`}
        yAxisWidth={80}
      />
    </motion.div>
  )
}

function PieChartDisplay({ data, animated }: { data: any[]; animated: boolean }) {
  return (
    <motion.div
      className="h-full"
      initial={animated ? { opacity: 0, scale: 0.9 } : false}
      animate={animated ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.5 }}
    >
      <PieChart
        data={data}
        index="name"
        categories={["value"]}
        colors={["primary", "secondary", "accent", "destructive", "muted"]}
        valueFormatter={(value) => `${value.toLocaleString()}`}
      />
    </motion.div>
  )
}

