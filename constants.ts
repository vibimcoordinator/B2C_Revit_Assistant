
import { Shortcut, CommonError } from './types';

export const REVIT_SHORTCUTS: Shortcut[] = [
  { key: 'GR', command: 'Grid', description: 'Tạo lưới trục' },
  { key: 'LL', command: 'Level', description: 'Tạo cao độ' },
  { key: 'CL', command: 'Column', description: 'Bố trí cột' },
  { key: 'WA', command: 'Wall', description: 'Vẽ tường' },
  { key: 'DR', command: 'Door', description: 'Bố trí cửa đi' },
  { key: 'WN', command: 'Window', description: 'Bố trí cửa sổ' },
  { key: 'RM', command: 'Room', description: 'Đặt tên phòng' },
  { key: 'DI', command: 'Dimension', description: 'Ghi chú kích thước' },
  { key: 'VG', command: 'Visibility Graphics', description: 'Bảng quản lý hiển thị' },
  { key: 'BX', command: 'Section Box', description: 'Tạo mặt cắt phối cảnh 3D' },
  { key: 'TL', command: 'Thin Lines', description: 'Chế độ nét mảnh' },
  { key: 'EH', command: 'Hide Element', description: 'Ẩn đối tượng tạm thời' },
  { key: 'RH', command: 'Reveal Hidden', description: 'Hiện đối tượng bị ẩn' }
];

export const COMMON_ERRORS: CommonError[] = [
  {
    title: "Không thấy tường trên mặt bằng?",
    solutions: [
      "Kiểm tra View Range (Top, Cut Plane, Bottom).",
      "Kiểm tra bảng Visibility/Graphics Overrides (V+G) xem tab Model Categories đã bật Wall chưa.",
      "Kiểm tra Phase Filter và Phase Created của tường.",
      "Kiểm tra xem có đang bị ẩn bởi lệnh ẩn Element (EH) không."
    ]
  },
  {
    title: "Lỗi 'Reference Planes are overconstrained'?",
    solutions: [
      "Bạn đang gán quá nhiều biến kích thước vào cùng một hệ Reference Plane.",
      "Revit không thể tính toán khi các kích thước mâu thuẫn nhau (ví dụ: gán cả AB, BC và AC).",
      "Hãy xóa bớt 1 đường dim hoặc sử dụng Formula để liên kết chúng."
    ]
  }
];

export const MANUAL_URLS = {
  REVIT_01: 'https://vcc-bim-manuals.web.app/revit-01.pdf', // Thay bằng link thực tế
  REVIT_02: 'https://vcc-bim-manuals.web.app/revit-02.pdf'  // Thay bằng link thực tế
};
