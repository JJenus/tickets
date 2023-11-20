<script setup>
	import bwipjs from "bwip-js";
	import { onMounted, ref } from "vue";
	import moment from "moment";
	import currency from "currency.js";

	// import "bootstrap/dist/css/bootstrap.min.css";

	const key = "tipwin32";
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
		dateTime: time,
		stake: 250,
		games: [
			{
				id: "27HI",
				odds: 9.5,
				score: "2:1",
				time: "21:00",
				home: "Qrendi",
				away: "Luqa",
			},
			{
				id: "29CS",
				odds: 10.0,
				score: "3:1",
				time: "20:30",
				home: "Vitoria Se.",
				away: "Santarem",
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
			separator: ".",
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

	onMounted(() => {
		generateBar();

		let data = localStorage.getItem(key);
		if (data) {
			ticket.value = JSON.parse(data);
		}
	});
</script>

<template>
	<div class="d-flex text-dark flex-row justify-content-center pe-2">
		<div class="vh-100 d-flex flex-column pe-1">
			<div v-for="i in images" class="mb-4">
				<!-- <-- width="300" -->
				<img style="height: 51px" src="/tickets/logo.png" alt="" />
			</div>
		</div>
		<div
			id="tipwin"
			class="d-flex flex-row justify-content-center my-5 w-100"
		>
			<div class="w-100">
				<div class="d-flex mb-4 flex-column text-center w-100">
					<div class="mb-3 w-100">
						<!-- <-- width="300" -->
						<img width="200" src="/tickets/tipwin-rb.jpeg" alt="" />
					</div>
					<div class="fw-bold">
						Möllerstr.26.58199 Hagen <br />
						Terminal 01369
					</div>
				</div>

				<div class="px-0">
					<table class="table border-dark align-bottom mb-0">
						<tbody>
							<tr class="border-0">
								<th
									colspan="3"
									class="text-center border-0 mb-5"
								>
									<div class="mb-4" style="font-size: 0.8rem">
										Nr.:
										<span
											class="pe-0"
											@click="editGame(ticket, 'id')"
											>{{ ticket.id }}</span
										><span @click="editGame(ticket, 'pin')"
											>(PIN {{ ticket.pin }})
										</span>
										<span
											@click="
												editGame(ticket, 'dateTime')
											"
											>{{ ticket.dateTime }}</span
										>
									</div>
								</th>
							</tr>
							<tr class="">
								<th class="fw-normal" scope="col" colspan="3">
									Einsatz:
									<span>{{ money(ticket.stake) }}</span> x
									1=<span>{{ money(ticket.stake) }}</span>
								</th>
							</tr>
							<tr v-for="game in ticket.games">
								<td>
									<div class="fw-bold">
										<span
											@click="editGame(game, 'id')"
											class="pe-1"
										>
											{{ game.id }}
										</span>
										<span @click="editGame(game, 'home')">
											{{ game.home }}
										</span>
										<span class="px-1">-</span>
										<span @click="editGame(game, 'away')">
											{{ game.away }}
										</span>
									</div>
									<div
										@click="editGame(game, 'time')"
										class="ps-3"
									>
										Do {{ game.time }} Genaues Ergebuns
									</div>
								</td>
								<td>
									<span @click="editGame(game, 'score')">{{
										game.score
									}}</span>
								</td>
								<td class="text-end">
									<span @click="editGame(game, 'odds')">{{
										format(game.odds)
									}}</span>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="d-flex justify-content-between">
						<div class="">Gesamtquote</div>
						<div class="text-end">
							{{ format(totalOdds(), ",", ".") }}
						</div>
					</div>

					<div class="d-flex justify-content-between fs-5 fw-bold">
						<div class="">Betrag:</div>
						<div class="text-end">
							<span @click="editGame(ticket, 'stake')">{{
								money(ticket.stake)
							}}</span>
							EUR
						</div>
					</div>
					<div class="d-flex justify-content-between fs-5 fw-bold">
						<div class="">Max. Gewinn:</div>
						<div class="text-end">{{ winnings() }} EUR</div>
					</div>
				</div>

				<div
					class="text-center d-flex fw-bold flex-column justify-content-center"
				>
					<div class="my-4 pb-3">
						Wetten sind für Minderjährige verboten.
						<br />
						Wetten können süchtig machen! Hilfe
						<br />
						Kostenlos und anonym unter 0900132800
					</div>
					<div class="mb-1 w-100" @click="generateBar()">
						<!-- <-- width="300" -->
						<img width="190" :src="barcodeImg" alt="" />
					</div>
					<div class="fw-bold">{{ barcodeTxt }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	@import url("https://fonts.googleapis.com/css2?family=Blinker&family=Cantarell:wght@400;700&family=Ubuntu&family=Ubuntu+Condensed&display=swap");

	th,
	tr,
	td {
		padding: 0 !important;
		margin: 0;
		color: black;
	}
	th,
	tr,
	.border-dark {
		border-color: black;
	}

	#tipwin {
		font-family: "Ubuntu", "Ubuntu Condensed", "Blinker", sans-serif;
		font-size: 14px;
		line-height: 24px;
		letter-spacing: 0.0001rem;
	}
</style>

<style scoped>
	/* @import "bootstrap/dist/css/bootstrap.min.css"; */
	@import url("https://fonts.googleapis.com/css2?family=Blinker&family=Cantarell:wght@400;700&family=Ubuntu&family=Ubuntu+Condensed&display=swap");
</style>
