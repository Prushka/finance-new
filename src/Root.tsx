import { AppShell } from "@mantine/core";
import {
  ArrowRightLeftIcon,
  ChartLineIcon,
  HomeIcon,
  PiggyBankIcon,
  WalletCardsIcon,
} from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";
import { Toaster } from "sonner";

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
  { label: "Budget", to: "/budget", icon: <PiggyBankIcon /> },
];

export default function Root() {
  return (
    <AppShell
      footer={{
        height: 56,
      }}
    >
      <AppShell.Main className="bg-gray-50">
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer>
        <nav className="h-full max-w-[600px] mx-auto grid grid-cols-5">
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
