<div align="center">
  <img src="/assets/gna-icon.png" height="100">
  <h1>GNA</h1>
</div>

## A Gender-Neutral Assistant

GNA (pronounced "Gina") is a Slack App that reminds Slack users to communicate in an appropriate and inclusive manner.

GNA listens for the use of gendered phrases referring to a group of people (e.g., “guys” or “bros”) within Slack channels and sends a direct message to the user who used the gendered word. GNA provides the user with an alternative gender-neutral phrase or word to use to encourage inclusive communication practices.

## Getting Started

These instructions will get the project up and running on your local machine for development and testing purposes. See the [Deployment](#deployment) section for information on deploying the project.

### Prerequisites

* [Node.js](https://nodejs.org/en/): If you don't already have Node installed, you can download a pre-built installer for your platform on [nodejs.org](https://nodejs.org/en/download/).

* A [Slack Workspace](https://slack.com/get-started): In order to add a Slack app, you will need a Slack Workspace to work with. If you are not already part of a Slack team, start a [new one](https://slack.com/get-started#create). 

* A New Slack App: See the [Slack Setup](#slack-setup) section for details on how to properly set up your new app within Slack.

### <a name="slack-setup"></a> Slack Setup

Complete the following to configure GNA on your Slack workspace:

##### 1. Create a New Slack App
* Visit the [Your Apps](https://api.slack.com/apps) section of the Slack API User Interface to create a new Slack app
* Select *Create New App* and enter *GNA* in the App Name field
* Select your Development Slack Workspace from the dropdown
* Click *Create App*

<p align="center">
    <img src="/assets/create-a-slack-app.png" height="300">
</p>

##### 2. Add Features and Functionality
* In the App Settings' Basic Information section, enlarge the *Add Features and Functionality* dropdown. 

<p align="center">
    <img src="/assets/add-features-and-functionality.png" height="300">
</p>

* For each of the three sections listed below, configure the following settings: 

     a. Bots
    
     * Alter the bot's display name and default username as desired (or keep the default settings)
     * Flip the *Always Show My Bot As Online* switch to ```On```
     * Save Changes

     <p align="center">
        <img src="/assets/bot-settings.png" height="300">
     </p>

     b. Event Subscriptions
        
     * Flip the *Enable Events* switch to ```On```
     * Subscribe to Bot Events
     * Click *Add Bot User Event*
     * Select ```message.channels```

     <p align="center">
        <img src="/assets/bot-events.png" height="200">
     </p>

     c. Permissions
        
     * Generate OAuth tokens:
        
          * Click Request Approval to install the app on your workspace
          * Once approval is granted, click *Install App To Workspace*
          * Confirm your identity and access tokens will automatically generate
     * Scopes: From the *Select Permission Scopes* dropdown, select the following: 
                
       *  Add a bot user with the username @gna. ```[bot]```
       * Access user's public channels. ```[channels:history]```
       * Access information about user's public channels. ```[channels:read]```
       * Send messages as GNA Bot. ```[chat:write:bot]```
       * Access content in user's direct messages. ```[im:history]```
       * Access information about user's direct messages. ```[im:read]```
       * View some URLs in messages. ```[links:read]```
       * Add link previews to messages. ```[links:write]```
                     

<p align="center">
    <img src="/assets/permission-scopes.png" height="500">
</p>

##### 2. Display Information
* In the App Settings' Basic Information section, scroll down to the Display Information section and enter the app's name and short description. Set the background color to ```#1fab85``` or choose your own color selection. Click the Add App Icon button and select the [bearded dragon app icon](/assets/gna-icon.png) from the assets folder of this repo.

<p align="center">
    <img src="/assets/add-app-icon.png" height="300">
</p>

After saving all of your updates, the Display Information section should look like this:

<p align="center">
    <img src="/assets/finalized-display-information.png" height="300">
</p>


### Installing

After cloning the repo, create a .env file in the root directory of the project. 

```
$  touch .env
```

Find and copy your Bot User OAuth Access Token in the OAuth & Permissions section for your app in the Slack API User Interface.

<p align="center">
    <img src="/assets/oauth-and-permissions.png" height="275">
</p>

Add your token to your project's .env file matching the below format (replacing "XXXX-XXXXXXXXXXXXXXX" with your own token). 

```
$  GNA_SLACK_BOT_TOKEN="XXXX-XXXXXXXXXXXXXXX"
```

After saving your changes, run:

```
$  npm install
```

After successful installation, start the app by running: 

```
$  node index.js
```

You can now test the bot locally. Invite the bot to a Slack channel using the ```\invite``` [slash command](https://get.slack.help/hc/en-us/articles/201259356-Slash-commands). Within the channel, use one of GNA's trigger phrases (e.g., "bros," "guys," "man up"). You should receive a direct message from GNA Bot that looks like this:

<p align="center">
    <img src="/assets/gna-message.png" height="200">
</p>

You are now ready to deploy your bot!

## <a name="deployment"></a> Deployment

### Set up a Heroku Account

If you don't already have a Heroku account, set up a free one at [Heroku.com](https://signup.heroku.com).

### Deploy GNA Bot

After you are logged in to your account, click below to deploy the GNA bot:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/groupninemedia/GenderNeutralAssistant)

Select a unique App Name for your version of GNA bot, and click "Deploy App."

<p align="center">
    <img src="/assets/deploy-app-heroku.png" height="300">
</p>

### Troubleshooting

GNA bot requires at least one worker dyno to be configured (as opposed to web dynos), but Heroku doesn't run worker dynos by default. While the Procfile indicates that this app requires a worker dyno, Heroku sometimes requires that you execute the following command (scaling up to one worker dyno and scaling back the web dyno):

```$  heroku ps:scale worker=1 web=0```

You should now be up and running! 

If you need additional assistance, refer to the [Heroku documentation](https://devcenter.heroku.com/categories/troubleshooting) and check out your Application Logs on your Heroku Dashboard.


## Contributing

We encourage you to use GNA within your own Slack communities and to contribute to the project! Please read [CONTRIBUTING.md](/docs/CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE.md](/docs/LICENSE.md) file for details.

## Acknowledgments

GNA was built by [Group Nine Media](https://www.groupninemedia.com/)'s Summer 2017 [ScriptEd](https://scripted.org/) Interns, Momina Fazal and Patricia Santana, with support from the [Emerging Platforms Team](https://medium.com/group-nine-media-product-team/introducing-emerging-platforms-68cd26c061a4).