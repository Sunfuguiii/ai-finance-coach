import { ChevronDown, PieChart } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Plus, Home } from "lucide-react";

export function NavNexr() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>项目</SidebarGroupLabel>

      <SidebarMenu>
        <Collapsible className="group/collapsible">
          <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <PieChart className="mr-2" />
            <span className="group-hover:text-primary"> 项目管理 </span>
            <ChevronDown   className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
          </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>  
            <SidebarMenuSub>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>项目1</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>项目2</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>项目3</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenuSub>
          </CollapsibleContent>

        </Collapsible>
      </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Home />
                  <span>Home</span>
                </a>
              </SidebarMenuButton>
              <SidebarMenuAction>
                <Plus /> <span className="sr-only">Add Project</span>
              </SidebarMenuAction>
            </SidebarMenuItem>
          </SidebarMenu>
    </SidebarGroup>
  );
}
export default NavNexr;
