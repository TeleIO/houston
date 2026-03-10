<script lang="ts">
	import { telemetryData, getActiveProvider } from '$lib/stores/telemachus';
	import { velocityString, distanceString, degreeString, plainNumberString, timeString } from '$lib/utils/data-formatters';

	/* eslint-disable @typescript-eslint/no-explicit-any */

	let data = $derived($telemetryData);

	let maneuverNodes: any[] = $state([]);
	let selectedIndex = $state(0);
	let currentUniversalTime = $state(0);
	let apoapsisTime = $state(0);
	let periapsisTime = $state(0);

	let ut = $state(0);
	let prograde = $state(0);
	let normal = $state(0);
	let radial = $state(0);
	let quickIncrement = $state(10);

	let currentNode = $derived(maneuverNodes[selectedIndex] ?? null);
	let hasNodes = $derived(maneuverNodes.length > 0);

	let nodeDeltaV = $derived(
		currentNode?.deltaV
			? Math.sqrt(
					Math.pow(currentNode.deltaV[0] ?? 0, 2) +
					Math.pow(currentNode.deltaV[1] ?? 0, 2) +
					Math.pow(currentNode.deltaV[2] ?? 0, 2)
				)
			: 0
	);

	let orbitInfoRows = $derived(
		currentNode
			? [
					{ label: 'Apoapsis', value: distanceString(currentNode.ApA ?? 0) },
					{ label: 'Periapsis', value: distanceString(currentNode.PeA ?? 0) },
					{ label: 'Inclination', value: degreeString(currentNode.inclination ?? 0) },
					{ label: 'Eccentricity', value: plainNumberString(currentNode.eccentricity ?? 0) },
					{ label: 'Reference Body', value: currentNode.referenceBody ?? 'NA' },
					{ label: 'Epoch', value: plainNumberString(currentNode.epoch ?? 0) },
					{ label: 'Arg. of Periapsis', value: degreeString(currentNode.argumentOfPeriapsis ?? 0) },
					{ label: 'Semimajor Axis', value: distanceString(currentNode.sma ?? 0) },
					{ label: 'Long. of Asc. Node', value: degreeString(currentNode.lan ?? 0) },
					{ label: 'Mean Anomaly at Epoch', value: degreeString(currentNode.maae ?? 0) }
				]
			: []
	);

	// Update from telemetry
	$effect(() => {
		currentUniversalTime = (data['t.universalTime'] as number) ?? 0;
		apoapsisTime = currentUniversalTime + ((data['o.timeToAp'] as number) ?? 0);
		periapsisTime = currentUniversalTime + ((data['o.timeToPe'] as number) ?? 0);

		const raw = data['o.maneuverNodes'];
		const nodes: any[] = Array.isArray(raw) ? raw : [];
		for (let i = 0; i < nodes.length; i++) {
			if (i !== selectedIndex) {
				maneuverNodes[i] = nodes[i];
			}
		}
		// Trim excess
		if (maneuverNodes.length > nodes.length) {
			maneuverNodes = maneuverNodes.slice(0, nodes.length);
		}
		// Ensure selectedIndex is valid
		if (nodes.length > 0 && selectedIndex >= nodes.length) {
			selectedIndex = 0;
		}
	});

	// Sync UI fields when selected node changes
	$effect(() => {
		if (currentNode) {
			ut = currentNode.UT ?? 0;
			prograde = currentNode.deltaV?.[2] ?? 0;
			normal = currentNode.deltaV?.[1] ?? 0;
			radial = currentNode.deltaV?.[0] ?? 0;
		} else {
			ut = 0;
			prograde = 0;
			normal = 0;
			radial = 0;
		}
	});

	async function updateCurrentNode(): Promise<void> {
		const provider = getActiveProvider();
		if (!provider) return;

		const index = selectedIndex;
		const options = [index, ut, radial, normal, prograde];
		const nodeName = `o.updateManeuverNode[${options.join(',')}]`;
		const params: Record<string, string> = { [nodeName]: nodeName };

		const result = await provider.sendMessage(params);
		const updated = result[nodeName] as any;
		if (updated) {
			maneuverNodes[index] = { ...updated, ut, deltaV: [radial, normal, prograde] };
		}
	}

	async function addManeuverNode(): Promise<void> {
		const provider = getActiveProvider();
		if (!provider) return;

		const lastNode = maneuverNodes.length > 0 ? maneuverNodes[maneuverNodes.length - 1] : null;
		const universalTime = (lastNode?.UT ?? currentUniversalTime) + 1000;

		const nodeName = `o.addManeuverNode[${universalTime},0,0,0]`;
		const params: Record<string, string> = { [nodeName]: nodeName };

		const result = await provider.sendMessage(params);
		const newIndex = maneuverNodes.length;
		maneuverNodes = [...maneuverNodes, result[nodeName]];
		selectedIndex = newIndex;
	}

	async function removeManeuverNode(index: number): Promise<void> {
		const provider = getActiveProvider();
		if (!provider) return;

		const nodeName = `o.removeManeuverNode[${index}]`;
		const params: Record<string, string> = { [nodeName]: nodeName };
		await provider.sendMessage(params);

		maneuverNodes = maneuverNodes.filter((_, i) => i !== index);
		selectedIndex = 0;
	}

	function incrementField(getter: () => number, setter: (v: number) => void, delta: number): void {
		setter(getter() + delta);
		updateCurrentNode();
	}
