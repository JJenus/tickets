<script setup>
	import bwipjs from "bwip-js";
	import { onMounted, ref } from "vue";
	import moment from "moment";
	import currency from "currency.js";

	const key = "Bovadar_009";
	const images = 9;
	const barcodeImg = ref("");
	const barcodeTxt = ref("678873837");
	const time = moment().format("DD.MM.YYYY HH:mm:ss");
	const id = randomInteger(100000000, 9000000000) + "";
	const pin = randomInteger(1000, 9999);
	// 231506829
	const ticket = ref({
		id: id,
		pin: pin,
		date: moment().format("DD/MM/YYYY"),
		time: moment().format("HH:mm:ss"),
		stake: 250,
		games: [
			{
				id: "27HI",
				odds: 9.5,
				score: "2:1",
				type: "Ht/ft",
				time: moment().format("HH:mm"),
				day: moment().format("ddd DD/MM"),
				home: "Famengo",
				away: "Champecoence-SC",
			},
			{
				id: "29CS",
				odds: 10.0,
				score: "3:1",
				type: "Ht/ft",
				time: moment().format("HH:mm"),
				day: moment().format("ddd DD/MM"),
				home: "Brigrano",
				away: "Apropecuario",
			},
		],
	});

	function editGame(game, edit) {
		let show = game[edit];
		if (edit === "dateTime") {
			show = moment().format("DD.MM.YYYY HH:mm:ss");
		} else if (edit === "id" && game[edit].length > 5) {
			show = randomInteger(100000000, 9000000000);
		} else if (edit === "pin") {
			show = randomInteger(1000, 9999);
		}
		let res = prompt(game[edit], show);
		if (res) {
			game[edit] = res;
		}
		localStorage.setItem(key, JSON.stringify(ticket.value));
	}

	function money(cash) {
		return currency(cash, {
			symbol: "",
			decimal: ".",
			separator: ",",
		}).format();
	}

	function format(odd, decimal = ".", th = ",") {
		return currency(odd, {
			symbol: "",
			decimal: decimal,
			separator: th,
		}).format();
	}

	function totalOdds() {
		return ticket.value.games.reduce((p, c) => {
			return p * Number(c.odds);
		}, 1);
	}

	function winnings() {
		let odds = totalOdds();

		let cash = currency(ticket.value.stake).multiply(odds).value;
		return money(cash);
	}

	function randomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function generateBar() {
		var min = 10000000000000;
		barcodeTxt.value = "" + randomInteger(100000000000, min * 9);
		try {
			// The return value is the canvas element
			let canvas = document.createElement("canvas");
			canvas = bwipjs.toCanvas(canvas, {
				bcid: "code128", // barcodeImg type
				text: barcodeTxt.value, // Text to encode
				scale: 3, // 3x scaling factor
				height: 10, // Bar height, in millimeters
				includetext: false, // Show human-readable text
				textxalign: "center", // Always good to set this
			});
			barcodeImg.value = canvas.toDataURL("image/png");
		} catch (e) {
			console.log(e);
		}
	}

	function clearStorage() {
		localStorage.removeItem(key);
		window.location.reload();
	}

	onMounted(() => {
		generateBar();

		let data = localStorage.getItem(key);
		if (data) {
			ticket.value = JSON.parse(data);
		}
	});
</script>

