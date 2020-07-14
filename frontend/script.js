
let socket = io()         

socket.on("connected", () => {                       
    console.log("Connected " + socket.id)            
})                                                    

$(function () {
    let msglist = $("#msglist")
    let sendbtn = $("#sendmsg")
    let msgbox = $("#msgbox")
    let loginbox = $("#loginbox")
    let btnlogin = $("#btnlogin")
    let logindiv = $("#login-div")
    let chatdiv = $("#chat-div")

    let user = ""

    btnlogin.click(function () {
        user = loginbox.val()
        chatdiv.show()
        logindiv.hide()
        socket.emit("login", {user: user})
    })

    sendbtn.click(function () {
        let msg = msgbox.val()
        socket.emit("send_msg", {
            msg: msg,
            user: user
        })             
    })

    socket.on("recv_msg", function (data) {             
        msglist.append($("<li>" + data.user + ": " + data.msg + "</li>"))
    })

})