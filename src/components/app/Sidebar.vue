<script setup>
	import { onMounted, ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { user } from "@/stores/user";

	const env = import.meta.env;
	const AppName = import.meta.env.VITE_APP_NAME;
	const tempImg = ref("/assets/img/avatars/blank.svg");

	const router = useRouter();
	const route = useRoute();

	let path = ref("");

	const navs = ref([
		{
			path: "tickets",
			name: "My Tickets",
			icon: "bx bxs-dashboard fs-xl opacity-60 me-2",
		},
		{
			path: "subscribe",
			name: "Tick Subscription",
			icon: "bx bx-collection fs-xl opacity-60 me-2",
		},
	]);

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
					class="d-none"
					src="/logo/feramo-logo-mini.png"
					width="47"
					alt="Firramo"
				/>
				{{ AppName }}
			</a>

			<div class="d-flex">
				<button
					type="button"
					class="btn btn-outline-secondary me-2 shadow-smi p-0 ms-2 rounded-circle btn-icon mt-3 mb-3 position-relative"
				>
					<img
						:src="user.getUser().imgUrl || tempImg"
						class="rounded-circle"
						style="
							max-height: 42px;
							max-width: 42px;
							min-height: 42px;
							min-width: 42px;
						"
						alt="profile"
					/>
				</button>
			</div>
		</div>
		<div class="text-center pe-3 border-end">
			<button
				type="button"
				class="btn btn-secondary w-100 d-md-none mt-3 mb-3"
				data-bs-toggle="collapse"
				data-bs-target="#account-menu"
			>
				<i class="bx bxs-user-detail fs-xl me-2"></i>
				menu
				<i class="bx bx-chevron-down fs-lg ms-1"></i>
			</button>
			<div
				id="account-menu"
				class="list-group side-bar mt-md-2 list-group-flush d-md-flex flex-column justify-content-md-between collapse"
			>
				<div>
					<a
						v-for="nav in navs"
						:href="nav.path"
						:class="path === nav.path ? 'bg-faded-primary' : ''"
						class="list-group-item list-group-item-action d-flex align-items-center text-primaryy"
					>
						<i :class="nav.icon"></i>
						{{ nav.name }}
					</a>
				</div>

				<div>
					<a
						@click="signOut()"
						href="#"
						class="list-group-item list-group-item-action d-flex align-items-center"
					>
						<i class="bx bx-log-out fs-xl opacity-60 me-2"></i>
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
