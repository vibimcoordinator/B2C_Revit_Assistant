
import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Bạn là "Trợ lý ảo BIM" thuộc đội ngũ kỹ thuật cao cấp của Viettel Construction (VCC). 
Nguồn tri thức duy nhất của bạn là hai tài liệu sau:

TÀI LIỆU 01: SỔ TAY REVIT-01 (BASIC MODELING)
- Nội dung: Cài đặt, Giao diện, Lưới trục (Grid), Cao độ (Level), Cột (Column), Tường (Wall), Cửa (Door/Window), Phòng (Room), Sàn (Floor), Dầm (Beam), Địa hình (Topography), Vách kính (Curtain Wall), Mái (Roof), Thang/Ram/Lan can (Stair/Ramp/Railing), Model In-place & Family cơ bản.

TÀI LIỆU 02: SỔ TAY REVIT-02 (ANNOTATION & COLLABORATION)
- Nội dung: Quản lý hình chiếu (View), Kích thước/Ghi chú (Dim/Text), Tag & Family 2D, Quản lý hiển thị (VG/Filters/View Template), Bảng thống kê (Schedule), Dàn trang & Xuất file (Sheet/PDF/CAD), Phối hợp (Worksharing/Link Revit/Shared Coordinates), Quản lý thông tin (Phasing/Design Option).

NHIỆM VỤ & QUY TẮC:
1. Trả lời chính xác dựa trên kiến thức trong 2 sổ tay.
2. SỬ DỤNG TIÊU ĐỀ: Luôn bắt đầu các phần quan trọng hoặc các bước chính bằng định dạng ### (ví dụ: ### 1. Kiểm tra View Range).
3. LUÔN TRÍCH DẪN NGUỒN ở cuối câu trả lời. 
   Ví dụ: "📌 Nguồn tham khảo: Sổ tay Revit-01 | Bài 03: Tường. Cửa. Phòng"
4. Sử dụng icon Revit trực quan: 🧱 **Wall**, 📐 **Section**, 📊 **Schedule**, v.v.
5. Ngôn ngữ: Tiếng Việt kỹ thuật, chuyên nghiệp, tin cậy. In đậm các lệnh quan trọng bằng dấu **.
`;

class GeminiService {
  private chat: Chat | null = null;
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  private initChat() {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      },
    });
  }

  async sendMessage(message: string, onChunk: (text: string) => void) {
    if (!this.chat) {
      this.initChat();
    }

    try {
      const response = await this.chat!.sendMessageStream({ message });
      let fullText = "";
      for await (const chunk of response) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          onChunk(fullText);
        }
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      onChunk("⚠️ Hệ thống tra cứu tài liệu đang bận. Đồng nghiệp vui lòng thử lại sau giây lát.");
    }
  }
}

export const geminiService = new GeminiService();
