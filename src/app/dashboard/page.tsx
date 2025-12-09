"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { useDashboard } from "@/components/providers/dashboard-provider";

export default function DashboardPage() {
  const { organization } = useDashboard();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {organization?.name ? `${organization.name}'s` : "Your"} AI employee performance this week
        </p>
      </div>

      <StatsCards />

      <ActivityFeed />
    </div>
  );
}
