"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboard } from "@/components/providers/dashboard-provider";
import {
  Mic,
  MessageSquare,
  BookOpen,
  Users,
  Play,
  Pencil,
  Upload,
  FileText,
  Link,
  ChevronRight,
  Sparkles,
  PhoneIncoming,
  PhoneOutgoing,
  MessageCircle,
  Send,
  Clock,
  Calendar,
} from "lucide-react";

// Mock data for scripts - now organized by inbound/outbound
const mockScripts = {
  voice: {
    inbound: {
      greeting: "Hi, thanks for calling! I'm your AI assistant. How can I help you today?",
      afterHours: "Thanks for calling! We're currently closed. Our hours are Monday-Friday, 9am-5pm. Would you like to leave a message?",
      holdMessage: "Thanks for holding. I'm still looking into that for you. Just a moment longer.",
    },
    outbound: {
      appointmentReminder: "Hi {{first_name}}, this is a reminder about your appointment tomorrow at {{time}}. Reply to confirm or reschedule.",
      followUpCall: "Hi {{first_name}}, I'm calling from Acme Plumbing to follow up on your recent inquiry. Do you have a moment?",
    },
  },
  text: {
    inbound: {
      autoReply: "Hi! Thanks for texting. How can we help you today?",
      afterHoursReply: "Thanks for reaching out! We're currently closed but will respond first thing tomorrow.",
    },
    outbound: {
      missedCall: "Hi! Sorry we missed your call. How can we help you?",
      followUp1: "Hey {{first_name}}, just following up on your recent inquiry. Let us know if you have any questions!",
      followUp7: "Hi {{first_name}}, we wanted to check in and see if you still need help with anything.",
      appointmentConfirm: "Your appointment is confirmed for {{date}} at {{time}}. Reply to reschedule.",
    },
  },
};

const mockVoice = {
  id: "rachel",
  name: "Rachel",
  description: "Female, Friendly",
};

interface ScriptCardProps {
  title: string;
  content: string;
  timing?: string;
}

function ScriptCard({ title, content, timing }: ScriptCardProps) {
  return (
    <div className="p-4 border rounded-lg space-y-3 hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{title}</p>
          {timing && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Clock className="h-3 w-3" />
              {timing}
            </p>
          )}
        </div>
        <Button variant="ghost" size="sm">
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </div>
      <p className="text-sm text-muted-foreground italic">
        &quot;{content.length > 100 ? content.slice(0, 100) + "..." : content}&quot;
      </p>
    </div>
  );
}

export default function EditAIPage() {
  const { organization } = useDashboard();

  const freeEdits = organization?.free_edits_remaining ?? 50;
  const freeRegens = organization?.free_regens_remaining ?? 10;
  const editsUsed = 50 - freeEdits;
  const regensUsed = 10 - freeRegens;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Your AI</h1>
        <p className="text-muted-foreground">
          Customize how your AI handles calls and texts
        </p>
      </div>

      {/* Voice AI Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-green-100">
                <Mic className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Voice AI</CardTitle>
                <CardDescription>Customize how your AI handles phone calls</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inbound" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="inbound" className="flex items-center gap-2">
                <PhoneIncoming className="h-4 w-4" />
                Inbound Calls
              </TabsTrigger>
              <TabsTrigger value="outbound" className="flex items-center gap-2">
                <PhoneOutgoing className="h-4 w-4" />
                Outbound Calls
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inbound" className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Scripts used when customers call your business
              </p>
              <div className="grid gap-4">
                <ScriptCard
                  title="Greeting"
                  content={mockScripts.voice.inbound.greeting}
                  timing="When customer calls"
                />
                <ScriptCard
                  title="After Hours Message"
                  content={mockScripts.voice.inbound.afterHours}
                  timing="Outside business hours"
                />
                <ScriptCard
                  title="Hold Message"
                  content={mockScripts.voice.inbound.holdMessage}
                  timing="When putting customer on hold"
                />
              </div>
            </TabsContent>

            <TabsContent value="outbound" className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Scripts used when AI calls customers
              </p>
              <div className="grid gap-4">
                <ScriptCard
                  title="Appointment Reminder"
                  content={mockScripts.voice.outbound.appointmentReminder}
                  timing="1 day before appointment"
                />
                <ScriptCard
                  title="Follow-up Call"
                  content={mockScripts.voice.outbound.followUpCall}
                  timing="For leads that haven't booked"
                />
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          {/* Voice Selection */}
          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-medium">AI Voice</p>
              <Button variant="ghost" size="sm">
                Change
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{mockVoice.name}</p>
                <p className="text-sm text-muted-foreground">{mockVoice.description}</p>
              </div>
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text AI Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-blue-100">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Text AI</CardTitle>
                <CardDescription>Customize your automated text messages</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-blue-600">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inbound" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="inbound" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Inbound Texts
              </TabsTrigger>
              <TabsTrigger value="outbound" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Outbound Texts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inbound" className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Auto-replies when customers text your business
              </p>
              <div className="grid gap-4">
                <ScriptCard
                  title="Auto-Reply"
                  content={mockScripts.text.inbound.autoReply}
                  timing="Immediate response"
                />
                <ScriptCard
                  title="After Hours Reply"
                  content={mockScripts.text.inbound.afterHoursReply}
                  timing="Outside business hours"
                />
              </div>
            </TabsContent>

            <TabsContent value="outbound" className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Automated texts sent to customers
              </p>
              <div className="grid gap-4">
                <ScriptCard
                  title="Missed Call Text"
                  content={mockScripts.text.outbound.missedCall}
                  timing="2 min after missed call"
                />
                <ScriptCard
                  title="Appointment Confirmation"
                  content={mockScripts.text.outbound.appointmentConfirm}
                  timing="After booking"
                />
              </div>

              {/* Drip Campaign */}
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Follow-Up Campaign</p>
                    <p className="text-xs text-muted-foreground">Automated drip sequence for leads</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      Day 1
                    </Badge>
                    <span className="text-muted-foreground truncate flex-1">
                      {mockScripts.text.outbound.followUp1.slice(0, 50)}...
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      Day 7
                    </Badge>
                    <span className="text-muted-foreground truncate flex-1">
                      {mockScripts.text.outbound.followUp7.slice(0, 50)}...
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Badge variant="outline" className="text-xs">Day 21</Badge>
                    <Badge variant="outline" className="text-xs">Day 30</Badge>
                    <span className="text-xs">+ 2 more</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Knowledge Base */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-purple-100">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Knowledge Base</CardTitle>
                <CardDescription>Help your AI learn about your business</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Upload documents</p>
              <p className="text-xs text-muted-foreground">PDF, TXT, or DOCX</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <FileText className="h-4 w-4 mr-1" />
                Upload PDF
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Link className="h-4 w-4 mr-1" />
                Add URL
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              No documents uploaded yet
            </p>
          </CardContent>
        </Card>

        {/* Contacts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-orange-100">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Contacts</CardTitle>
                <CardDescription>Manage your contact list</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">contacts</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV/Excel
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  View All Contacts
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Free Tier Usage */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Free AI Usage</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Script Edits</span>
                <span className="font-medium">{freeEdits}/50 remaining</span>
              </div>
              <Progress value={(editsUsed / 50) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Regenerations</span>
                <span className="font-medium">{freeRegens}/10 remaining</span>
              </div>
              <Progress value={(regensUsed / 10) * 100} className="h-2" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            After free tier: ~$0.05 per edit
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
