import {
  PieChart,
  ArrowRightLeft,
  Target,
  MessageCircle,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

const navMain = [
  {
    title: "后台首页",
    url: "/",
    icon: Settings2,
    isActive: true,
  },
  {
    title: "交易管理",
    url: "/transactions",
    icon: ArrowRightLeft,
    isActive: true,
  },
  {
    title: "储蓄目标",
    url: "/goals",
    icon: Target,
    isActive: true,
  },
  {
    title: "预算分析",
    url: "/budgets",
    icon: PieChart,
    isActive: true,
  },
  {
    title: "智能教练",
    url: "/coach",
    icon: MessageCircle,
    isActive: true,
  },
];
export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>导航</SidebarGroupLabel>
      <SidebarMenu>
        {navMain.map((nav1, index) => (
          <Link key={index} href={nav1.url}>
          <SidebarMenuButton>
            {nav1.icon ? <nav1.icon className="mr-2" /> : null}
            <span className="group-hover:text-primary"> {nav1.title} </span>
          </SidebarMenuButton>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
export default NavMain;
