# Contributing

## General Workflow

1. Fork the repo (then see requirements)
1. Cut a namespaced feature branch from master
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...
1. Make commits to your feature branch. Prefix each commit like so:
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...
1. When you've finished with your fix or feature, Rebase upstream changes into your branch. submit a [pull request][]
   directly to master. Include a description of your changes.
1. Your pull request will be reviewed by another maintainer. The point of code
   reviews is to help keep the codebase clean and of high quality and, equally
   as important, to help you grow as a programmer. If your code reviewer
   requests you make a change you don't understand, ask them why.
1. Fix any issues raised by your code reviwer, and push your fixes as a single
   new commit.
1. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.

## Requirements

If you are planning on contributing and have just forked the repo you will still need to add a few private files before the 
app will run. You should add a new folder "private" in the main directory of the application (same level as src, server, public...)
and add 2 files into that folder: config.keys.js and s3.json. config.keys.js contains the password to Amazon Web Services, you
will need to use your own which might require making an account. It also includes the google authentication which will be
where you place the clientID and clientSecret from your google api account.
Here is what config.keys.js should look like

const configKeys = {};

configKeys.AWSpwd = 'YOUR_DB_NAME';

configKeys.google = {
  clientID: 'SOMETHING-VERYLONGRIGHTHERE.apps.googleusercontent.com',
  clientSecret: 'GIBBERISHKEYHERE',
};

module.exports = configKeys; 

You will also need to set up a s3.json file to access your AWS bucket which is where the cover letters are 
stored. The structure for this file is 

{
  "aws": {
    "AWS_ACCESS_KEY_ID": "SOMESTUFFHERE",
    "AWS_SECRET_ACCESS_KEY": "LOTSANDLOTSOFSTUFFHERE",
    "S3_BUCKET_NAME": "YOUR_BUCKET_NAME"
  }
}

You will need to start the server (see below) and then set up the database once. Your database will not
be shared with the main site meaning you will need to signup and add jobs from an empty database. In order
to set up a connection to a new database you will need to go into server/db/modules and for each one change
sync() to sync({force: true}) then from terminal run node/server/db/module/(name of file). After this you
will have that table created in your db so you can remove the force true and not worry about this again.
After adding these files you will be able to run your own local version of the site with npm install once 
and then running webpack -w and nodemon server/app.js each time you want to start the server.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature brances)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
 - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
 - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.


<!-- Links -->
[style guide]: https://github.com/reactorcore/style-guide
[n-queens]: https://github.com/reactorcore/n-queens
[Underbar]: https://github.com/reactorcore/underbar
[curriculum workflow diagram]: http://i.imgur.com/p0e4tQK.png
[cons of merge]: https://f.cloud.github.com/assets/1577682/1458274/1391ac28-435e-11e3-88b6-69c85029c978.png
[Bookstrap]: https://github.com/hackreactor/bookstrap
[Taser]: https://github.com/hackreactor/bookstrap
[tools workflow diagram]: http://i.imgur.com/kzlrDj7.png
[Git Flow]: http://nvie.com/posts/a-successful-git-branching-model/
[GitHub Flow]: http://scottchacon.com/2011/08/31/github-flow.html
[Squash]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
