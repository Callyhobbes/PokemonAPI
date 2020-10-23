// WIKI SECTION

const wiki = {};

// Allow for a toggle state between pikachu picture and wiki text
wiki.apiResults = undefined;

wiki.showPokemonDescription = false;

// API call for wiki summary
wiki.pullWikiIntro = () => {
   $.ajax({
      url: 'http://proxy.hackeryou.com',
      method: 'GET',
      dataType: 'json',
      data: {
         reqUrl: `https://en.wikipedia.org/w/api.php`,
         params: {
            method: 'GET',
            dataType: 'json',
            format: 'json',
            action: 'query',
            prop: 'extracts',
            exintro: 'true',
            explaintext: 'true',
            redirects: '1',
            titles: 'Pokemon'
         }
      }
   }).then((result) => {
      wiki.apiResults = result;
   })
}

wiki.displayResults = () => {
   $('.wiki-section').empty();
   // May need to add a loading screening if throttling become issue on slower nextworks, but didn't have enough time to implement it
   let summary = wiki.apiResults.query.pages['23745'].extract;

   const htmlToAppend = `
      <div class="wiki-text">
         <p>${summary}</p>
      </div>
      `
   $('.wiki-section').append(htmlToAppend);
   $('.wiki-text').css('width', '100%');
   $('.wiki-text').css('border', '5px solid #ffcc00');
   $('.wiki-text').css('border-radius', '20px');
   $('.wiki-text').css('font-size', '2rem');
   $('.wiki-text').css('font-family', 'Abel');
   $('.wiki-text').css('line-height', '1.5');
}

// create a method for the pikachu and text view
wiki.showPikachu = () => {
   $('.wiki-section').empty();
   const htmlToAppend = `
      <div class="pika-image">
         <img src="./Assets/pikachu.png" alt="pikachu" class="pikachu">
      </div>
      <div class="wiki-text">
         <p>Pika-Pika! I mean, do you know about Pokemon? Click me to learn more!</p>
      </div>
   `
   $('.wiki-section').append(htmlToAppend);
}

// initialize our app
wiki.init = () => {
   wiki.pullWikiIntro();
   wiki.showPikachu();
   $('.wiki-section').on('click', (e) => {
      if (wiki.showPokemonDescription === false){
         wiki.displayResults();
         wiki.showPokemonDescription = true;
      } else {
         wiki.showPikachu();
         wiki.showPokemonDescription = false;
      }
   })
};

// RANDOM POKEMON SECTION

// Create an object for the app
const catchPokemon = {};

// Make a function that calls the API --> There are issues here per console log & VS Code
// ---- How do I get the random number in the ID area of .getPokemon? ----
catchPokemon.getPokemon = (id) => {
   $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      method: 'GET',
      dataType: 'json'

   }).then((data) => {
      console.log(data);
      catchPokemon.displayPokemon(data);
   })
};

// create an event listener for the button
catchPokemon.getValue = () => {
   $('button').on('click', () => {
      // create a random pokemon ID
      let randomPokemonId = Math.floor(Math.random() * 151);
      // return randomPokemonId;
      catchPokemon.getPokemon(randomPokemonId);
      $('.pokemon-area').remove();
      $('.sweet').remove();
   })
}

// Create a function that will take the PokeAPI and display the information
catchPokemon.displayPokemon = (data) => {
   let pokeName = data.name;
   let pokeImage = data.sprites.front_default;
   let pokeType = data.types[0].type.name;
   let pokeHeight = data.height;
   let pokeWeight = data.weight;

   // Insert content to the page
   const htmlToAppend = `
      <div class="pokemon-area">
         <h3>${pokeName}</h3>
         <img src="${pokeImage}" alt="${pokeName}">
         <div class="details">
            <p>Type: ${pokeType}</p>
            <p>Height: ${pokeHeight}</p>
            <p>Weight: ${pokeWeight}</p>
         </div>
      </div>
      `
   const sweetPhrase = `<p class="sweet">Sweet, your new buddy is ${pokeName}</p>`

   $('.pokemon-container').append(htmlToAppend);
   $('.pokemon-container span').remove();
   $('.pokemon-container').css('background-color', '#ffffff');
   $('.pokemon-container p').css('font-size', '1.6rem');
   $('button').css('margin', '0px');
   $('.phrase').append(sweetPhrase);
}

// initialize our app
catchPokemon.init = () => {
   catchPokemon.getValue();
   $('button').on('click', (e) => {
      // Prevent page refresh
      e.preventDefault();
   })

};

// DOC READY FUNCTION

$(function () {
   wiki.init();
   catchPokemon.init();
});