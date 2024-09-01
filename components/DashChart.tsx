"use client"

import { Status } from '@prisma/client'
import {BarChart, Bar, ResponsiveContainer, XAxis, YAxis} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

interface dataProps{
  data: dataElements[]
}

interface dataElements  {
  name: Status
  total: number
}

const DashChart = ({data}: dataProps) => {
  return (
    <Card className='col-span-4'>
      <CardHeader>
        <CardTitle>Chart</CardTitle>
        <CardContent>
          <ResponsiveContainer width="100%" height={363}>
            <BarChart data={data}>
              <XAxis dataKey="name" fontSize={12} stroke='#888888' tickLine={true} axisLine={true} />
              <YAxis fontSize={12} stroke='#888888' tickLine={true} axisLine={true} />
              <Bar dataKey="total" fill="#60a5fa" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default DashChart