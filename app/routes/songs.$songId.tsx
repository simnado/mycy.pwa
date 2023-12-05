import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { Form, useLoaderData, useParams, useSearchParams } from "@remix-run/react";

export const loader: LoaderFunction = async ({request, params}) => {
    const songId = request.url.split('/').pop()

    const url = new URL(`${process.env.IMPORT_URL}/hit/${songId}`);
    const res = await fetch(url)
    const songDetails = await res.json()
    return songDetails;
}

export async function action({
    request,
  }: ActionFunctionArgs) {
    const form = await request.formData();

    // do server side mutations

    return json({ });
}

export default function Song() {

    const { songId } = useParams();

    const data = useLoaderData<typeof loader>();

    console.log(data)

    return (
        <div>
            <h1>{data.song.title}</h1>
            <a href="/">home</a>

            <div>
                <img src={data.song.imageUrl}/>
                <div>by {data.song.artist}</div>
                <div>from {data.song.releaseDate}</div>
                <div>lang: {data.song.language}</div>
                <p>{data.song.description}</p>
            </div>
        </div>
    )
}