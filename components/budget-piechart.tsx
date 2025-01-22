"use client";
import data from "@/lib/data.json";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = data.budgets.map((budget) => ({
  category: budget.category,
  maximum: budget.maximum,
  fill: budget.theme,
}));

const chartConfig = {
  budgets: {
    label: "Budgets",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--green))",
  },
  bills: {
    label: "Bills",
    color: "var(--cyan)",
  },
  diningOut: {
    label: "Dining Out",
    color: "var(--yellow)",
  },
  personalCare: {
    label: "Personal Care",
    color: "var(--navy)",
  },
} satisfies ChartConfig;

export function BudgetsPieChart() {
  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.maximum, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-[250px] place-self-center"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="maximum"
          nameKey="category"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="text-preset-1 fill-foreground font-bold text-grey-900"
                    >
                      ${totalAmount.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      of ${totalAmount.toLocaleString()} limit
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
