import { Home, NotebookPen, Settings, SquarePen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  // { title: "ホーム", url: "/protected", icon: Home },
  { title: "日報を書く", url: "/", icon: SquarePen },
  { title: "日報を読む", url: "/reports", icon: NotebookPen },
  { title: "週報・月報を読む", url: "/periodic_reports", icon: NotebookPen },
  { title: "設定", url: "/", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="pt-6">
        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
