import express, { Express } from 'express';

import Settings from './settings';

const app: Express = express()

app.use(express.json())

app.listen(Settings.PORT, () => {
  console.log(`[API] Server is running on port ${Settings.PORT}`)
})
