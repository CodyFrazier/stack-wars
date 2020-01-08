//api header: 	http://star-cors.herokuapp.com/???
//endpoints: 	films, people, planets, species, starships, vehicles

async function main(){
	async function grabData(endpoint){
		const response = await fetch(`http://star-cors.herokuapp.com/${ endpoint }`);
		return await response.json();
	}

	function loadData(){
		return ['films', 'people', 'planets', 'species', 'starships', 'vehicles'].map(async (end) => {
			//const result = await grabData(end);	//in order to return an iterable object
			return grabData(end);
			//Would like to get this working for brevity of code.
			//If I can't make it work, I have to draw up individual divs for each of the datasets. (or forego ID's)
			//return { name : `${end}`, [end] : result };	
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
	console.log('films:', films.results);
	console.log('people:', people.results);
	console.log('planets:', planets.results);
	console.log('species:', species.results);
	console.log('starships:', starships.results);
	console.log('vehicles:', vehicles.results);
}

main();
