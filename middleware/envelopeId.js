const envelopes = require('../envelopes')

module.exports = (req, res, next) => {
    const id = parseInt(req.params.id);
    const envelopeIndex = envelopes.findIndex(env => env.id === id)
    if (envelopeIndex === -1) {
        res.status(404).jsons({ msg: 'Envelope with that id, not found.' })
    } else {
        req.envelopeIndex = envelopeIndex;
        next()
    }
}