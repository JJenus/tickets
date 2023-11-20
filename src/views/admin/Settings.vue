<script setup>
	import { inject, onMounted, ref } from "vue";
	import axios from "axios";

	import { alert, util } from "@/stores/utility";

	const env = import.meta.env;
	const settings = ref({
		currency: "USD",
		language: "en",
		currencySymbol: "$",
	});

	const currencies = {
		USD: {
			code: "USD",
			symbol: "$",
		},
		GBR: {
			code: "GBR",
			symbol: "£",
		},
		EUR: {
			code: "EUR",
			symbol: "€",
		},
	};
	const selectedCurrency = ref(null);
	const selectedLang = ref(null);

	const lang = ref();
	const currency = ref();

	const searchKey = ref(null);
	const loading = ref(false);

	//Wallet
	const { wallets, loadWallets } = inject("wallets");
	const view = ref("Create");

	const sending = ref(false);

	const wForm = ref();
	const walletForm = ref({
		address: "",
		currency: "Ethereum",
		symbol: "ETH",
		imgUrl: "https://thegivingblock.com/wp-content/uploads/2021/07/Ethereum-ETH-Logo.png",
		rate: "26000",
	});

	function ediWallet(wallet) {
		walletForm.value = wallet;
		view.value = "Create";
	}

	function createWallet() {
		if (!wForm.value.checkValidity()) {
			return alert.error("All fields are required");
		}
		sending.value = true;
		let config = {
			method: "POST",
			url: `${env.VITE_BE_API}/wallets`,
			data: walletForm.value,
		};

		axios
			.request(config)
			.then((response) => {
				alert.success();
				loadWallets();
			})
			.catch(function (error) {
				alert.error("Failed");
			})
			.finally(() => {
				sending.value = false;
			});
	}

	function save($event) {
		if (!$event.target.checkValidity()) {
			return;
		}

		settings.value.currency = currencies[selectedCurrency.value].code;
		settings.value.currencySymbol =
			currencies[selectedCurrency.value].symbol;
		settings.value.language = selectedLang.value;

		console.log(settings.value);

		loading.value = true;
		let config = {
			method: "POST",
			url: `${env.VITE_BE_API}/settings`,
			data: settings.value,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response.data);
				settings.value = response.data;
				alert.success();
			})
			.catch(function (error) {
				alert.error("Failed");
			})
			.finally(() => {
				loading.value = false;
			});
	}

	async function loadSettings() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/settings`,
		};

		axios
			.request(config)
			.then((response) => {
				settings.value = response.data;
				selectedCurrency.value = settings.value.currency;
				selectedLang.value = settings.value.language;
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function search() {
		console.log(searchKey.value);
		util.search(".testimony", searchKey.value);
	}

	onMounted(() => {
		loadSettings();
	});
</script>

<template>
	<div>
		<div
			class="pis-md-3 d-flex justify-content-between align-items-end ps-lg-0 mt-md-2 pt-md-4 pb-md-2"
		>
			<div class="me-5">
				<h1 class="h2 pt-xl-1 mb-3 pb-2 pb-lg-3">Settings</h1>
			</div>
		</div>
		<div>
			<form
				@submit.prevent="save($event)"
				class="needs-validation border-bottom pb-3 pb-lg-4"
				novalidate
			>
				<div class="row pb-2 my-3">
					<div class="col-sm-6 mb-4">
						<label for="np" class="form-label fs-base"
							>Currency</label
						>
						<select
							ref="currency"
							v-model="selectedCurrency"
							class="form-select"
						>
							<option value="USD">USD ($)</option>
							<option value="GBR">GBR (£)</option>
							<option value="EUR">EUR (€)</option>
						</select>

						<div
							class="invalid-tooltip position-absolute top-100 start-0"
						>
							Please select currency!
						</div>
					</div>
					<div class="col-sm-6 mb-4">
						<label for="np" class="form-label fs-base"
							>Language</label
						>
						<select
							ref="lang"
							v-model="selectedLang"
							class="form-select"
						>
							<option value="en">English (en)</option>
							<option value="fr">French (fr)</option>
							<option value="es">Spanish (es)</option>
						</select>
						<div
							class="invalid-tooltip position-absolute top-100 start-0"
						>
							Select a language
						</div>
					</div>
				</div>
				<div class="d-flex mb-3">
					<button type="reset" class="btn btn-secondary me-3">
						Cancel
					</button>
					<button
						:class="loading ? 'disabled' : ''"
						type="submit"
						class="btn btn-primary"
					>
						<span v-if="!loading"> Save changes </span>
						<span v-else>
							<span
								class="spinner-grow spinner-grow-sm"
								role="status"
								aria-hidden="true"
							></span>
							Please wait...
						</span>
					</button>
				</div>
			</form>
		</div>

		<div>
			<div
				class="me-5 mt-4 d-flex align-items-center justify-content-between"
			>
				<h1 class="h5 pt-xl-1 mb-3 pb-2 pb-lg-3">{{ view }} Wallet</h1>

				<button
					@click="view = 'Edit'"
					v-if="view == 'Create'"
					class="btn btn-outline-secondary btn-sm"
				>
					Edit
				</button>
				<button
					v-else
					@click="view = 'Create'"
					class="btn btn-outline-secondary btn-sm"
				>
					Back
				</button>
			</div>
			<div v-if="view == 'Create'">
				<form ref="wForm" @submit.prevent="createWallet()" novalidate>
					<div class="row pb-2 my-3">
						<div class="col-sm-6 mb-4">
							<label for="np" class="form-label fs-base"
								>Crypto Currency</label
							>
							<input
								type="text"
								id="fn"
								class="form-control form-control-lg"
								name="crypto_address"
								required
								v-model="walletForm.currency"
							/>

							<div
								class="invalid-tooltip position-absolute top-100 start-0"
							>
								Please select currency!
							</div>
						</div>
						<div class="col-sm-6 mb-4">
							<label for="np" class="form-label fs-base"
								>Symbol</label
							>
							<input
								type="text"
								id="fn"
								class="form-control form-control-lg"
								name="crypto_address"
								required
								v-model="walletForm.symbol"
							/>
							<div
								class="invalid-tooltip position-absolute top-100 start-0"
							>
								Select a language
							</div>
						</div>
					</div>
					<div class="mb-4" bis_skin_checked="1">
						<label for="fn" class="form-label fs-base">
							Conversion Rate in {{ settings.currency }} ({{
								settings.currencySymbol
							}})
						</label>
						<input
							type="text"
							id="fn"
							class="form-control form-control-lg"
							name="crypto_address"
							required
							v-model="walletForm.rate"
						/>
						<div class="invalid-feedback" bis_skin_checked="1">
							Please enter address!
						</div>
					</div>

					<div class="mb-4" bis_skin_checked="1">
						<label for="fn" class="form-label fs-base">
							Address
						</label>
						<input
							type="text"
							id="fn"
							class="form-control form-control-lg"
							name="crypto_address"
							required
							v-model="walletForm.address"
						/>
						<div class="invalid-feedback" bis_skin_checked="1">
							Please enter address!
						</div>
					</div>

					<div class="mb-4 d-flex align-items-center">
						<div class="mb-4 w-100" bis_skin_checked="1">
							<label for="fn" class="form-label fs-base">
								Image </label
							><input
								type="text"
								id="fn"
								class="form-control form-control-lg"
								name="amount"
								v-model="walletForm.imgUrl"
								required
							/>
							<div class="invalid-feedback" bis_skin_checked="1">
								Enter amount
							</div>
						</div>
						<div
							v-if="walletForm.imgUrl"
							class="ms-2 shadow p-2 rounded border"
						>
							<img
								style="height: 60px"
								:src="walletForm.imgUrl"
								alt=""
							/>
						</div>
					</div>
					<div bis_skin_checked="1">
						<button
							:disabled="sending"
							class="w-100 btn btn-primary"
						>
							<span v-if="!sending">Save</span>
							<span
								v-else
								class="spinner-border spinner-border-sm"
							></span>
						</button>
						<div
							class="text-sm text-warning mt-1"
							style="font-size: 14px"
						>
							<i class="bx bx-info-circle me-1"></i> Make sure the
							address is correct
						</div>
					</div>
				</form>
			</div>
			<div v-else class="row row-cols-md-1">
				<div v-if="wallets.length == 0" class="text-center text-muted">
					No wallet to show
				</div>
				<div v-for="wallet in wallets" :key="wallet.id" class="col">
					<div
						class="card d-sm-flex flex-sm-row align-items-sm-center justify-content-between border-0 shadow-sm p-3 p-md-4 mb-4"
					>
						<div class="d-flex align-items-center pe-sm-3">
							<img
								:src="wallet.imgUrl"
								width="84"
								alt="Bitcoin"
							/>
							<div class="ps-3 ps-sm-4">
								<h6 class="mb-2">
									{{ wallet.currency }} ({{ wallet.symbol }})
								</h6>
								<div class="fs-sm">
									<button
										@click="ediWallet(wallet)"
										type="button"
										class="btn btn-outline-secondary px-3 px-xl-4 me-3"
									>
										<span class="d-flex align-items-center">
											<i
												class="bx bx-check-circle fs-xl me-1 me-xl-2"
											></i>
											<span class="d-lg-inline">
												Edit
											</span>
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
