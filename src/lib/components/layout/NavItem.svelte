<script lang="ts">
	import { page } from '$app/stores';

	let {
		navItem,
		title,
		url,
		id = '',
		imageName = ''
	}: {
		navItem: string;
		title: string;
		url: string;
		id?: string;
		imageName?: string;
	} = $props();

	let resolvedImage = $derived(imageName || `${navItem}-preview.svg`);
	let isCurrent = $derived($page.url.pathname === url || $page.url.pathname === `/${navItem}`);
</script>

<li {id} class:current={isCurrent}>
	<a href={url}>
		<img src="/images/{resolvedImage}" alt={title} />
		{title}
	</a>
</li>
