"use client";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Image from "next/image";
import logo from "@/public/logo-large.svg";
import homeLogo from "@/public/icon-nav-overview.svg";
import transactionsLogo from "@/public/icon-nav-transactions.svg";
import budgetsLogo from "@/public/icon-nav-budgets.svg";
import potsLogo from "@/public/icon-nav-pots.svg";
import recurringBillsLogo from "@/public/icon-nav-recurring-bills.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";

const items = [
  {
    name: "Overview",
    icon: homeLogo,
    href: "/",
  },
  {
    name: "Transactions",
    icon: transactionsLogo,
    href: "/transactions",
  },
  {
    name: "Budget",
    icon: budgetsLogo,
    href: "/budget",
  },
  {
    name: "Pots",
    icon: potsLogo,
    href: "/pots",
  },
  {
    name: "Recurring Bills",
    icon: recurringBillsLogo,
    href: "/recurring-bills",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="bg-grey-900 px-8 py-10">
        <Image src={logo} alt="Finance Logo" />
      </SidebarHeader>
      <SidebarContent className="bg-grey-900">
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      className={cn(
                        "space-x-4 px-8 py-4",
                        active && "bg-beige-100",
                      )}
                    >
                      <Image src={item.icon} alt={item.name} />
                      <Link
                        href={item.href}
                        className={cn(
                          "text-preset-3 text-grey-300 font-bold",
                          active && "text-grey-900",
                        )}
                      >
                        {item.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
