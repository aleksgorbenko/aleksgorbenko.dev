---
title: "Firehose Project Week 9"
date: "2016-06-27"
description: "More JavaScript and my first todo app."
---

This week my single attention was devoted to JavaScript. I have managed to do quite a few things and can definitely say that I am feeling more confident. Firstly I have built another app - [ToDo](https://todo-aleks-gorbenko.herokuapp.com/) with Rails and jQuery. Many things were not exactly clear to me while I was writing code, so I decided to start over and found some additional sources to learn JS.

I came across [WatchAndCode.com](https://watchandcode.com/), made by Gordon Zhu, ex-Googler. The course is totally free and it is not yet finished, he is releasing modules every week. Funny enough the app that you build as you go along is the...Todo app :) The only difference is that he uses only JS, no other frameworks or languages. The first 40% I could easily skip, but everything that came after I found incredibly useful. Moreover, I started getting jQuery concepts that were eluding me before. I understood finally the difference between the Event Listeners and Event Handlers. I have learned what is a Callback and Higher Order Function. Gordon has a very rare skill of explaining things simply so if you think you are "not getting" - try [his course](https://watchandcode.com/).

## Second Book of YDKJS Series: Scope and Closures

I must confess...I was expecting that these books will really clarify many things that are happening in JavaScript. And as far as I understood, they were targeted at the beginners. While, of course, I expected a steep learning curve (the books are advertised as going deep into how JS works under the hood), I did not foresee bad writing. And as much as people are praising the book series - I personally found the explanations be unnecessarily overcomplicated and structure somewhat illogical. The first book in the series "Up and Going" was better put together and made more sense. But the second one makes you feel lost.

New terms like callbacks and closures are introduced almost at the beginning (with the promise that closures will be covered in Chapter 5, yes there was no definition of a callback in this entire book). Well, that seems fine on its own - the author is just preparing you what to expect in chapter 5.

**BUT WHY** does the author shows code examples and call things **"callbacks"** and **"closures"** if the reader does not have a clue what they mean? **WHY** there are code examples in jQuery, if this framework wasn't even introduced before? (I got these examples as I was exposed to jQuery, but what about the readers who didn't?). And simply the writing style and the code examples are often really hard to grasp. It could be totally me being stupid here and just not understanding obvious things, but please dear reader, consider the following:

```javascript
for (var i=1; i<=5; i++) {
    setTimeout( function timer(){
        console.log( i );
    }, i*1000 );
}
```

Author: The spirit of this code snippet is that we would normally expect for the behavior to be that the numbers "1", "2", .. "5" would be printed out, one at a time, one per second, respectively.

In fact, if you run this code, you get "6" printed out 5 times, at the one-second intervals.

Huh?

Firstly, let's explain where `6` comes from. The terminating condition of the loop is when `i` is not `<=5`. The first time that's the case is when `i` is `6`. So, the output is reflecting the final value of the `i` after the loop terminates.

This actually seems obvious on second glance. The timeout function callbacks are all running well after the completion of the loop. In fact, as timers go, even if it was `setTimeout(.., 0)` on each iteration, all those function callbacks would still run strictly after the completion of the loop, and thus print 6 each time.

But there's a deeper question at play here. What's missing from our code to actually have it behave as we semantically have implied?

What's missing is that we are trying to imply that each iteration of the loop "captures" its own copy of i, at the time of the iteration. But, the way scope works, all 5 of those functions, though they are defined separately in each loop iteration, all are closed over the same shared global scope, which has, in fact, only one i in it.

Put that way, of course, all functions share a reference to the same `i`. Something about the loop structure tends to confuse us into thinking there's something else more sophisticated at work. There is not. There's no difference than if each of the 5 timeout callbacks were just declared one right after the other, with no loop at all.

I don't know about you, but I have had a hard time grasping what he means...so for now, I will use other sources of JS learning such as [PluralSight](https://app.pluralsight.com/).

These books will probably make more sense to me in the future when I will have a more solid grasp on the language. So here are my two cents - **don't start reading YDKJS if you are a beginner**, it is highly likely they will make you more confused than before.

After the book I started with the online video courses - this week I have finished 3 JavaScript intro lessons on PluralSight. The majority of the things I knew already so I skipped quite a lot, but nonetheless, it was a good watch. And actually, the only reason I did them is simply due to my test result on the [JS path page on PluralSlight](https://app.pluralsight.com/paths/skills/javascript):

![pluralsight-javascript-test](/images/pluralsight-javascript-test-1024x549.png)Author:

Next week I aim to go for some jQuery and get my head around the Prototypical Inheritance as well as `this` keyword.

Oh yeah...if you wondered how to make the code from the book work, after 2 more convoluted examples of how would you need to make a closure function around the setTimeout and make IIFE (Immediately Invoked Function Expression), author finally shows the right way (_note: that works with ES6 only_):

```javascript
for (let i=1; i<=5; i++) { // change "var" for "let"
    setTimeout( function timer(){
        console.log( i );
    }, i*1000 );
}
```

Keyword `let` will create a local scope for the inner loop and it will work as it is supposed to work in the first place.

## Agile Team Project

One of the reasons I have joined Firehose Project is this Agile Team Project. We were supposed to have the kick-off session last week, but due to a minor "hiccup", we had to re-schedule it for this week.

We are a team of 5 and we are going to build an interactive Chess app. One of the Firehose mentors will be our team leader, who will be guiding us through the whole process and hold us accountable with the weekly stand-up session. It will be similar to how SCRUM meeting works - each of the team members will tell what he has worked on the previous week and what he is planning to do this week and if there has been anything that blocked the progress. To manage the process we will use Trello combined with the KanBan. One of our team members is also taking a course on the Product Management, so he will take the role of managing the Trello board.

So for the first week, our main tasks are:

1. **Setup the development pipeline, GitHub, Heroku.**
2. **Setup continuous development and integration using TravisCI or CodeShip (by the way, this is my task, I have never done it before, so I volunteered to that. It would be great to start stretching myself straight from the beginning of the project)**
3. **Wireframing (we all agreed that whoever wants to participate can contribute Balsamiq mock-ups, I will be doing that definitely).**
4. **Build a database model.**
5. **Install some basic frameworks and Ruby gems (Bootstrap, Foundation or Bourbon/Neat).**
6. **Few other optional tasks if we get the time.**

Doesn't seem to be a lot for the kick-off, but we all now the amount will increase exponentially as we go into the following weeks. By the way, it turns out the project will take about 8 weeks in total, which will be way after my graduation date (25th July), but of course, I will keep working on the project up until the end. Chances are, I will get the job before finishing the project.

Another good thing is that our team is partially distributed - which will give each member a good feel of how to work on a team which has teammates separated with the ocean. I am based in London, other guys are based in Salamis (remember [300: Rise of The Empire](http://www.imdb.com/title/tt1253863/)?), Greece, two guys in USA: New York, and Pittsburgh. The last member of the team is based in Canada: Golden, British Columbia. It is incredible to see how different are our backgrounds (attorneys, climbing safety instructors, mechanical engineers), but I guess that is often the case with the people who attend a bootcamp.

All in all, the start of the project was exciting and there is hell a lot of the work ahead for us!

P.S this week has not gone without Sci-Fi, so two more books are read, both belong to the so-called [hard science fiction](https://en.wikipedia.org/wiki/Hard_science_fiction) genre (really technical): [Contact](https://www.amazon.com/Contact-Carl-Sagan/dp/0780778979/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=1467130444&sr=8-8) by Carl Sagan and [The Martain](https://www.amazon.com/Martian-Andy-Weir/dp/0553418025/ref=sr_1_2?ie=UTF8&qid=1467130393&sr=8-2&keywords=martian) by Andy Weir. Both are totally awesome!

Happy Coding!

My Journey at Firehose Project: 69.23%

[<< Week 8](http://localhost/firehose-project-week-8) === [Week 10 >>](http://localhost/firehose-project-week-10)
