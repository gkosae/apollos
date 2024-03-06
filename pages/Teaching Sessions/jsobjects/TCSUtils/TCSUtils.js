export default {
	computedRowValues (row) {
		let counselee = [
			row.counselee_first_name,
			row.counselee_last_name,
		].join(" ");
		
		let counselor = [
			row.counselor_title,
			row.counselor_first_name,
			row.counselor_last_name
		].join(" ");
		
		let lesson = row.class_code + " " + row.lesson_number + " - " + row.lesson_name;
		
		return {
			counselee: counselee,
			counselor: counselor,
			lesson: lesson
		}
	}
}