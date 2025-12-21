import { Card } from "@/components/card";
import React, { type ReactNode } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#8b5cf6", "#6b7280"];

interface CustomPieCharProps {
  icon: ReactNode;
  title: string;
  data: any[];
}

const CustomPieChar: React.FC<CustomPieCharProps> = ({ icon, title, data }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        {<h3 className="text-gray-900">{title}</h3>}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent! * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CustomPieChar;
