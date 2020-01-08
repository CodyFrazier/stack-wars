//api header: 	http://star-cors.herokuapp.com/???
//endpoints: 	films, people, planets, species, starships, vehicles

async function main(){
	async function grabData(endpoint){
		const response = await fetch(`http://star-cors.herokuapp.com/${ endpoint }`);
		return await response.json();
	}

	function loadData(){
		return ['films', 'people', 'planets', 'species', 'starships', 'vehicles'].map(async (end) => {
			const result = grabData(end);
			return { name : `${end}`, [end] : await result };	
		});
	}

	async function displayData(data){
		const dataBody = document.createElement('div');
		dataBody.id = `${ data.name }Box`;
		dataBody.classList = 'displayBox';
		dataBody.innerHTML = `
		<ul>
		`
		console.log(dataBody);
	}

	[films, people, planets, species, starships, vehicles] = await Promise.all(loadData());

	[films, people, planets, species, starships, vehicles].map(dataSet => {
		return displayData(dataSet);
	});
	console.log('films:', films);
	console.log('people:', people);
	console.log('planets:', planets);
	console.log('species:', species);
	console.log('starships:', starships);
	console.log('vehicles:', vehicles);
}

main();
