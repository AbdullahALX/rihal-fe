import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Import the data from the data.json file
import data from '../assets/filtered_crimes_2.json';

// Process the data
const crimeData = [
  { crime_type: 'Robbery', count: 0 },
  { crime_type: 'Assault', count: 0 },
  { crime_type: 'Homicide', count: 0 },
  { crime_type: 'Kidnapping', count: 0 },
  { crime_type: 'Theft', count: 0 },
];

// Count the occurrences of each crime type in the data
data.crimes.forEach((crime) => {
  const crimeType = crime.crime_type;
  const index = crimeData.findIndex((c) => c.crime_type === crimeType);
  if (index !== -1) {
    crimeData[index].count++;
  }
});

const chartConfig = {
  robbery: {
    label: 'Robbery',
    color: 'hsl(var(  --chart-1))',
  },
  assault: {
    label: 'Assault',
    color: 'hsl(var(--chart-1))',
  },
  homicide: {
    label: 'Homicide',
    color: 'hsl(var(--chart-1))',
  },
  kidnapping: {
    label: 'Kidnapping',
    color: 'hsl(var(--chart-1))',
  },
  theft: {
    label: 'Theft',
    color: 'hsl(var(--chart-1))',
  },
};

export default function Analytics() {
  const totalCrimes = React.useMemo(() => {
    return crimeData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Crime Report - Pie Chart</CardTitle>
        <CardDescription>Recent Crime Reports</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
              data={crimeData}
              dataKey="count"
              nameKey="crime_type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCrimes.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Crimes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
