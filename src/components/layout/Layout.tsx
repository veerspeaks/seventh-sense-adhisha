import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface NavItem {
  name: string;
  active: boolean;
}

interface LayoutProps {
  children: ReactNode;
  navItems: NavItem[];
}

export const Layout = ({ children, navItems }: LayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col w-full bg-black">
      <Header navItems={navItems} />
      <main className="w-full flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}; 