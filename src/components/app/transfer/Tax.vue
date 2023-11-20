<script setup>
	import { inject, onMounted, ref } from "vue";
	import axios from "axios";
	import { util } from "@/stores/utility";

	const env = import.meta.env;

	const user = inject("user");
	const tax = ref({});

	function loadTax() {
		let config = {
			method: "GET",
			url: `${env.VITE_BE_API}/users/${user.value.id}/tax`,
		};
		axios
			.request(config)
			.then((res) => {
				const data = res.data;
				tax.value = data;
				// console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	onMounted(() => {
		loadTax();
	});
</script>

<template>
	<div>
		<h6>{{ tax.title }}</h6>
		<strong>{{ util.money(tax.amount) }}</strong>
		<p>{{ tax.description }}</p>
		<small class="text-muted fs-xs">
			<i class="bx bxs-info-circle bx-flashing text-warning"></i>
			Please contact support to clear this
		</small>
	</div>
</template>
