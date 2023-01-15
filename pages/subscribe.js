import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Script from 'next/script'

export default function Subscribe() {
  const router = useRouter()

  const { data: session, status } = useSession()

  const loading = status === 'loading'

  if (loading) {
    return null
  }

  if (!session) {
    router.push('/')
    return
  }

  if (session.user.isSubscriber) {
    router.push('/dashboard')
    return
  }

  return (
    <div>
      <Script src='https://js.stripe.com/v3/' />
      <Head>
        <title>Project Manager</title>
        <meta name='description' content='Private Area' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='text-center '>
        <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Project Manager</h1>

        <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>
          Join for just <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-300 from-lime-200">$19.99/m</span> Free trial for the first 7 days
        </p>

        <button
          className='inline-flex items-center justify-center p-5 text-base font-med text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2'
          onClick={async () => {
            const res = await fetch('/api/stripe/session', {
              method: 'POST',
            })

            const data = await res.json()
            if (data.status === 'error') {
              alert(data.message)
              return
            }

            const sessionId = data.sessionId
            const stripePublicKey = data.stripePublicKey

            const stripe = Stripe(stripePublicKey)
            stripe.redirectToCheckout({
              sessionId,
            })

          }}
        >
          Create a subscription
        </button>
      </div>
    </div>
  )
}