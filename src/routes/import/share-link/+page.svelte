<script lang="ts">
	import type { PageData } from './$types';
    import { error } from '@sveltejs/kit';
    import type { PageLoad } from './$types';

    import { page } from '$app/stores'

	
   // export let ref;

	export let data: PageData;
    //console.log(data)

    const { searchParams } = $page.url;
    let name = searchParams.get("name");
    let description = searchParams.get("description");
    let link = searchParams.get("link");
</script>

<h1>Import a share link</h1>
<a href="/">home</a>

<div>
    <h3>You shared the following song:</h3>
    <table>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Link</th>
        </tr>
        <tr>
          <td>{name}</td>
          <td>{description}</td>
          <td>{link}</td>
        </tr>
      </table>
</div>