<template>
	<div class="container-fluid px-1">
		<div
			id="bovada"
			class="d-flex flex-row justify-content-center position-relative"
		>
			<div class="pt-1">
				<div v-for="i in 4" class="p-0 logo-stamp">
					<!-- <-- width="300" -->
					<img
						class="logo-img"
						src="/assets/bovada/logo_vada.png"
						alt=""
					/>
				</div>
			</div>
			<div class="d-flex flex-row justify-content-center my-5 w-100">
				<div class="w-100 mt-0">
					<div class="d-flex mb-3 flex-column text-center w-100">
						<div class="mb-3 w-100" @click="clearStorage()">
							<!-- <-- width="300" -->
							<img
								width="250"
								src="/assets/bovada/bovada.svg"
								alt=""
							/>
						</div>
						<div class="">
							<span>Costa Rica-Based</span>
						</div>
					</div>

					<div class="px-0 ps-2">
						<table class="table table-borderless align-bottom mb-0">
							<thead>
								<tr>
									<td
										@click="editGame(ticket, 'pin')"
										class="px-0 pb-1"
									>
										(Code.{{ ticket.pin }})
									</td>
									<td
										@click="editGame(ticket, 'date')"
										class="px-0 pb-1"
									>
										<span>{{ ticket.date }}</span>
									</td>
									<td
										class="px-0 pb-1"
										style="text-align: right"
										@click="editGame(ticket, 'time')"
									>
										{{ ticket.time }}
									</td>
								</tr>
								<tr>
									<td
										class="fw-normal px-0"
										scope="col"
										colspan="3"
									>
										SYSTEM: 2/2
									</td>
								</tr>
							</thead>
							<tbody class="tb-divider table-group-divider">
								<tr v-for="game in ticket.games">
									<td colspan="2">
										<div class="fw-bold">
											<span
												@click="editGame(game, 'home')"
											>
												{{ game.home }}
											</span>
											<span class="mx-1">-</span>
											<span
												@click="editGame(game, 'away')"
											>
												{{ game.away }}
											</span>
										</div>
										<div class="" style="">
											<span
												@click="editGame(game, 'day')"
												>{{ game.day }}</span
											>
											<span class="mx-2">
												<span @click="editGame(game, 'time')" class="me-1">{{ game.time }}</span>
												<span @click="editGame(game, 'type')">{{ game.type }}</span>
											</span>
											<span
												><span
													@click="
														editGame(game, 'score')
													"
													>{{ game.score }}</span
												></span
											>
										</div>
									</td>
									<td style="text-align: end">
										<span @click="editGame(game, 'odds')">{{
											format(game.odds)
										}}</span>
									</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td
										colspan="3"
										class="ps-4 pt-4 fs-6"
										style="font-weight: 500"
									>
										<div
											class="d-flex pt-3 justify-content-between"
										>
											<span class="" colspan="2">
												Payment:
											</span>
											<span class="text-end">
												<span
													@click="
														editGame(
															ticket,
															'stake'
														)
													"
													>{{
														money(ticket.stake)
													}}</span
												>
												USD
											</span>
										</div>
										<div
											class="d-flex justify-content-between"
										>
											<span class="" colspan="2">
												Possible Profit:
											</span>
											<span class="text-end">
												{{ winnings() }} USD
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td colspan="2">Total Odds :</td>
									<td class="text-end">
										<span>
											{{ format(totalOdds(), ".", ",") }}
										</span>
									</td>
								</tr>

								<tr>
									<td colspan="3" class="text-end">
										<div
											class="mb-1 me-3"
											@click="generateBar()"
										>
											<!-- <-- width="300" -->
											<img
												width="140"
												height="50"
												:src="barcodeImg"
												alt=""
											/>
										</div>
									</td>
								</tr>
								<tr>
									<td colspan="3" class="p-0">
										<span class="fw-bold w-100">
											Please check your ticket 10 minutes
											before the matches start. We do not
											refund or exchange the ticket if
											this time expires.
										</span>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	@import url("https://fonts.googleapis.com/css2?family=Blinker&family=Cantarell:wght@400&family=Ubuntu&family=Ubuntu+Condensed&display=swap");

	* {
		/* font-size: small; */
	}

	.logo-stamp {
		margin: 0px;
		padding: 0px;
		margin-bottom: 50px;
	}

	.logo-img {
		height: 100px;
	}
	.rotate-90 {
		position: relative;
		transform: rotate(-90deg);
		-webkit-transform: rotate(90deg);
		/* transform-origin: top left; */
		width: 115px;
		height: 210px;
	}
	.rotate-container {
		left: -10px;
		top: -12px;
	}
	th,
	tr,
	td {
		/* padding: 0 !important; */
		padding-left: 8px;
		padding-right: 0px;
		margin: 0;
	}

	#bovada {
		font-family: "Rubik", sans-serif;
		font-size: small;
		/* line-height: 24px; */
		letter-spacing: 0.0001rem;
	}
	.tb-divider {
		border-top: 2px solid #666666 !important;
		border-bottom: 2px solid #666666 !important;
	}
</style>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap");
</style>
