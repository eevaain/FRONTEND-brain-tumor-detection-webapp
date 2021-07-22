import Head from 'next/head'

import Header from '../components/header'
import Form from '../components/form'
 
export default function Home() {
  return (
    <div className="flex flex-col m-10">
      <Head>
        <title>Brain Tumor Detection Web App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header/>
        <Form/>
    </div>
  )
}
