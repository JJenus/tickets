<script setup>
	import { ref } from "vue";
	import { util } from "../../stores/utility";

	const props = defineProps({
		ticket: {
			required: true,
		},
	});

	const showDetails = ref(false);
	const active = ref("receive");

	const formatAmount = () => {
		return util.money(Number(props.crypto.localBalance));
	};

	const cryptoBalance = () => {
		return util.crypto(Number(props.crypto.cryptoBalance));
	};
</script>

<template>
	<div class="col">
		<div class="me-3 card">
			<div @click="showDetails = !showDetails" class="card-body">
				<div class="posiition-relative">
					<div class="d-inline-block align-items-center">
						<h3 class="h5 mb-2">
							<a role="button">{{ ticket.name }}</a>
						</h3>
						<p class="fs-lg fw-semibold text-primary mb-0">
							{{ ticket.amount }}
						</p>
					</div>
					<div class="ms-2 d-none">
						<i
							v-if="!showDetails"
							class="bx bx-down-arrow-circle fs-3"
						></i>
						<i v-else class="bx bxs-up-arrow-circle fs-3"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
