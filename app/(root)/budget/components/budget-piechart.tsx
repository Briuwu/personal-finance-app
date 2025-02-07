"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BudgetSelect, TransactionSelect } from "@/db/schema";

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
  education: {
    label: "Education",
    color: "var(--pink)",
  },
  lifestyle: {
    label: "Lifestyle",
    color: "var(--purple)",
  },
  shopping: {
    label: "Shopping",
    color: "var(--orange)",
  },
  general: {
    label: "General",
    color: "var(--red)",
  },
  groceries: {
    label: "Groceries",
    color: "var(--blue)",
  },
} satisfies ChartConfig;

type Budgets = Omit<BudgetSelect, "userId" | "createdAt"> & {
  amount: number;
  transactions: TransactionSelect[];
};

type Props = {
  budgets: Budgets[];
  isOverview?: boolean;
};

export function BudgetsPieChart({ budgets, isOverview }: Props) {
  const END = isOverview ? 4 : budgets.length;
  const chartData = budgets.slice(0, END).map((budget) => ({
    category: budget.category,
    maximum: Number(budget.maximum),
    fill: budget.theme,
    spent: budget.transactions.reduce(
      (acc, transaction) =>
        Number(transaction.amount) < 0
          ? acc + Math.abs(Number(transaction.amount))
          : acc,
      0,
    ),
  }));

  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.maximum, 0);
  }, [chartData]);

  const totalSpent = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.spent, 0);
  }, [chartData]);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square h-full max-h-[250px] w-full place-self-center"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="spent"
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
                      className="text-preset-2 fill-foreground font-bold text-grey-900"
                    >
                      ${totalSpent.toLocaleString()}
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
