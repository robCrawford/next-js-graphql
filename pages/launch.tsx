import React from "react";
import Head from "next/head";
import Rocket from "../components/Rocket";
import { gqlQuery } from "../services/graphql";
import "../sass/styles.scss";

type Props = {
    movieTitle: string,
    launched: boolean
}

const movieQuery = `
    query {
        movie(id: 280054) {
            __typename
            id
            title
        }
    }
`;

export default class Launch extends React.Component<Props> {

    static async getInitialProps() {
        const res = await gqlQuery(movieQuery);
        const movie = res && res.data && res.data.movie;

        return {
            movieTitle: movie && movie.title || "-",
            launched: Boolean(movie)
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title> Launch </title>
                </Head>

                <h3> Movie: { this.props.movieTitle } </h3>
                <Rocket launched={ this.props.launched } />
            </div>
        )
    }
};
