import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatMessages, users, ChatMessage } from "@/data/mockData";
import { 
  Send,
  Smile,
  Paperclip,
  MoreVertical,
  Users,
  MessageCircle
} from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = users[0]; // Alex Johnson as current user

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: currentUser.name,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      avatar: currentUser.avatar
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      // Simulate a response from another team member
      const responses = [
        "Sounds good! 👍",
        "Thanks for the update!",
        "I'll take a look at that.",
        "Great work everyone! 🚀",
        "Let me know if you need any help.",
        "Perfect timing!",
        "That's exactly what we needed."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const randomUser = users[Math.floor(Math.random() * (users.length - 1)) + 1]; // Exclude current user
      
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: randomUser.name,
        message: randomResponse,
        timestamp: new Date().toISOString(),
        avatar: randomUser.avatar
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1500 + Math.random() * 2000); // Random delay between 1.5-3.5 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((acc, message) => {
    const date = new Date(message.timestamp).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {} as Record<string, ChatMessage[]>);

  const sortedDates = Object.keys(groupedMessages).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Chat</h1>
          <p className="text-muted-foreground">Real-time team communication</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{users.length} members</span>
          </div>
          <Button variant="outline" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Team Members Sidebar */}
        <Card className="lg:col-span-1 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                  {user.id === currentUser.id && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">You</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-3 shadow-card flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-accent" />
              General Chat
            </CardTitle>
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {sortedDates.map((date) => (
                  <div key={date}>
                    {/* Date Separator */}
                    <div className="flex items-center gap-4 my-4">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-xs text-muted-foreground bg-background px-2">
                        {formatDate(groupedMessages[date][0].timestamp)}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Messages for this date */}
                    {groupedMessages[date].map((message, index) => {
                      const isCurrentUser = message.sender === currentUser.name;
                      const showAvatar = index === 0 || 
                        groupedMessages[date][index - 1].sender !== message.sender;

                      return (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          {!isCurrentUser && showAvatar && (
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {message.avatar}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          {!isCurrentUser && !showAvatar && (
                            <div className="w-8 h-8 flex-shrink-0" />
                          )}
                          
                          <div className={`max-w-[70%] ${isCurrentUser ? 'order-1' : ''}`}>
                            {showAvatar && !isCurrentUser && (
                              <p className="text-xs text-muted-foreground mb-1 ml-1">
                                {message.sender}
                              </p>
                            )}
                            <div
                              className={`p-3 rounded-lg ${
                                isCurrentUser
                                  ? 'bg-primary text-primary-foreground ml-auto'
                                  : 'bg-muted text-foreground'
                              }`}
                            >
                              <p className="text-sm">{message.message}</p>
                              <p className={`text-xs mt-1 ${
                                isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                              }`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>

                          {isCurrentUser && showAvatar && (
                            <Avatar className="w-8 h-8 flex-shrink-0 order-2">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {message.avatar}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          {isCurrentUser && !showAvatar && (
                            <div className="w-8 h-8 flex-shrink-0 order-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        ...
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-primary flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}