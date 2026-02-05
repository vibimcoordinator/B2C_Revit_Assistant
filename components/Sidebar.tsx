
import React from 'react';

interface SidebarProps {
  onShortcutClick: (cmd: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onShortcutClick }) => {
  const manuals = [
    {
      id: '01',
      title: 'Basic Modeling',
      color: 'bg-emerald-500',
      topics: ['Hệ định vị & Cột', 'Tường, Cửa & Phòng', 'Sàn, Dầm & Địa hình', 'Vách kính & Mái', 'Thang, Ram & Lan can']
    },
    {
      id: '02',
      title: 'Annotation & BIM',
      color: 'bg-amber-500',
      topics: ['Quản lý hình chiếu', 'Ghi chú & Kích thước', 'Tag & Bảng thống kê', 'Dàn trang & Xuất file', 'Làm việc nhóm (Worksharing)']
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#004B8D] w-80 hidden lg:flex text-white border-r border-white/10 shadow-xl">
      <div className="p-6 border-b border-white/10 bg-[#003d73]">
        <h2 className="text-xl font-black flex items-center gap-3 tracking-tighter uppercase italic">
          <span className="w-2.5 h-7 bg-[#ee0033] skew-x-[-15deg]"></span>
          VCC BIM LIBRARY
        </h2>
        <p className="text-[10px] text-blue-200 mt-1 font-bold opacity-80 uppercase tracking-widest text-center">Nguồn dữ liệu chuẩn hóa</p>
      </div>

      <div className="flex-grow overflow-y-auto p-4 custom-scrollbar space-y-6">
        {manuals.map((m) => (
          <section key={m.id} className="space-y-3">
            <div className="flex items-center gap-2 px-2">
              <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded ${m.color}`}>SỔ TAY {m.id}</span>
              <h3 className="text-xs font-black text-blue-100 uppercase tracking-tight">{m.title}</h3>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {m.topics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => onShortcutClick(`Hướng dẫn tôi về nội dung: ${topic} trong Sổ tay Revit-${m.id}`)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 border border-white/5 transition-all text-left group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-[#ee0033] transition-colors shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
                  <span className="text-[13px] font-medium text-blue-50 group-hover:text-white line-clamp-1">{topic}</span>
                </button>
              ))}
            </div>
          </section>
        ))}

        <div className="bg-[#ee0033]/10 border border-[#ee0033]/30 rounded-xl p-4 mt-6">
          <h4 className="text-[11px] font-bold text-[#ee0033] uppercase mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Lưu ý đồng nghiệp
          </h4>
          <p className="text-[11px] text-blue-100 leading-relaxed opacity-90">
            Dữ liệu được cập nhật theo phiên bản Revit 2021. Đối với các phiên bản cao hơn (2024-2026), vui lòng lưu ý các tính năng mới về Toposolid.
          </p>
        </div>
      </div>

      <div className="p-6 bg-[#003d73] border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden border-2 border-[#ee0033]">
             <svg width="34" height="34" viewBox="0 0 24 24" fill="#ee0033"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <div className="text-[10px] font-black text-[#ee0033] leading-tight uppercase tracking-tighter">Viettel Construction</div>
            <div className="text-[9px] text-blue-300 font-bold uppercase">BIM Support Team</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
