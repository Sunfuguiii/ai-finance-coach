import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { AvatarWithBadge } from "@/components/AvatarWithBadge";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import {
  BadgeCheck,
  BadgeCheckIcon,
  Bell,
  BellIcon,
  ChevronsUpDown,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";


export function UserDetails(props: any) {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { isLogin, userinfo } = props;
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userinfo");
    router.push("/login");
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* 外层：整个用户区域作为下拉菜单触发器 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* 唯一的一个按钮，包含头像、用户名、图标 */}
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <AvatarWithBadge />
              <div className="ml-2 flex flex-col items-start">
                <span className="font-bold">
                  {isLogin? userinfo.nickname : "未登录"}
                </span>
                <span className="text-sm text-foreground-2">
                  {isLogin? userinfo.email : "请登录"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* 下拉菜单内容 */}
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-width-0] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={8}
          >
            <DropdownMenuLabel>
              <div className="flex items-center gap-2 text-left text-sm">
                <Avatar>
                  <AvatarWithBadge />
                </Avatar>
                <div className="ml-2 flex flex-col items-start">
                  <span className="font-bold">
                    {isLogin? userinfo.nickname : "未登录"}
                  </span>
                  <span className="text-sm text-foreground-2">
                    {isLogin? userinfo.email : "请登录"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* 升级 */}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                升级到专业版
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* 账户、通知 */}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                账户
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                通知
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* 退出登录 */}
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default UserDetails;
