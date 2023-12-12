import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";

export const loader: LoaderFunction = async ({request, params}) => {
    const { q } = Object.fromEntries(new URL(request.url).searchParams)
    if (!q) {
        return {items: []}
    }

    const url = new URL(`${process.env.IMPORT_URL}/match/query`);
    url.search = new URLSearchParams({q}).toString();
    const searchResults = await fetch(url)
    const items = await searchResults.json()
    return { items };
}

export async function action({
    request,
  }: ActionFunctionArgs) {
    const form = await request.formData();
    const {geniusId} = Object.fromEntries(form)

    const url = new URL(`${process.env.IMPORT_URL}/sync`);
    const body = JSON.stringify({
        items: [
            {
                priority: 1,
                geniusId,
            }
        ]
    })
    console.log(body)
    const searchResults = await fetch(url, {
        method: 'post',
        body,
        headers: {
            "Content-Type": "application/json",
          },
    })

    console.log(await searchResults.json())
    // do server side mutations

    return json({ geniusId });
}

export default function ImportForm() {

    const [params] = useSearchParams()
    const data = useLoaderData<typeof loader>();
    const { items } = data

    const alreadyMatched = item => Boolean(item.id)
    const matchable = item => Boolean(!item.id && item.spotifyId)

    console.log(items)

    return (
        <div>
            <h1>Enter a search query:</h1>
            <a href="/">home</a>
            <h3>You shared the following song:</h3>
            <Form>
                <input type="search" name="q" defaultValue={params.get('q') ?? ''}></input>
                <button type="submit">Lookup</button>
            </Form>

            <h2>Results:</h2>
            <ul>
                {items.map(item => 
                    <li key={item.id} style={{listStyle: "none"}}>
                            <img src={item.imageUrl} style={{width: "100px"}}/>
                            <div style={{display: 'inline-block'}}>
                                <div>{item.title}</div>
                                <div>{item.releaseDate}</div> 
                                <div>{ alreadyMatched(item) && <a href={'/songs/'+item.id}>goto song</a> }</div>
                                <div>{ matchable(item) && <Form method="POST">
                                        <input type="hidden" name='geniusId' value={item.geniusId}></input>
                                        <button type="submit">Match</button>
                                    </Form> }</div>
                            </div>
                    </li>)
                }
            </ul>
        </div>
    )
}