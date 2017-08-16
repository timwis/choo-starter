var choo = require('choo')
var html = require('choo/html')

var app = choo()

function store (state, emitter) {
  state.name = 'choo choo!'

  emitter.on('setName', function (newName) {
    state.name = newName
    emitter.emit('render')
  })
}

function view (state, emit) {
  return html`
    <body>
      <h1>Hello, ${state.name}</h1>
      <input value="${state.name}" oninput=${update} />
    </body>
  `
  function update (evt) {
    emit('setName', evt.target.value)
  }
}

app.use(store)
app.route('/', view)
app.mount('body')
