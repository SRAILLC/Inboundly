"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ConversationList } from "@/components/inbox/conversation-list";
import { Search } from "lucide-react";

export default function InboxPage() {
  const [filter, setFilter] = useState<"all" | "calls" | "texts">("all");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inbox</h1>
        <p className="text-muted-foreground">
          All your conversations in one place
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search conversations..." className="pl-9" />
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="calls">Calls</TabsTrigger>
          <TabsTrigger value="texts">Texts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <ConversationList filter="all" />
        </TabsContent>
        <TabsContent value="calls" className="mt-4">
          <ConversationList filter="calls" />
        </TabsContent>
        <TabsContent value="texts" className="mt-4">
          <ConversationList filter="texts" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
