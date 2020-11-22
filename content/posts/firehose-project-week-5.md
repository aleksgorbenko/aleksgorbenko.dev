---
title: "Firehose Project Week 5"
date: "2016-05-30"
description: "JavaScript is hard, dude."
---

This week I kept my main focus on JavaScript, although I did start the third application on the Firehose course - Flixter. It is not live yet and I will aim to complete it within the 2 - 2.5 weeks from now.

I went through a course of some new GitHub techniques like branching, stashing and merging as well as resolving the merge conflicts. At this stage while I am not in a dev team I don't really use them, but I am sure as my apps become more sophisticated, but most likely I will experience that when I start working on the team project after few more weeks.

## Re-fresh, Re-read, Re-watch, Re-peat

Author: Russian ProverbRepetition is the mother of all learning

I think FFC (FreeCodeCamp.com) is a great resource. A supplemental one. And I am thinking of getting *at least* Front-End Development Certificate. To claim it you have to complete a whole bunch of different projects and what could be a better practice that projects! Of course, other parts of the tutorials should be also completed so I went on and did the OOP track in FFC and all basic algorithm challenges.

When you already understand something or think that you understand (and you can never be wrong in thinking that there is still lots to learn from the craft, even if you are a known expert), it is always good to revisit ideas. It is like re-reading books or the notes that you have made while reading.

Author: Best readers are re-readers

Same goes for programming - and I am making this process part of my routine: re-watching some of the videos on programming and re-readding some of the articles. As you know I am also making notes on each application or project I am working on in OneNote.

For applications, I just list one by one the new things that I have learned, writing them in short paragraphs most of the time. If the concept is a bit complex - I write example code. So once in a while, I skim through the notes and refresh my memory. Here is an example of how it looks:

![one-note](/images/one-note.png)

On top of that, I also have a shared Google Doc with my mentor, which is already 28 pages long! Full of code samples, algorithm solutions, and explanations of various programming concepts! Both OneNoe and G-Doc are invaluable resources for my consistent learning.

Another benefit of OneNote - you can keep lots of different types of notes which keep synced across all devices. Mine are and I can always access them offline and read some notes when I commute. There is also no limit on how much I can upload. So if you haven't given a try yet and you like to keep all your records digital - I urge you to give it a go! Could be a game changer for you!

## JSON and AJAX

These were the three parts that left to be completed in the Firehose JS Deep Dive course and this week I got to try all 3 of them. I encountered some JSON before on FFC, but it was quite confusing. There are two challenges that have declared JSON object in two different ways. First and second. Notice how in object properties are written with quotes and in the second one - without. This made me think that there is **more than one** way of writing a JSON object. Well, it turned out it is not. [Official MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Object_literal_notation_vs_JSON) states:

