
import { validationResult } from 'express-validator'
let data = [
    {
        "nom": "azaiz Bilal", 
        "email": "azaizbilal16@gmail.com",
        "message": "blablabblabalbalbalab",  
    },
]


const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            [error.path]: error.msg
        };
    },
});

export const addtemoignage = (req, res) => {
    const temoignageInfo = req.body
    // console.log('Body',req)

    const errors = myValidationResult(req)  
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const itExists = data.find(temoignage => temoignage.email === temoignageInfo.email)
    if (itExists) return res.status(422).json([{ key: 'email', message: "temoignage existe deja" }])
    // data.push(temoignageInfo)
    data = [...data, temoignageInfo]
    res.status(200).json({ data, message: "temoignage ajoute avec succes" })
}

export const temoignageList = (req, res) => {
    if (!data.length) return res.status(200).json({ error: false, message: "Pas du temoignage dans la liste" })
    res.status(200).json({ error: false, data, message: "List des temoignages" })
}

export const updatetemoignage = (req, res) => {
    const { email } = req.params
    const alltemoignageEmails = data.map(temoignage => temoignage.email)
    if (!email) {
        res.status(422).json([{ key: 'email', message: "L'email du temoignage est requis" }])
    } else if (!alltemoignageEmails.includes(email)) {
        res.status(404).json([{ key: 'email', message: "Cet temoignage n'existe pas" }])
    }
    const updatetemoignage = req.body
    const newData = data.map(temoignage => {
        if (temoignage.email === email) {
            return updatetemoignage
        }
        return temoignage
    })

    data = [...newData]
    res.status(200).json({ message: "temoignage mis a jour correctement" })
}

export const deletetemoignage = (req, res) => {
    const { email } = req.params
    const alltemoignageEmails = data.map(temoignage => temoignage.email)
    if (!email) {
        res.status(400).json({ error: true, message: "L'email du temoignage est requis" })
    } else if (!alltemoignageEmails.includes(email)) {
        res.status(404).json({ error: true, message: "Cet temoignage n'existe pas" })
    }
    const newData = data.filter(temoignage => temoignage.email !== email)
    data = newData
    res.status(200).json({ message: `temoignage email ${email} a ete supprime avec succes` })
}


export const gettemoignageById = (req, res) => {
    const { email } = req.params
    const alltemoignageEmails = data.map(temoignage => temoignage.email)
    if (!email) {
        res.status(400).json({ error: true, message: "L'email du temoignage est requis" })
    } else if (!alltemoignageEmails.includes(email)) {
        res.status(404).json({ error: true, message: "Cet temoignage n'existe pas" })
    }
    const thistemoignage = data.find(temoignage => temoignage.email === email)
    res.status(200).json({ error: false, data: thistemoignage })
}