import { AppShell } from "@mantine/core";
import {
  ArrowRightCircle,
  ArrowRightLeftIcon,
  ChartLineIcon, ChevronLeftIcon, ChevronRightIcon,
  HomeIcon,
  PiggyBankIcon,
  WalletCardsIcon,
} from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";
import { Toaster } from "sonner";
import {useEffect, useState} from "react";

const NAV_BUTTONS = [
  { label: "Home", to: "/", icon: <HomeIcon /> },
  {
    label: "Transactions",
    to: "/transactions",
    icon: <ArrowRightLeftIcon />,
  },
  {
    label: "Accounts",
    to: "/accounts",
    icon: <WalletCardsIcon />,
    includes: ["accounts-add"],
  },
  { label: "Planning", to: "/planning", icon: <ChartLineIcon /> },
];

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


export default function Root() {
  const {width } = useWindowDimensions();

  return (
      width > 900 ? <div className={"flex w-full h-full items-center justify-center text-center p-6 gap-8"}>
        <ChevronRightIcon size={48}/>
        <h1 className={"text-xl font-medium"}>Welcome to Finance Fellas! 🥳<hr/>
          For the best experience, please view in <strong>a narrower window</strong> or <strong className={"font-bold"}>on your mobile device</strong> .</h1>
            <ChevronLeftIcon size={48}/>
      </div> :
    <AppShell
      footer={{
        height: 56,
      }}
    >
      <AppShell.Main className="bg-gray-50">
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer>
        <nav className="h-full max-w-[600px] mx-auto grid grid-cols-4">
          {NAV_BUTTONS.map(({ label, to, icon, includes }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => {
                if (includes) {
                  if (
                    includes.some((path) => window.location.hash.includes(path))
                  ) {
                    isActive = true;
                  }
                }
                return `h-full flex flex-col items-center justify-center ${isActive ? "text-black bg-gray-100" : "text-gray-500"} hover:text-black hover:bg-gray-100`;
              }}
            >
              {icon}
              <span className="text-xs">{label}</span>
            </NavLink>
          ))}
        </nav>

        <Toaster />
      </AppShell.Footer>
    </AppShell>
  );
}
