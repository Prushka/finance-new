"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "January", balance: 186 },
    { month: "February", balance: 305 },
    { month: "March", balance: 237 },
    { month: "April", balance: 73 },
    { month: "May", balance: 209 },
    { month: "June", balance: 214 },
]

const chartConfig = {
    balance: {
        label: "Balance",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function DemoChart() {
    return (
        <ChartContainer config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                    dataKey="balance"
                    type="natural"
                    fill="var(--color-balance)"
                    fillOpacity={0.4}
                    stroke="var(--color-balance)"
                />
            </AreaChart>
        </ChartContainer>
    )
}
