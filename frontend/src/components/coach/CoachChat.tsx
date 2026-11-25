"use client";
import { useState, useEffect } from "react";
import { ChatMessage, ChatRequest, ChatResponse } from "@/types/chat";
import { Bot, Trash2, User, Send, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatApi } from "@/lib/chat-api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

export function CoachChat() {
  // 聊天记录
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [clearDialogOpen, setClearDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          role: "assistant",
          content:
            "你好！我是你的智能财务教练。我可以帮你分析预算、提供理财建议。请问有什么可以帮你的吗？",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setIsLoading(true);

    // 封装发送消息
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    // 同步到聊天消息列表
    // 注意：累加问题
    // setMessages([...messages, userMessage]);
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");

    try {
      // 发送消息给OpenAI
      const response = await chatApi.sendMessage({ messages: inputMessage });
      
      
      // 封装返回消息
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
      };

      // 同步到聊天消息列表
      //   setMessages([...messages, assistantMessage]);
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: "抱歉，我无法回答你的问题。请稍后再试。",
        timestamp: new Date(),
      };
      //   setMessages([...messages, assistantMessage]);
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 清空聊天记录
  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "你好！我是你的智能财务教练。我可以帮你分析预算、提供理财建议。请问有什么可以帮你的吗？",
        timestamp: new Date(),
      },
    ]);
    setClearDialogOpen(false);
    toast.success("聊天记录已清空");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 聊天区域 列表 */}
      <Card className="flex-1 flex flex-col rounded-none border-0 shadow-none">
        {/* 标题栏 */}
        <CardHeader className="pb-3 border-b bg-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <div>
                <span>智能财务教练</span>
                <p className="text-xs text-gray-500 font-normal mt-1">
                  基于你的财务数据提供个性化建议
                </p>
              </div>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-600 hover:bg-red-50"
              title="清空聊天记录"
              onClick={() => setClearDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* 聊天列表 */}
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4  from-gray-50 to-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === "user" ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </CardContent>

        {/* 快捷问题提示 */}
        {messages.length <= 1 && (
          <div className="px-6 pb-4">
            <p className="text-xs text-gray-500 mb-2">💡 你可以问我：</p>
            <div className="flex flex-wrap gap-2">
              {[
                "如何规划月度预算？",
                "怎样提高储蓄率？",
                "我的支出合理吗？",
                "有什么投资建议？",
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputMessage(question);
                  }}
                  className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors text-gray-700"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* 聊天输入框 */}
      <Card className="rounded-none border-t border-gray-200 shadow-lg">
        <CardContent className="p-4 bg-white">
          <div className="flex gap-3 items-center">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入你的财务问题..."
              className="min-h-[60] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              disabled={isLoading}
            />

            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 h-[60]"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 清空确认对话框 */}
      <AlertDialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认清空</AlertDialogTitle>
            <AlertDialogDescription>
              此操作将清空所有聊天记录，只保留欢迎消息。确定要继续吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearChat}
              className="bg-red-600 hover:bg-red-700"
            >
              确认清空
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
