import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Search, Plus, MoreVertical, Paperclip } from "lucide-react";
import { useState } from "react";

export default function Messages() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Jean Dupont",
      avatar: "👨",
      lastMessage: "Merci pour le produit!",
      timestamp: "Il y a 2 min",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Marie Martin",
      avatar: "👩",
      lastMessage: "Quand sera-t-il livré?",
      timestamp: "Il y a 1 heure",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Pierre Leclerc",
      avatar: "👨",
      lastMessage: "Avez-vous d'autres couleurs?",
      timestamp: "Il y a 3 heures",
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: "Sophie Bernard",
      avatar: "👩",
      lastMessage: "Je suis intéressée par votre cours",
      timestamp: "Hier",
      unread: 0,
      online: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Jean Dupont",
      text: "Bonjour, j'ai une question sur votre produit",
      timestamp: "10:30",
      isOwn: false,
    },
    {
      id: 2,
      sender: "Vous",
      text: "Bonjour! Je serais ravi de vous aider. Quelle est votre question?",
      timestamp: "10:32",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Jean Dupont",
      text: "Quelle est la garantie du produit?",
      timestamp: "10:33",
      isOwn: false,
    },
    {
      id: 4,
      sender: "Vous",
      text: "Le produit est couvert par une garantie de 2 ans",
      timestamp: "10:35",
      isOwn: true,
    },
    {
      id: 5,
      sender: "Jean Dupont",
      text: "Merci pour le produit!",
      timestamp: "10:40",
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // TODO: Send message via API
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communiquez avec vos clients et partenaires</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="p-4 h-full flex flex-col">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedConversation === conv.id
                        ? "bg-accent text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative text-2xl">{conv.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold truncate">{conv.name}</p>
                          {conv.unread > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm truncate ${
                          selectedConversation === conv.id ? "text-white/80" : "text-muted-foreground"
                        }`}>
                          {conv.lastMessage}
                        </p>
                        <p className={`text-xs ${
                          selectedConversation === conv.id ? "text-white/60" : "text-muted-foreground"
                        }`}>
                          {conv.timestamp}
                        </p>
                      </div>
                      {conv.online && (
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="p-4 h-full flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{conversations[selectedConversation - 1]?.avatar}</span>
                  <div>
                    <p className="font-semibold">{conversations[selectedConversation - 1]?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {conversations[selectedConversation - 1]?.online ? "En ligne" : "Hors ligne"}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-muted rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.isOwn
                          ? "bg-accent text-white rounded-br-none"
                          : "bg-muted text-foreground rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.isOwn ? "text-white/70" : "text-muted-foreground"
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Tapez votre message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.ctrlKey) {
                        handleSendMessage();
                      }
                    }}
                    className="resize-none"
                    rows={2}
                  />
                  <div className="flex flex-col gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="flex-1"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Appuyez sur Ctrl+Entrée pour envoyer
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
