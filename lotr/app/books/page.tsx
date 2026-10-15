import {getBookCover, getBooks} from "@/lib/api";
import Image from "next/image";

export const metadata = {title: "Books"};

export default async function Books() {
    // Here we call our api function to get the book text.
    const {books, error} = await getBooks();

    // Here we call the api with book covers
    // 3 searches against open library api at the same time.
    //  If no data/api call is failed, no book cover is fetched
    const covers = await Promise.all(
        books.map((book) => getBookCover(book.name)),
    );

    return (
        <main>
            <p>Books</p>
            <ul>
                {/* Loop over every book; i is used to find the matching cover in the covers array */}
                {books.map((book, i) => (
                    // Each list item needs a unique key so React can track it between renders
                    <li key={book._id}>
                        {/* Show the cover image if one exists for this book, otherwise show a fallback */}
                        {covers[i] ? (
                            <Image
                                src={covers[i]}
                                alt={`Cover: ${book.name}`}
                                width={300}
                                height={450}
                                className=""
                            />
                        ) : (
                            // Fallback when no cover is available
                            <div>No cover</div>
                        )}

                        {/* Book title */}
                        <h2>{book.name}</h2>
                    </li>
                ))}
            </ul>
        </main>
    );
}