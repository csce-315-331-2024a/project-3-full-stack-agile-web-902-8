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

Second Daily meeting 3/28/24 6:00-6:15pm Via Discord call live share Attendees: Jose Ortiz, Marvin Fung, Kyle Palermo, Sandeep Mishra, Nathan Tran

Third Daily meeting 3/30/24 6:00-6:15pm Via Discord call live share Attendees: Jose Ortiz, Alex Beamer, Kyle Palermo, Sandeep Mishra, Nathan Tran, Marvin Fung

### Meeting Minutes SECOND SPRINT:

First Daily meeting 4/7/24 6:00-6:20pm Via Discord call Attendees: Jose Ortiz, Alex Beamer, Kyle Palermo, Sandeep Mishra, Nathan Tran, Marvin Fung

Second Daily meeting 4/10/24 10:00-10:20am Via In person Attendees: Jose Ortiz, Alex Beamer, Kyle Palermo, Sandeep Mishra, Nathan Tran, Marvin Fung

Third Daily meeting 4/14/24 8:15-8:40pm Via Discord call live share Attendees: Jose Ortiz, Alex Beamer, Kyle Palermo, Sandeep Mishra, Nathan Tran, Marvin Fung
