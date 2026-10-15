// we use next cache to save us a trip to the api when the data does not change
import {cacheLife} from "next/cache"

export type book = {
    _id: string;
    name: string;
}

const ONE_API = "https://the-one-api.dev/v2"

// multi use fetch data function for multiple api calls
async function fetchData(url: string) {
    "use cache"

    // If Our end point ONE_API needs the api key, it is added here.
    const headers = url.startsWith(ONE_API)
        ? {Authorization: `Bearer{process.env.THE_ONE_API_KEY}`} : undefined

    try {
        const res = await fetch(url, {headers})

        if (res.ok) {
            cacheLife("hours") // This makes the cache live for 1 hour
            return {data: await res.json(), error: null}
        }

        cacheLife("seconds") // This makes the cache live for a few seconds
        return {data: null, error: (res.status)}
    }
    // a general catch-all for all errors that are not dependent on res.status
    // i.e. faulty internet etc.
    catch {
        cacheLife("seconds")
        return {data: null, error: "Could not reach the API." }
    }
}

export async function getBooks(){
    const {data, error} = await fetchData(`${ONE_API}/book`)
    // here we use data.?docs because this is the way the data from the api is structured.
    const books: book[] = data?.docs ?? []; // if there is no response or error, the array becomes empty.

    return {books, error}
}

export async function getBookCover(title: string) {
    const {data} = await fetchData(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=Tolkien&limit=1`
    )
    const coverId = data?.docs[0]?.cover_i;

    // no cover -> null we put a "no cover" on the page instead
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : null;
}
