import Document, { Html, Head, Main, NextScript } from "next/document";

export default class _Document extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head />
                <body style={{ margin: 0, height: "100vh" }}>
                    <style jsx global>{`
                        #__next {
                            height: 100%;
                        }
                    `}</style>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}