<script setup>
	import { onMounted, ref, inject, provide } from "vue";
	import moment from "moment";
	import axios from "axios";
	import { alert, util } from "@/stores/utility";
	import currency from "currency.js";

	import TaxBillingForm from "./TaxBillingForm.vue";

	const env = import.meta.env;
	const props = defineProps({
		user: {
			required: true,
		},
	});
	const addBalance = ref(false);
	const loading = ref(false);
	const depositAmount = ref(null);
	const saved = ref(0);
	const settings = inject("settings");
	const appUser = ref(props.user);
	const showBilling = ref(false);
	const loadingTax = ref(false);

	const userWallets = ref([]);

	const tax = ref({});
	provide("billingTax", tax);

	async function deposit($event) {
		if (!$event.target.checkValidity()) {
			return;
		}
		loading.value = true;
		let config = {
			method: "POST",
			url: `${env.VITE_BE_API}/transactions/deposit`,
			data: {
				amount: depositAmount.value,
				source: "ADMIN",
				currency: "USD",
				userId: appUser.value.id,
			},
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				// users.value = response.data;
				alert.success();
				saved.value = depositAmount.value;
			})
			.catch(function (error) {
				alert.error();
			})
			.finally(() => {
				loading.value = false;
			});
	}

	function getTime() {
		const fromNow = moment(appUser.createdAt).fromNow();

		let check = ["minutes", "seconds", "hours", "few"].find((e) =>
			fromNow.includes(e)
		);
		console.log("Check", check);
		if (!check) {
			return moment(appUser.value.createdAt).format("LLL");
		}

		return fromNow;
	}

	function balance() {
		const amount = currency(appUser.value.balance.amount, {
			symbol: settings.value.currencySymbol,
		}).add(saved.value);

		return amount.format();
	}

	function status() {
		return appUser.value.status || "new";
	}

	function statColor() {
		return status() === "verified"
			? "success"
			: status() === "new"
			? "primary"
			: status() === "pending"
			? "warning"
			: "danger";
	}

	function verify() {
		loading.value = true;

		const nUser = { ...appUser.value };
		nUser.status = "verified";

		let config = {
			method: "PUT",
			url: `${env.VITE_BE_API}/users`,
			data: nUser,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				// users.value = response.data;
				alert.success();
				appUser.value = response.data;
			})
			.catch((error) => {
				alert.error();
				appUser.value.status = props.user.status;
			})
			.finally(() => {
				loading.value = false;
			});
	}

	function shadeBorder() {
		return statColor() == "danger" || statColor() == "warning"
			? true
			: false;
	}

	async function loadTax() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/users/${appUser.value.id}/tax`,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				tax.value = response.data;
				loadingTax.value = true;
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	async function loadUserWallets() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/wallets/user-wallets/${props.user.id}`,
		};

		await axios
			.request(config)
			.then((response) => {
				userWallets.value = response.data;
				console.log(userWallets.value);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	onMounted(() => {
		loadUserWallets();
		loadTax();
	});
</script>

<template>
	<div class="col-lg-4 col-md-6 col-12 user">
		<!-- Card -->
		<div
			:class="shadeBorder() ? 'border-' + statColor() : ''"
			class="card mb-4"
		>
			<!-- Card Body -->
			<div class="card-body position-relative">
				<a
					href="#"
					v-if="showBilling"
					@click="showBilling = false"
					class="btn-link ms-n1 m-3 text-dark position-absolute left-0 top-0 fs-5 border px-1 py-1 d-flex align-items-center justify-content-between rounded-circle"
				>
					<i class="bx bx-left-arrow-alt"></i>
				</a>

				<a
					href="#"
					@click="showBilling = true"
					v-else
					class="btn-link m-3 text-dark position-absolute end-0 top-0 fs-5 border px-1 py-1 d-flex align-items-center justify-content-between rounded-circle"
				>
					<i class="bx bx-right-arrow-alt"></i>
				</a>

				<div class="text-center">
					<img
						:src="appUser.imgUrl || util.avatar"
						class="rounded-circle avatar-xl mb-3"
						width="80"
						alt="img"
					/>
					<h4 class="mb-1">
						{{ appUser.name }}
					</h4>
					<p class="mb-0 fs-6">
						<i class="fe fe-map-pin me-1"></i>
						{{ appUser.country }}
					</p>
				</div>

				<div v-if="showBilling">
					<TaxBillingForm
						v-if="loadingTax"
						:wallets="userWallets"
					></TaxBillingForm>
					<div
						v-else
						class="w-100 d-flex align-items-center justify-content-center"
						style="min-height: 100px"
					>
						<span
							class="spinner-border spinner-border-sm me-2"
							role="status"
							aria-hidden="true"
						></span>
						Loading tax...
					</div>
				</div>

				<div v-else>
					<div class="border-bottom py-2 mt-4 fs-6">
						<div class="d-flex fs-sm justify-content-between">
							<span class="me-2 fs-sm">Balance</span>
							<span class="text-success">
								<button
									@click="addBalance = !addBalance"
									class="btn btn-sm p-1 me-1 btn-outline-secondary rounded-circle"
								>
									<i
										:class="
											addBalance ? 'bx-minus' : 'bx-plus'
										"
										class="bx"
									></i>
								</button>
								{{ balance() }}
							</span>
						</div>

						<div v-if="addBalance">
							<form
								@submit.prevent="deposit($event)"
								class="d-flex align-items-end mt-3"
							>
								<div class="form-group me-3">
									<label for="amount" class="form-label"
										>Amount
									</label>
									<input
										type="text"
										class="form-control form-control-sm"
										data-format='{"numeral": true}'
										v-model="depositAmount"
									/>
								</div>
								<div>
									<button
										:class="loading ? 'disabled' : ''"
										class="btn btn-sm btn-outline-secondary"
									>
										<span
											v-if="loading"
											class="spinner-border-sm spinner-border"
										></span>

										<span v-else>Save</span>
									</button>
								</div>
							</form>
						</div>
					</div>

					<div
						class="d-flex fs-sm justify-content-between align-items-end border-bottom py-2 mt-2 fs-6"
					>
						<span>Status</span>
						<span :class="'bg-' + statColor()" class="badge">
							{{ status() }}
						</span>
						<button
							v-if="status() === 'pending'"
							:class="loading ? 'disabled' : ''"
							class="btn p-1 fs-xs btn-sm btn-outline-primary rounded px-2"
							@click="verify()"
						>
							<span
								v-if="loading"
								class="spinner-border-sm spinner-border"
							></span>

							<span v-else>Verify</span>
						</button>
					</div>

					<div
						class="d-flex fs-sm justify-content-between pt-2 mt-2 fs-6"
					>
						<span class="me-3">Registered</span>
						<span class="text-dark"> {{ getTime() }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
