"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  MessageSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PhoneIncoming,
  PhoneOutgoing,
  MessageCircle,
  Send,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type StatType = "calls" | "texts" | "bookings" | "usage";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

function StatCard({ title, value, description, icon: Icon, trend, onClick }: StatCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md hover:border-primary/50",
        "active:scale-[0.99]"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1">
          <p className="text-xs text-muted-foreground">{description}</p>
          {trend && (
            <span className={cn(
              "flex items-center text-xs font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-0.5" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-0.5" />
              )}
              {trend.value}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Mock breakdown data
const mockBreakdowns = {
  calls: {
    total: 47,
    inbound: 38,
    outbound: 9,
    recentItems: [
      { name: "Sarah Martinez", type: "inbound" as const, time: "2:34 PM", outcome: "Booked" },
      { name: "+1 510-555-1234", type: "inbound" as const, time: "11:22 AM", outcome: "Missed" },
      { name: "Mike Davis", type: "outbound" as const, time: "10:15 AM", outcome: "Reminder sent" },
      { name: "John Smith", type: "inbound" as const, time: "9:30 AM", outcome: "Question answered" },
    ],
  },
  texts: {
    total: 123,
    inbound: 45,
    outbound: 78,
    autoReplies: 32,
    dripCampaign: 33,
    manualSent: 13,
    recentItems: [
      { name: "Mike Davis", type: "inbound" as const, time: "1:15 PM", preview: "Thanks! I'll call back tomorrow" },
      { name: "Sarah Martinez", type: "outbound" as const, time: "12:50 PM", preview: "Your appointment is confirmed..." },
      { name: "Unknown", type: "outbound" as const, time: "11:30 AM", preview: "Hi! Sorry we missed your call..." },
    ],
  },
  bookings: {
    total: 12,
    fromInboundCalls: 8,
    fromOutboundCalls: 1,
    fromInboundTexts: 2,
    fromOutboundTexts: 1,
    recentItems: [
      { name: "Sarah Martinez", source: "Inbound Call", time: "Jan 15, 2pm", service: "Pipe repair" },
      { name: "Mike Davis", source: "Inbound Text", time: "Jan 16, 10am", service: "Water heater check" },
      { name: "John Smith", source: "Inbound Call", time: "Jan 17, 3pm", service: "Drain cleaning" },
    ],
  },
  usage: {
    total: 4.82,
    smsCount: 123,
    smsCost: 0.49,
    callMinutes: 89,
    callCost: 0.62,
    aiEdits: 3,
    aiCost: 0.00, // Free tier
    phoneFee: 1.00,
  },
};

interface BreakdownSheetProps {
  type: StatType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function BreakdownSheet({ type, open, onOpenChange }: BreakdownSheetProps) {
  if (!type) return null;

  const renderContent = () => {
    switch (type) {
      case "calls":
        const callData = mockBreakdowns.calls;
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <PhoneIncoming className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Inbound</span>
                </div>
                <p className="text-2xl font-bold text-green-700">{callData.inbound}</p>
                <p className="text-xs text-green-600">Customers called you</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <PhoneOutgoing className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Outbound</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">{callData.outbound}</p>
                <p className="text-xs text-blue-600">AI called customers</p>
              </div>
            </div>
            <Separator className="my-4" />
            <h4 className="font-medium mb-3">Recent Calls</h4>
            <div className="space-y-3">
              {callData.recentItems.map((item, i) => (
                <Link
                  key={i}
                  href={`/dashboard/inbox/${i + 1}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.type === "inbound" ? (
                      <PhoneIncoming className="h-4 w-4 text-green-600" />
                    ) : (
                      <PhoneOutgoing className="h-4 w-4 text-blue-600" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{item.outcome}</Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        );

      case "texts":
        const textData = mockBreakdowns.texts;
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Inbound</span>
                </div>
                <p className="text-2xl font-bold text-green-700">{textData.inbound}</p>
                <p className="text-xs text-green-600">Customers texted you</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Send className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Outbound</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">{textData.outbound}</p>
                <p className="text-xs text-blue-600">Sent to customers</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Outbound Breakdown</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="font-bold">{textData.autoReplies}</p>
                  <p className="text-xs text-muted-foreground">Auto-replies</p>
                </div>
                <div>
                  <p className="font-bold">{textData.dripCampaign}</p>
                  <p className="text-xs text-muted-foreground">Drip Campaign</p>
                </div>
                <div>
                  <p className="font-bold">{textData.manualSent}</p>
                  <p className="text-xs text-muted-foreground">Manual</p>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <h4 className="font-medium mb-3">Recent Texts</h4>
            <div className="space-y-3">
              {textData.recentItems.map((item, i) => (
                <Link
                  key={i}
                  href={`/dashboard/inbox/${i + 2}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.type === "inbound" ? (
                      <MessageCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Send className="h-4 w-4 text-blue-600" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">{item.preview}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </>
        );

      case "bookings":
        const bookingData = mockBreakdowns.bookings;
        return (
          <>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">Bookings by source</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2">
                    <PhoneIncoming className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Inbound Calls</span>
                  </div>
                  <span className="font-bold text-green-700">{bookingData.fromInboundCalls}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2">
                    <PhoneOutgoing className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Outbound Calls</span>
                  </div>
                  <span className="font-bold text-blue-700">{bookingData.fromOutboundCalls}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium">Inbound Texts</span>
                  </div>
                  <span className="font-bold text-emerald-700">{bookingData.fromInboundTexts}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Outbound Texts</span>
                  </div>
                  <span className="font-bold text-purple-700">{bookingData.fromOutboundTexts}</span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <h4 className="font-medium mb-3">Recent Bookings</h4>
            <div className="space-y-3">
              {bookingData.recentItems.map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <Badge variant="outline" className="text-xs">{item.source}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.time} • {item.service}</p>
                </div>
              ))}
            </div>
          </>
        );

      case "usage":
        const usageData = mockBreakdowns.usage;
        return (
          <>
            <div className="p-4 rounded-lg bg-muted/50 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Total This Week</span>
                <span className="text-2xl font-bold">${usageData.total.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">SMS Messages</p>
                    <p className="text-xs text-muted-foreground">{usageData.smsCount} messages @ $0.004/ea</p>
                  </div>
                </div>
                <span className="font-medium">${usageData.smsCost.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Call Minutes</p>
                    <p className="text-xs text-muted-foreground">{usageData.callMinutes} min @ $0.007/min</p>
                  </div>
                </div>
                <span className="font-medium">${usageData.callCost.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">AI Edits</p>
                    <p className="text-xs text-muted-foreground">{usageData.aiEdits} edits (free tier)</p>
                  </div>
                </div>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-sm">Phone Number</p>
                    <p className="text-xs text-muted-foreground">Monthly fee (prorated)</p>
                  </div>
                </div>
                <span className="font-medium">${usageData.phoneFee.toFixed(2)}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Prices are estimates</span>
              <Link href="/dashboard/account" className="text-primary hover:underline">
                View full billing →
              </Link>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const titles: Record<StatType, { title: string; description: string }> = {
    calls: { title: "Calls Breakdown", description: "Inbound and outbound calls this week" },
    texts: { title: "Texts Breakdown", description: "Inbound and outbound texts this week" },
    bookings: { title: "Bookings Breakdown", description: "Where your bookings came from" },
    usage: { title: "Usage Breakdown", description: "Cost breakdown for this week" },
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{titles[type].title}</SheetTitle>
          <SheetDescription>{titles[type].description}</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {renderContent()}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface StatsCardsProps {
  stats?: {
    calls: number;
    texts: number;
    bookings: number;
    usage: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const [selectedStat, setSelectedStat] = useState<StatType | null>(null);

  // Default to mock data if no stats provided
  const data = stats || {
    calls: 47,
    texts: 123,
    bookings: 12,
    usage: 4.82,
  };

  const cardData: (Omit<StatCardProps, 'onClick'> & { type: StatType })[] = [
    {
      type: "calls",
      title: "Calls",
      value: data.calls,
      icon: Phone,
      description: "this week",
      trend: { value: 12, isPositive: true },
    },
    {
      type: "texts",
      title: "Texts",
      value: data.texts,
      icon: MessageSquare,
      description: "this week",
      trend: { value: 8, isPositive: true },
    },
    {
      type: "bookings",
      title: "Bookings",
      value: data.bookings,
      icon: Calendar,
      description: "this week",
      trend: { value: 3, isPositive: true },
    },
    {
      type: "usage",
      title: "Usage",
      value: `$${data.usage.toFixed(2)}`,
      icon: DollarSign,
      description: "this week",
    },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            description={card.description}
            trend={card.trend}
            onClick={() => setSelectedStat(card.type)}
          />
        ))}
      </div>
      <BreakdownSheet
        type={selectedStat}
        open={selectedStat !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedStat(null);
        }}
      />
    </>
  );
}
