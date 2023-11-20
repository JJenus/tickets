import { inject, ref } from "vue";
import swal from "sweetalert";
import currency from "currency.js";
import moment from "moment";

function notify(icon, title, message = "") {
	swal({
		title: title,
		text: message,
		icon: icon,
		buttons: {
			close: {
				text: "Close",
				value: false,
				visible: true,
				className: "btn btn-outline-primary",
				closeModal: true,
			},
		},
	});
}

export const alert = {
	success(title = "Success", message = "") {
		notify("success", title, message);
	},
	error(title, message = "") {
		notify("error", title, message);
	},
	info(title, message = "") {
		notify("info", title, message);
	},
	verify() {
		swal({
			title: "Verify account",
			content:
				"<p class='text-center'>Click on start verification or come back at your convinience</p>",
			icon: "warning",
			buttons: {
				verification: {
					text: "Start verification",
					value: true,
					visible: true,
					className: "btn btn-outline-secondary",
					closeModal: true,
				},
				close: {
					text: "Close",
					value: false,
					visible: true,
					className: "btn btn-outline-primary",
					closeModal: true,
				},
			},
			dangerMode: false,
		}).then((next) => {
			if (next) {
				document.querySelector(".btn-close").click();
				// open verification dialogue
				document.querySelector("#btn-verify-modal").click();
			} else {
				// do nothing
			}
		});
	},
};

export const util = {
	avatar: "/assets/img/avatar/default-avatar.png",
	settings: () => {
		return {
			currency: "USD",
			currencySymbol: "$",
			language: "en",
			verificationFee: 5,
		};
	},

	search(area, input) {
		const rjx = new RegExp(input, "i");
		document.querySelectorAll(area).forEach((e) => {
			if (rjx.test(e.innerText)) {
				e.style.display = "block";
			} else {
				e.style.display = "none";
			}
		});
	},

	backendApi: import.meta.env.VITE_BE_API,

	camera: {
		captured: ref(false),
		imageFile: ref(null),
	},

	loadSettings() {},

	resizeImg(uri, width = 100) {
		let uArr = uri.split(".com/");
		return uArr.join(`.com/resize=width:${width}/`);
	},

	money(money) {
		const config = inject("settings", {
			currency: "USD",
			currencySymbol: "$",
			language: "en",
			verificationFee: 5,
		});
		const amount = currency(money, {
			symbol: config.value.currencySymbol,
		}).format();
		return amount;
	},

	crypto(money) {
		const amount = currency(money, {
			symbol: "",
			precision: 8,
		}).format();
		return amount;
	},

	saveTickets(tickets) {
		const key = "tickets";
		localStorage.setItem(key, JSON.stringify(tickets));
	},

	getTickets() {
		const key = "tickets";
		const tickets = localStorage.getItem(key);
		if (tickets !== null) {
			return JSON.parse(tickets);
		}
		return [];
	},

	getTodayPrints(list, userTicketId = null) {
		const today = moment().format("YYYY-MM-DDTHH:mm:ss.SSS"); // Get today's date in the same format as in the list

		// Check if an entry for today already exists
		const todayEntry = list.find((item) =>
			moment(item.createdAt).isSame(today, "day")
		);

		if (todayEntry) {
			return todayEntry; // Return the object if it exists
		} else {
			// If today's entry doesn't exist, create a new object with today's date and add it to the list
			const newEntry = {
				count: 0,
				createdAt: today,
				userTicketId,
			};
			list.push(newEntry);
			return newEntry; // Return the newly added object
		}
	},
};

export const userIp = {
	storageKey: "firr@m0@user-ip",
	ipData: null,
	getIp() {
		const data = localStorage.getItem(this.storageKey);

		if (data === null || data === undefined) {
			return false;
		}

		this.ipData = JSON.parse(data);
		return this.ipData.ip;
	},
	saveIp(data) {
		this.ipData = data;
		localStorage.setItem(this.storageKey, JSON.stringify(data));
	},
};
