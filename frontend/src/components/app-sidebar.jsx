import * as React from 'react';
import {
  HelpCircleIcon,
  MapPlus,
  ChartLine,
  FolderInput,
  CircleArrowUp,
  UserRound,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Icon } from '@iconify/react';

import { useTheme } from '@/components/theme-provider';

const data = {
  navMain: [
    {
      title: 'Map',
      url: '#',
      icon: MapPlus,
    },

    {
      title: 'Analytics',
      url: '#',
      icon: ChartLine,
    },
    {
      title: 'Actions',
      url: '#',
      icon: CircleArrowUp,
    },
    {
      title: 'Reports',
      url: '#',
      icon: FolderInput,
    },
  ],

  navSecondary: [
    {
      title: 'Get Help',
      url: '#',
      icon: HelpCircleIcon,
    },
  ],
};

export function AppSidebar({ userData, ...props }) {
  const { theme } = useTheme();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Icon
                  className="text-default-600"
                  icon={
                    theme === 'dark'
                      ? 'vscode-icons:file-type-safetensors'
                      : 'vscode-icons:file-type-light-safetensors'
                  } // Adjust icon color
                  width={24}
                />
                <span className="text-base font-semibold">Crimify</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
