import express, { Application } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()

const PORT = process.env.PORT || 3000
app.use(express.json())

app.get('/', (req, res) => {
    res.send("This is the Home Page!")
})

app.get('/health', (req, res) => {
    res.send("This is the Health Page")
})

app.listen(PORT, () => {
    console.log("Connection Running")
})