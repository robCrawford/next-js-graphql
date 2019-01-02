
exports.typeDefs = `
  type Movie {
    id: ID!
    title: String!
    voteAverage: Float!
    poster: String!
    backdrop: String!
    overview: String!
    tagline: String
    runtime: Int
    revenue: Int
  }

  extend type Query {
    movie(id: ID!): Movie
    movies(page: Int): [Movie!]!
  }
`;

exports.resolvers = {
    Movie: {
        poster: obj => {
            return `https://image.tmdb.org/t/p/w500${obj.posterPath}`;
        },
        backdrop: obj => {
            return `https://image.tmdb.org/t/p/w1280${obj.backdropPath}`;
        }
    },
    Query: {
        movies: (obj, { page = 1 }, { loaders }) => {
            return loaders.fetch
                .load([
                    "3/discover/movie",
                    { params: { page } }
                ])
                .then(res => {
                    return res.data.results;
                });
        },
        movie: (obj, { id }, { loaders }) => {
            return loaders.fetch
                .load([`3/movie/${id}`])
                .then(res => {
                    return res.data;
                });
        }
    }
};
