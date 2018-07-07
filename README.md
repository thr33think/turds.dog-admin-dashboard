# Turds.DogAdminDashboard

Admin dashboard for the turds.dog project

## For localtesting

- Clone git Repo
- Hit `npm install` to install dependencies
- Hit `npm start` after install is finished to start the dev server on `localhost:4200`
- Open a webbrowser and disable CORS checking. For Chrome Canary use `open -a Google\ Chrome\ Canary --args --disable-web-security --user-data-dir=$HOME/profile-folder-name`. For Google Chrome you could use `chromium-browser --disable-web-security --user-data-dir` (not tested)
`

## For Prod Deployments

> This should be only handled by the CI system

__AUTH_TOKEN__ is the admin access token for the backend.

1. `AUTH_TOKEN=bar make` Compile the web app
2. `make dockerimage` Create the Docker Image