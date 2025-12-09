"use client";

import { use, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Calendar,
  Play,
  Download,
  User,
  Clock,
  CheckCircle,
  Send,
  PhoneIncoming,
  PhoneOutgoing,
  MessageCircle,
  Loader2,
  PhoneCall,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock conversation data
const mockConversations: Record<string, {
  id: string;
  type: "call" | "text";
  direction: "inbound" | "outbound";
  contactName: string;
  contactPhone: string;
  status: string;
  timestamp: string;
  duration?: string;
  transcript?: string;
  messages?: { role: "ai" | "contact" | "user"; content: string; time: string }[];
  summary?: string;
  outcome?: string;
}> = {
  "1": {
    id: "1",
    type: "call",
    direction: "inbound",
    contactName: "Sarah Martinez",
    contactPhone: "+1 415-555-1234",
    status: "booked",
    timestamp: "Today 2:34 PM",
    duration: "2 min 34 sec",
    summary: "Customer called about a leaking pipe under their kitchen sink. AI scheduled an appointment for January 15th at 2pm.",
    outcome: "Appointment Booked",
    transcript: `AI: Hi, thanks for calling Acme Plumbing! I'm your AI assistant. How can I help you today?

Sarah: Hi, I have a leaking pipe under my kitchen sink. It's been dripping for a couple days now.

AI: I'm sorry to hear that! A leaking pipe can definitely be frustrating. I'd be happy to help you schedule an appointment with one of our plumbers. Do you know if it's a slow drip or more of a steady leak?

Sarah: It's more of a slow drip, but it's getting worse.

AI: Got it. It's good you're addressing it before it becomes a bigger issue. I have availability this week. Would Thursday work for you?

Sarah: Yes, Thursday would be great. What times do you have?

AI: I have 10am, 2pm, or 4pm available on Thursday. Which works best for you?

Sarah: 2pm works perfectly.

AI: Great! I've scheduled you for Thursday, January 15th at 2pm. Can I get your email for the confirmation?

Sarah: Sure, it's sarah.martinez@email.com

AI: Perfect! You're all set for Thursday at 2pm. You'll receive a confirmation email shortly. Is there anything else I can help you with?

Sarah: No, that's all. Thank you!

AI: You're welcome! We'll see you Thursday. Have a great day!`,
  },
  "2": {
    id: "2",
    type: "text",
    direction: "inbound",
    contactName: "Mike Davis",
    contactPhone: "+1 510-555-5678",
    status: "replied",
    timestamp: "Today 1:15 PM",
    messages: [
      { role: "contact", content: "Hi, do you guys do water heater repair?", time: "12:45 PM" },
      { role: "ai", content: "Hi Mike! Yes, we absolutely do water heater repair. We service all major brands including Rheem, AO Smith, and Bradford White. Is your water heater giving you trouble?", time: "12:46 PM" },
      { role: "contact", content: "Yeah it's not heating properly. How much would it cost to have someone look at it?", time: "12:50 PM" },
      { role: "ai", content: "We offer a $49 diagnostic fee which gets waived if you proceed with the repair. Most water heater repairs range from $150-$400 depending on the issue. Would you like to schedule a service call?", time: "12:51 PM" },
      { role: "contact", content: "Thanks! I'll call back tomorrow", time: "1:15 PM" },
    ],
  },
  "3": {
    id: "3",
    type: "call",
    direction: "inbound",
    contactName: "Unknown Caller",
    contactPhone: "+1 628-555-9012",
    status: "missed",
    timestamp: "Today 11:22 AM",
    duration: "0 min 15 sec",
    summary: "Missed call - voicemail left. Auto-text sent to follow up.",
    outcome: "Voicemail + Auto-text",
    transcript: `[Voicemail Recording]
"Hi, this is John. I'm calling about getting a quote for a bathroom remodel. Please call me back at this number. Thanks."`,
  },
};

export default function ConversationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const conversation = mockConversations[id];

  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [isInitiatingCall, setIsInitiatingCall] = useState(false);
  const [sentMessages, setSentMessages] = useState<{ content: string; time: string }[]>([]);

  if (!conversation) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/inbox" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Inbox
        </Link>
        <Card className="p-8 text-center">
          <h2 className="text-lg font-medium">Conversation not found</h2>
          <p className="text-muted-foreground">This conversation may have been deleted.</p>
        </Card>
      </div>
    );
  }

  const isCall = conversation.type === "call";

  const handleSendText = async () => {
    if (!messageText.trim()) return;

    setIsSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSentMessages(prev => [...prev, {
      content: messageText,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }]);
    setMessageText("");
    setIsSending(false);
  };

  const handleInitiateCall = async () => {
    setIsInitiatingCall(true);
    // Simulate API call to initiate click-to-call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsInitiatingCall(false);
    setShowCallDialog(false);
    // In production: Show toast "Call initiated - your phone will ring shortly"
  };

  const allMessages = [
    ...(conversation.messages || []),
    ...sentMessages.map(m => ({ role: "user" as const, content: m.content, time: m.time }))
  ];

  return (
    <div className="space-y-6">
      <Link href="/dashboard/inbox" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Inbox
      </Link>

      {/* Contact Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {conversation.contactName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{conversation.contactName}</h2>
                <p className="text-muted-foreground">{conversation.contactPhone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Direction Badge */}
              <Badge
                variant="outline"
                className={cn(
                  conversation.direction === "inbound"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-blue-200 bg-blue-50 text-blue-700"
                )}
              >
                {conversation.direction === "inbound" ? (
                  isCall ? <PhoneIncoming className="h-3 w-3 mr-1" /> : <MessageCircle className="h-3 w-3 mr-1" />
                ) : (
                  isCall ? <PhoneOutgoing className="h-3 w-3 mr-1" /> : <Send className="h-3 w-3 mr-1" />
                )}
                {conversation.direction === "inbound" ? "Inbound" : "Outbound"}
              </Badge>
              {/* Status Badge */}
              <Badge variant={conversation.status === "booked" ? "default" : "secondary"}>
                {conversation.status === "booked" && <Calendar className="h-3 w-3 mr-1" />}
                {conversation.status === "replied" && <CheckCircle className="h-3 w-3 mr-1" />}
                {conversation.outcome || conversation.status}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              {isCall ? <Phone className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
              {isCall ? "Phone Call" : "Text Conversation"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {conversation.timestamp}
            </span>
            {conversation.duration && (
              <span>Duration: {conversation.duration}</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Call Recording & Transcript */}
      {isCall && (
        <>
          {/* Summary Card */}
          {conversation.summary && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{conversation.summary}</p>
              </CardContent>
            </Card>
          )}

          {/* Recording Player */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Recording</span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Button size="icon" variant="secondary">
                  <Play className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <div className="h-2 bg-primary/20 rounded-full">
                    <div className="h-full w-0 bg-primary rounded-full" />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{conversation.duration}</span>
              </div>
            </CardContent>
          </Card>

          {/* Transcript */}
          {conversation.transcript && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                  {conversation.transcript}
                </pre>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Text Messages */}
      {!isCall && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              {allMessages.map((message, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    message.role === "ai" ? "justify-start" : "justify-end"
                  )}
                >
                  <div className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.role === "ai"
                      ? "bg-muted"
                      : message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-primary text-primary-foreground"
                  )}>
                    {message.role === "user" && (
                      <p className="text-xs mb-1 opacity-80 flex items-center gap-1">
                        <User className="h-3 w-3" /> You
                      </p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={cn(
                      "text-xs mt-1",
                      message.role === "ai"
                        ? "text-muted-foreground"
                        : message.role === "user"
                          ? "text-blue-200"
                          : "text-primary-foreground/70"
                    )}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Manual Text Input */}
            <Separator className="my-4" />
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendText();
                  }
                }}
                disabled={isSending}
                className="flex-1"
              />
              <Button
                onClick={handleSendText}
                disabled={!messageText.trim() || isSending}
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Messages you send here will be sent via your business phone number
            </p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="default" onClick={() => setShowCallDialog(true)}>
          <Phone className="h-4 w-4 mr-2" />
          Call Now
        </Button>
        {isCall && (
          <Button variant="outline" onClick={() => {
            // For calls, open a dialog to send a text
          }}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Text
          </Button>
        )}
        <Button variant="outline">
          <User className="h-4 w-4 mr-2" />
          View Contact
        </Button>
      </div>

      {/* Click-to-Call Dialog */}
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-green-600" />
              Call {conversation.contactName}
            </DialogTitle>
            <DialogDescription>
              We&apos;ll connect you to {conversation.contactPhone} through your business line.
              Your phone will ring first, then we&apos;ll connect you to the contact.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <p className="text-sm font-medium">How it works:</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Click &quot;Start Call&quot; below</li>
                <li>Your phone will ring</li>
                <li>Answer to be connected to {conversation.contactName}</li>
              </ol>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCallDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleInitiateCall} disabled={isInitiatingCall}>
              {isInitiatingCall ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Initiating...
                </>
              ) : (
                <>
                  <Phone className="h-4 w-4 mr-2" />
                  Start Call
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
