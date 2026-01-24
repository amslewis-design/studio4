import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sassy Vault | Login',
  description: 'Staff portal for managing content and brand identity.',
  robots: 'noindex, nofollow',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
