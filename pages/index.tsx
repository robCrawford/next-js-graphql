import React from "react";
import Head from "next/head";
import Rocket from "../components/Rocket";
import Link from "next/link";
import { NextContext } from "next";
import "../sass/styles.scss";

type Props = {
    userAgent: string
}

export default class extends React.Component<Props> {

    static async getInitialProps({ req }: NextContext) {
        // On server: [ "pathname", "query", "asPath", "err", "req", "res" ]
        // On client: [ "pathname", "query", "asPath" ]
        return {
            userAgent: req ? req.headers["user-agent"] : navigator.userAgent
        };
    };

    render() {
        return (
            <div>
                <Head>
                    <title> Welcome </title>
                </Head>

                <h3> { this.props.userAgent } </h3>
                <Rocket launched={ false } />
                <Link href="/launch">
                    <a>Submit</a>
                </Link>
            </div>
        );
    }
}
