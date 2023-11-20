<script setup>
	import { inject, ref } from "vue";
	import { alert } from "@/stores/utility";
	import axios from "axios";
	import { util } from "../../../stores/utility";

	const env = import.meta.env;

	const props = defineProps({
		wallets: {
			required: true,
		},
	});

	const selected = ref();

	const tax = inject("billingTax", {
		title: null,
		amount: null,
		description: null,
	});
	const active = ref("billing");

	const loading = ref(false);

	function cryptoBalance(balance) {
		return util.crypto(Number(balance));
	}
	function balance(balance) {
		return util.money(Number(balance));
	}

	function save($event) {
		if (!$event.target.checkValidity()) {
			return;
		}

		loading.value = true;
		let config = {
			method: "POST",
			url: `${env.VITE_BE_API}/users/tax`,
			data: tax.value,
		};

		axios
			.request(config)
			.then((response) => {
				// console.log(response.data);
				tax.value = response.data;
				alert.success();
			})
			.catch(function (error) {
				console.log(error);
				alert.error("Failed");
			})
			.finally(() => {
				loading.value = false;
			});
	}
</script>

<template>
	<div class="mt-3">
		<div
			class="btn-group shadowe border w-100 mb-3"
			role="group"
			aria-label="Large button group"
		>
			<button
				:class="active == 'billing' ? 'active' : ''"
				@click="active = 'billing'"
				type="button"
				class="btn btn-outline-secondary border-0 d-flex flex-column"
			>
				<i class="bx bx-money fs-3"></i>
				Billing
			</button>
			<button
				:class="active == 'crypto' ? 'active' : ''"
				@click="active = 'crypto'"
				type="button"
				class="btn btn-outline-secondary border-0 d-flex flex-column"
			>
				<i class="bx bx-bitcoin fs-3"></i>
				Crypto
			</button>
		</div>
		<div v-if="active == 'crypto'">
			<h1 class="h6 text-center text-muted">Wallets</h1>
			<select class="form-control" v-model="selected" name="" id="">
				<option value="Select" selected>Select Crypto</option>
				<option v-for="wallet in wallets" :value="wallet">
					{{ wallet.wallet.currency }} ({{ wallet.wallet.symbol }})
				</option>
			</select>
			<div v-if="selected" class="mt-2">
				<div class="mb-3">
					<div
						class="d-flex align-items-center justify-content-center fw-bold text-center"
					>
						{{ selected.wallet.currency }}
					</div>
					<div>
						<span class="fw-bold">
							{{ selected.wallet.symbol }}
						</span>
						{{ cryptoBalance(selected.cryptoBalance) }}
					</div>
					<div class="mb-1">
						{{ balance(selected.localBalance) }}
					</div>
				</div>
				<div class="">
					<input
						class="form-control"
						type="text"
						:placeholder="
							'Enter amount in ' + selected.wallet.symbol
						"
					/>
					<div class="mt-2">
						<button class="btn btn-primary">submit</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="active == 'billing'">
			<h6 class="h6 text-center text-muted">Withdrawal Billing</h6>
			<form
				@submit.prevent="save($event)"
				class="needs-validation"
				novalidate
			>
				<div class="form-floating mb-4">
					<input
						class="form-control"
						type="text"
						id="fl-text"
						placeholder="Name"
						v-model="tax.title"
						required
					/>
					<label for="fl-text">Title</label>
				</div>
				<div class="form-floating mb-4">
					<input
						class="form-control"
						type="text"
						id="fl-text"
						placeholder="Name"
						v-model="tax.amount"
						required
					/>
					<label for="fl-text">Amount</label>
				</div>
				<!-- Floating label: Textarea -->
				<div class="form-floating mb-3">
					<textarea
						class="form-control"
						id="fl-textarea"
						style="height: 8rem"
						placeholder="Your Testimony"
						v-model="tax.description"
					></textarea>
					<label for="fl-textarea">Description</label>
				</div>

				<div class="col-12 col-md-2 col-lg-1 d-flex">
					<button
						:class="loading ? 'disabled' : ''"
						type="reset"
						class="btn btn-outline-danger me-3 btn-sm"
					>
						Reset
					</button>
					<button
						:class="loading ? 'disabled' : ''"
						type="submit"
						class="btn btn-outline-secondary btn-sm"
					>
						<span v-if="!loading"> Save </span>
						<span v-else>
							<span
								class="spinner-grow spinner-grow-sm"
								role="status"
								aria-hidden="true"
							></span>
						</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
