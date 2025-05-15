import './globals.css';
import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';
import Navbar from '@/components/layout/navbar';
import BackgroundScene from '@/components/three/background-scene';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', 
});

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Nexus Horizon - Futuristic Tech Interface',
  description: 'Experience the future of technology with our immersive 3D interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.className} cosmic-bg min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScrollProvider>
            <BackgroundScene />
            <div className="relative z-10">
              <Navbar />
              <main>{children}</main>
              <div id="portal-transition" className="portal-transition"></div>
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}