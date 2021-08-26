import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* <link rel="icon" href="data:," /> */}
                    <link rel="icon" type="image/png" href="/favicon/swt_favicon.png" />
                    <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
