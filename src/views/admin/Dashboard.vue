<script setup>
	import { onMounted, ref, inject } from "vue";
	import axios from "axios";
	import currency from "currency.js";

	const settings = inject("settings");
	const env = import.meta.env;
	const users = inject("users");
	const deposits = ref([]);

	function totalBalance() {
		if (!users.value || users.value.length == 0) return "0.00";

		let balance = users.value.reduce((p, c) => {
			return p + Number(c.balance.amount);
		}, 0);

		balance = currency(balance, {
			symbol: settings.value.currencySymbol,
		}).format();

		return balance;
	}

	function totalDeposit() {
		if (!deposits.value || deposits.value.length == 0) return "0.00";

		let balance = deposits.value.reduce((p, c) => {
			if (c.status === "success") return p + Number(c.amount);
			return p;
		}, 0);

		balance = currency(balance, {
			symbol: settings.value.currencySymbol,
		}).format();

		return balance;
	}

	function allUsers() {
		return users.value.length;
	}

	async function loadDeposits() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/transactions/deposits`,
		};

		axios
			.request(config)
			.then((response) => {
				deposits.value = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	onMounted(() => {
		loadDeposits();
	});
</script>

<template>
	<div class="ps-md-3 ps-lg-0 mt-md-2 pt-md-4 pb-md-2">
		<h1 class="h2 pt-xl-1 mb-3 pb-2 pb-lg-3">Dashboard</h1>
		<h2 class="h5 text-primary mb-4">Overview</h2>
	</div>

	<div class="row">
		<div class="col-lg-4 col-md-12 col-12">
			<!-- Card -->
			<div class="card mb-4">
				<!-- Card Body -->
				<div class="p-4">
					<span class="btn-icon btn btn-outline-primary rounded-3">
						<i class="bx bx-dollar-circle fs-3"></i>
					</span>
					<h2 class="h1 fw-bold mb-0 mt-4 lh-1">
						{{ totalBalance() }}
					</h2>
					<p>Total Balance</p>
					<div class="progress bg-light-primary" style="height: 2px">
						<div
							class="progress-bar"
							role="progressbar"
							style="width: 65%"
							aria-valuenow="65"
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-4 col-md-12 col-12">
			<!-- Card Body -->
			<div class="card mb-4">
				<!-- Card Body -->
				<div class="p-4">
					<span class="btn-icon btn btn-outline-info rounded-3">
						<i class="bx bx-user fs-3"></i>
					</span>
					<h2 class="h1 fw-bold mb-0 mt-4 lh-1">
						{{ allUsers() }}
					</h2>
					<p>Total Users</p>
					<div class="progress bg-light-danger" style="height: 2px">
						<div
							class="progress-bar bg-info"
							role="progressbar"
							style="width: 45%"
							aria-valuenow="45"
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-4 col-md-12 col-12">
			<!-- Card Body -->
			<div class="card mb-4">
				<!-- Card Body -->
				<div class="p-4">
					<span class="btn-icon btn btn-outline-warning rounded-3">
						<i class="bx bx-credit-card-alt fs-3"></i>
					</span>
					<h2 class="h1 fw-bold mb-0 mt-4 lh-1">
						{{ totalDeposit() }}
					</h2>

					<p>Total Deposit</p>
					<div class="progress bg-light-warning" style="height: 2px">
						<div
							class="progress-bar bg-warning"
							role="progressbar"
							style="width: 35%"
							aria-valuenow="35"
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
