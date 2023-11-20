<script setup>
	import axios from "axios";
	import { inject, computed, ref } from "vue";
	import currency from "currency.js";
	import moment from "moment";
	import { user } from "@/stores/user";

	const props = defineProps({
		transaction: {
			required: true,
		},
	});

	const userId = user.getUser().id;
	const env = import.meta.env;

	const userName = ref(null);
	const transType = ref(null);

	const settings = inject("settings");

	const amount = computed(() => {
		const amount = currency(props.transaction.amount, {
			symbol: settings.value.currencySymbol,
		}).format();
		return amount;
	});

	function isDeposit() {
		if (props.transaction.type === "deposit") {
			return true;
		}
		if (props.transaction.userId === userId) {
			transType.value = "To";
			loadUser(props.transaction.toUserId);
		} else {
			transType.value = "From";
			loadUser(props.transaction.userId);
		}

		return false;
	}

	async function loadUser(id) {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/users/${id}`,
		};

		axios
			.request(config)
			.then((response) => {
				userName.value = response.data.name;
			})
			.catch(function (error) {
				console.log(error);
			});
	}
</script>

<template>
	<li
		v-if="!isDeposit()"
		class="list-group-item px-1 d-flex align-items-center"
	>
		<div>
			<i class="bx bx-transfer-alt fs-3 me-2"></i>
		</div>
		<div class="text-right">
			<div class="d-flex mb-0 align-items-center justify-content-between">
				<h4 class="fs-base fs-sm fw-rsemibold me-2 ps-1 mb-0">
					<span class="text-muted me-2">{{ transType }}</span>
					<span
						v-if="userName === null"
						class="spinner-border spinner-border-sm"
					></span>
					<span v-else>{{ userName }}</span>
				</h4>
				<div class="fw-bold fs-sm mb-0">
					{{ amount }}
				</div>
			</div>
			<p class="small text-right float fs-xs my-0">
				{{ moment(transaction.createdAt).format("MMM DD, YY hh:mm") }}
			</p>
		</div>
	</li>

	<!-- Pricing plan -->
	<li
		v-if="isDeposit()"
		class="list-group-item px-1 d-flex align-items-center"
	>
		<div>
			<i class="bx bx-download fs-3 me-2"></i>
		</div>
		<div class="text-right">
			<div class="d-flex mb-0 align-items-center justify-content-between">
				<div class="fs-base fs-sm fw-rsemibold me-2 ps-1 mb-0">
					Credit
				</div>
				<div class="fw-bold fs-sm mb-0">
					{{ amount }}
				</div>
			</div>
			<p class="small text-right float fs-xs my-0">
				{{ moment(transaction.createdAt).format("MMM DD, YY hh:mm") }}
			</p>
		</div>
	</li>
</template>
