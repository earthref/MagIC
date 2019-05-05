# EarthRef's MagIC Web Application

A [Meteor](https://www.meteor.com) application for the EarthRef.org MagIC Database.

### Creating a Development Environment

Download and install:
- [Visual Studio Code](https://code.visualstudio.com/) - an open-source IDE for Javascript development
- [Meteor](https://www.meteor.com/install) - the full-stack web framework
- [Git Kraken](https://www.gitkraken.com/download) or another Git UI or Git shell  
  - This document refers to whichever Git software you choose simply as **Git** from now on.

Pull the **develop** branch and branch it to a **user/[user name]** branch or a **feature/[feature name]** branch in **Git**.

Check out the new branch in **Git** and make changes in **Visual Studio Code**.

Retrieve the latest packages in the terminal by typing:

```
meteor npm update
```

Run the **Meteor** application by typing:

```
meteor
```
The web application will run locally at http://localhost:3000, but access to the **Elasticsearch** server is limited.

### Browser Testing

We use Browser Stack to check for cross-browser compatability:

<a href="http://BrowserStack.com">
  <img width="200" src="./Browserstack-logo.svg"/>
</a>