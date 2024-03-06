export default {
	computedRowValues(row) {
		let counselee = [
			row.counselee_first_name,
			row.counselee_last_name,
		].join(" ");

		if(row.counselee_other_names !== null && row.counselee_other_names.trim().length > 0) {
			counselee = counselee + ", " + row.counselee_other_names;
		}

		let counselor = [
			row.counselor_title,
			row.counselor_first_name,
			row.counselor_last_name
		].join(" ");

		return {
			counselee: counselee,
			counselor: counselor
		}
	},
	async getCounseleeLocation() {
		let value = NewCounseleeSelect.selectedOptionLabel || "";

		if(value.trim().length < 1) {
			return "";
		}

		let location = value.split(" - ")[1] || "";
		return location;
	},
	async getCounseleePictureUrl() {
		let value = NewCounseleeSelect.selectedOptionLabel || "";

		if(value.trim().length < 1) {
			return "";
		}

		let url = value.split(" - ")[2] || "";
		return url;
	},
	counseleeOptions() {

	}
}