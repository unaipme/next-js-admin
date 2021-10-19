import Document, { Html, Head, Main, NextScript } from "next/document";

export default class _Document extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <style jsx global>{`
                        #__next {
                            height: 100%;
                        }
                    `}</style>
                    <link rel="stylesheet" href="nprogress.css" />
                </Head>
                <body style={{ margin: 0, height: "100vh" }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}