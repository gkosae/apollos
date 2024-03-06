export default {
	defaults: {
		imageUrl: "https://assets.appsmith.com/widgets/default.png"
	},
	computeCounseleeName(row) {
		let name = row.first_name + " " + row.last_name

		if(row.other_names !== null && row.other_names.trim().length > 0) {
			name = name + ", " + row.other_names;
		}

		return name;
	},
	setPictureImage: () => {
		PictureImage.setImage(PictureFilePicker.files[0].data);
	},
	resetNewPictureImage: () => {
		NewPictureImage.setImage(null);
	},
	setNewPictureImage: () => {
		NewPictureImage.setImage(NewPictureFilePicker.files[0].data);
	},
	updateCounselee: async () => {
		var url = data_table.selectedRow.picture_url;

		if(PictureFilePicker.files.length > 0){
			const res = await UploadPicture.run();
			url = res.signedUrl.split("?")[0];
		}

		// // Log form data
		// const formData = UpdateForm.data;
		// const picture = PictureImage.image;
		// console.log({form: formData, pic: picture});

		await UpdateQuery.run({pictureUrl: url});
		await SelectQuery.run();
	},
	addCounselee: async () => {
		var url = this.defaults.imageUrl;

		if(NewPictureFilePicker.files.length > 0){
			const res = await UploadNewPicture.run();
			url = res.signedUrl.split("?")[0];
		}

		// Log form data
		// const formData = InsertForm.data;
		// const picture = NewPictureImage.image;
		// console.log({form: formData, pic: picture});

		await InsertQuery.run({pictureUrl: url});
		NewPictureImage.setImage(null);
		closeModal("Insert_Modal");
		await SelectQuery.run();
	},
	async advanceToNextLesson() {
		// Create new teaching session
		let lastSeenAt = NextLessonForm.data.NextLessonDatePicker;
		await InsertTeachingSessionQuery.run();

		// Get next lesson id
		let allLessons = await SelectLessonsQuery.run();
		let currentLessonIndex = 0;

		for(; currentLessonIndex < allLessons.length; currentLessonIndex++) {
			if(allLessons[currentLessonIndex].value === data_table.triggeredRow.next_lesson_id) {
				break;
			}
		}

		let nextLessonIndex = currentLessonIndex;
		if(currentLessonIndex < (allLessons.length-1)) {
			nextLessonIndex+=1;
		}

		let nextLessonId = allLessons[nextLessonIndex].value;

		// Update counselee next_lesson_id and last_seen_at
		await UpdateNextLessonAndLastSeen.run({
			nextLessonId: nextLessonId,
			lastSeenAt: lastSeenAt
		})

		closeModal("NextLessonModal");
		await SelectQuery.run();
	}
}