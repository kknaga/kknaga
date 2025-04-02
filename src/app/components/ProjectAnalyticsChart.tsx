"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

type VisitorData = {
  date: string;
  count: number;
};

interface ProjectAnalyticsChartProps {
  data: VisitorData[];
  simplified?: boolean;
  color?: string;
  showArea?: boolean;
}

export function ProjectAnalyticsChart({
  data,
  simplified = false,
  color = "#8C6E54",
  showArea = false,
}: ProjectAnalyticsChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="chart-placeholder"
        style={{ height: simplified ? "100px" : "200px" }}
      ></div>
    );
  }

  const gradientColors = {
    start: "#fdefc8",
    end: "#8C6E54",
  };

  if (simplified) {
    return (
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="count"
            stroke={color}
            fillOpacity={1}
            fill="url(#colorCount)"
            strokeWidth={2}
          />
          <Tooltip
            formatter={(value) => [`${value} visitors`, "Visitors"]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString();
            }}
            contentStyle={{
              backgroundColor: "#fdefc8",
              borderColor: color,
              color: "#8C6E54",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (showArea) {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#8C6E54" }}
            tickFormatter={(tickItem) => {
              const date = new Date(tickItem);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
            interval={5}
            stroke="#8C6E54"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#8C6E54" }}
            stroke="#8C6E54"
            width={40}
          />
          <Tooltip
            formatter={(value) => [
              `${value.toLocaleString()} visitors`,
              "Visitors",
            ]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString();
            }}
            contentStyle={{
              backgroundColor: "#fdefc8",
              borderColor: color,
              color: "#8C6E54",
            }}
          />
          <Legend wrapperStyle={{ color: "#8C6E54" }} />
          <Area
            type="monotone"
            dataKey="count"
            name="Unique Visitors"
            stroke={color}
            fill="url(#colorGradient)"
            strokeWidth={2}
            activeDot={{ r: 6, fill: color, stroke: "#fdefc8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: "#8C6E54" }}
          tickFormatter={(tickItem) => {
            const date = new Date(tickItem);
            return `${date.getDate()}/${date.getMonth() + 1}`;
          }}
          interval={5}
          stroke="#8C6E54"
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#8C6E54" }}
          stroke="#8C6E54"
          width={40}
        />
        <Tooltip
          formatter={(value) => [
            `${value.toLocaleString()} visitors`,
            "Visitors",
          ]}
          labelFormatter={(label) => {
            const date = new Date(label);
            return date.toLocaleDateString();
          }}
          contentStyle={{
            backgroundColor: "#fdefc8",
            borderColor: color,
            color: "#8C6E54",
          }}
        />
        <Legend wrapperStyle={{ color: "#8C6E54" }} />
        <Line
          type="monotone"
          dataKey="count"
          name="Unique Visitors"
          stroke={color}
          activeDot={{ r: 6, fill: color, stroke: "#fdefc8" }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
