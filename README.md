# Alarms Game
## Why?
The people at the center, claim that there are more alarms in the south than in the center.  
On the other hand, the people at the south claim that the opposite is true.  
The problem is that the people at the center don't know how to look at the alarms' history to verify this.  
Therefore, a manual activity began to update them on what was happening in real time (with the help of the elderly people application - WhatsApp).  
The purpose of this project is to make it automatically.

## Thanks
- [pedroslopez](https://github.com/pedroslopez) - About the amazing project [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [Itai Guli](https://github.com/itaiguli) - About the awesome [alarms system](https://www.tzevaadom.co.il/)

## How it works?
- **Initialize WhatsApp client** - To send the messages, we need a connected WA account
- **Open socket** - To get live alarms
- **Check alarms** - If there are alarms in specific location and send a message respectively
- **Reset scores** - Each day, at 00:00, the scores reset