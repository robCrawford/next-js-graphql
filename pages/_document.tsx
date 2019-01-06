import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {

    // _document is only rendered on the server side and not on the client side
    // Event handlers like onClick can't be added to this file
    render() {
        return (
            <html>
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
