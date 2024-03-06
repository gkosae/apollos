export default {
	computedRowValues (row) {
		let counselor = [
			row.counselor_title,
			row.counselor_first_name,
			row.counselor_last_name,
		].join(" ");
		
		
		let lesson = row.class_code + " " + row.lesson_number + " - " + row.lesson_name;
		
		let isMainOrAssistant = row.is_main_counselor_for_lesson ? "Main" : "Assistant";
		
		return {
			counselor: counselor,
			lesson: lesson,
			isMainOrAssistant: isMainOrAssistant
		}
		
	}
}