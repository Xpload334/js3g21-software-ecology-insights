// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;

    // Get the ul with id of userRepos
    let ul = document.getElementById('userRepos');

    // Clear the ul of existing children
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    // Run GitHub API function, passing in the GitHub username
    requestUserReposREST(gitHubUsername)
        .then(response => response.json()) // parse response into json
        .then(data => {
            // update html with data from github
            for (let i in data) {
                // Get the ul with id of userRepos
                let ul = document.getElementById('userRepos');
                
                if (data.message === "Not Found") {
                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')
                    // Create the html markup for each li
                    li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${gitHubUsername}</p>`);
                    // Append each li to the ul
                    ul.appendChild(li);
                } else {
                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')

                    ///////////////////////////////////////////////////////
                    // Create the html markup for each li
                    li.innerHTML = (`
                        <p><strong>Repo:</strong> ${data[i].name}</p>
                        <p><strong>Description:</strong> ${data[i].description}</p>
                        <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
                        <p><strong>Commits URL:</strong> <a href="${data[i].commits_url}">${data[i].commits_url}</a></p>
                        <a class="btn btn-primary" href="commits.html?user=${gitHubUsername}&repo=${data[i].name}" target="_blank">Show Commits Chart</a>
                    `);

                    ///////////////////////////////////////////////////////
                    // Append each li to the ul
                    ul.appendChild(li);
                }
            }
        })
})

//Use new REST API
function requestUserReposREST(username) {
    // Create a variable to hold the `Promise` returned from `fetch`
    return fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
        .then(response => response)
        .catch(error => {
            console.error('Error fetching data:', error);
            return { message: 'Not Found' };
        });
}




