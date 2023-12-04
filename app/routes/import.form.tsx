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

    // do server side mutations

    return json({ });
}

export default function ImportForm() {

    const [params] = useSearchParams()
    const data = useLoaderData<typeof loader>();
    const { items } = data

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
                {items.map(item => <li>{item.title}</li>)}
            </ul>
        </div>
    )
}