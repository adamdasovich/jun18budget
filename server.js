const express = require('express')
const app = express();
const envelopesRouter = require('./routes/envelope.routes')

const PORT = process.env.PORT || 3000;

app.use('/api/envelopes', envelopesRouter)

app.get('/', (req, res) => {
    res.json({ msg: `Hello World` })
})


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}.`))