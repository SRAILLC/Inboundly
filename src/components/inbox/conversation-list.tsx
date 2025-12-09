"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ConversationType = "call" | "text";
type ConversationStatus = "booked" | "replied" | "missed" | "pending" | "completed";

interface Conversation {
  id: string;
  type: ConversationType;
  contactName: string;
  contactPhone: string;
  lastMessage: string;
  timestamp: string;
  status: ConversationStatus;
  unread?: boolean;
}

const statusConfig: Record<ConversationStatus, { label: string; icon: React.ElementType; className: string }> = {
  booked: { label: "Booked", icon: Calendar, className: "bg-green-100 text-green-700" },
  replied: { label: "Replied", icon: CheckCircle, className: "bg-blue-100 text-blue-700" },
  missed: { label: "Missed", icon: XCircle, className: "bg-red-100 text-red-700" },
  pending: { label: "Pending", icon: Clock, className: "bg-yellow-100 text-yellow-700" },
  completed: { label: "Completed", icon: CheckCircle, className: "bg-gray-100 text-gray-700" },
};

// Mock data
const mockConversations: Conversation[] = [
  {
    id: "1",
    type: "call",
    contactName: "Sarah Martinez",
    contactPhone: "+1 415-555-1234",
    lastMessage: "I need someone to fix my leaking pipe under the kitchen sink...",
    timestamp: "Today 2:34 PM",
    status: "booked",
    unread: true,
  },
  {
    id: "2",
    type: "text",
    contactName: "Mike Davis",
    contactPhone: "+1 510-555-5678",
    lastMessage: "Thanks! I'll call back tomorrow",
    timestamp: "Today 1:15 PM",
    status: "replied",
  },
  {
    id: "3",
    type: "call",
    contactName: "Unknown Caller",
    contactPhone: "+1 628-555-9012",
    lastMessage: "Voicemail left, auto-text sent",
    timestamp: "Today 11:22 AM",
    status: "missed",
  },
  {
    id: "4",
    type: "text",
    contactName: "Jennifer Lee",
    contactPhone: "+1 650-555-3456",
    lastMessage: "What are your hours on Saturday?",
    timestamp: "Yesterday 4:45 PM",
    status: "replied",
  },
  {
    id: "5",
    type: "call",
    contactName: "Robert Johnson",
    contactPhone: "+1 408-555-7890",
    lastMessage: "AI answered: Discussed emergency plumbing services and pricing",
    timestamp: "Yesterday 2:10 PM",
    status: "completed",
  },
  {
    id: "6",
    type: "text",
    contactName: "Amy Chen",
    contactPhone: "+1 925-555-2345",
    lastMessage: "Do you offer free estimates?",
    timestamp: "Yesterday 10:30 AM",
    status: "pending",
    unread: true,
  },
];

interface ConversationItemProps {
  conversation: Conversation;
}

function ConversationItem({ conversation }: ConversationItemProps) {
  const StatusIcon = conversation.type === "call" ? Phone : MessageSquare;
  const statusInfo = statusConfig[conversation.status];

  return (
    <Link href={`/dashboard/inbox/${conversation.id}`}>
      <Card className={cn(
        "p-4 hover:bg-accent/50 transition-colors cursor-pointer",
        conversation.unread && "border-l-4 border-l-primary"
      )}>
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-full",
            conversation.type === "call" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
          )}>
            <StatusIcon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 min-w-0">
                <span className={cn(
                  "font-medium truncate",
                  conversation.unread && "font-semibold"
                )}>
                  {conversation.contactName}
                </span>
                {conversation.contactName === "Unknown Caller" && (
                  <span className="text-xs text-muted-foreground">
                    {conversation.contactPhone}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {conversation.timestamp}
              </span>
            </div>
            <p className={cn(
              "text-sm truncate mb-2",
              conversation.unread ? "text-foreground" : "text-muted-foreground"
            )}>
              {conversation.lastMessage}
            </p>
            <Badge variant="secondary" className={cn("text-xs", statusInfo.className)}>
              <statusInfo.icon className="h-3 w-3 mr-1" />
              {statusInfo.label}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}

interface ConversationListProps {
  conversations?: Conversation[];
  filter?: "all" | "calls" | "texts";
}

export function ConversationList({ conversations, filter = "all" }: ConversationListProps) {
  const data = conversations || mockConversations;

  const filteredData = data.filter((conv) => {
    if (filter === "all") return true;
    if (filter === "calls") return conv.type === "call";
    if (filter === "texts") return conv.type === "text";
    return true;
  });

  if (filteredData.length === 0) {
    const emptyMessage = {
      all: { icon: MessageSquare, title: "No conversations yet", desc: "When your AI handles calls and texts, they'll appear here." },
      calls: { icon: Phone, title: "No calls yet", desc: "Call transcripts and recordings will appear here." },
      texts: { icon: MessageSquare, title: "No texts yet", desc: "Text conversations will appear here." },
    };

    const empty = emptyMessage[filter];

    return (
      <Card>
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <empty.icon className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">{empty.title}</h3>
          <p className="text-sm text-muted-foreground max-w-sm">{empty.desc}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {filteredData.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
}
