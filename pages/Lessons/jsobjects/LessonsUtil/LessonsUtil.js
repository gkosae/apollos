export default {
	async getSelectedRowClass () {
		var currentClass;
		
		var allClasses = await appsmith.store.allClasses;
		
		if(allClasses == null || allClasses == undefined) {
			console.log("Fetching all classes");
			allClasses = await SelectClassesQuery.run();
			storeValue("allClasses", allClasses, false);	
		} else {
			console.log("Using cached classees");
		}
		
		currentClass = allClasses.filter((option) => option.value == data_table.selectedRow.klass_id)[0];
		
		if(currentClass == null || currentClass == undefined) {
			currentClass = allClasses[0];
		}
		
		return currentClass;
	}
}