<script>
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell slotSidebarLeft="" class="w-64 sm:hidden">
	<nav
		class="list-nav p-4 transition-all duration-300 ease-in-out h-screen bg-primary rounded-r-lg"
	>
		<ul class="text-white">
			<li class="border-b border-white/50 py-2">
				<a href="/" class="hover:text-gray-200">Homepage</a>
			</li>
			<li class="border-b border-white/50 py-2">
				<a href="/about" class="hover:text-gray-200">About</a>
			</li>
			<li class="border-b border-white/50 py-2">
				<a href="/blog" class="hover:text-gray-200">Blog</a>
			</li>
			<li class="py-2"><a href="/contact" class="hover:text-gray-200">Contact</a></li>
		</ul>
	</nav>
</AppShell>
