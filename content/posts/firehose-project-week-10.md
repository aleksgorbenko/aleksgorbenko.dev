---
title: "Firehose Project Week 10"
date: "2016-07-04"
description: "Why, why, JavaScript?"
---

As planned, this week I spent learning more of the JavaScript (nope, I still don't like it that much).  I have also watched some Plularsight.com courses, and spent time working on the group project, chatting with the team about the tasks we need to complete helping each other with ideas along the way.

Two main areas I tried to concentrate on this week was the this keyword and the Prototypical Inheritance in JS. I know you can write class-like code in ES6 (which is a relief actually), but in any case to really understand how objects are created in JS and how they inherit methods and properties from each other one has to go through PI.

So far the best article I have found on Prototypes - [A Plain English Guide To JavaScript Prototypes](http://sporto.github.io/blog/2013/02/22/a-plain-english-guide-to-javascript-prototypes/). I did watch as well [this short course on JS objects and prototypes](https://app.pluralsight.com/library/courses/javascript-objects-prototypes/table-of-contents), which helped me to solidify the understanding with some more examples (that's not to say that I get it all :) ). On top of that I recapped the difference between the Object Literals and Constructor Functions ways to create an object.

I am not going to lie... I am still not clear about the this keyword...but probably the best explanation I have found so far is in [this article](https://rainsoft.io/gentle-explanation-of-this-in-javascript/). Dmitri (author) has also other useful posts on JavaScript, so be sure to check out his other articles on [details of the upcoming ES2016](https://rainsoft.io/must-know-details-about-es2016-features/)  and others.

## Getting to Know Continuous Integration and Continuous Delivery

Continuous Integration and Continuous Delivery were totally unfamiliar terms to me before the start of this week. Setting up both was one of the tasks for the agile team project I am currently in, so I volunteered to fulfil it. Turned out the whole concept of CI and CD is pretty damn cool. Here is the short version of what it is:

If you are writing software using the TDD approach, you write a lot of tests as you move along the project. You run these tests, you see them pass. You `git commit` and push the code to the repo and then deploy it. CI can make almost all these actions automated if setup correctly.

### Continuous Integration

There a few options existing on the market for CI/CD solutions, the most popular are [CodeShip](https://codeship.com) and [TravisCI](https://travis-ci.com/). I went with CodeShip as a mentor suggested it. It is pretty straightforward to set it up. I followed [this tutorial](http://code.tutsplus.com/tutorials/codeship-continuous-integration-and-delivery-made-simple--cms-23517) and it worked almost immediately after I created the project and hooked it up with the GH repo. Here is a screenshot of the our setup on CodeShip:

![codeship-test-settings](/images/codeship-test-settings-1024x613.png)Author:

So now, every time one of the team members pushes code to the GitHub - the following happens:

1. The whole repo is cloned to the CodeShip server.
2. Specified commands are being run (like bundle install and which version of Ruby should be installed - everything should match your development environment).
3. All tests are run (it depends what you use, we are using RSpec)
4. If all tests pass the build is marked Green and the Merge button on GH becomes active.
5. If test/s fail - you get the error message on GH, notification via email, Slack, etc.
6. The Build is getting deleted from CodeShip servers, that's right, they don't store any of your actual data, just the test results of each build.

### Continuous Delivery

CD comes into play when all tests are passed and you press Merge on GH. CodeShip then takes the code and deploys it wherever you specify.

Straight after setting them up you see the value of these services. It saves SO much time. But the main benefit is the fact that the whole team is on the same page in terms of which test are passing which tests are failing and what needs to be fixed. If all tests are green, deployment is also taken care of and you have  less commands to run from your CLI.

## A Note on Wireframing

I also took some part in designing the wireframes for our group project and this was probably the first time when I literally had to start from 0. At first it was just sitting in front of the black Balsamiq canvas, but after about 10-15 minutes of some inspiration web browsing and brainstorming I had an idea and actually it was really easy to build. I spent probably 25 minutes doing the mockup.

The main thing though is realisation of how useful are the mockups. Before I used Balsamiq mostly to replicate existing websites to get some practice using the tool - now it was totally creative exercise. Moving forward, the whole team including myself will always refer to these drawings and will be on the same page in terms of visual part of what we are building.

As I am going t build my portfolio website soon as well - I will be sure to create mockups as a first step. Technically, I know that I will be doing mockups first for every project.

## Collaboration in Git

Only after you join the team of Devs you realise that sometimes working with Git will be painful. Within the first week of the project, we probably had more merge conflicts than commits altogether. Step by step we all learned to manage git repo in a more stable way. Another reason why we had so many conflicts is due to the fact that our environments are different and we had to many conflicts in our Gemfile and Gemfile.lock files. To avoid conflicts I have created a checklist for myself and frankly after running through it a few times the whole process becomes a habit.

Here it is:

1. **Pull latest master branch**
2. **Create branch**
3. **Do coding**
4. **Pull again the master branch**
5. **Push new branch to GitHub to a separate branch**
6. **Send pull request(PR) and make sure CI test are all good.**
7. **Wait for code review OR fix the PR so it can be merged.**
8. **After the branch has been merged into the master - you can delete the branch locally.**

I spoke to my mentor about it and he said while the list is overall correct, most companies have their own standard processes that should be followed. To learn about git I have used [Atlassian Git tutorial](https://www.atlassian.com/git/tutorials/what-is-version-control) - it has clear diagrams and good explanations as well as a [glossary](https://www.atlassian.com/git/glossary/) for future reference. GitHub also has a [guide page on the workflow](https://guides.github.com/introduction/flow/) that I recommend checking out.

Finally, I kept on feeding my Sci-Fi addiction with two more novels. This week, I went back to classics of Polish and Russian Sci-Fi: [Solaris](http://amzn.to/29I8jz3) by Stanislaw Lem and [Roadside Picnic](http://amzn.to/29zkxGl) by Arkady and Boris Strugatsky.

Happy Coding!

My Journey at Firehose Project: 76.92%

[<< Week 9](http://localhost/firehose-project-week-9) === [Week 11 >>](http://localhost/firehose-project-week-11)
