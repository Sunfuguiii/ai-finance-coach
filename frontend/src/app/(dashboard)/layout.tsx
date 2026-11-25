"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {const router = useRouter();
  //判断是否登录
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const logininfo = localStorage.getItem("logininfo");
    if (token && logininfo) {
      setIsAuth(true);
      setUser(JSON.parse(logininfo));
    } else {
      setIsAuth(false);
    }
    setIsLoading(false);
  }, [router]);
  return (
    
   
        <SidebarProvider>
              {/* 左侧菜单栏 */}
              <AppSidebar isLogin={isAuth} userinfo={user} />
          <SidebarInset>
            
            <div className="flex-1">{children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      
  );
}
