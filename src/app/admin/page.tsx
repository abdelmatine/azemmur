"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { DollarSign, Users, ShoppingBag, Activity } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../../components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartConfig } from "../../components/ui/chart";
import { products } from "../../data/products";

const monthlyRevenue = [
  { month: "Jan", revenue: 2300 },
  { month: "Feb", revenue: 2800 },
  { month: "Mär", revenue: 3500 },
  { month: "Apr", revenue: 4100 },
  { month: "Mai", revenue: 3900 },
  { month: "Jun", revenue: 4500 },
];
const revenueChartConfig = {
  revenue: {
    label: "Umsatz",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// --- DYNAMIC DATA ---
const totalRevenue = products.reduce(
  (acc, p) => acc + p.price * p.reviews,
  45231.89
);
const totalCustomers = 2350; // Static for now, can be made dynamic later
const totalSales = products.reduce((acc, p) => acc + p.reviews, 12234);

const salesByCategory = Object.values(
  products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = { name: product.category, value: 0 };
    }
    acc[product.category].value += product.reviews;
    return acc;
  }, {} as Record<string, { name: string; value: number }>)
);

const salesChartConfig = {
  sales: {
    label: "Verkäufe",
  },
  Mischung: {
    label: "Mischung",
    color: "hsl(var(--chart-1))",
  },
  Sortenrein: {
    label: "Sortenrein",
    color: "hsl(var(--chart-2))",
  },
  Aromatisiert: {
    label: "Aromatisiert",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtumsatz</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {totalRevenue.toLocaleString("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">+20.1% zum Vormonat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kunden</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{totalCustomers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +180.1% zum Vormonat
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verkäufe</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{totalSales.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+19% zum Vormonat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jetzt aktiv</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 seit der letzten Stunde
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Monatlicher Umsatz</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={revenueChartConfig}
              className="min-h-[250px] w-full"
            >
              <LineChart
                data={monthlyRevenue}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickPrefix="$"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={30}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Verkäufe nach Kategorie</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer
              config={salesChartConfig}
              className="min-h-[250px] w-full"
            >
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="name" />}
                />
                <Pie
                  data={salesByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                />
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
