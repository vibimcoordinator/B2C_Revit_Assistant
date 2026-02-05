
import React from 'react';
import { Message } from '../types';
import { MANUAL_URLS } from '../constants';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  const renderFormattedContent = (content: string) => {
    if (!content) return null;
    
    // Xử lý hiển thị phần nguồn (Source), Bold text, và Headings (###)
    const parts = content.split(/(\*\*.*?\*\*|^### .*$|📌 Nguồn tham khảo:.*$)/gm);
    
    return parts.map((part, index) => {
      // Xử lý tiêu đề ###
      if (part.startsWith('### ')) {
        const headerText = part.replace('### ', '');
        return (
          <div key={index} className="font-black text-[#004B8D] text-base mt-4 mb-2 flex items-center gap-2 border-l-4 border-[#ee0033] pl-3 py-1 bg-slate-50 rounded-r-lg shadow-sm">
            {headerText}
          </div>
        );
      }

      // Xử lý chữ in đậm **...**
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return (
          <strong key={index} className={`font-bold ${isModel ? 'text-[#ee0033] bg-red-50 px-1 rounded mx-0.5 shadow-sm' : 'text-white underline underline-offset-4 decoration-white/40'}`}>
            {boldText}
          </strong>
        );
      }
      
      // Xử lý phần nguồn tham khảo thành Link
      if (part.startsWith('📌 Nguồn tham khảo:')) {
        const citationInfo = part.replace('📌 Nguồn tham khảo: ', '');
        const isManual01 = citationInfo.includes('Revit-01');
        const url = isManual01 ? MANUAL_URLS.REVIT_01 : MANUAL_URLS.REVIT_02;

        return (
          <div key={index} className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              Tài liệu kỹ thuật VCC
            </div>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              title="Nhấp để xem tài liệu gốc (PDF)"
              className="group flex items-center justify-between bg-slate-50 hover:bg-[#ee0033]/5 p-3 rounded-xl border border-slate-200 hover:border-[#ee0033]/30 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-slate-700 group-hover:text-[#ee0033] transition-colors line-clamp-1">
                  {citationInfo}
                </span>
                <span className="text-[9px] text-slate-400 font-medium group-hover:text-[#ee0033]/60">Mở tài liệu nguồn (.pdf)</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-100 group-hover:border-[#ee0033]/20 group-hover:text-[#ee0033] shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
            </a>
          </div>
        );
      }
      
      return part;
    });
  };

  return (
    <div className={`flex w-full mb-6 ${isModel ? 'justify-start' : 'justify-end animate-in fade-in slide-in-from-bottom-2'}`}>
      <div className={`flex max-w-[85%] sm:max-w-[80%] ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${isModel ? 'bg-[#ee0033] text-white mr-3' : 'bg-[#004B8D] text-white ml-3'}`}>
          {isModel ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          )}
        </div>
        <div className={`p-4 rounded-2xl shadow-sm border transition-all ${
          isModel 
            ? 'bg-white border-slate-200 text-slate-800 rounded-tl-none' 
            : 'bg-[#004B8D] border-[#004B8D] text-white rounded-tr-none'
        }`}>
          <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-[15px]">
            {renderFormattedContent(message.content)}
          </div>
          <div className={`text-[10px] mt-2 font-medium opacity-60 flex justify-between items-center ${isModel ? 'text-slate-500' : 'text-blue-100'}`}>
            <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            {isModel && <span className="text-[8px] bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-tighter">Verified by VCC</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
