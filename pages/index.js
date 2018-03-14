import React from "react";
import Head from "next/head";
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
                    <title>My page title</title>
                </Head>
                <div> {this.props.userAgent.substring(0, 40)} </div>
                <img src="/static/rocket.png" width="50px" />
                <div>
                    <a href="list">List view</a>
                </div>
            </React.Fragment>
        );
    }
}
