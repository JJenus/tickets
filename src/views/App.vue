<script setup>
	import { ref, onMounted, onBeforeMount, provide } from "vue";
	import axios from "axios";
	import { RouterView } from "vue-router";

	import SidebarVue from "@/components/app/Sidebar.vue";
	import { user } from "@/stores/user";
import { util } from "../stores/utility";

	// import "@/assets/css/theme.min.css";

	const env = import.meta.env;
	const sessions = ref([]);
	const appUser = ref(user.getUser());
	const tickets = ref([]);
	const userTickets = ref([]);

	provide("user", appUser);
	provide("tickets", {
		userTickets,
		tickets,
		loadTickets,
		loadUserTickets,
	});

	function loadSessions() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/users/${user.getUser().id}/sessions`,
		};

		axios
			.request(config)
			.then((response) => {
				const session = user.getSession();
				sessions.value = response.data;

				const check = sessions.value.find(
					(e) => e.deviceId == session.deviceId
				);

				if (!check) {
					user.logout();
				}
			})
			.catch(function (error) {
				window.debug.log(error);
			});
	}

	async function loadUser() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/users/${user.getUser().id}`,
		};

		await axios
			.request(config)
			.then((response) => {
				appUser.value = response.data;
				// window.debug.log("User", appUser.value);
			})
			.catch(function (error) {});
	}

	async function loadTickets() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/tickets/${user.getUser().id}`,
		};

		await axios
			.request(config)
			.then((response) => {
				tickets.value = response.data;
				// window.debug.log(tickets.value)
			})
			.catch(function (error) {
				window.debug.log(error);
			});
	}

	async function loadUserTickets() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/tickets/user-tickets/${user.getUser().id}`,
		};

		await axios
			.request(config)
			.then((response) => {
				userTickets.value = response.data;
				window.debug.log(userTickets.value);
			})
			.catch(function (error) {
				window.debug.log(error);
			});
	}

	onMounted(() => {
		loadSessions();
		loadTickets();
		loadUserTickets();
	});

	onBeforeMount(async () => {
		await loadUser();
	});
</script>

<template>
	<main class="page-wrapper vh-100 big-custom">
		<!-- Page content -->
		<section class="container-fluid pt-2">
			<div class="row p-md-3">
				<!-- Sidebar (User info + Account menu) -->
				<aside class="col-lg-3 col-md-4 bordder-end pb-5 mb-3 mb-lg-n5">
					<SidebarVue />
				</aside>

				<!-- Main -->
				<div
					class="col-md-8 col-lg-9 px-4 pb-5 mb-2 mb-lg-4 pt-md-5 mt-n5 mt-md-0"
				>
					<RouterView></RouterView>
				</div>
			</div>
		</section>
	</main>
</template>

<style>
	@import "@/assets/css/theme.min.css";
	
	.bg-transact {
		background-color: rgb(245, 236, 247);
	}

	@media (min-width: 768px) {
		.bg-transact {
			background-color: rgb(255, 255, 255) !important;
		}
	}

	.th-rounded {
		border-radius: 15px !important;
	}

	.vh-fitted {
		height: 100vh !important;
		/* top: 30px; */
	}

	@media (min-width: 768px) {
		.vh-fitted {
			height: calc(100vh - 80px) !important;
			top: 30px;
		}
	}
</style>
