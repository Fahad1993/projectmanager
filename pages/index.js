import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const { data: session, status } = useSession()

  const loading = status === 'loading'

  if (loading) {
    return null
  }

  if (session) {
    router.push('/dashboard')
    return
  }

  return (
    <div>
      <Head>
        <title>Project Manager</title>
        <meta name='description' content='Project Manager' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='text-center '>
        <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Project Manager</h1>

        <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>The best way to manage your projects!</p>

        <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>Free 7 days trial then just <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-700 from-lime-400">$19.99/m</span></p>

        <div className='mt-10'>

          <a href='/api/auth/signin' class="inline-flex items-center justify-center p-5 text-base font-med text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
            <span class="w-full">Log in</span>
            <svg aria-hidden="true" class="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </a>

        </div>
      </div>
    </div>
  )
}