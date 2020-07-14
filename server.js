const express = require("express")
const path = require("path")
const socketio = require("socket.io")
const http = require("http")      
                                        
const app = express()
const server = http.createServer(app)      
const io = socketio(server)          

let usersockets = {}

app.use("/", express.static(path.join(__dirname, "frontend")))

io.on("connection", (socket) => {                            
    console.log("New socket formed from " + socket.id)        
    socket.emit("connected")                            

    socket.on("login", (data) => {
        usersockets[data.user] = socket.id        
        console.log(usersockets)
    })

    socket.on("send_msg", (data) => {                  
        
        if (data.msg.startsWith("@"))          //send only to tagged recipient
        {
            //message like @abc:hi there
            let recepient = data.msg.split(":")[0].substr(1)
            let recpsocket = usersockets[recepient]
            io.to(recpsocket).emit("recv_msg", data)
        }
        else
        {
            socket.broadcast.emit("recv_msg", data)         //emit to all other sockets (excluding the sending socket)
        }
    })
})

server.listen(4444, () => console.log("server started"))                 