import { Card } from "@/components/card";
import React, { type ReactNode } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LineProps {
  yAxisId: "left" | "right";
  dataKey: string;
  color: string;
  name: string;
}

interface CustomLineChartProps {
  icon: ReactNode;
  title: string;
  data: any;
  lineProps: LineProps[];
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({
  icon,
  title,
  data,
  lineProps,
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-gray-900">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          {lineProps.map((value, index) => (
            <Line
              key={index}
              yAxisId={value.yAxisId}
              type="monotone"
              dataKey={value.dataKey}
              stroke={value.color}
              strokeWidth={2}
              name={value.name}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CustomLineChart;
