<script setup>
	import { inject, ref } from "vue";
	import Ticket from "../../components/app/Ticket.vue";
	import axios from "axios";
	import { alert } from "../../stores/utility";
	const env = import.meta.env;

	const newWallet = ref(false);
	const sending = ref(false);
	const user = inject("user");

	const { userTickets, tickets, loadTickets, loadUserTickets } =
		inject("tickets");

	const form = ref({
		userId: user.value.id,
		cryptoBalance: "0",
		localBalance: "0",
		symbol: "",
		wallet: null,
	});

	function createWallet(iWallet) {
		sending.value = true;
		form.value.symbol = iWallet.symbol;
		form.value.wallet = iWallet;

		let config = {
			data: form.value,
			method: "POST",
			url: `${env.VITE_BE_API}/wallets/user-wallets`,
		};
		axios
			.request(config)
			.then((response) => {
				loadUserWallets();
				loadWallets();
				alert.success("Created");
				form.value.symbol = "";
				form.value.wallet = null;
				newWallet.value = false;
			})
			.catch(function (error) {
				alert.error("Failed");
			})
			.finally(() => {
				sending.value = false;
			});
	}
</script>

<template>
	<div class="ps-md-3 ps-lg-0 mt-md-2 pt-md-4 pb-md-2">
		<h1 class="h2 pt-xl-1 mb-0 pb-0 pb-lg-3">Tickets</h1>
		<h2 class="fs-6 text-muted mb-2 ps-1">All tickets</h2>

		<div class="py-2 mb-4">
			<button
				v-if="!newWallet"
				@click="newWallet = true"
				type="button"
				class="btn btn-primary ps-4 d-none"
			>
				<i class="bx bx-plus fs-xl me-2"></i>
				Create new wallet
			</button>
			<button
				v-else
				@click="newWallet = false"
				type="button"
				class="btn btn btn-outline-secondary ps-4"
			>
				<i class="bx bx-arrow fs-xl me-2"></i>
				back
			</button>
		</div>

		<!-- Item -->
		<div v-if="!newWallet" class="row row-cols-md-2 g-3">
			<!-- Item -->
			<Ticket v-for="ticket in tickets" :ticket="ticket" />
			<div v-if="tickets.length == 0" class="text-center text-muted">
				More tickets will be available shortly
			</div>
		</div>
	</div>
</template>
