import React from "react";
import Head from "next/head";
import { NextContext } from "next";

type Props = {
    stack?: string
};

export default class Error extends React.Component<Props> {

    static getInitialProps({ err }: NextContext) {
        const stack = err && err.stack;
        return { stack };
    }

    render() {
        return (
            <div>
                <Head>
                    <title> Error </title>
                </Head>

                <h3> Error </h3>
                { this.props.stack }
            </div>
        );
    }
}
