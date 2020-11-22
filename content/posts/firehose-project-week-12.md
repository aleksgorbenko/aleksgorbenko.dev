---
title: "Firehose Project Week 12"
date: "2016-07-18"
description: "Looking beyond the coding bootcamp: job search."
---

As mentioned the previous week, I am getting closer to the point where I will have to start the job search so I have started to work on my portfolio website.

## Enter Jekyll

I have chosen to use Jekyll to build it and host it on GitHub Pages. Firstly, deployment is as simple as just making a git commit and pushing the code to GitHub. You just have to make sure that the repo is named correctly: '`marcusaurelius.github.io`'. Secondly, it is totally free. Jekyll was developed by GitHub team, so the only thing that you have to learn is the Jekyll itself, the rest will be taken by GH.

My first impression of Jekyll was really good and I got it set up no time. Just like most things in Ruby world, Jekyll is a gem that you install and then run a similar command to Rails: `jekyll new project_name`, which creates the whole folder with all the default settings and files. Here is the [full instruction](https://github.com/jekyll/jekyll). To understand what all files are  - check the [official documentation](https://jekyllrb.com/docs/home/). If that is not enough, check [this](https://scotch.io/tutorials/getting-started-with-jekyll-plus-a-free-bootstrap-3-starter-theme) and [this](http://jmcglone.com/guides/github-pages/) articles. They cover most of the basics.

Now to the bad parts. Jekyll, unlike Rails is un-opinionated. What is this means is that there are no set rules how to do things and setup Jekyll. You can do it any way you want. This is something that I learned only after I started to look at other projects built with Jekyll and finding striking differences in the way files and folders were structured. I have cloned a couple of repos from GitHub and tried to play around just to understand how things bit better. I failed. Every example I have seen was unique in its own way so I was confused how things kept working the way they are working.

I decided to start from scratch. I re-read the documentation to make sure the basics are covered. Shortly after I had started I faced another problem - Bootstrap doesn’t want to work! It turned out that it doesn't support jQuery 3.1.0 upwards. But even when I used Google Hosted jQuery Library of 2.1.8 - no success. As I was solving the problem, I got introduced to Bower - which is we-framework package manager. Pretty useful thing. You install it via NPM (Node.js package) `npm bower install -g`. The `-g` flag makes sure it is installed globally.

_Note: I know I have mentioned before that I am going to use Foundation for this project. I eventually didn't for two reasons: apparently, Foundation is not much different from Bootstrap. It has mainly the same features, just different class names. Secondly, I needed to complete the Portfolio as soon as I can to move on to other projects, so choosing Bootstrap was just more practical._

Then within the project folder, you run commands such as bower install jquery#2.1.8 to get the specific version of any framework. Bower will default to a 'bower_components' folder in you project directory, but you can change these defaults easily in `bower.json` file. So I tried to install jQuery and Bootstrap via Bower. No success again. Bower was getting automatically the latest version of jQuery and for some bizarre reason I could not run the command: `bower install jquery#2.1.8`. I will explain why as it may save you hours of Googling. I use ZSH as my shell and it is seeing `#` as an escape character. Hence, I was getting the **'zsh:command not found'** error. The workaround is very simple, whichever part of the command has the `#` character has to be surrounded by quotes, like this: `bower install 'jquery#2.1.8'`. Now the command will be passed a literal and execute properly with no errors.

My mentor has actually helped me to fix this error and it happened after I made jQuery and Bootstrap work in harmony in my Jekyll project. I just used CDN links for everything in the footer in the right order: jQuery first, then Bootstrap JS assets and finally Bootstrap CSS. It is probably the easiest solution and it has its benefits:

- You are not serving assets from your server.
- Chances are most of the users will have these assets cached in their browsers.
- Setup is incredibly simple - just insert several links before the closing `<body>` tag and you are good to go!

Phew…after finally sorting out the very setup it was time for a design. This is how I approached it:

1. List all the things that I wanted to have on my page
2. Set the sequence, what goes after what
3. Draw freely in my notebook until I get the design I like
4. Start coding

I know I am repeating myself, but it is really important to **NOT** to skip this kind of thought process before building anything. It is so easy to fall into the temptation to "just do it" without putting too much time in a plan. Don't do it. I probably saved myself hours by knowing exactly what I wanted in the first place. Of course, some things will change and won't look exactly as you planned and that is fine. 80% will anyway, so instead of designing something with CSS, realising that you don't like what you see and getting back to square one is not effective at all. So think and draw first. Code second.

## Task Running and Gulp

As I was learning more about Jekyll, I came across something called [Gulp](http://gulpjs.com/). I have seen it in a few job specs for positions but never really knew what is it. Turned out it is an absolutely awesome technology and I cannot wait till I learn more about it and start using it in a more skilful way.

`Gulp == automation` and saving lots of time. For Jekyll, I used primarily for one single purpose…auto-refresh. Yes..that is really cool! Have you ever been annoyed by the fact that every time you have changed the font size from `15px` to `17px` and want to see how it looked with the new style, but you had to switch to the browser, refresh, wait and then finally see the result? Well, these times comes to an end now, because you have Gulp - it will refresh the whole thing for you.

So there are two parts to how it works in Jekyll. Firstly, you have to understand that whatever you do in Jekyll folders eventually gets compiled into one folder called `_site` which gets served when somebody visits your URL. Every time you make some changes, Jekyll has to run `build` command to basically update all files in the `_site` folder.

The second part is the `serve` command that you have to run to launch a local server and have your site served up there. Gulp combines these two tasks into one continuous process and reruns it every time you make any changes. Instead of you refreshing the browser manually, you just type in `gulp` once and the magic happens. You got the server running which picks up changes every time you press `Cmd+S` command and runs `build`, then `serve` for you automatically.

Here is how the code looks:

```javascript
// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll build --watch']));
// Or if you don't use bundle:
// gulp.task('build', shell.task(['jekyll build --watch']));

var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({
                      server: {baseDir: '_site/'},
                      open: false,
                      ghostMode: false
                      });
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/\*\*/\*.\*').on('change', browserSync.reload);
});

gulp.task('default', ['build', 'serve', 'images']);
```

I have taken this code from [here](https://nvbn.github.io/2015/06/19/jekyll-browsersync/), so check it out if you want to see more details on what exactly is happening in the code.

## Pair Programming Sessions

This week was the first time I had some proper pair programming sessions with my teammates. There are a lot of benefits to reap from such sessions and now I understand why it is a best practice in good companies and why people emphasise the importance of it.

Two heads are better than one. PP is a perfect example. When you have another fresh set of eyes looking at the code that both of you are working on in real time, less bugs are made, mistakes are noticed more quickly, solutions developer faster and overall it is a great fun. It has a good side effect of bonding with another fellow nerd like yourself.

But the biggest benefit is probably not the process itself, but the result of what you take out of each session. That's new skills, ideas and way of thinking/doing things.

In my first session, we actually had 3 people and one of use was briefing us on the code that he worked on the week before. Often times it is hard to understand other person's code without actually speaking to that person. We all are thinking in different ways and logic has also various ways of expressing itself in each of us.

Moving forward with the project I am sure to encourage more and more of such sessions as they will be probably the most valuable experiences during the whole process.

## Learning to Build Step By Step

Finally, I have learned a good lesson this week. When building something it is easy to start with crazy ideas and say, yes, let's use Firebase to update our database, how about using `<insert name>` API? Let's build live chat, etc. All these ideas are great, but jumping straight into them will actually result in a lot of trouble and confusion.

Simply because it is much easier say to switch from AJAX requests to Web-Sockets, than it is to implement Web-Sockets to start with. Funny enough, I have actually experienced the same curve last week when first I have built  the chessboard with pure HTML and only then made in a jQuery loop.

As I had all this HTML in front of me - it was incredibly easy to design the same solution in jQuery. I don't know how much time I would have spent if I tried to do it in jQuery straight away, but what I know is that the process of moving from one(simpler) way to another(more complex) way was gradual and involved the learning curve.

So develop one step a time and increase the complexity with each step, don't aim for complexity from the start.

Having said that, I guess more experienced programmers can afford to start with more complex solutions in the first place.  For a beginner such as myself, though, I have found the step by step process to be more natural and invoice lots of learnings along the way.

Happy Coding!

My Journey at Firehose Project: 92.31%

[<< Week 11](http://localhost/firehose-project-week-11) === [Week 13 >>](http://localhost/firehose-project-week-13)
