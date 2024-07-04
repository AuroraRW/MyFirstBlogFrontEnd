import { useEffect, useRef } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0/client';

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import '@/styles/tailwind.css'
import 'focus-visible'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100" />
        </div>
      </div>
      <div className="relative">
        <UserProvider>
          <Header />
          <main>
            <Component previousPathname={previousPathname} {...pageProps} />
          </main>
          <Footer />
        </UserProvider>
      </div>
    </>
  )
}
