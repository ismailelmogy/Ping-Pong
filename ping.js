$(document).ready(function () {


    $("#Plogo1").finish().animate({
        left: "25%"
    }, 2000);
    $("#Plogo2").finish().animate({
        left: "50%"
    }, 2000, function () {
        $("#blogo").finish().animate({
            top: "60%"
        }, 600, function () { $("#sectionanimat").show(1000); });
    });
    $("#playBtn").click(validation);




    function validation() {
        if (!nameValidation($("#_player1Names").val())) {
            $("#player1NameError").css({ display: "block" });
        } else if (!nameValidation($("#_player2Names").val())) {
            $("#player1NameError").css({ display: "none" });
            $("#player2NameError").css({ display: "block" });
        } else {
            $("#player2NameError").css({ display: "none" });
            $("#cont").css({ display: "none" });
            p1Name = $("#_player1Names").val();
            p2Name = $("#_player2Names").val();
            startPlaying();
        }
    }
    function startPlaying() {
        if ($("#container")) {
            $("#container").remove();
            var con = document.createElement("div");
            con.setAttribute("id", "container");
            document.body.appendChild(con);
        }
        //create elements of game
        var Header = document.createElement("div");
        Header.setAttribute("id", "header");
        $("#container").append(Header);
        var GameHeader = document.createElement("h1");
        GameHeader.setAttribute("id", "headername");
        $("#header").append(GameHeader);
        $("#headername").text("Ping Pong");
        //create table 
        var Table = document.createElement("div");
        Table.setAttribute("id", "table");
        $("#container").append(Table);
        //crerate player1
        var Player1 = document.createElement("div");
        Player1.setAttribute("id", "player1");
        $("#table").append(Player1);
        //craete player2
        var Player2 = document.createElement("div");
        Player2.setAttribute("id", "player2");
        $("#table").append(Player2);
        //create ball
        var Ball = document.createElement("div");
        Ball.setAttribute("id", "ball");
        $("#table").append(Ball);
        //set ball image
        var BallImg = document.createElement("img");
        BallImg.setAttribute("src", "ball.png");
        $("#ball").append(BallImg);
        //create table line
        var tableLine = document.createElement("div");
        tableLine.setAttribute("id", "line");
        $("#table").append(tableLine);

        var player1 = $("#player1");
        var player2 = $("#player2");
        var table = $("#table");
        var ball = $("#ball");
        var player1Score = player2Score = 0;

        var Score = document.createElement("div");
        Score.setAttribute("id", "_score");
        table.append(Score);
        var _1Score = document.createElement("div");
        _1Score.setAttribute("id", "_1");
        Score.append(_1Score);
        $("#_1").text(p1Name + " : " + player1Score);

        var _2Score = document.createElement("div");
        _2Score.setAttribute("id", "_2");
        Score.append(_2Score);
        $("#_2").text(p2Name + " : " + player2Score);


        player1.css({ 'top': (table.height() / 2) - player1.height() / 2 + 'px' });
        player2.css({ 'top': (table.height() / 2) - player2.height() / 2 + 'px', 'right': '0px' });
        ball.css({
            'left': player1.position().left + player1.width() + 1 + 'px',
            'top': player1.position().top + player1.height() / 2 + 'px'
        });

        $(document).keydown(function (e) {
            switch (e.which) {
                //player2 up
                case 38:
                    if (player2.position().top > 0) {
                        if (player2.position().top > player2.height()) {
                            player2.finish().animate({
                                top: "-=50"
                            });
                        } else {
                            player2.finish().animate({
                                top: "-=" + player2.position().top
                            });
                        }
                    }
                    break;
                //player 2 down
                case 40:
                    if (player2.position().top + player2.height() < table.height()) {
                        if (player2.position().top + player2.height() < table.height() + 10 - player2.height() / 2) {
                            player2.finish().animate({
                                top: "+=30"
                            });
                        } else {
                            var h = table.height() - player2.position().top - player2.height() - 20;
                            if (h > 0) {
                                player2.finish().animate({
                                    top: "+=" + h
                                });
                            }
                        }
                    }

                    break;
                //player1 up
                case 87:
                case 119:
                    if (player1.position().top > 0) {
                        if (player1.position().top > player1.height()) {
                            player1.finish().animate({
                                top: "-=50"
                            });
                        } else {
                            player1.finish().animate({
                                top: "-=" + player1.position().top
                            });
                        }
                    }
                    break;
                // player1 down
                case 83:
                case 115:
                    if (player1.position().top + player1.height() < table.height()) {
                        if (player1.position().top + player1.height() < table.height() + 10 - player1.height() / 2) {
                            player1.finish().animate({
                                top: "+=30"
                            });
                        } else {
                            var h = table.height() - player1.position().top - player1.height() - 20;
                            if (h > 0) {
                                player1.finish().animate({
                                    top: "+=" + h
                                });
                            }
                        }
                    }
                    break;
            }
        });


        var ball = $("#ball");
        var boundX = $('#table').width();
        var boundY = $('#table').height();
        var speed = 5;
        var x = 1;
        var y = 1;
        var ballWidth = ball.width();
        var ballHeight = ball.height();

        var winner = document.createElement("div");
        winner.setAttribute("id", "_win");
        table.append(winner);
        var winnerName = document.createElement("span");
        winnerName.setAttribute("id", "_winName");
        winner.append(winnerName);
        var playAgainBtn = document.createElement("div");
        playAgainBtn.setAttribute("id", "playAgainBtn");
        winner.append(playAgainBtn);
        $("#playAgainBtn").text("play again");
        $("#playAgainBtn").click(startPlaying);
        (function moveBall() {

            var ballY = ball.position().top;
            var ballX = ball.position().left;
            //ball is collision with horizental lines
            if (ballY + ballHeight > boundY || ballY < 0) {
                y *= -1;
            }
            // ball is collision with player
            else if (collision(ball, player2) || collision(ball, player1)) {
                x *= -1;
            }
            //ball is near to player 2
            else if (ballX + ballWidth > boundX) {
                ballX = player1.position().left + player1.width() + 1;
                ballY = player1.position().top + (player1.height() / 2);
                player1Score++;
                $("#_1").text(p1Name + " : " + player1Score);
            }
            //ball is near to player 1
            else if (ballX < 0) {
                ballX = player2.position().left - ball.width() - 2;
                ballY = player2.position().top + (player2.height() / 2);
                player2Score++;
                $("#_2").text(p2Name + " : " + player2Score);
            }
            //change position of ball
            $("#ball").css({ 'left': ballX + (speed * x) + 'px', 'top': ballY + (speed * y) + 'px' });

            if (player1Score == 20) {
                $("#_win").css({ display: "inline" });
                $("#_winName").text(p1Name + " win");
            } else if (player2Score == 20) {
                $("#_win").css({ display: "inline" });
                $("#_winName").text(p2Name + " win");
            } else {
                if (player1Score == 10 && speed == 5)
                    speed += 3;
                else if (player2Score == 10 && speed == 5)
                    speed += 3

                setTimeout(moveBall, 20);
            }
        })()
    }
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    function nameValidation(name) {
        var len = name.length;
        if (len == 0) {
            return false;
        } else {
            var j = 0;
            var flag = false;
            do {
                flag = isFinite(name[j]);
                j++;
            } while (!flag && j < len);
            return !flag;
        }

    }

});


