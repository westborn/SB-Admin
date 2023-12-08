<script>
	import '../app.css'
	import { dev } from '$app/environment'
	const routes = dev
		? [
				['[Select Registration]', '/'],
				['[Select Option]', 'SelectOption'],
				['Two', 'two'],
				['Three', 'three']
		  ]
		: [
				['[Select Registration]', '/'],
				['[Select Option]', 'SelectOption'],
				['Two', 'two'],
				['Three', 'three']
		  ]

	// 	const routes = dev
	// ? [
	// 		['[Select Registration]', '/'],
	// 		['[Select Option]', 'SelectOption'],
	// 		['Two', 'two'],
	// 		['Three', 'three']
	//   ]
	// : [
	// 		['[Select Registration]', 'index.html'],
	// 		['[Select Option]', 'SelectOption.html'],
	// 		['Two', 'two.html'],
	// 		['Three', 'three.html']
	//   ]
</script>

<svelte:head>
	<title>Scuplture Bermagui - Administration</title>
</svelte:head>

<nav>
	<div class="flex justify-between h-16">
		<div class="w-auto mt-4 ml-10">
			<ul class="flex items-center justify-between flex-1 list-reset md:flex-none">
				{#each routes as [name, path]}
					<li class="mr-1">
						<a
							class="inline-block px-2 text-base font-semibold no-underline text-primary-300 hover:text-accent"
							href={path}>{name}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>

<div class="mt-8">
	<p class="mb-4 -mt-8 text-xl font-bold text-gray-700 ml-28">Artist Administration - 2024</p>
</div>
<div class="flex flex-col justify-around max-w-2xl mx-auto my-8">
	<slot />
</div>
