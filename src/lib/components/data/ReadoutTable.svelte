<script lang="ts">
	import { telemetryFields } from '$lib/stores/telemachus';

	interface DataRow {
		label: string;
		field: string;
		formatter: (value: any) => string;
	}

	interface Props {
		rows: DataRow[];
	}

	let { rows }: Props = $props();

	const data = $derived(telemetryFields(rows.map((r) => r.field)));
</script>

<table>
	<tbody>
		{#each rows as row}
			<tr>
				<th>{row.label}</th>
				<td>{@html row.formatter($data[row.field])}</td>
			</tr>
		{/each}
	</tbody>
</table>
