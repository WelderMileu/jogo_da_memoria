/* --------------------------------------------------------------
		
OBJETIVOS:

[x] Colocar um tempo para o jogador ver as cartas que foram viradas.
[x] Colocar o informativo monstrando que o jogador ganhou a partida.
[x] Colocar uma informativo para o usuario visulizar as cartas antes
	de iniciar a partida.
	
[ ] Colocar um botao para iniciar a partida novamente. 

   --------------------------------------------------------------*/


const $ = e => document.querySelector(e);

const listItems = [
	{
		img: "./assets/mustang.jpg",
		name: "Mustang"
	},
	{
		img: "./assets/corvet.jpeg",
		name: "Corvet"
	},
	{
		img: "./assets/porche.jpg",
		name: "Porche"
	},
	{
		img: "./assets/ferrari.jpg",
		name: "Ferrari"
	},
	{
		img: "./assets/lamborguini.jpeg",
		name: "Lamborguine"
	}
]
const duplicateList = [];

const obj = {
	primaryVisu() {
		const cart = document.querySelectorAll('.cart');
		cart.forEach((elem) => {
			elem.classList.add('flip')

			$('.info').style.display = "block"
			$('.info').innerHTML = "Metaliza as cartas para começar a sua jogada ... <br />Bom Jogo! 🏃"

			setTimeout(() => {
				$('.info').style.display = "none"
			}, 4000)

			setTimeout(() => {
				elem.classList.remove('flip')
			}, 2000)
		})
	},

	countCards() {
		listItems.forEach(item => {
			duplicateList.push({
				"img" : item.img,
				"name" : item.name
			})

			duplicateList.push({
				"img" : item.img,
				"name" : item.name
			})
		})
	},

	duplicateL() {
		duplicateList.forEach(item => {
			const cart = document.createElement('div');
			const cartFront = document.createElement('div');
			const cartBack = document.createElement('div');
			const h1Front = document.createElement('h1');
			const h1Back = document.createElement('h1');
			const pBack = document.createElement('p');

			cart.classList.add('cart');

			// Cart front
			const imageFront = new Image();
			imageFront.src = "https://bognarjunior.files.wordpress.com/2018/01/1crcyaithv7aiqh1z93v99q.png?w=256";

			h1Front.appendChild(imageFront);
			cartFront.appendChild(h1Front);

			// Cart Back
			const imageBack = new Image();
			imageBack.src = item.img;

			pBack.innerHTML = item.name;

			h1Back.appendChild(imageBack);
			cartBack.appendChild(h1Back);			
			cartBack.appendChild(pBack);			

			cart.appendChild(cartFront);
			cart.appendChild(cartBack);
			$('.container').appendChild(cart);
		})
	},

	sortList() {
		for (let i = duplicateList.length - 1; i > 0; i--) {
        	const j = Math.floor(Math.random() * (i + 1));
        	[duplicateList[i], duplicateList[j]] = [duplicateList[j], duplicateList[i]];
    	}
	},

	final() {
		const cart = document.querySelectorAll('.cart');
		let quant = 0;
				
		cart.forEach(elem => {
			if (!elem.classList.contains('flip')) {
				quant+=1;
			}	
		})

		if (quant == 0) {
			$('.info').style.display = "block";
			$('.info').innerHTML = "Parabéns você ganhou!!! 🎈"
		}

	},

	selectedItems() {
		const selected = [];
		const cart = document.querySelectorAll('.cart');

		cart.forEach((elem, index) => {
			elem.addEventListener('click', () => {
				const name = elem.children[1].children[1].innerHTML;
				const position = index;

				elem.classList.add("flip");

				selected.push({
					"posi": position,
					"nome": name
				})
				
				if(selected.length == 2) {
					if(selected[0].nome != selected[1].nome) {

						const func = (pos1, pos2) => {
							setTimeout(() => {
								cart[pos1].classList.remove("flip")
								cart[pos2].classList.remove("flip")

								$('.info').style.display = "block"
								$('.info').innerHTML = "Não casou 😧, tente novamente ..."

								setTimeout(() => {
									$('.info').style.display = "none"
								}, 2000)
							}, 1000)
						}

						func(selected[0].posi, selected[1].posi)
					}	

					selected.length = 0
					obj.final()

				}
			})
		})
	}
}

obj.countCards()
obj.sortList()
obj.duplicateL()
obj.primaryVisu()
obj.selectedItems()