const {Client, LocalAuth} = require('whatsapp-web.js')
const {WebSocket} = require('ws')
const cron = require('node-cron')
require('dotenv').config()

const URL = 'wss://ws.tzevaadom.co.il:8443/socket?platform=WEB'
const CHAT_ID = process.env.CHAT_ID
let holonScore = 0
let ashkelonScore = 0

const client = new Client({
    puppeteer: {headless: true},
    authStrategy: new LocalAuth()
})

const openSocket = () => {
    const ws = new WebSocket(URL, {
        headers: {
            Origin: 'https://www.tzevaadom.co.il'
        }
    })

    ws.on('error', console.log)
    ws.on('open', () => console.log('SOCKET OPENED'))
    ws.on('close', () => console.log('SOCKET CLOSED'))
    ws.on('message', async (msg) => {
        const {notificationId, time, threat, isDrill, cities} = JSON.parse(msg).data
        console.log(`Notification ID: ${notificationId}, Time: ${new Date(time * 1000)}, Threat: ${threat}, Is drill: ${isDrill}, Cities: ${cities}`)

        let wasAlarm = false
        if (cities.includes('חולון')) {
            holonScore++
            wasAlarm = true
        }
        if (cities.includes('אשקלון - דרום')) {
            ashkelonScore++
            wasAlarm = true
        }

        if (wasAlarm) {
            let message
            if (holonScore > ashkelonScore) message = `${ashkelonScore} - ${holonScore} לכן`
            else if (ashkelonScore > holonScore) message = `${holonScore} - ${ashkelonScore} לנו`
            else message = `${holonScore} - ${ashkelonScore} תיקו`
            console.log(message)

            const chat = await client.getChatById(CHAT_ID)
            await chat.sendMessage(message)
        }
    })
}

// Reset score every day
cron.schedule('0 0 * * *', () => {
    ashkelonScore = 0
    holonScore = 0
    console.log('Scores have been reset')
})

console.log('Initializing WA...')
client.initialize()
client.on('qr', () => console.log('Please scan the QR code on the browser.'))
client.on('ready', () => {
    console.log('WA Ready!')
    openSocket()
})