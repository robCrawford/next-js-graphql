import fetch from "isomorphic-unfetch";
import compress from "graphql-query-compress";


export async function gqlQuery(query: string) {
    return await post(
        "http://localhost:4000/graphql",
        { query: compress(query) }
    );
}

async function post(
    url: string,
    requestParams: object,
    headers?: object,
    cookieRelay?: string
) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            ...(headers || {}),
            ...(cookieRelay ? { cookie: cookieRelay } : {})
        },
        body: JSON.stringify(requestParams),
        credentials: "same-origin" as "same-origin"
    });

    if (res.status === 204) {
        return Promise.resolve(null);
    }

    return await res.json();
}
