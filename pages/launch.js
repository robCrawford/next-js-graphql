import Rocket from "../components/Rocket";

export default ({ url }) => {
    // Routing - Each top-level component receives a url property with the following API:
    //   pathname - String of the current path excluding the query string
    //   query - Object with the parsed query string. Defaults to {}
    //   asPath - String of the actual path (including the query) shows in the browser
    //   push(url, as=url) - performs a pushState call with the given url
    //   replace(url, as=url) - performs a replaceState call with the given url
    return (
        <div>
            <Rocket launched="true" />
            {Object.values(url.query)}
        </div>
    );
};