</script>

{#if !hasNodes}
	<div class="no-nodes-message">No Maneuver Nodes</div>
{/if}

<div class="maneuver-node-editor" class:hidden={!hasNodes}>
	<div class="node-list">
		<ul class="node-selector">
			{#each maneuverNodes as node, i}
				<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
				<li
					class:selected={i === selectedIndex}
					onclick={() => (selectedIndex = i)}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && (selectedIndex = i)}
				>
					<span class="title">Node {i}</span>
					<span class="deltav">
						{@html '&Delta;'}v: {velocityString(
							Math.sqrt(
								Math.pow(node.deltaV?.[0] ?? 0, 2) +
								Math.pow(node.deltaV?.[1] ?? 0, 2) +
								Math.pow(node.deltaV?.[2] ?? 0, 2)
							)
						)}
					</span>
					<span class="arrival">
						{((node.UT ?? 0) - currentUniversalTime) > 0 ? '-' : '+'}{timeString(Math.abs((node.UT ?? 0) - currentUniversalTime))}
					</span>
					<button class="remove" onclick={() => removeManeuverNode(i)}>remove</button>
				</li>
			{/each}
		</ul>
		<button onclick={addManeuverNode}>Add Node</button>
	</div>

	<table class="node-editor">
		<tbody>
			<tr>
				<th>Increment</th>
				<td>
					<select bind:value={quickIncrement}>
						<option value={0.01}>0.01</option>
						<option value={0.1}>0.1</option>
						<option value={1}>1</option>
						<option value={10}>10</option>
						<option value={100}>100</option>
					</select>
				</td>
			</tr>
			<tr>
				<th>UT</th>
				<td>
					<input type="number" bind:value={ut} onchange={updateCurrentNode} />
					<button onclick={() => incrementField(() => ut, (v) => (ut = v), quickIncrement)}>+</button>
					<button onclick={() => incrementField(() => ut, (v) => (ut = v), -quickIncrement)}>-</button>
				</td>
			</tr>
			<tr>
				<td colspan="2" class="ut-buttons">
					<button onclick={() => { ut = apoapsisTime; updateCurrentNode(); }}>AP</button>
					<button onclick={() => { ut = periapsisTime; updateCurrentNode(); }}>PE</button>
					<button onclick={() => incrementField(() => ut, (v) => (ut = v), 1000)}>+1K</button>
					<button onclick={() => incrementField(() => ut, (v) => (ut = v), -1000)}>-1K</button>
				</td>
			</tr>
			<tr>
				<th>Prograde</th>
				<td>
					<input type="number" bind:value={prograde} onchange={updateCurrentNode} />
					<button onclick={() => incrementField(() => prograde, (v) => (prograde = v), quickIncrement)}>+</button>
					<button onclick={() => incrementField(() => prograde, (v) => (prograde = v), -quickIncrement)}>-</button>
				</td>
			</tr>
			<tr>
				<th>Normal</th>
				<td>
					<input type="number" bind:value={normal} onchange={updateCurrentNode} />
					<button onclick={() => incrementField(() => normal, (v) => (normal = v), quickIncrement)}>+</button>
					<button onclick={() => incrementField(() => normal, (v) => (normal = v), -quickIncrement)}>-</button>
				</td>
			</tr>
			<tr>
				<th>Radial</th>
				<td>
					<input type="number" bind:value={radial} onchange={updateCurrentNode} />
					<button onclick={() => incrementField(() => radial, (v) => (radial = v), quickIncrement)}>+</button>
					<button onclick={() => incrementField(() => radial, (v) => (radial = v), -quickIncrement)}>-</button>
				</td>
			</tr>
			<tr>
				<th>{@html '&Delta;'}v</th>
				<td>{velocityString(nodeDeltaV)}</td>
			</tr>
		</tbody>
	</table>

	{#if orbitInfoRows.length > 0}
		<table class="node-orbit-info">
			<tbody>
				{#each orbitInfoRows as row}
					<tr>
						<th>{row.label}</th>
						<td>{row.value}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<style>
	.hidden { display: none; }
	.no-nodes-message { text-align: center; padding: 1em; opacity: 0.7; }
	.node-selector { list-style: none; padding: 0; margin: 0; }
	.node-selector li { cursor: pointer; padding: 0.3em 0.5em; display: flex; gap: 0.5em; align-items: center; }
	.node-selector li.selected { background: rgba(255,255,255,0.1); }
	.node-selector .remove { margin-left: auto; font-size: 0.8em; }
	.ut-buttons { display: flex; gap: 0.3em; }
	.node-editor input[type="number"] { width: 8em; }
</style>
