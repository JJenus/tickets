<script setup>
	import axios from "axios";
	import { inject, onMounted, ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { alert, util } from "../stores/utility";
	import Bovada from "../views/tickets/Bovada.vue";
	import TipWin from "../views/tickets/Tipwin.vue";
	import Oddset from "../views/tickets/Oddset.vue";
	import Williamhill from "../views/tickets/Williamhill.vue";

	import moment from "moment";

	const env = import.meta.env;

	const router = useRouter();
	const route = useRoute();
	const tickets = util.getTickets();
	const ticket = ref({});
	const startTime = moment().add(5, "minutes");
	const maxPrints = ref(0);
	const prints = ref({});
	const id = ref("");

	// const { loadUserTickets } = inject("tickets");

	window.onbeforeprint = (event) => {
		window.debug.log("Before print: " + ticket.value.name);
		prints.value.count++;
		window.debug.log(ticket.value.prints);
		tickets[id.value] = ticket.value;
		util.saveTickets(tickets);
		updateAction();
		if (prints.value.count > maxPrints.value) {
			alert.info("Exceeded maximum prints for the day!");
			setTimeout(() => {
				window.location.href = "/app/tickets";
			}, 3000);
		}
	};

	function updateAction() {
		let config = {
			method: "post",
			url: `${env.VITE_BE_API}/tickets/user-tickets/print`,
			data: prints.value,
		};

		axios
			.request(config)
			.then((response) => {
				window.debug.log(response.data);
				prints.value = response.data;
			})
			.catch(function (error) {
				window.debug.log(error);
			});
	}

	const timer = () => {
		// replace this with your specific moment
		if (moment().isSameOrAfter(startTime)) {
			// Current time is more than 10 minutes past yourMoment
			window.debug.log("It's more than 10 minutes past yourMoment");
			util.saveTickets([]);
			window.location.href = "/app/tickets";
		} else {
			// window.debug.log("It's not more than 10 minutes past yourMoment");
		}
	};

	onMounted(async () => {
		await router.isReady();
		id.value = route.params.id;
		window.debug.log("All tickets: ", id, tickets);
		ticket.value = tickets[id.value];

		window.debug.log("Ticket", ticket.value); // Outputs '020020'

		prints.value = util.getTodayPrints(
			ticket.value.prints,
			ticket.value.id
		);
		maxPrints.value = ticket.value.maxPrints;

		setInterval(() => {
			timer();
		}, 60_000);
	});
</script>
<template>
	<div :class="prints.count > maxPrints ? 'd-none' : ''" v-if="ticket.ticket">
		<Bovada v-if="ticket.ticket.name === 'Bovada'" />
		<TipWin v-if="ticket.ticket.name === 'Tipwin'" />
		<Oddset v-if="ticket.ticket.name === 'Williamhill'" />
		<Williamhill v-if="ticket.ticket.name === 'Oddset'" />
	</div>
</template>

<style scoped>
	/* @import 'bootstrap/dist/css/bootstrap.min.css'; */
</style>
