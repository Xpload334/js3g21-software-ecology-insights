# GitHub Software Ecology Dashboard
![A screenshot of the dashboard's search view](/resources/screenshot_searchview_openai_single.png "Search/Home View")

![A screenshot of the dashboard's main view, showcasing an example project on GitHub](/resources/screenshot_dashboard_cookbook.png "Dashboard View of an Example Project")

## What is this?
This is a prototype for a web app that displays a dashboard for any public GitHub repository. It is an alternative to the native GitHub stats pages with a much neater user interface and easy to digest information.
Anyone interested in their project's performance or wanting to see the history of popular open-source project will definitely want to try this out.

## Why Make This?
This is a result of my Bsc Computer Science 3rd Year project and the subject of a report on the same topic. The report is yet to be written, but will document the process of designing, researching and developing this app.
I started researching and designing this back in October 2023 and began development in early January 2024. There were many different iterations on how to handle the API connections but ultimately I settled on this approaching using VueJS SFCs and Vite for building.

## Running Locally
To take a look at the project yourself, you can find the project repository on GitHub here.
Under the Releases tab, there should be a link to open the application in a new tab.

If this has not appeared, or the link is returning a "Not Found" response, you can run the project yourself in a local server. This requires you downloading the project ZIP folder/cloning with git to a folder, generating your own personal access token, and running the program.

### Downloading the Project
<ol>
    <li>Go to the project page at <a href="https://github.com/Xpload334/js3g21-software-ecology-insights">https://github.com/Xpload334/js3g21-software-ecology-insights></a></li>
    <li>Select "Code" then "Download as ZIP"</li>
    <li>Download and extract the ZIP folder in a place of your choice</li>
</ol>

### Install Node.js and npm
<ol>
    <li>Visit <a href="https://nodejs.org/en/download/">https://nodejs.org/en/download/</a> to download Node.js, which includes npm</li>
    <li>You can type the following to check your versions:</li>
    <ol>
        <li>node -v</li>
        <li>npm -v</li>
    </ol>
</ol>

### Generating a Personal Access Token
<ol>
    <li>Go to <a href="https://github.com">https://github.com</a>, log in or register an account</li>
    <li>Select your profile icon in the top right, then press Settings</li>
    <li>Scroll down and select Developer Settings</li>
    <li>Then select Personal Access Tokens and then Tokens (classic)</li>
    <ol>
        <li>Alternatively, visit <a href="https://github.com/settings/tokens">https://github.com/settings/tokens</a></li>
    </ol>
    <li>Select "Generate new token" and then "Generate new token (classic)"</li>
    <li>Assign the token a memorable note and an expiration date</li>
    <li>Give the token the following permissions:</li>
    <ol>
        <li>"repo" (all)</li>
        <li>"read : user"</li>
        <li>"read : project"</li>
    </ol>
    <li>Select "Generate Token"</li>
    <li>Copy the token somewhere memorable, if you lose it you will have to regenerate it</li>
</ol>

### Setting Up Your Access Token
<ol>
    <li>In the project root, create a new file called ".env"</li>
    <li>Open ".env" in notepad</li>
    <li>Paste in the line AUTHENTICATION\_TOKEN="YOUR\_TOKEN\_HERE"</li>
    <li>Save the file</li>

</ol>

### Running the Project
<ol>
    <li>Open the root of the project in a file explorer</li>
    <li>Right click, then select Open in Terminal</li>
    <ol>
        <li>Alternatively, you can open a terminal first then navigate to the project root</li>
    </ol>
    <li>If you have not already, type "npm install" to install the project packages</li>
    <li>Then, type "npm start" to start the local server</li>
    <li>Visit the local address shown in the terminal to launch the app!</li>
</ol>