import { AppShell } from "@mantine/core";
import {
  ChartLineIcon,
  HomeIcon,
  PiggyBankIcon,
  WalletCardsIcon,
} from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

const NAV_BUTTONS = [
  { label: "Home", to: "/", icon: <HomeIcon /> },
  { label: "Accounts", to: "/accounts", icon: <WalletCardsIcon /> },
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
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer>
        <nav className="h-full max-w-[600px] mx-auto grid grid-cols-4">
          {NAV_BUTTONS.map(({ label, to, icon }) => (
            <NavLink
              to={to}
              className={({ isActive }) => {
                return `h-full flex flex-col items-center justify-center ${isActive ? "text-black bg-gray-100" : "text-gray-500"} hover:text-black hover:bg-gray-100`;
              }}
            >
              {icon}
              <span className="text-xs">{label}</span>
            </NavLink>
          ))}
        </nav>
      </AppShell.Footer>
    </AppShell>
  );
}
