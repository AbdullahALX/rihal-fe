import { Outlet, Navigate } from 'react-router-dom';

import { AppSidebar } from '@/components/nav/app-sidebar';
import { SiteHeader } from '@/components/nav/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col ">
          <div className="@container/main flex flex-1 flex-col gap-2 ">
            <div className="flex   h-full w-full p-2">
              {/* <TheMap userData={userData} /> */}
              {location.pathname === '/' && <Navigate to="/map" replace />}

              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
