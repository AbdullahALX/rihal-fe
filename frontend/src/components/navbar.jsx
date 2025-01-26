import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@heroui/react';
import { Icon } from '@iconify/react';

export const AcmeLogo = () => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 11V1H9L9 11H13Z" fill="#ffffff" />
      <path d="M15 15V13L1 13V15L15 15Z" fill="#ffffff" />
      <path d="M7 5L7 11H3L3 5H7Z" fill="#ffffff" />
    </svg>
  );
};

const Nav = () => {
  return (
    <Navbar className="w-screen flex justify-center ">
      <NavbarBrand className="w-full flex flex-row">
        <Icon
          className="text-default-600"
          icon="ri:apps-2-ai-fill"
          width={20}
        />
        <p className="font-light text-inherit text-xl mx-2"> thinker</p>
      </NavbarBrand>

      <NavbarItem className="hidden sm:flex font-light w-full  justify-center items-center gap-4 ">
        <NavbarItem>
          <Link color="foreground" href="#">
            Overview
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link aria-current="page" color="foreground" href="#">
            Learn
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Support
          </Link>
        </NavbarItem>
      </NavbarItem>

      <NavbarContent as="div">
        {/* <Avatar
          as="button"
          className="transition-transform bg-black"
          name="Jason Hughes"
          size="sm"
          src="https://cdn.iconscout.com/icon/free/png-256/free-account-icon-download-in-svg-png-gif-file-formats--profile-user-avatar-travel-pack-holidays-icons-1538680.png?f=webp&w=256"
        /> */}
        <span className="font-light">Zajno</span>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Icon
              className="text-default-600"
              icon="solar:alt-arrow-down-outline"
              width={20}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">Zajno@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
