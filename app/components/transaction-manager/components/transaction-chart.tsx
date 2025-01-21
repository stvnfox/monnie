"use client";

import type { FunctionComponent } from "react";
import {
  Label,
  Pie,
  PieChart,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { createCurrencyValue } from "../helpers/create-currency-value";

export const description = "a radial chart with a custom shape";

type TransactionChartProps = {
  income: number;
  expenses: number;
  total: number;
};

export const TransactionChart: FunctionComponent<TransactionChartProps> = ({
  income,
  expenses,
  total,
}) => {
  // Calculate the percentage of income spent
  const spentPercentage = (expenses / income) * 100;
  // Convert percentage to degrees (360 degrees = 100%)
  const endAngle = Math.min(360, (spentPercentage * 360) / 100);

  const chartData = [
    {
      label: "income",
      value: income,
      fill: "var(--color-income)",
    },
    {
      label: "expenses",
      value: expenses,
      fill: "var(--color-expense)",
    },
    {
      label: "total",
      value: total,
      fill: "var(--color-total)",
    },
  ];

  const chartConfig = {
    income: {
      label: "income",
      color: "hsl(var(--chart-1))",
    },
    expense: {
      label: "expense",
      color: "hsl(var(--chart-2))",
    },
    total: {
      label: "total",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        {/* <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={endAngle}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="expenses" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {createCurrencyValue(chartData[0].total)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          over
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer> */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total income: {createCurrencyValue(income)}
        </div>
        <div className="leading-none text-muted-foreground">
          Total expenses: {createCurrencyValue(expenses)}
        </div>
      </CardFooter>
    </Card>
  );
};
