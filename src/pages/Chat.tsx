// FILE: src/pages/Chat.tsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Mic, Bot, User, Sparkles } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { mockData } from '../utils/mockData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '../utils/cn';

export function Chat() {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { conversations, activeConversationId, isStreaming, streamingContent, setActiveConversation, addMessage, setStreaming, setStreamingContent } = useChatStore();
  
  const activeConversation = conversations.find(c => c.id === activeConversationId) || mockData.chatConversations[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, streamingContent]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: input,
      timestamp: new Date().toISOString(),
      conversationId: activeConversation.id,
    };
    
    addMessage(activeConversation.id, userMessage);
    setInput('');
    setStreaming(true);
    setStreamingContent('');

    // Simulate streaming
    const response = `I've analyzed your request about "${input}". Here are my findings:

## Analysis Summary

Based on the available data, I can see patterns that suggest ${['potential compromise', 'normal activity', 'suspicious behavior', 'known threat indicators'][Math.floor(Math.random() * 4)]}.

### Key Findings
- **Severity**: ${['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)]}
- **Confidence**: ${(Math.random() * 0.3 + 0.7).toFixed(2)}
- **Systems Affected**: ${Math.floor(Math.random() * 10) + 1}

### Recommendations
1. Investigate further using available tools
2. Check related incidents for patterns
3. Review access logs for anomalies
4. Consider escalating if confirmed

Would you like me to take any specific action?`;

    let index = 0;
    const interval = setInterval(() => {
      if (index < response.length) {
        setStreamingContent(response.slice(0, index + 1));
        index += 3;
      } else {
        clearInterval(interval);
        setStreaming(false);
        addMessage(activeConversation.id, {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content: response,
          timestamp: new Date().toISOString(),
          conversationId: activeConversation.id,
          metadata: { model: 'gpt-4o', tokensUsed: 512, latency: 2.3, confidence: 0.92, sources: ['MITRE', 'VirusTotal'] },
          reasoning: 'Analyzed query and generated structured response with actionable recommendations',
        });
        setStreamingContent('');
      }
    }, 10);
  };

  const suggestedPrompts = [
    'Analyze the latest critical incident',
    'Show threat trends for this week',
    'Generate an executive summary',
    'Investigate IOC 192.168.1.100',
    'Run malware analysis on hash',
    'Compare with similar incidents',
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            AI Security Assistant
          </h1>
          <p className="text-muted text-sm">Conversational AI for security operations</p>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Sidebar */}
        <div className="w-64 hidden lg:flex flex-col gap-2 overflow-y-auto">
          <button className="w-full p-3 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-all">
            + New Conversation
          </button>
          {mockData.chatConversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setActiveConversation(conv.id)}
              className={cn(
                'w-full p-3 rounded-lg text-left text-sm transition-all',
                activeConversationId === conv.id 
                  ? 'bg-card border border-primary/30 text-foreground' 
                  : 'text-muted hover:bg-card/50 hover:text-foreground'
              )}
            >
              <div className="font-medium truncate">{conv.title}</div>
              <div className="text-xs text-muted mt-1">{conv.messages.length} messages</div>
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeConversation?.messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  'flex gap-3',
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                  msg.role === 'user' ? 'bg-primary/20' : 'bg-primary/10'
                )}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-primary" />}
                </div>
                <div className={cn(
                  'max-w-[80%] rounded-xl p-3',
                  msg.role === 'user' ? 'bg-primary/10 border border-primary/20' : 'bg-background/50 border border-border'
                )}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: ({ inline, className, children, ...props }: any) => {
                        const match = /language-(\\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter style={vscDarkPlus as any} language={match[1]} PreTag="div" {...props}>
                            {String(children).replace(/\\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-primary/10 px-1 py-0.5 rounded text-primary text-sm" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                    className="prose prose-invert prose-sm max-w-none"
                  >
                    {msg.content}
                  </ReactMarkdown>
                  {msg.metadata && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                      <span>{msg.metadata.model}</span>
                      <span>•</span>
                      <span>{msg.metadata.tokensUsed} tokens</span>
                      <span>•</span>
                      <span>{msg.metadata.latency}s</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isStreaming && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="bg-background/50 border border-border rounded-xl p-3 max-w-[80%]">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-invert prose-sm max-w-none"
                  >
                    {streamingContent}
                  </ReactMarkdown>
                  <div className="flex gap-1 mt-2">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(prompt)}
                  className="px-3 py-1.5 rounded-full bg-background border border-border text-xs text-muted hover:text-foreground hover:border-primary/30 transition-all whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-background border border-border text-muted hover:text-foreground transition-all">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about incidents, threats, or request analysis..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-all"
              />
              <button className="p-2 rounded-lg bg-background border border-border text-muted hover:text-foreground transition-all">
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={handleSend}
                disabled={isStreaming || !input.trim()}
                className="p-2 rounded-lg bg-primary text-background hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}