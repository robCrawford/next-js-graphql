import React from "react";
import Head from "next/head";
import Link from "next/link";
import Rocket from "../components/Rocket";
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
                <Rocket launched="false" />
                <Link prefetch href="/launch?text=🌠">
                    <a>Launch</a>
                </Link>
            </React.Fragment>
        );
    }
}
