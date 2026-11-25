import Header from "@/components/Header";
import { CoachChat } from "@/components/coach/CoachChat";

// 储蓄目标页面
export default function Coach() {
  return (
    <div className="flex flex-col h-screen">
      <Header menuName="财务教练" />
      <div className="flex-1 overflow-hidden">
        <CoachChat />
      </div>
    </div>
  );
}