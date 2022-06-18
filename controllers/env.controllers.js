const envelopes = require('../envelopes')

let id = 3;

const getEnvelope = (req, res) => {
    res.json(envelopes[req.envelopeIndex])
}

const getAllEnvelopes = (req, res) => {
    res.json(envelopes)
}

const createEnvelope = (req, res) => {
    const { name, budget } = req.query;
    const budgetNum = Number(budget)
    if (name && budget) {
        id++
        const newEnvelope = { id, name, budgetNum }
        envelopes.push(newEnvelope)
        res.status(201).json(envelopes)
    } else {
        res.status(404).json({ msg: 'you fucked up' })
    }
}

const updateEnvelope = (req, res) => {
    const id = req.params.id;
    const { name, budget } = req.query;
    console.log(name)
    if (name && budget) {
        envelopes[req.envelopeIndex].name = name;
        envelopes[req.envelopeIndex].budget = budget;
        res.status(201).json(envelopes)
    } else {
        res.status(400).json({ msg: 'hey man' })
    }
}

const updateBudget = (req, res) => {
    const id = req.params.id
    const { name, spent } = req.query
}

const deleteEnvelope = (req, res) => {
    envelopes.splice(req.envelopeIndex, 1)
    res.json(envelopes)
}

const transferFunds = (req, res) => {
    const { targetName, amount } = req.query
    const amountNum = Number(amount)
    const targetIndex = envelopes.findIndex(env => env.name === targetName)
    if (targetIndex === -1) {
        res.status(404).json({ msg: `The envelope ${targetName} is not available` })
    } else if (targetIndex === req.envelopeIndex) {
        res.status(404).json({ msg: `You cannot transfer to the same envelope` })
    } else if (!(targetName && amount)) {
        res.status(400).json({ msg: `Please include both target name and the amout` })
    } else if (envelopes[req.envelopeIndex].budget < amountNum) {
        res.status(404).json({ msg: `There is insufficient funds to complete this transaction.` })
    } else {
        envelopes[req.envelopeIndex].budget -= amountNum;
        envelopes[targetIndex].budget += amountNum;
        res.json([envelopes[req.envelopeIndex], envelopes[targetIndex]])
    }
}

module.exports = {
    deleteEnvelope,
    updateEnvelope,
    createEnvelope,
    getAllEnvelopes,
    getEnvelope,
    transferFunds,
}