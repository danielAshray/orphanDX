import { Card } from "@/components/card";
import React, { type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarProps {
  dataKey: string;
  color: string;
}

interface CustomBarCharProps {
  icon: ReactNode;
  title: string;
  data: any;
  barProps: BarProps;
}

const CustomBarChar: React.FC<CustomBarCharProps> = ({
  icon,
  title,
  data,
  barProps,
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        {<h3 className="text-gray-900">{title}</h3>}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={barProps.dataKey} fill={barProps.color} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CustomBarChar;
