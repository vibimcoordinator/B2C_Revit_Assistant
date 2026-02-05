
import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { geminiService } from './geminiService';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: '🏗️ Chào đồng nghiệp! Tôi là trợ lý BIM từ **Viettel Construction**.\n\nDữ liệu của tôi đã được đồng bộ hóa với:\n- 📗 **Sổ tay Revit-01**: Chuyên sâu về kỹ thuật dựng hình 3D chuẩn BIM.\n- 📘 **Sổ tay Revit-02**: Chuyên sâu về triển khai hồ sơ, quản lý hiển thị và làm việc nhóm.\n\nBạn cần tra cứu quy trình hay giải quyết sự cố kỹ thuật nào trong dự án hôm nay?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    let modelResponse: Message = {
      role: 'model',
      content: '',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelResponse]);

    await geminiService.sendMessage(content, (chunk) => {
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last.role === 'model') {
          return [...prev.slice(0, -1), { ...last, content: chunk }];
        }
        return prev;
      });
    });

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      {/* Sidebar */}
      <Sidebar onShortcutClick={handleSendMessage} />

      {/* Main Content */}
      <main className="flex flex-col flex-grow relative h-full">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-[#ee0033] p-2 rounded-lg text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-[#ee0033] uppercase tracking-tight">Viettel Construction</h1>
                <span className="bg-[#ee0033]/10 text-[#ee0033] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#ee0033]/20">BIM AI</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Đồng hành kiến tạo cuộc sống mới</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end border-r border-slate-200 pr-4">
              <span className="text-[10px] font-bold text-slate-400">TÀI LIỆU</span>
              <span className="text-[12px] font-bold text-[#004B8D]">REVIT 01 & 02</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#ee0033] border border-slate-200 shadow-inner">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 custom-scrollbar relative">
          {/* Watermark Background */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
             <svg width="450" height="450" viewBox="0 0 24 24" fill="none" stroke="#004B8D" strokeWidth="0.3"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          
          <div className="max-w-4xl mx-auto w-full relative z-10">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isLoading && messages[messages.length - 1].content === '' && (
              <div className="flex justify-start mb-6">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#ee0033] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#ee0033] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#ee0033] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <div className="max-w-4xl mx-auto w-full">
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            <div className="flex justify-between items-center mt-3">
              <p className="text-[10px] text-slate-400 font-medium">
                Dữ liệu thuộc sở hữu của Viettel Construction. Bảo mật nội bộ.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Knowledge Base Active</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
