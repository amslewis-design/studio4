import { Metadata } from 'next';
import DashboardLayoutClient from './DashboardLayoutClient';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Admin Dashboard | Sassy Studio',
  description: 'Staff dashboard for managing content and brand identity.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
