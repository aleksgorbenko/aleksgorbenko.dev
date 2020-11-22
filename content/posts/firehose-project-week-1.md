---
title: "Firehose Project Week 1"
date: "2016-05-02"
---

The first week of the boot camp is completed and so far it has been nothing but great.

One of the highlights of the week is the fact that I have built my first application and deployed it to Heroku. It is live and available here:

[http://splurty-aleks-gorbenko.herokuapp.com/](http://splurty-aleks-gorbenko.herokuapp.com/)

It is a simple quote generator where you can submit your quote, and it would spit out a random quote to the homepage every time someone visits or refreshes it.

## Questions, questions, questions

Right after I built it - I still had dozens of questions and many things unclear - what exactly is the database, what is a database migration and others. Through the first app you are getting a lot of hand-holding at every step and some things are not explained till later, so it's natural that these questions occur.

The most of the learning came after I have finished the first app actually. Firstly, further lessons got automatically unlocked as soon as I have submitted the code for the review. The two key sections that got unlocked were covering how to does Web Application works and the basic concepts of Object Oriented Programming.

In web applications part I finally understood what is MVC and how it works. Reading before about it only made me more confused, but after the videos at Firehose it started to make sense. I also recommend checking [this](http://betterexplained.com/articles/intermediate-rails-understanding-models-views-and-controllers/) and [this](https://medium.freecodecamp.com/model-view-controller-mvc-explained-through-ordering-drinks-at-the-bar-efcba6255053#.mx85om31c) article if you want to get your head around of MVC concept. Understanding of it is one of the most important concepts when working with Rails as MVC architecture is the fundament that any web app on Rails is built.

Another curious thing was the types of the HTTP requests. Now, I knew from back in my SEO days that there is a GET request, and frankly I thought that it's the only one there is, but I couldn’t be more wrong. In total there are 8 of them:

1. GET
2. HEAD
3. UPDATE/PATCH
4. POST
5. DELETE
6. PUT
7. CONNECT
8. TRACE

But mainly we will only use half of them while building applications. And these four correspond to the next concept that I also learned this week - CRUD applications. CRUD is an acronym and it stands for Create, Read, Update and Destroy and each of these you can relate to the four main HTTP requests listed above.

- **GET = READ** - request a page from the server
- **POST = CREATE** - post some content, fill in the form and send it to the server
- **DELETE = DESTROY** - self-explanatory
- **PATCH = UPDATE** - update the existing record and send it to the server. Eg: changing your username in the profile settings. Effectively you are changing the data in the database on the server.

[Learn more about HTTP request types here.](http://www.tutorialspoint.com/http/http_requests.htm)

## Wearing a "Designers Hat"

In development, you will often hear people referring to "wearing different hats".  Each hat is just a representation of the work that you are currently performing on the project. There are two hats mostly "developers hat" and "designers hat". Don't confuse these with White, Black or Grey hats - these are entirely different and are not the subject of this post.

In this part I discovered the [Bootstrap 3](http://getbootstrap.com/). I have encountered it once before and I remember well how I visited the documentation page…thinking "How the heck one can learn all of this?!" I think I closed it after a couple of minutes of reading and not understanding anything. Now I think I will be able to get most of the concepts. And it is actually pretty easy after you become familiar with CSS basics, such as selectors, pseudo-classes and properties. [HTML & CSS track on Codecademy c](https://www.codecademy.com/learn/web)an get you started on these.

Bootstrap 3 is a CSS framework, and yes, Rails is a framework too, but I think Bootstrap is really the technology that taught me to appreciate the power of frameworks.  It made me also remember the words that Simon Allardice said in [Lynda.com](http://www.lynda.com) course on [Programming Fundamentals](http://www.lynda.com/Developer-Programming-Foundations-tutorials/Welcome/83603/90426-4.html): "It's all about the frameworks. That is where the power of the language is really being manifested". I think I understand what he meant now. Frameworks are huge libraries of a pre-written code that you can use out of the box.

I also got to use media queries for the first time, which are the basic building blocks of the responsive design.  The idea is very simple actually and much less complicated that I imagined at first. You specify how an element gets displayed depending on the screen size of the device. Screens vary a lot, hence, resolutions could be quite different too, so to work around it, you can set _min_ and _max_ values in pixels within the media query. Here is a quick example from my first app:

Here is the set CSS for the .footer-blurb class, notice the text alignment property.

```css
.footer-blurb {
  font-style: italic;
  text-align: right;
  font-size: 12px;
}
```

The code below translates: **IF** the width of the browser window is wider than `750px`, the HTML element with the class of .footer-blurb should be aligned to the left, otherwise - to the right as per the code above.

```css
@media (max-width: 750px) {
  .footer-blurb {
    text-align: left;
  }
}
```

## Optimising The Dev Environment

Finally, I got my head around how the SSH keys work and the fact that you have to have a separate key for each of your development environments. Firehose works with Vagrant that you setup at the start of the course.

Vagrant is a template of the environment that boots on a virtual machine which you boot on your local machine. This means that it has its own contained environment and will not have any of settings you may have on your local environment. You shell prompt will be basic, there will be no aliases that you have set in your `.bash_profile` or `.bashrc` files. There are a couple of workarounds, though:

1. You can manually open the `.bash_profile` from within the vagrant shell with the command `vim ~/.bash_profile`.
2. Press `I` to go into insert mode then navigate with arrows to the empty line and type in all your alias commands. Yes, you can use copy/paste into vim, but this solution didn't seem to work on my machine.
3. Here are a couple of examples from my alias list:
    - `alias rs="rails server"`
    - `alias rc="rails console"`
    - `alias gst="git status"`
    - `alias gpom="git push origin master"`
4. Press ESC, then type `:qw`, `:` will make Vim wait for the next instructions you are to give, `w` will write the file and `q` will quit from vim. Press enter.
5. Restart vagrant, done.

There is also [another way of doing it which is much faster](https://coderwall.com/p/oooszg/vagrant-tweaks-to-make-it-more-like-your-local-command-line-app). The reason I didn't do it is just because I was recommended against it due to how Vagrant is setup with Firehose. I will be sure to experiment when I am done with the course.

Moving into the second week I will be building another Rails application, starting with [RubyKoans.com](http://rubykoans.com/) to get a better understanding of the Ruby syntax and studying basic [Database concepts in more details.](http://www.lynda.com/Access-tutorials/Foundations-Programming-Databases/412845-2.html)

Happy Coding!

My Journey at Firehose Project: 7.69%

[Week 2 >>](http://localhost/firehose-project-week-2)
