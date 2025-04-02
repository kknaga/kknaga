"use client";
import { useState, useEffect } from "react";
import { ProjectAnalyticsChart } from "./ProjectAnalyticsChart";
import { CloudflareAnalytics } from "../page";
import styles from "../page.module.scss";

interface AnalyticsOverviewProps {
  analyticsData: CloudflareAnalytics[];
}

export function AnalyticsOverview({ analyticsData }: AnalyticsOverviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="analytics-placeholder">Loading analytics...</div>;
  }

  const combinedData = createCombinedAnalytics(analyticsData);

  const totalVisitors = combinedData.reduce((sum, day) => sum + day.count, 0);
  const avgDailyVisitors = Math.round(totalVisitors / combinedData.length);

  const peakDay = [...combinedData].sort((a, b) => b.count - a.count)[0];
  const peakDayFormatted = new Date(peakDay?.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className={styles.combinedAnalyticsCard}>
      <div className={styles.statsOverview}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Unique Visitors (30d)</span>
          <span className={styles.statValue}>
            {totalVisitors.toLocaleString()}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Avg Daily</span>
          <span className={styles.statValue}>
            {avgDailyVisitors.toLocaleString()}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Peak Day</span>
          <span className={styles.statValue}>
            {peakDay
              ? `${peakDayFormatted} (${peakDay.count.toLocaleString()})`
              : "-"}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Active Projects</span>
          <span className={styles.statValue}>{analyticsData.length}</span>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ProjectAnalyticsChart
          data={combinedData}
          color="#8C6E54"
          showArea={true}
        />
      </div>
    </div>
  );
}

// Helper function to combine analytics data from all projects
function createCombinedAnalytics(
  analyticsData: CloudflareAnalytics[]
): { date: string; count: number }[] {
  if (!analyticsData.length) return [];

  const template = analyticsData[0].visitors.map((v) => ({
    date: v.date,
    count: 0,
  }));

  return template.map((dayTemplate, index) => {
    const combinedCount = analyticsData.reduce((sum, project) => {
      const projectDay = project.visitors.find(
        (v) => v.date === dayTemplate.date
      );
      return sum + (projectDay?.count || 0);
    }, 0);

    return {
      date: dayTemplate.date,
      count: combinedCount,
    };
  });
}