The object literal notation is not the same as the **J**ava**S**cript **O**bject **N**otation ([JSON](https://developer.mozilla.org/en-US/docs/Glossary/JSON)). Although they look similar, there are differences between them:

- JSON permits _only_ property definition using`"property": value` syntax.  The property name must be double-quoted, and the definition cannot be a shorthand.
- In JSON the values can only be strings, numbers, arrays, `true`, `false`, `null`, or another (JSON) object.
- A function value (see "Methods" above) can not be assigned to a value in JSON.
- Objects like `Date` will be a string after `JSON.parse()`.
- `JSON.parse()` will reject computed property names and an error will be thrown.

Pay attention to the first two. Here is an example of what is wrong and right way of writing JSON object:

```javascript
//  WRONG WAY

var collection = {
    2548: {
      album: "Slippery When Wet",
      artist: "Bon Jovi",
      tracks: [
        "Let It Rock",
        "You Give Love a Bad Name"
      ]
    }
  };

// RIGHT WAY:

var collection = {
    "2548": {
      "album": "Slippery When Wet",
      "artist": "Bon Jovi",
      "tracks": [
        "Let It Rock",
        "You Give Love a Bad Name"
      ]
    }
  };
```

_Note: I hope FFC will fix it soon - I have created the [issue](https://github.com/FreeCodeCamp/FreeCodeCamp/issues/8955) on their GitHub, but so far I got no response. [Update] Seems like [it will be fixed soon](https://github.com/FreeCodeCamp/FreeCodeCamp/issues/8955#issuecomment-223791434)._

To sum it up JSON is an object container that gets transferred from between server and browser with the help of the AJAX request. JSON is a faster way to transfer data and easier than XML (which was previously used for these purposes). Both server and browser read JSON objects and converts to JS objects.

### AJAX

As seen in the previous sentence - AJAX is helping to transfer data between the server and the browser. The beauty of it - the browser doesn't need to be refreshed to send and receive data, hence the name - **A**synchronous **J**avaScript **a**nd **X**ML.  AJAX requests, just like HTML have types - GET, POST, etc. [I have listed them all in my first article.](/posts/firehose-project-week-1/) The difference is each type would have a separate URL for AJAX. The syntax is very simple:

```javascript
$.post('https://www.here-goes-the-url.com/and-full-uri', arguments)
```

Whatever is being contained in the arguments gets posted to the URL which would serve as a receiver of the data on the server. There is plenty of documentation on the [official jQuery site](https://api.jquery.com). Here are links for the most common - [GET](https://api.jquery.com/jquery.get/) and [POST](https://api.jquery.com/jquery.post/) methods.

## You Don't Know JavaScript Book Series

Or short - YDKJS. All 6 books from the series [are available for free on Github.](https://github.com/getify/You-Dont-Know-JS) This week I have finished the 1st of the series - [Up & Going.](https://github.com/getify/You-Dont-Know-JS/tree/master/up%20%26%20going) The first part "Into Programming" can be skipped, but if you JS is new to you - I would suggest to read it through, yes some bits will be very easy to grasp if you programmed before, nonetheless there will be good snippets that help you realise just how different JavaScript already is from other languages.

I will list here most of the notes that I have made from the first book. In the coming weeks of the course, I hope to finish a few more and will be posting some more notes as I progress.

### Notes From Up & Going

1. The first thing that surprised me is that fact that `null` is actually an object. If you run `typeOf null` you will get the result - `Object`. Apparently this bug was present from [the very first version of JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#null) and the amendment offer (to make `typeOf null ===` `'null'`) was even rejected in the ECMA2015 - most likely because too much of the web is built already around this bug. That is a good thing to know!
2. Properties of the object can be accessed via `Person.name` and `Person["name"]` notations.
3. There is Strict Mode in JS. If you type at the start of the file or individual function `"use strict";` - this mode will be enabled you will not be able to write incorrect JS code. For instance, variables are always declared with a keyword `var.` In the strict mode if you write `a = 2;` you will get an error, it should be `var a = 1;`. By the way, if you don't use Strict Mode and declare a variable without `var,` this variable will become global and all kind of bad things can happen out of that.
4. There is no Inheritance per se in JS, the mechanism is different here and is called Prototype. Every object in JS has its Prototype. Whenever you call a method on an object JS engine looks up the object's prototype first if these methods exist, if not it moves up the Prototype chain until it finds the sought method and executes it. Objects can have multiple Prototypes (I don't know how it works, it appears to be unnecessary actually), unlike in OO languages like Ruby it is a general convention that a Class should have one ancestor + the Inheritance tree shouldn't be more than 3 steps high. In JS it is not the case...
5. There is an error that is thrown when you try to call a method that is designed for numerics on a non-numeric object. It is `NaN`, which stand for `Not a Number`. It is the only object in JS that is not equal to itself: `NaN == !NaN` will return `true`.
6. Variable scope works strangely in JS. Every following function and method have access to all previous variables in the code but not the variables that are further down within the function. `ReferenceError` is thrown when you are trying to access such variable (out of scope).
7. Apparently, it is common to call a function before declaring it and writing the code that it executes. By convention, it is the other way around in Ruby.
8. There is so-called coercion in JS (sometimes called "evil coercion" - not without the reason, I tell you). It is a rule that gets applied when you are checking the equality of two objects (`==` or `===`). When you use `==` on objects that are of different types, both of them get converted to until they are both the same data type - only then the equality will be checked. This is the way such things came to existence: `[] == ![]` will return `true`. Try it yourself if you don't believe me. I think I have found out why it returns `true`, but this is probably a topic for a separate post.
9. There is a process called "transpilling" - conversion of newer ECMA standards into the old ones. It is important to understand these concepts because as web developers we need to know how to support older browsers. Transpilling is the bridge that will help us connect avantgarde JavaScript with it's older counterparts. I haven't used on yet, but apparently, the most common transpiler now is [Babel](http://babeljs.io/).

These were the parts that I found interesting, weird or entirely new for me. These are not all of course. If you touched upon JS before, you know about the closures. I haven't mentioned them - well because I don't understand them :) Yet...

## Summary

It does get easier. A little. It feels that right now I am quite comfortable with Rails and some of the gems that I have used. With the basic knowledge of Javascript, I can understand now quite a bit in an application. That is not to say that I can build one easily. I think I can - but it will require a substantial effort (Googling) at this stage.

I think the basics now seem to be hammered in my head and with the further stages of Flixter, the complexity will increase once again and take me out of the comfort zone. Oh and well - of course, there are algorithm challenges to be solved...CodeWars and FFC Intermediate Algorithms await me.

Apart from coding, the time this week was also invested in one other area. I study stock markets (beginner really) and I am a member of a financial club, here in London. In case you are into this as well and just beginning - I highly recommend a book called [The Naked Trader](https://www.amazon.co.uk/Naked-Trader-Anyone-Trading-Shares/dp/0857194135/ref=dp_ob_title_bk) by Robert Burns (he is British though and talks about local UK markets).

Happy Coding!

My Journey at Firehose Project: 38.46%

[<< Week 4](/posts/firehose-project-week-4) === [Week 6 >>](/posts/firehose-project-week-6)
