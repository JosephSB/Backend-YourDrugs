const app = require("./app");

const server = app.listen(app.get('port'), ()=>{
	console.log(`Iniciando servidor en el puerto: ${app.get('port')}`)
})