<script setup>
	import { inject, onMounted, ref } from "vue";
	import { util } from "../../stores/utility";
	import moment from "moment";

	const { userTickets } = inject("tickets");

	const keyTickets = ref([]);

	const momentsAgo = (time) => {
		if (isExpired(time)) {
			return "expired";
		}

		return moment(time).fromNow();
	};

	function generateKey(length = 20) {
		let characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";

		// Shuffle characters
		characters = characters
			.split("")
			.sort(() => Math.random() - 0.5)
			.join("");

		for (let i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}

		return result;
	}

	function isExpired(tDate) {
		return moment(tDate).isBefore(moment());
	}

	function prints(prints, ticketId) {
		const print = util.getTodayPrints(prints, ticketId);
		return print.count;
	}

	onMounted(() => {
		// console.log(userTickets.value)
		var load = setInterval(() => {
			keyTickets.value = userTickets.value.map((ticket) => {
				return {
					...ticket,
					key: generateKey(), // Adjust the length as needed
				};
			});

			const keyNameMap = keyTickets.value.reduce((acc, ticket) => {
				if (!isExpired(ticket.expiresAt)) {
					acc[ticket.key] = ticket;
				}else{
					console.log("Expired")
				}

				return acc;
			}, {});

			console.log("Keys", keyNameMap);
			util.saveTickets(keyNameMap);

			if (keyTickets.value.length > 0) {
				clearInterval(load);
			}
		}, 1000);
	});
</script>

<template>
	<div class="ps-md-3 ps-lg-0 mt-md-2 pt-md-4 pb-md-2">
		<h1 class="h2 pt-xl-1 mb-2">Available Tickets</h1>
		<h2 class="h6 text-info mb-4 d-none">nothing</h2>

		<div class="py-2">
			<div class="row row-cols-1 row-cols-sm-2 gx-3 gx-lg-4">
				<!-- Item -->
				<div v-for="ticket in keyTickets" class="col pb-lg-2 mb-4">
					<a
						:href="
							isExpired(ticket.expiresAt)
								? '/expired'
								: `/tickets/${ticket.key}`
						"
						class="card h-100 text-decoration-none border-0 shadow-sm"
					>
						<div class="position-relative">
							<a
								href=""
								class="d-block position-absolute w-100 h-100 top-0 start-0"
							></a>
							<a
								href="#"
								class="btn btn-icon shadow btn-light bg-white border-white btn-sm rounded-circle position-absolute top-0 end-0 zindex-2 me-3 mt-3"
								data-bs-toggle="tooltip"
								data-bs-placement="left"
								aria-label="Remove"
							>
								<!-- <i class="bx bxs-bookmark"></i> -->
								<i class="bx bx-grid-vertical"></i>
							</a>
						</div>
						<div class="card-body pb-3">
							<h3 class="h5 mb-2">
								<a role="button">{{ ticket.ticket.name }}</a>
							</h3>
							<p class="small text-dark mb-0">
								Max prints per day {{ ticket.maxPrints }} <br>
								Left: {{ ticket.maxPrints - prints(ticket.prints, ticket.id) }}
							</p>
						</div>
						<div
							class="card-footer d-flex align-items-center fs-sm text-muted py-4"
						>
							<div class="d-flex align-items-center me-4">
								<i class="bx bx-time fs-xl me-1"></i>
								{{ momentsAgo(ticket.expiresAt) }}
							</div>
							<div class="d-flex align-items-center">
								<i class="bx bx-bullseye fs-xl me-1"></i>
								<!-- <i class="bx bx-bullseye"></i> -->
								{{ prints(ticket.prints, ticket.id) }}
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
