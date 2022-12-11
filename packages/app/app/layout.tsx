import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="m-0">{children}</body>
    </html>
  );
}

export default AppLayout;
