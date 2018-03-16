import React from "react";
import Head from "next/head";
import Link from "next/link";
import Rocket from "../components/Rocket";
import { gqlQuery } from "../services/graphql";
import "../sass/styles.scss";

export default class extends React.Component {
    static async getInitialProps({ req }) {
        return await gqlQuery(
            `
        query {
            movie(id: 280054) {
              __typename
              id
              title
            }
          }
        `
        ).then(res => {
            return {
                movieData: res && res.data && res.data.movie,
                userAgent: req ? req.headers["user-agent"] : navigator.userAgent
            };
        });
    }

    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>Welcome</title>
                </Head>
                <div>{new Date().toUTCString()}</div>
                <div>{this.props.userAgent.substring(0, 40)}</div>
                <Rocket launched="false" />
                <Link prefetch href="/launch?text=🌠">
                    <a>Launch</a>
                </Link>
                <div>{JSON.stringify(this.props.movieData)}</div>
            </React.Fragment>
        );
    }
}
