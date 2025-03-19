import React from 'react';
import { GalleryVerticalEnd } from 'lucide-react';
import { LoginForm } from '@/components/login-form';
import { Icon } from '@iconify/react';
import { useTheme } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';

const Login = () => {
  const { theme } = useTheme();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-light">
            <div className="flex h-6 w-6 items-center justify-center rounded-md">
              <Icon
                className="text-default-600"
                icon={
                  theme === 'dark'
                    ? 'vscode-icons:file-type-safetensors'
                    : 'vscode-icons:file-type-light-safetensors'
                } // Adjust icon color
                width={24}
              />
            </div>
            Crimify
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center ">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block ">
        <ModeToggle />
        <img
          src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/930b2765-2072-40d3-bf42-f7fc1802d568/76cd64bb-713b-490f-9103-ff94e7cf03f1.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale z-0"
        />
      </div>
    </div>
  );
};

export default Login;
