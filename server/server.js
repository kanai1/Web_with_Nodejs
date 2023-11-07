const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./Router/router')
const jwt = require('./api/jwt_utils')

const app = express()

const corsOptions = {
	origin: ['http:localhost:3000'],
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use((req, res, next) => {console.log(req.url); next()})
app.get('/favicon.ico', (req, res) => res.status(204).end())

app.use(jwt.verify)
app.use('/api', router)

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!')
})

app.listen(8888, function(){
	console.log('server has started.')
})