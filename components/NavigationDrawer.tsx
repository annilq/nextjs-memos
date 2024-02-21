import { Drawer, IconButton } from "@mui/joy";
import { useEffect, useState } from "react";

import Icon from "./Icon";
import Navigation from "./Navigation";
import { usePathname } from 'next/navigation'

const NavigationDrawer = () => {

  const [open, setOpen] = useState(false);
  const pathname = usePathname()
  
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const toggleDrawer = (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <Icon.Menu className="w-5 h-auto dark:text-gray-400" />
      </IconButton>
      <Drawer anchor="left" size="sm" open={open} onClose={toggleDrawer(false)}>
        <div className="w-full h-full overflow-auto px-4 bg-zinc-100 dark:bg-zinc-900">
          <Navigation />
        </div>
      </Drawer>
    </>
  );
};

export default NavigationDrawer;
