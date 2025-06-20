import { getCurrentUser } from '@/lib/getCurrentUser';
import DashboardLayoutClient from './DashboardLayoutClient';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return <DashboardLayoutClient user={user}>{children}</DashboardLayoutClient>;
}
