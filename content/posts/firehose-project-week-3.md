---
title: "Firehose Project Week 3"
date: "2016-05-16"
---

This week I have finished the [Nomster](https://nomster-aleks-gorbenko.herokuapp.com) application that [I have started the previous week](http://localhost/firehose-project-week-2/), but before I go into that I will cover the most significant lesson that I have learned in the past week...

## Don't Overload Yourself

Lots of boot camps have a crazy schedule where you are studying for 10-12 hours a day 5-6 days a week. I thought that this is the way to succeed so I have tried to recreate the same atmosphere for myself at home while studying online. I don't have the peer pressure as well as I don't have others to rely upon in case I am really stuck (of course, there is the Slack channel, but it's a different sort of help from the one that you can get from another student who sits right next to you at the desk), so I was aware that I will have to push myself a lot. So I did. It worked out at the start, but this week I had to pay for it.

Last Friday I woke up, did my morning routine, had a breakfast and started studying. Not an hour had passed as I felt a heavy pulsing pain in my head. I thought "just a headache", took a tablet and kept working. Normally such tablets take the pain away within 10 minutes, but...not this time. After another hour pain has doubled (in the following days I had nosebleed). At this stage, I knew it was not "just a headache"...

### Yes... We All Have Different Limits

Of course, it varies from person to person, but I have it when I overload myself. It happened a few times in my life and almost all in the institute. That is not to say that I have "over-studied", but rather overloaded myself with information that needs conscious brain-processing power. And that could be anything - a mixture of university study for several hours + some online courses on how to use Photoshop + a couple of hours of spiritual book reading + a short documentary and 3x TED videos with note-taking. If you do all in one day without many breaks, you can do it for a couple of days, yes, but...weeks - no, not really. And that was my mistake. I thought "in-person-boot-camp" mode is the way to go, but not only I found myself wrong, I also have realised that all the boot camps that are based on this model of studying 60+ hour per week are doing more harm to the people than good.

### Studying 8+ Hours A Day Is NOT A Good Option

Studying for more than 8 hours a day (in total) is not beneficial simply because it is very hard to retain that much information especially when most of what you are trying to comprehend is new to you. And as easy as I write about this now, as easy I forgot about this rule in the past weeks and got myself into a state where I practically cannot walk without having this pulsing pain in my head. I had to wait for 3 days and do no "heavy-load" brain tasks for the whole duration of it, so I decided to stay away from coding and studying entirely while I was recovering.

### To Recover, I Just Did "Nothing"

Science Fiction is the world that I like to escape sometimes when I get a chance, so that's exactly what I was mainly doing for these 3 days. I have read ["1984" by George Orwel](http://www.amazon.com/Animal-Farm-1984-George-Orwell/dp/0151010269?ie=UTF8&keywords=1984&qid=1463660868&ref_=sr_1_2&sr=8-2)l and started to re-watch Episodes I - VI of Star Wars. That was my mode: lots of strong black tea with honey and lemon, Star Wars and 1984, good regular food and of course, lots of sleep. It helped, the pain just naturally faded away after time and I am not repeating the same mistake again.

### Moving Forward

Today, I have introduced several new rules and routines to my day:

1. **Taking a 10-minute break every hour (setting the timer) and 1-hour break after 4 hours of study**
2. **Having a 30 min walk in the evening after I have finished studying**
3. **Use different types of study materials during the day: coding, theory reading, videos, and note taking**
4. **Not coding before the bedtime**

For now, it is based on some replies by people on [forums](http://forums.studentdoctor.net/threads/tips-for-studying-for-long-periods-of-time.762218/), [question boards](http://productivity.stackexchange.com/questions/5113/how-to-study-long-hours-without-being-burnt-out-or-getting-bored), and other [blog posts](https://www.examtime.com/blog/study-hacks/). With these, I hope to avoid any possibility of having this "overloads" in the future. But I am planning to watch the [short course on productivity for developers](https://app.pluralsight.com/library/courses/productivity-tips-busy-tech-professional/table-of-contents) on PlularSight.com.

**Tip:** Follow [this guide](https://absolute-sharepoint.com/2015/12/free-pluralsight-6-month-subscription.html) to get a free 6-month subscription for PlularSight.com (Normally it would cost you $300 a year).

## Finishing The Nomster App

Due to this headache I wasn't able to do as much as I planned to do, nonetheless, I have completed a good chunk of work. Firstly, I have finished the Nomster app and [it is live now](https://nomster-aleks-gorbenko.herokuapp.com). There 2 main features left for me to complete: ability to upload photos to the places and having an email notification system that shoots you the email every time somebody leaves the comment on the place that you have created.

The most challenging one by far was the photo part. It was entirely a self-directed lesson. The only tip that was given is the Gem that could be used to complete the feature - [Carriewave](https://github.com/carrierwaveuploader/carrierwave). I spent an entire day doing this. If you follow the documentation of the Gem, the installation is pretty easy. The photos had to be uploaded to the Amazon Web Services, this part was guided so you are shown how to create a bucket where the photos will be eventually uploaded. The API keys for AWS should be stored a special file created by another Gem - Figaro (I talked about it last week). So far, so good, but here is where I have made another mistake. I have created DB migration and added two columns "Photo" and "Caption" to the "Places" table. To me it perfectly made sense - there is a place and the place will have photos, each photo will have a caption. All good. If you are familiar with main concepts of databases, you have probably noticed already where my thinking is wrong.

Each cell in any table of the database should have **ONLY ONE** value. In my case, if I uploaded more than 1 photo and 1 caption, the database would be confused. So what I needed to do instead is to create a new Table, call it "Photos" and have "Picture", "Caption" and (the most important one) "Place ID" columns. "Place ID" in this case is something known as **FOREIGN KEY**.

Each Place in the Places table would have it's unique ID, which is a ****PRIMARY KEY**** in this case. In my example, each Place has many Photos, so that creates a **"one-to-many" relationship**. So the "Place ID" in the Photos table is a **FOREIGN KEY**  refers to the **PRIMARY KEY** in Places table. Hence, each photo is associated with the correct place. Here is a simple illustration of how Primary Key and Foreign Key look like in the database:

![primary key and foreign key examples](/images/primary-key-and-foreign-key-examples-1024x661.png)

Even when I completed the photo uploading feature I did not quite understand why I had to create the new table. And only after watching [Foundations of Programming: Databases](http://www.lynda.com/Access-tutorials/Foundations-Programming-Databases/412845-2.html) I have finally realised why it had to be set up in such as way (screenshot above is taken from that course). As a side note - I highly recommend [Foundations of Programming series on Lynda.com](http://lynda.com). The courses helped me a lot to cement the programming concepts such as Databases, Data Structures, Big-O Notation and others.

**Tip:** If you sign up for 30-Day LinkedIn Premium you are getting 30 days with Lynda.com too instead of the usual 10-Day Trail that they offer on their site. ([Lynda.com was acquired by LinkedIn in 2015](http://www.recode.net/2015/4/9/11561324/three-reasons-linkedin-broke-the-bank-for-lynda-com)).

This week I have also completed RubyKaons tasks. Firstly it was a great refresher of some of the things that I already know and secondly - I have learned much more about the structure of the language itself. I highly recommend going through it after you got some basic Ruby skills as Koans will cement this knowledge well. Besides, it will always remain a good reference for the future.

If you are stuck with any of them - feel free to check my [RubyKoans solutions on GitHub](https://github.com/aleksgorbenko/ruby_koans).

## Second Mentor Session

This session I have predominantly dedicated to the understanding of the RoR application main concepts and its folder structure. Here is quick resume about the different folder in the RoR app:

**environment** folder - runs depending on the environment the app is currently in production, development or test. For instance, when you push your app to Heroku, the following line is executed on the server:

```bash
$ export RAILS_ENV=production
```

That makes the code in the environment/production.rb file to get executed.

**initializers** folder - the files are executed after the app starts and launches all Gems. The folder has the configs for all 3rd party Gems that are used in an application. Some Gems will create the config file automatically, some will ask for manual creation - for each Gem it is best to check their documentation on GitHub.

**Active Record** - is an ORM, which stands for Object-Relational Mapping. It is a way how RoR is communicating with the Database. Instead of using SQL to communicate with the database you are using Ruby code, predefined by the Rails to read, edit and write data to the tables.

**ActioView** - is responsible for generating the "View" (as in MVC) and sending it back to the Controller which will send it to the user browser.

**ActionMailer** - is responsible for all email sending features.

Don't be confused by the "Active" names - all three are just separate components of Rails that you are using depending on your needs. It is not like anything that is with the prefix "Action" is a separate app. Just remember what each of these components is responsible for and read up the [Rails documentation](http://guides.rubyonrails.org/) when you need to do something particular.

## Summary

When you lose the track of time while doing something and can spend whole days in it - remember that it is not a good habit to actually do that. Your body sooner or later will let you know that something is wrong so it is better to set rational boundaries on how much time you spend doing your "something". And please take breaks, always take breaks.

Second - learn fundamentals. Just knowing the **HOW TO BUILD** the Rails app (or any app, using any other technology), is not enough, it will merely make you a coder. What you want to be aiming for is to become a [self-sufficient developer](http://blog.thefirehoseproject.com/posts/learn-to-code-and-be-self-reliant/). For that, you need to grasp the **WHY** the language, framework or app works the way it works.

Happy Coding!

My Journey at Firehose Project: 23.08

[<< Week 2](http://localhost/firehose-project-week-2/) === [Week 4 >>](http://localhost/firehose-project-week-4/)
