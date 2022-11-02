import { Navbar } from '../Components/Navbar'
import { Layout } from '../Layout/Layout'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
