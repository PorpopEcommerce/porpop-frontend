import './globals.css'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from './components/Sidebar';
import ClientLayout from './ClientLayout';
import { AuthProvider } from './context/AuthContext';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <section className='flex'>
            <aside>
              <Sidebar />
            </aside>
            <main className='flex-1 lg:ml-14 relative'>
              <ClientLayout>
                {children}
              </ClientLayout>
            </main>
          </section>
        </AuthProvider>

      </body>
    </html>
  )
}
