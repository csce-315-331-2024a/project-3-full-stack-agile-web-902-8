[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/ttC5_kKh)

# Project 3 Group 902-8

## Installing

### Ubuntu/WSL

Since Node.js version included in Ubuntu reached EOL in 2021, we need to install the latest version differently.
Windows has an [article](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl) about installing Node.js, the commands summarized are

```bash
sudo apt-get update
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash # install nvm
```

Restart the terminal or open a new terminal,

```bash
nvm install --lts # latest stable version
```

Verify installation, you should see something like this about the versions

```bash
npm --version
10.5.0
node --version
v21.7.1
```

Once both are installed, clone the repo and install the dependencies

```bash
git clone git@github.com:csce-315-331-2024a/project-3-full-stack-agile-web-902-8.git
cd project-3-full-stack-agile-web-902-8
npm install
```

## Running

Use the command `npm run dev` to run the app from the terminal. Then you can open it in a browser, the default url is [localhost:3000](http://localhost:3000). This will require a recent version of npm and Node.js to be installed.

### Meeting Minutes FIRST SPRINT:

First Daily meeting 3/26/24 4:00-4:15pm Via In person Attendees: Jose Ortiz, Alex Beamer, Kyle Palermo, Sandeep Mishra, Nathan Tran

In this meeting we went in a group and discussed how we will use the database and TypeScript together. Alex, since he is more experienced with databases, showed us a structure to follow when converting our java files to TypeScript. We also discussed briefly about how we would structure our frontend pages. We had a few minutes to discuss any concerns and questions members had.

Second Daily meeting 3/28/24 6:00-6:15pm Via Discord call live share Attendees: Jose Ortiz, Marvin Fung, Kyle Palermo, Sandeep Mishra, Nathan Tran

In this meeting we discussed everyone's progress with their tasks. We went by person per person and demoed their parts to make sure they met the task goals. We discussed ways we could improve the interface and took notes for our future sprint. We also discussed things that must get done before our next meeting so we have an MVP.

Third Daily meeting 3/30/24 6:00-6:15pm Via Discord call live share Attendees: Jose Ortiz, Alex Beamer, Kyle Palermo, Sandeep Mishra, Nathan Tran, Marvin Fung

In this meeting we made sure we met everything we needed to have an MVP. We made sure our interfaces were navigable for now just so everything could be accessed. We looked over our backend files to make sure everything was correct. We discussed goals that we need for our future sprint. We went over any design concerns as well to make sure we have an efficient layout.
