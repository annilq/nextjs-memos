"use client"

import { Button, IconButton, Tooltip } from "@mui/joy";
import useLocalStorage from "react-use/lib/useLocalStorage";
import * as Icon from "lucide-react";
import Navigation from "@/components/Navigation";

import useResponsiveWidth from "@/hooks/useResponsiveWidth";
import { cn } from "@/utils/utils";
import MobileHeader from "./MobileHeader";

function Layout(props: { children: React.ReactNode }) {
  const { sm } = useResponsiveWidth();
  const [collapsed, setCollapsed] = useLocalStorage<boolean>("navigation-collapsed", false);

  return (
    <div
      className={cn(
        "w-full transition-all mx-auto flex flex-row justify-center items-start",
        collapsed ? "sm:pl-16" : "sm:pl-56",
      )}
    >
      {sm && (
        <div
          className={cn(
            "group flex flex-col justify-start items-start fixed top-0 left-0 select-none border-r dark:border-zinc-800 h-full bg-zinc-50 dark:bg-zinc-800 dark:bg-opacity-40 transition-all hover:shadow-xl z-2",
            collapsed ? "w-16 px-2" : "w-56 px-4",
          )}
        >
          <Navigation className="!h-auto" collapsed={collapsed} />
          <div className={cn("w-full grow h-auto flex flex-col justify-end", collapsed ? "items-center" : "items-start")}>
            <div
              className={cn("py-3 flex flex-col justify-center items-center")}
              onClick={() => setCollapsed(!collapsed)}
            >
              {!collapsed ? (
                <Button variant="plain" color="neutral" startDecorator={<Icon.ChevronLeft className="w-5 h-auto opacity-70" />}>
                  Collapse
                </Button>
              ) : (
                <Tooltip title="Expand" placement="right" arrow>
                  <IconButton>
                    <Icon.ChevronRight className="w-5 h-auto opacity-70" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      )}
      <main className="w-full h-auto min-h-full flex-grow shrink flex flex-col justify-start items-center">
        {!sm && <MobileHeader />}
        <div className="w-full h-auto p-2">
          {props.children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
