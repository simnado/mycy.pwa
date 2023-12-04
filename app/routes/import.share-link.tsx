import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";

export const loader: LoaderFunction = async ({request, params}) => {
    const { name, description, link } = Object.fromEntries(new URL(request.url).searchParams)
    return {name, description, link};
  }

export default function ShareLink() {

    const [params] = useSearchParams()
    // const data = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>Import a share link</h1>
            <a href="/">home</a>
            <h3>You shared the following song:</h3>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Link</th>
                </tr>
                <tr>
                    <td>{params.get('name')}</td>
                    <td>{params.get('description')}</td>
                    <td>{params.get('link')}</td>
                </tr>
            </table>
        </div>
    )
}