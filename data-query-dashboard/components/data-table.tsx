"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"

export default function DataTable({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null

  // Get all unique keys from the data objects
  const columns = Array.from(new Set(data.flatMap((item) => Object.keys(item))))

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            {columns.map((column) => (
              <TableHead key={column} className="capitalize font-medium">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <motion.tr
              key={rowIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rowIndex * 0.05, duration: 0.2 }}
              className="border-b hover:bg-muted/30 transition-colors"
            >
              {columns.map((column) => (
                <TableCell key={`${rowIndex}-${column}`} className="py-3">
                  {row[column] !== undefined ? String(row[column]) : "-"}
                </TableCell>
              ))}
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

