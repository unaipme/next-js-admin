import Head from 'next/head'

export default function Home() {
  return (
    <div style={{ height: "100%" }}>
      <Head>
        <title>Server-side rendering test</title>
      </Head>

      <main style={{ height: "100%", boxSizing: "content-box" }}>
        <h2 className="page_title">Dashboard</h2>
      </main>
    </div>
  )
}
