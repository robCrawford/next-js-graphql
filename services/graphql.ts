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
    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            ...(headers || {}),
            ...(cookieRelay ? { cookie: cookieRelay } : {})
        },
        body: JSON.stringify(requestParams),
        credentials: "same-origin" as "same-origin"
    };

    const res = await fetch(
        url,
        global.httpsProxyAgent
            ? { ...params, agent: global.httpsProxyAgent }
            : params
    );

    if (res.status === 204) {
        return Promise.resolve(null);
    }

    return await res.json();
}
