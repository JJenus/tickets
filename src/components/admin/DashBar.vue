<script setup>
	import { onMounted, ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { user } from "@/stores/user";

	const env = import.meta.env;
	const AppName = import.meta.env.VITE_APP_NAME;

	const router = useRouter();
	const route = useRoute();

	let path = ref("");

	function signOut() {
		console.log("signout");
		user.logout();
	}

	onMounted(async () => {
		await router.isReady();
		path.value = route.name;
	});
</script>

<template>
	<div class="position-sticky top-0">
		<div class="d-flex justify-content-between">
			<a href="/" class="navbar-brand pe-3">
				<img
					src="/logo/feramo-logo-mini.png"
					width="47"
					alt="Firramo"
				/>
				{{ AppName }} Admin
			</a>

			<div class="d-flex">
				<button
					type="button"
					class="btn btn-outline-secondary btn-icon d-md-none mt-3 mb-3"
					data-bs-toggle="collapse"
					data-bs-target="#account-menu"
				>
					<i class="bx bx-menu-alt-right fs-xl"></i>
					</button>
			</div>
		</div>
		<div class="text-center pe-3 border-end">
			<div
				id="account-menu"
				class="list-group side-bar mt-md-2 list-group-flush d-md-flex flex-column justify-content-md-between collapse"
			>
				<div>
					<a
						href="dashboard"
						:class="path === 'overview' ? 'bg-faded-primary' : ''"
						class="list-group-item list-group-item-action d-flex align-items-center text-primaryy"
					>
						<i class="bx bxs-dashboard fs-xl opacity-60 me-2"></i>
						Dashboard
					</a>
					<a
						href="users"
						:class="path === 'users' ? 'bg-faded-primary' : ''"
						class="list-group-item list-group-item-action d-flex align-items-center"
					>
						<i class="bx bx-user fs-xl opacity-60 me-2"></i>
						Users
					</a>
					<a
						href="testimonials"
						:class="
							path === 'testimonials' ? 'bg-faded-primary' : ''
						"
						class="list-group-item list-group-item-action d-flex align-items-center"
					>
						<i
							class="bx bx-message-square-add fs-xl opacity-60 me-2"
						></i>
						Testimonials
					</a>
					<a
						href="security"
						:class="path === 'security' ? 'bg-faded-primary' : ''"
						class="list-group-item list-group-item-action d-flex align-items-center"
					>
						<i class="bx bx-lock-alt fs-xl opacity-60 me-2"></i>
						Security
					</a>
				</div>

				<div>
					<a
						href="settings"
						:class="path === 'settings' ? 'bg-faded-primary' : ''"
						class="list-group-item list-group-item-action d-flex align-items-center"
					>
						<i class="bx bx-cog fs-xl opacity-60 me-2"></i>
						Settings
					</a>

					<a
						@click="signOut()"
						href="#"
						class="list-group-item list-group-item-action d-flex align-items-center"
					>
						<i
							class="bx bx-log-out-circle fs-xl opacitoy-60 me-2"
						></i>
						Sign Out
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.side-bar {
		min-height: 80vh;
	}
	@media (min-width: 768px) {
		.side-bar {
			height: calc(100vh - 120px) !important;
		}
	}

	@media (min-width: 576px) {
		.side-bar {
			height: calc(100vh - 60px);
		}
	}
</style>
