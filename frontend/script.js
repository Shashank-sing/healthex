let socket = io();
socket.on('connected', () => {
    console.log("Connected " + socket.id)
})

$(function () {
    let msglist = $('#msglist')
    let sendbtn = $('#sendmsg')
    let msgbox = $('#msgbox')
    let loginbox = $('#loginbox')
    let loginbtn = $('#loginbtn')
    let loginDiv = $('#login-div')
    let chatDiv = $('#chat-div');
    let name2 = $('#pseudo');

    var i = 0;

    let user = ''
    let pseudoname = ''
    sendbtn.click(function () {
        socket.emit('send_msg', {
            user: user,
            message: msgbox.val(),
            pseudo: pseudoname
        })
    })

    loginbtn.click(function () {
        user = loginbox.val()
        chatDiv.show()
        loginDiv.hide()
        socket.emit('login', {
            user: user,
            pseudo: null
        });


    });

    socket.on('pseudo', function (data) {
        name2.append($('<strong> You are now ' + data.pseudo + '</strong>'))
        pseudoname = data.pseudo
    });


    socket.on('recv_msg', function (data) {
        if (data.pseudo == pseudoname) {
            msglist.append($('<li> <span id="me">Me &emsp;&nbsp;</span>       : <span id="dark">' + data.message + '</span></li>'))
        }
        else
            msglist.append($('<li> <strong id="me">' + data.pseudo + '</strong> : <span id="dark">' + data.message + '</span> </li>'))
    })
})