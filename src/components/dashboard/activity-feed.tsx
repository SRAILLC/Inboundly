"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Calendar, UserPlus, PhoneMissed } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ActivityType = "call_answered" | "call_missed" | "text_sent" | "booking" | "new_lead";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  contactName?: string;
}

const activityIcons: Record<ActivityType, React.ElementType> = {
  call_answered: Phone,
  call_missed: PhoneMissed,
  text_sent: MessageSquare,
  booking: Calendar,
  new_lead: UserPlus,
};

const activityColors: Record<ActivityType, string> = {
  call_answered: "bg-green-100 text-green-600",
  call_missed: "bg-red-100 text-red-600",
  text_sent: "bg-blue-100 text-blue-600",
  booking: "bg-purple-100 text-purple-600",
  new_lead: "bg-orange-100 text-orange-600",
};

// Mock data for demo
const mockActivities: Activity[] = [
  {
    id: "1",
    type: "booking",
    title: "Appointment booked",
    description: "Jan 15, 2pm - Plumbing inspection",
    timestamp: "2 min ago",
    contactName: "Sarah M.",
  },
  {
    id: "2",
    type: "call_answered",
    title: "AI answered call",
    description: "2 min 34 sec • Answered questions about pricing",
    timestamp: "15 min ago",
    contactName: "+1 415-555-1234",
  },
  {
    id: "3",
    type: "text_sent",
    title: "Follow-up text sent",
    description: "Day 7 drip campaign",
    timestamp: "1 hr ago",
    contactName: "Mike D.",
  },
  {
    id: "4",
    type: "new_lead",
    title: "New lead",
    description: "Inbound call",
    timestamp: "2 hrs ago",
    contactName: "+1 510-555-5678",
  },
  {
    id: "5",
    type: "call_missed",
    title: "Missed call",
    description: "Voicemail left • Auto-text sent",
    timestamp: "3 hrs ago",
    contactName: "+1 628-555-9012",
  },
];

interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  const Icon = activityIcons[activity.type];
  const colorClass = activityColors[activity.type];

  return (
    <div className="flex items-start gap-3 py-3">
      <div className={cn("p-2 rounded-full", colorClass)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium truncate">
            {activity.contactName && (
              <span className="font-semibold">{activity.contactName}</span>
            )}
            {activity.contactName && " • "}
            {activity.title}
          </p>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {activity.timestamp}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {activity.description}
        </p>
      </div>
    </div>
  );
}

interface ActivityFeedProps {
  activities?: Activity[];
  showViewAll?: boolean;
}

export function ActivityFeed({ activities, showViewAll = true }: ActivityFeedProps) {
  const data = activities || mockActivities;

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <div className="flex flex-col items-center justify-center text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No activity yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Once your AI starts handling calls and texts, you&apos;ll see all the activity here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        {showViewAll && (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/inbox">View All</Link>
          </Button>
        )}
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="divide-y">
            {data.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
