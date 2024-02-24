const Utils = require("./classes/utils");
const Commits_Utils = require("./classes/commits_utils")
let authToken = "";


//Setup env variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    Utils.BACKEND_ENDPOINT = process.env.BACKEND;
    authToken = process.env.AUTHENTICATION_TOKEN;
}

/*
File for the main server logic
 */
//Set up express
const express = require("express");
const path = require("path"); // Import path module
const app = express();

//Setup socket.io
const server = require("http").Server(app);
const io = require("socket.io")(server);

// // Serve static files from the 'dist' directory
// app.use(express.static(path.join(__dirname, 'dist')));
//
// // Redirect all routes to the 'index.html' file
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

//Setup static page handling
app.set("view engine", "ejs");
app.use("/static", express.static("public"));
//Client interface on /
app.get("/", (req, res) => {
    // res.send('Successful response.');
    res.render("client/client");
});
//Dashboard
app.get("/dashboard", (req, res) => {
    // res.send('Successful response.');
    res.render("dashboard/mainView");
});

// // Setup static page handling
// app.set("view engine", "ejs");
// app.use("/static", express.static("public"));
//
// // Client interface on /
// app.get("/", (req, res) => {
//     res.render("index"); // Assuming "index" is your main HTML file
// });

// Handle 404s
app.use((req, res) => {
    res.status(404).send("Page not found");
});


//Start server
if (module === require.main) {
    startServer();
}

/*
Start the server
 */
function startServer() {
    const PORT = process.env.PORT || 8080;
    // Utils.log(socket.id,process.env);
    Utils.port = PORT;
    Utils.init(authToken);
    server.listen(PORT, () => {
        Utils.log("", `Server listening on port ${PORT}`);
    });
    
    
    //For testing any code
    consoleTests();
}

//Communication
io.on('connection', (socket) => {
    Utils.log(socket.id, `New connection from ${socket.id}`);

    // {'owner' : exampleuser, 'repo' : examplename}
    socket.on('commitHistory', (body) => {
        // if(Utils.hasExactKeys(body, ["owner", "repo"])) return;
        Utils.log(socket.id, `Commit history requested: ${JSON.stringify(body)}`);
        handleCommitHistory(socket, body.owner, body.repo);
    });

    // {'owner' : exampleuser, 'repo' : examplename}
    socket.on('repoStats', (body) => {
        // if(Utils.hasExactKeys(body, ["owner", "repo"])) return;
        Utils.log(socket.id, `Stats requested: ${JSON.stringify(body)}`);
        handleStats(socket, body.owner, body.repo).then(r => {
            console.log(`Stats request handled: ${JSON.stringify(body)}`)
        });
    });

    // {'owner' : exampleuser, 'page': 1}
    socket.on('getRepoList', (body) => {
        Utils.log(socket.id, `Repo list requested: ${JSON.stringify(body)}`);
        handleRepoList(socket, body.owner, body.page).then(r => {
            console.log(`Repo list request handled: ${JSON.stringify(body)}`)
        });
    })
    // {'contributors_url' : example}
    socket.on('getContributors', (body) => {
        handleContributors(socket, body.contributors_url).then(r => {
            console.log(`Contributors request handled: ${JSON.stringify(body)}`)
        })
    });

    // {'owner' : exampleuser, 'repo' : examplename}
    socket.on('getCommits', (body) => {
        handleCommits(socket, body.owner, body.repo).then(r => {
            console.log("Commits received")
        })
    })
});

function handleCommitHistory(socket, owner = "", repo = "") {
    //Call function
    Utils.allContributorCommits(socket, owner, repo)
        .then((data) => {
            console.log(data);
            Utils.log(socket.id, `Request success: ${data}`);
        })
        .catch((error) => {
            Utils.logError(socket, error);
        });
}

async function handleStats(socket, owner, repo) {
    try{
        const stats = await Utils.getRepoStatistics(socket, owner, repo);
        socket.emit("stats", stats);
    } catch(e){
        console.error(e);
    }
    
    // //Call function
    // Utils.getRepoStatistics(socket, owner, repo)
    //     .then((data) => {
    //         console.log(data);
    //         Utils.log(socket.id, `Request success: ${data}`);
    //     })
    //     .catch((error) => {
    //         Utils.logError(socket, error);
    //     });
}

async function handleContributors(socket, contributorsURL){
    try{
        Utils.log(socket.id, `Handling getting contributors from ${contributorsURL}`)
        const data = await Utils.getContributors(socket, contributorsURL);
        // Emit the contributors data to the client if needed
        socket.emit('contributorsData', data);
    } catch(e){
        console.error(e);
    }
}

async function handleRepoList(socket, owner, page) {
    try {
        const repos = await Utils.listReposForUser(socket, owner, page);
        
        socket.emit("repoList", repos);
    } catch (e) {
        // Utils.logError(socket, e);
        console.error(e);
    }
}

/*
Handle processing commit data
 */
async function handleCommits(socket, owner, repo){
    const iterator = await Utils.getCommitsIterator(owner, repo);
    //Iterate through each page of responses, send data
    for await(const {data: commits} of iterator){
        let body = {
            owner : owner,
            repo : repo,
            commitData : Commits_Utils.parseCommitsList(commits)
        };
        socket.emit("commitData", body)
    }
    
    //Process commit data
}

function consoleTests(){
    // const filePath = './schema/List_Commits_accessibilityjs.json'
    // Call the function to process commits from the file
    // testCommitsJSON();
}

function testCommitsJSON(){
    try{
        let simplified = testCommitsFile.map((item) => ({
            sha : item.sha,
            author : item.commit.author,
            committer : item.commit.committer,
            message : item.commit.message,
            // Add more details as needed
        }));
        console.log(simplified);

    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
}

