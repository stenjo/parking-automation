# parking-automation
Run a cypress script to register parking on homeassistant trigger

## What you need

- A Homeassistant instance keeping track of your car
- RESTful interface enabled on your HA
- Login credentials on the site for number plate registration.

## Homesssistant setup

In your configuration file, add the action definition for the RESTful interface. Should look something like this:

```yml
rest_command:
  trigger_github_workflow:
    url: https://api.github.com/repos/<repo-owner>/<your-clone-of-this-repo>/dispatches
    method: POST
    headers:
      Authorization: !secret github_pat_header
      Accept: "application/vnd.github.v3+json"
    content_type: application/json
    payload: >
      {
        "event_type": "homeassistant_event",
        "client_payload": {
          "key": "value"
        }
      }
```
(not sure if you need the client payload, but if you are, the key:value pairs are available in the github workflow triggered by the homeassistant_event as `${{ github.event.client_payload.key }}`)


Make sure to replace `<repo-owner>` with your repo orgnisation or your user name, 
and `<your-clone-of-this-repo>` with the repo name.

Also you need to add a github_pat_header to your `secrets.yml` file, a line 
formatted like:

```yml
github_pat_header: "Bearer ghp_YourOwnGeneratedPersonalAccessToken"
```

When these are in place, define the zone of your guest parking area, and create 
an automation triggered by your car entering the zone, with the action `trigger_github_workflow´

# Github setup

Not much, really, other than defining your user name `CYPRESS_USER_NAME` as a variable and password `CYPRESS_PASSWORD` and plate number `CYPRESS_PLATE_NO` as secrets in your repo settings: `Repo->Settings->Secrets and variables->Actions`

Also, the Personal Access Token (PAT) needs to be generated at your profile page: [github.com/settings/tokens](https://github.com/settings/tokens) 