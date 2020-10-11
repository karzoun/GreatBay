var mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "greatbay_db"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    promptUser()
})

function promptUser() {
    inquirer.prompt([{
        name: "choice",
        message: "what would you like to do?",
        type: "list",
        choices: ['POST', 'BID', 'QUIT']
    }]).then(function(answers) {
        if (answers.choice === 'POST') {
            postAnItem();
        } else if (answers.choice === 'BID') {
            bidOnItem();
        } else if (answers.choice === 'QUIT') {
            console.log('thanks for shopping!')
            connection.end();
        }
    })
}

function postAnItem() {
    inquirer.prompt([

        {
            name: "productName",
            message: "what are you posting?",
            type: "input"
        },
        {
            name: "category",
            message: "which category ?",
            type: "input"
        },
        {
            name: "startingBid",
            message: "starting bid?",
            type: "number"
        }
    ]).then(function(answers) {
        connection.query("INSERT INTO auctions(product_name, category, startind_bid, current_bid)VALUES(?,?,?,?)", [answers.productName, answers.category, answers.startingBid, answers.startingBid], function(err, data) {
            if (err) {
                throw err
            } else {
                console.log(`${answers.productName} was added!`);
                promptUser()
            }
        })

    })


}

function bidOnItem() {
    connection.query("SELECT * FROM auctions", function(err, data) {
        if (err) {
            throw err
        } else {
            console.table(data)
            inquirer.prompt([{
                    name: "auctionId",
                    message: "what is the id of the item you want to bid on?",
                    type: "input"
                },
                {
                    name: "bid",
                    message: "how much to bid?",
                    type: "number"
                }

            ]).then(function(answers) {
                connection.query("SELECT * FROM auctions WHERE id = ?", answers.auctionId, function(err, data) {
                    console.log(data);
                    console.log('=================');
                    if (data.current_bid < answers.bid) {



                        connection.query("UPDATE auctions SET ? WHERE ?", [
                            { current_bid: answers.bid },
                            { id: answers.auctionId }
                        ], function(err, data) {
                            if (err) {
                                throw err
                            } else {
                                console.log("bid successful!")
                                promptUser()

                            }
                        })
                    } else {
                        console.log('bid too low');
                        promptUser()
                    }
                })
            })
        }
    })


}