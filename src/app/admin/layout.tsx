/* eslint-disable react/no-unescaped-entities */
// app/admin/layout.tsx

import { getAdminUser } from "@/lib/auth";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();

  if (!user) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">Unauthorized</h1>
        <p>You don't have access to this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-brand-slate-800 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <nav className="space-y-2">
          <NavItem href="/admin/dashboard">Dashboard</NavItem>
          <NavItem href="/admin/users">Users</NavItem>
          <NavItem href="/admin/webinars">Webinars</NavItem>
          <NavItem href="/admin/resources">Resources</NavItem>
          <NavItem href="/admin/subscriptions">Subscriptions</NavItem>
          <NavItem href="/admin/transactions">Transactions</NavItem>
          <NavItem href="/admin/announcements">Announcements</NavItem>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-brand-cream-100">{children}</main>
    </div>
  );
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block py-2 px-3 rounded hover:bg-brand-slate-700 transition"
    >
      {children}
    </Link>
  );
}
