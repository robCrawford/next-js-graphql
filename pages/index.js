import React from "react";
import Head from "next/head";
import Link from "next/link";
import "../sass/styles.scss";

export default class extends React.Component {
    static async getInitialProps({ req }) {
        const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
        return { userAgent };
    }

    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>Welcome</title>
                </Head>
                <div> {this.props.userAgent.substring(0, 40)} </div>
                <img src="/static/rocket.png" width="50px" />
                <Link prefetch href="/list?q=test">
                    <a>List view</a>
                </Link>
            </React.Fragment>
        );
    }
}
