var x = document.forms["postform"]["firstname"].value;

function loadApp() {
  console.log("loading application");

  var athletes = document.getElementById("athletes");
  // Bind AJAX call to the click event of Button #lataa
  $('#lataa').click(function(event) {
    event.preventDefault();

    // The server must be bind to localhost (for testing) as we don't have a FQDN or HTTP proxy available
    $.get("http://localhost:3000/api/v1/athletes", function(data) {
      console.log("Fetching data from api");
    })
    .done(function( data ) {
      $("#athletes").html(""); // Tyhjennetään tiedot, ettei ne ilmesty useaan kertaan jos rämpyttää buttonia
      console.log("response from server :", data);
     
      var i = 0;
      data.forEach((data) => {
        //$("#athletes").html(""); // Tyhjennetään joka kerta, ettei samat tyypit ilmene useasti sivulla.
        // Tehdään jokaiselle athletelle oma div.
        $("#athletes").append(`<div id="${i}" class="athletesdiv"></div>`);
        $(`#${i}`).append(`<img alt="kuva" src="${data.img}"></img> <a href="http://google.com/search?q=${data.firstname}%20${data.lastname}"> ${data.firstname} ${data.lastname} </a>`);
        $(`#${i}`).append(`<ul id="ul${i}"></ul>`);
        $(`#ul${i}`).append(`<li><strong>Weight - </strong>${data.weight}kg</li>`)
        $(`#ul${i}`).append(`<li><strong>Born - </strong>${data.birth}</li>`)
        $(`#ul${i}`).append(`<li><strong>Sport - </strong>${data.sports}</li>`)
        $(`#ul${i}`).append(`<li><strong>Stats - </strong>${data.stats}</li>`)
        i++;
      })
      
    })
    .fail(function(err) {
      alert("Please enter valid values!");
      console.log("error");
    })
    .always(function() {
      console.log("finished");
    });
  });
}