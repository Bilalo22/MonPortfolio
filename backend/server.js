
//Porte du serveur 
const PORT = 5000

import express from 'express'
import { temoignageList, addtemoignage, updatetemoignage, deletetemoignage, gettemoignageById } from './controllers/temoignageControllers.js'

import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

// Validations 
import temoignageRules from './validations/temoignageValidation.js';

const app = express()

app.use(helmet())
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Bienvenu cher utilisateur');
})

app.listen(5000, () => console.log(`Serveur running on port ${PORT}`))

app.get('/temoignages', temoignageList)
app.post('/temoignages',temoignageRules, addtemoignage)
app.put('/temoignages/:email', updatetemoignage)
app.delete('/temoignages/:email', deletetemoignage)
app.get('/temoignages/:email', gettemoignageById)
