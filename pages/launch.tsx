import React from "react";
import Head from "next/head";
import Rocket from "../components/Rocket";
import { gqlQuery } from "../services/graphql";
import "../sass/styles.scss";

type Props = {
    title: string,
    poster: string,
    launched: boolean
}

const movieQuery = `
    query {
        movie(id: 11) {
            title
            poster
        }
    }
`;

export default class Launch extends React.Component<Props> {

    static async getInitialProps() {
        const res = await gqlQuery(movieQuery);
        const movie = res && res.data && res.data.movie;

        return {
            title: movie && movie.title,
            poster: movie && movie.poster,
            launched: Boolean(movie)
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title> Launch </title>
                </Head>

                <h3> { this.props.title } </h3>
                <img src={ this.props.poster } width="40" />
                <Rocket launched={ this.props.launched } />
            </div>
        )
    }
};
