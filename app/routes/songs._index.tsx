import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { Form, useLoaderData, useParams, useSearchParams } from "@remix-run/react";

export const loader: LoaderFunction = async ({request, params}) => {

    const url = new URL(`${process.env.IMPORT_URL}/hits`);
    const res = await fetch(url)
    const songs = await res.json()
    return songs;
}

export default function SongList() {

    const songs = useLoaderData<typeof loader>();


    return (
        <div>
            <h1>{songs.length} songs</h1>
            <a href="/">home</a>

            <ol>
                {songs.map((song: any) => 
                    <li>
                        <a href={'/songs/' + song.id}>{song.artist} - {song.title} [{song.analyzeStatus}]</a>
                    </li>
                )}
            </ol>
        </div>
    )
}