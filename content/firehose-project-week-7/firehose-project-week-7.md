---
title: "Firehose Project Week 7"
date: "2016-06-13"
---

This week I managed to do quite a bit of work. I have finished the 3rd application - [Flixter](http://flixter-aleks-gorbenko.herokuapp.com/). It has proved to be the most difficult app to date. It has the most amount of self-directed lessons, there were more Models which interact with each other in different ways. As a beginner developer, I think this is the project I am most proud of (so far), not just because I put lots of time in it, but also because I deviated from the design instructions and went on my own. (And yes it was painful, once I spent about 4 hours fixing 2 CSS bugs). Also, I have shared the site with my close friends and one unanimous feedback I got was that it is clear and user-friendly. That felt good...all this time I spent reading stuff on UX was not in vain :)

On top of that, I started to play with the 4th app which is using the TDD approach, which I will dive into next...

## Intro to TDD or Test Driver Development Methodology

I have noticed an interesting trend. Most of the free courses don't have TDD as part of their program. I have also attended a FreeCodeCamp London meetup and when mentioned TDD not all people who are learning on their own are aware of it. Yet it is a crucial part of the software development nowadays and good companies employ this approach. This makes TDD a crucial skill in job hunting. So the whole app that I am building (which is a clone of Instagram) is built using TDD. The concept is summed up in this diagram:

Red-Green-Refactor is a process where before you write any code, you first write a test for it and make it fail - the red part. You then write code that should pass the test (that is the code that eventually get shipped) - green part. You then go back and refactor the code that you have just written. Refactoring is effectively shortening the code, making it more concise and probably even more efficient. The code that you refactor should do THE SAME thing as it used to do before (otherwise you will start seeing failing tests) but in a different(more efficient way).

This cycle is repeated again and again up until your code has a top condition:

1. **It is maintainable and extensible.**
2. **Not repetitions present (DRY).**
3. **Modular (broken into small parts that are not overly dependent on each other).**

At first, it looks like a lot of work and that is exactly how I also used to think. Inevitably you start realising the value of such approach after you have quite a lot of code written. It is hard to keep in mind all the moving parts of your application when adding new features and a chance that you will break something is only increasing.

TDD makes sure you are not falling into this trap. A test will always say if you broke something, so it much easier to pinpoint the error as you usually write tests separately for each part of your app (controllers most of the time).

Yes, tests will easily be several hundreds of lines of code for a single controller, but it is a hell of a lot better to spend writing them while thinking of all different case scenarios, than  not writing them at all and trying to check if things are working manually after you have added yet another feature.

I did manage to also watch trough the [TDD course on Lynda.com](https://www.lynda.com/Developer-Programming-Foundations-tutorials/Foundations-Programming-Test-Driven-Development/124398-2.html) before, so I was familiar with the concepts, and I would suggest going through it too regardless of your current knowledge level. Many things did not make sense then but clicked while I was doing the Grammable app.

## CodeCademy SASS Course

Last week I decided to touch upon the SaSS and just get the feel of it, so at least I am aware of the basics of the technology. The course was pretty comprehensive despite being quite short (about 3 hours). If you have a good understanding of HTML, CSS and programming concepts such as variables, methods, hashes(in SASS called "maps"), and loops, you will easily understand the course. The main idea of SASS - giving CSS all the features of standard programming language and more.

Using sass is pretty simple. You use can use the same file as for CSS but with the additional extension of SCSS, like this: `styles.css.scss`. The `.scss` file itself cannot be rendered by the browser, so first you have to convert the  `.scss` file into `.css`. This process is called "transpiling", [not to be confused with compiling](https://www.stevefenton.co.uk/2012/11/compiling-vs-transpiling/). (similarly, it happens in JS when you use ES6 standard to write the code for older browsers that support JS only up to ES5 - [Babel](https://babeljs.io/) comes to rescue here). Here is an example (link). So with the SASS features, we get to write less code, which is also more maintainable than traditional CSS!

Frankly, I cannot yet imagine the extent of all use cases for sass, but here is a quick example. Presume you have different buttons on your site: action button, cancelation, sign in/out etc. So let's say the shape and size are the same but the difference is in default colors. SASS mixins can be a great help here.

First, we create the `@mixin`, assign a name to it and list several properties (just like in CSS) for our buttons:

```css
@mixin button-style($base-color) {
  display: inline-block;
  padding: .375rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  border: 1px solid darken($base-color, 20%);
  border-radius: .25rem;
  &:hover {
    color: lighten($base-color, 10%);
  }
}
```

In SASS a variable is declared with the `$` sign. Notice how we pass a variable `$base-color` to the `@mixin` we have created. The `@mixin` works like a method in other programming languages - it takes an argument and now we can use it within the `@mixin`. We are using `$base-color` in two different places using two built-in SASS methods lighten and darken that automatically take a color and change it by the amount you specify:

```css
border: 1px solid darken($base-color, 20%);
```

AND

```css
&:hover {
  color: lighten($base-color, 10%);
}
```

Another thing you might have noticed is the `&` character. This is similar to the keyword `self` in Ruby. In transpiling process `&` is replaced with whatever CSS selector you are calling the `@mixin` onto. Now the best part - let's say you have a button class `.button-warning`, here is how you could declare all its styles in one go:

```css
.button-warning {
  @include button-style(#B2160F);
}
```

Pretty neat isn't it? Also, bear in mind that if you suddenly decide to change the styles of your buttons - you have to do it only one place - where you have declared the variables. With the right folder structure such change could be made in a few minutes:

![sass-file-structure](/images/sass-file-structure-904x1024.png)

Simply put, after the course it was clear to my why the future is definitely in SASS, so I will definitely look more into that as I progress in my development journey!

## Gem That Builds Websites Out of The Box: Jekyll

I picked up another technology this week - Jekyll. It's a ruby gem, that is designed to simplify static site generation. It is incredibly simple to install and use. A lot of developers are using it in combo with the Github Pages to host their blogs or portfolios. Check the first few results for a simple Google search:

![moving-to-jekyll](/images/moving-to-jekyll-898x1024.png)

I will definitely start doing my portfolio using it as I move closer to the end of the bootcamp program. And as an exercise will experiment with [Foundation](http://foundation.zurb.com/) instead of Bootstrap (just to get out of the comfort zone)

.If you haven't tried it - I encourage you to do so! If you are not sure where to start, here are couple of helpful links:

[Jekyll GitHub page](https://github.com/jekyll/jekyll)

[Jekyll Documentation](https://jekyllrb.com/)

[CodeCademy Jekyll course](https://www.codecademy.com/learn/deploy-a-website) (they teach you how to connect to GitHub pages too)

## Additional Bootcamp Quizzes and FreeCodeCamp Projects

As you know I am also going through the FCC lessons along the bootcamp, just to practice a bit more and solidify my knowledge. This week I have built a short Tribute page to [Ernest Shackleton](https://en.wikipedia.org/wiki/Ernest_Shackleton) - the explorer who was a living manifestation of heroism.

I also have additional quizzes on the Firehose Project which get unlocked after each module is completed. So I decided to do all of them in one go. Turned out I could use this Tribute page to pass both - FCC and the Quizzes, so I ended up with two different versions:

[CodePen Tribute Page (for FCC)](http://codepen.io/aleksgorbenko/pen/MeKzmo)

[Firehose Project Quiz](https://tribute-aleks-gorbenko.herokuapp.com/)

The latter one has additional functionality of commenting ad the task I had was to create a model of something and build an interface so that users can submit a model object to the database, so feel free to leave what you think of the page or the story!

Overall, I have found these quiz exercises useful as they make you do the thing that you learned in the previous model, but totally on your own.

Happy Coding!

My Journey at Firehose Project: 53.85%

[<< Week 6](http://localhost/firehose-project-week-6) === [Week 8 >>](http://localhost/firehose-project-week-8)
