const express = require('express')
const envelopescontrollers = require('../controllers/env.controllers')
const envelopeIdMiddleware = require('../middleware/envelopeId')

const envelopesRouter = express.Router();

envelopesRouter.use('/:id', envelopeIdMiddleware)

envelopesRouter.get('/', envelopescontrollers.getAllEnvelopes)

envelopesRouter.get('/:id', envelopescontrollers.getEnvelope)

envelopesRouter.post('/', envelopescontrollers.createEnvelope)

envelopesRouter.put('/:id', envelopescontrollers.updateEnvelope)

envelopesRouter.delete('/:id', envelopescontrollers.deleteEnvelope)

envelopesRouter.put('/:id/transfer', envelopescontrollers.transferFunds)

module.exports = envelopesRouter;