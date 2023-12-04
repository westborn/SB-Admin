<script>
	import '../app.css'
	import { dev } from '$app/environment'
	const routes = dev
		? [
				['Home', '/'],
				['One', 'one'],
				['Two', 'two'],
				['Three', 'three']
		  ]
		: [
				['Home', 'index.html'],
				['One', 'one.html'],
				['Two', 'two.html'],
				['Three', 'three.html']
		  ]
</script>

<div class="container mx-auto">
	<nav>
		<div class="flex flex-row gap-3 mx-auto mt-3 mb-3">
			{#each routes as [name, path]}
				<a href={path}>{name}</a>
			{/each}
		</div>
	</nav>

	<slot />
</div>
