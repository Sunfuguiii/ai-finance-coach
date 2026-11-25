import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, GalleryVerticalEnd, AudioWaveform, Command } from "lucide-react";

import { ChevronDown, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus, Home } from "lucide-react";
import AvatarWithBadge from "@/components/AvatarWithBadge";
import UserDetails from "@/components/UserDetails";
import NavMain from "@/components/NavMain";
import NavNext from "@/components/NavNexr";

export function AppSidebar(props: any) {
  return (
    <Sidebar collapsible="icon">
      {/* 侧边栏头 */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* 下拉菜单触发按钮 */}
            {/* <DropdownMenuTrigger asChild> */}
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
              {/* 用户头像 */}
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>

              {/* 团队名称 */}
              <div className="ml-2 flex flex-col items-start">
                <span className="font-bold">Smart-Wealth</span>
                <span className="text-xs">智能财富管理</span>
              </div>
            </SidebarMenuButton>
            {/* </DropdownMenuTrigger> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* 侧边栏内容 */}
      <SidebarContent>
        <SidebarGroup>
          <NavMain />
        </SidebarGroup>
        <SidebarGroup>
          <NavNext />
        </SidebarGroup>
      </SidebarContent>

      {/* 侧边栏脚部 */}
      <SidebarFooter>
        <UserDetails {...props} />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
