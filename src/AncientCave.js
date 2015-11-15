import Engine from './app/Engine';

// Create new instance of game
var engine = new Engine(document.body);

document.getElementsByTagName("button")[0].addEventListener("click", function(e) {
    e.preventDefault();

    let name = document.querySelector('input[name="name"]').value;
    let job  = document.querySelector('select[name="job"]').value;
    let id   = document.querySelector('input[name="id"]').value;
    let host = document.querySelector('input[name="host"]').value;

    document.querySelector('form').remove();
    // Initialize it
    engine.init(name, job, id, host);
});

// DEBUG
window.engine = engine;

