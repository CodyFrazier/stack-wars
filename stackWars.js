//api header: 	http://star-cors.herokuapp.com/???
//endpoints: 	films, people, starships, vehicles

async function main(){
	const grabData = async (endpoint) => {
		const response = await fetch(`http://star-cors.herokuapp.com/${ endpoint }`);
		return await response.json();
	}

	const loadData = () => {
		return ['films', 'people', 'starships', 'vehicles'].map(async (end) => {
			const result = grabData(end);
			return [{ name : `${end}`, [end] : await result }];	
		});
	}

	const displayData = async (data) => {
		
		const listify = (objectArr, key, info) => {
			
			return objectArr.results.reduce((acc, object) => {
				return acc += `<li>
				<h4 class = 'heading'>${ object[key] }</h4>
				<div class = 'centerText'>${ makeReaderFriendly(info) }:</div>
				<div class = 'centerText'>
				${ info.includes('.') ? extrapolateLength(object, info) : object[info] }
				</div>
				</li>`;
				
			}, ``);
		}
		
		const makeReaderFriendly = str => {
			return str.split('_').map(word => {
				return word.substr(0, 1).toUpperCase() + word.substr(1, word.length)
			}).join(' ').split('.')[0];
		}
		
		const extrapolateLength = (obj, str) => {
			return obj[str.split('.')[0]].length;
		}
		
		data.forEach(set => {
			document.querySelector(`#${ set[0].name } div.searchBar`).innerHTML = `
			<h2 class = 'heading'>${ set[0].name }</h2>
			<input placeholder = 'Type to Search for ${ set[0].name }...'>
			`
		});

		document.querySelector('#filmsResults').innerHTML = `
		<div id = 'filmsBox'>
		
		<ul class = 'displayBox'>
		${ listify(data[0][0].films, 'title', 'release_date') }
		</ul>
		</div>
		`;
		document.querySelector('#peopleResults').innerHTML = `
		<div id = 'peopleBox'>
		
		<ul class = 'displayBox'>
		${ listify(data[1][0].people, 'name', 'films.length') }
		</ul>
		</div>
		`;
		document.querySelector('#starshipsResults').innerHTML = `
		<div id = 'starshipsBox'>
		
		<ul class = 'displayBox'>
		${ listify(data[2][0].starships, 'name', 'starship_class') }
		</ul>
		</div>
		`;
		document.querySelector('#vehiclesResults').innerHTML = `
		<div id = 'vehiclesBox'>
		
		<ul class = 'displayBox'>
		${ listify(data[3][0].vehicles, 'name', 'model') }
		</ul>
		</div>
		`;	
	}

	[films, people, starships, vehicles] = await Promise.all(loadData());

	displayData([films, people, starships, vehicles]);
	
	document.querySelectorAll('.searchBar input').forEach(input => {
		input.addEventListener('keyup', ({ target }) => {
			const box = document.querySelector(`#${ target.parentNode.parentNode.id }Results ul`);
			[...box.children].forEach(child => {
				!(child.innerHTML.toLowerCase().includes(target.value.toLowerCase())) ? child.classList = 'hidden' : child.classList = '';
			});
		});	
	})
	
	//debug reference only
	console.log('films:', films);
	console.log('people:', people);
	console.log('starships:', starships);
	console.log('vehicles:', vehicles);
}

main();
