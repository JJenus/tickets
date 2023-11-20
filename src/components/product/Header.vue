<script setup>
	import { onMounted, ref } from "vue";
	import { useRoute, useRouter } from "vue-router";

	const env = import.meta.env;
	const AppName = import.meta.env.VITE_APP_NAME;

	const router = useRouter();
	const route = useRoute();

	let path = ref("");

	onMounted(async () => {
		await router.isReady();
		path.value = route.name;
	});
</script>

<template>
	<header
		class="header navbar navbar-expand-lg navbar-primary position-absolute navbar-sticky"
	>
		<div class="container px-3">
			<a href="/" class="navbar-brand pe-3">
				<img
					src="/logo/feramo-logo-mini.png"
					width="60"
					alt="Silicon"
				/>
				{{ AppName }}
			</a>
			<div
				id="navbarNav"
				class="offcanvas me-auto me-auto offcanvas-end bg-odark"
			>
				<div class="offcanvas-header border-bottom border-light">
					<h5 class="offcanvas-title text-white">
						<img
							width="150"
							src="/logo/feramo-logo.png"
							alt=""
							srcset=""
						/>
					</h5>
					<button
						type="button"
						class="btn-close btn-close-white"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
				<div class="offcanvas-body" style="z-index: 3000;">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<a
								href="/"
								:class="path === 'home' ? 'active' : ''"
								class="nav-link fs-6"
								aria-current="page"
								>Home</a
							>
						</li>
						<li class="nav-item">
							<a
								href="/faqs"
								:class="path === 'faqs' ? 'active' : ''"
								class="nav-link fs-6"
								aria-current="page"
								>FAQs</a
							>
						</li>

						<li class="nav-item">
							<a
								href="/about"
								:class="path === 'about' ? 'active' : ''"
								class="nav-link fs-6"
								aria-current="page"
								>About</a
							>
						</li>
						<li class="nav-item">
							<a
								href="/contact"
								:class="path === 'contact' ? 'active' : ''"
								class="nav-link fs-6"
								aria-current="page"
								>Contact Us</a
							>
						</li>
					</ul>
				</div>
				<div class="offcanvas-header border-top border-light">
					<a
						data-bs-toggle="modal"
						data-bs-target="#auth-modal"
						class="btn btn-primary w-100"
					>
						<i class="bx bx-log-in-circle fs-4 lh-1 me-1"></i>
						&nbsp;Login
					</a>
				</div>
			</div>
		
			<button
				type="button"
				class="navbar-toggler"
				data-bs-toggle="offcanvas"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<a
				data-bs-toggle="modal"
				data-bs-target="#auth-modal"
				class="btn btn-primary btn-sm fs-sm rounded d-none d-lg-inline-flex"
			>
				<i class="bx bx-log-in fs-6 lh-1 me-1"></i>
				&nbsp;Join now
			</a>
		</div>
	</header>
</template>
