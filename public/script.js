function createCardsMusicisti(data) {
  const cardsContainer = document.querySelector('.cards-container');
  
  data.forEach(musicista => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = musicista.id; // Aggiungo l'attributo data-id
    console.log(card.dataset.id)
    
    const img = document.createElement('img');
    img.src = musicista.immagine;
    card.appendChild(img);
    
    const name = document.createElement('h2');
    name.textContent = musicista.nome;
    card.appendChild(name);
    
    const orientamento_sessuale = document.createElement('p');
    orientamento_sessuale.classList.add('p-categoria')
    orientamento_sessuale.textContent = musicista.orientamento_sessuale;
    card.appendChild(orientamento_sessuale);
    
    // Aggiungi l'evento di click alla card
    card.addEventListener('click', (event) => {
      const id = event.target.closest('.card').dataset.id;
      console.log(id)
      const musicista = data.find((musicista) => musicista.id == id);

      // Aggiorna la modale con i dettagli del musicista
      const modal = document.querySelector('.modal');
      modal.querySelector('#musicista-nome').textContent = musicista.nome;
      modal.querySelector('#musicista-immagine').setAttribute('src', musicista.immagine);
      modal.querySelector('#musicista-nazionalita').textContent = "NAZIONALITA: " + musicista.nazionalita;
      modal.querySelector('#musicista-genere').textContent = "GENERE: " + musicista.genere;
      modal.querySelector('#musicista-strumento').textContent = "STRUMENTO: " + musicista.strumento;
      modal.querySelector('#musicista-data-nascita').textContent = "DATA DI NASCITA: " + musicista.data_nascita;
      modal.querySelector('#musicista-premi').textContent = "PREMI: " + musicista.premi;
      modal.querySelector('#musicista-orientamento-sessuale').textContent = "ORIENTAMENTO SESSUALE: " + musicista.orientamento_sessuale;
      modal.querySelector('#musicista-descrizione').textContent = "DESCRIZIONE: " + musicista.descrizione;

      // Mostra la modale
      modal.style.display = 'flex';
    });

    cardsContainer.appendChild(card);
  });
}

const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', closeModal);

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}

function createCardsPersonaggi(data) {
    const cardsContainer2 = document.querySelector('.cards-container2');
    
    data.forEach(personaggio => {
      const card = document.createElement('div');
      card.classList.add('card');
      
      const img = document.createElement('img');
      img.src = personaggio.img;
      card.appendChild(img);
      
      const name = document.createElement('h2');
      name.textContent = personaggio.nome;
      card.appendChild(name);
      
      const category = document.createElement('p');
      category.classList.add('p-categoria')
      category.textContent = personaggio.categoria;
      card.appendChild(category);
      
      cardsContainer2.appendChild(card);
    });
  }

fetch('/gayFamosi')
  .then(response => response.json())
  .then(data => {
    createCardsPersonaggi(data);
});

fetch('/musicisti')
  .then(response => response.json())
  .then(data => {
    createCardsMusicisti(data);
});

const buttonM = document.getElementById("buttonM");
const buttonP = document.getElementById("buttonP");
const cardsContainer = document.querySelector(".cards-container");
const cardsContainer2 = document.querySelector(".cards-container2");

buttonM.addEventListener("click", function() {
  cardsContainer.classList.add("show");
  cardsContainer2.classList.remove("show");
  buttonM.classList.add("active");
  buttonP.classList.remove("active");
});

buttonP.addEventListener("click", function() {
  cardsContainer.classList.remove("show");
  cardsContainer2.classList.add("show");
  buttonM.classList.remove("active");
  buttonP.classList.add("active");
});

buttonM.click();