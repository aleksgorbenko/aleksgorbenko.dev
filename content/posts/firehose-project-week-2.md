---
title: "Firehose Project Week 2"
date: "2016-05-09"
description: "Application building foundations"
---

This week passed even faster than the previous one. I studied pretty much every day and learn new concept as well. The very basics of the application building were laid in the first week, now it was time to practice them and build upon more foundation.

I started off this week with building the 2nd application called Nomster - a review site. As students of Firehose Project, we are free to choose which type of places we want to review. It had to be a physical place as part fo the project is to use Google Maps API. As I am based in London and I am Russian, born in Latvia - I decided to make a review site Russian and Eastern European restaurants and food shops in London.

The app is much bigger than the first one that [I have built in my first week](http://localhost/firehose-project-week-1/). It has more features, such as registration, authentication, pagination, commenting, photo upload and email notifications. On top of that, there are now "Self-Directed" sections which I am supposed to figure out on my own and which were the best learning experiences this week. So far I have managed to finish the foundation of the app, play more with Bootstrap 3 and implement 4 features on top of the basic one which is to create a place:

1. Pagination with the help of the "will-paginate" gem
2. Commenting
3. Registration by using the "devise" gem
4. Authentication of user actions, such as place creation and editing
5. Google Map on the place page

None of the above I have done in the first app - [Splurty](http://splurty-aleks-gorbenko.herokuapp.com/).

## A Ruby Gem

Before these lessons my understand of the Ruby gem was somewhat vague. I just knew that a Gem is a small programme made for Rails and I have to download it with **bundle install**. I just followed the instructions and witnessed how the "magic happens" and the new functionality in the app appeared, new Ruby and Embedded Ruby files were created in several folders... The whole Gem business was confusing because there are so many of them, some have pretty straightforward names like "will-paginate" above, which naturally makes you think that this gem must have something to do with...pagination. Others...e.g - "figaro" - go figure!

I realised that if I am to move forward I need to know the basics of the app structure better. So why not to start from Gems? Simple Google search and I end up on [this StackOverFlow post.](http://stackoverflow.com/questions/14072880/whats-the-use-of-gemfile-in-rails) I have got to say that SOF is the source that I am finding myself using more and more - almost every problem can be found there along with the solution, sometimes ten different solutions.

So the gem is...

Author: Nick Ginanto, StackOverFlowDuring your development in Rails, there will be times where you will want to provide some functionality which is required by you, but either you don't know how to do or you don't want to implement it on your own since a lot of work has been put into its development by talented developers.

These developments which you might need (user authentication, message system, asset handlers, geolocation, pagination system, linking to exterior services such as Amazon AWS, and last but not least Rails itself) are called Ruby Gems. These are ruby software packages, not necessarily relating to Rails, but since Rails is based on Ruby, 98% of the gems can be made available to your Rails webapp code.

Great! Another thing that was confusing - how dow does come to use the gem correctly, do you have to know anything in advance? In short - no. Each gem is almost 100% to have documentation on GitHub, which will outline every step from installation to usage and customisation. Some gems have continuous support, some are updates not so frequently, but as a general rule keeping all the gems updated is a good practice, **except for the cases** where you are 100% sure that there is a conflict with other Gems/Rails/Ruby versions.

Here is the list of gems that I worked with so far and found them extremely helpful:

- [Figaro](https://github.com/laserlemon/figaro) - to manage your ENV (environmental) variables, such as API keys, or AWS access keys and other sensitive information that you don't want to accidentally upload to GitHub.
- [Geocoder](https://github.com/alexreisner/geocoder) - gem that helps you to convert the address to the latitude and longitude coordinates.
- [Simple_form](https://github.com/plataformatec/simple_form) - em...gem that makes form creations really simple...
- [Devise](https://github.com/plataformatec/devise) - a very useful gem to create the whole registration/authentication part of your app

## The First "Big" Bug

This week I have managed to plant a bug unintentionally, which took me some hours down the line to figure out where it was. But I was lucky to make this sort of bug because it made me understand databases and migrations much better. The nature of the bug is simple and awkward in some way.As not a native English speaker

As not a native English speaker, I was utterly convinced that "longitude" is actually spelled "longTitude", so I wrote exactly as I thought in the DB migration file and ran the `rake db:migrate` command. Well, it was quite a surprise to see an ActiveRecord Error page... saying undefined method "longtitude". From my perspective the spelling was right, so I was searching elsewhere for the mistake until I finally understood that I just misspelled the column name.

Problem was...I did 2 migrations by this time and thought that `rake db:rollback` can only be ran once. As it turns out, you can run this command as many times as you like, but if you want to go back several steps - it is also possible with another command: `rake db:rollback STEP=n`, where n is the number rollbacks you want to run.

So all I had to do - run 2-step rollback command then create a new migration file and type in the new column name as per [ActiveRecord Migrations documentation](http://guides.rubyonrails.org/active_record_migrations.html#using-the-change-method):

class FixColumnName < ActiveRecord::Migration
  def change
      rename_column :table_name, :old_column_name, :new_column_name
  end
end

Restart the server - and yes, I forget to do that sometimes too :)

Done, fixed and working. The map was showing as it was supposed to be on each place page.

## The First Mentor Session

At Firehose Project, right when you start the course you have to fill in a couple of questions that will help in a mentor-matching process. I got matched with the mentor who is based same as me in London (I personally think it's great that with Firehose mentors are basically all over the world and the time difference is never a problem). I won't go into too deep in what was the session like as it was the first session, hence for the most part it was an introduction talk. But I will share a few tips which helped me to make the session structured.

### Record Every Question You Have

As I was moving through the course I was making a note every time a question popped in my head. I use OneNote, so I keep now a separate page for each week. You might want to do it in a text file in the project folder or any other place. As long as you note them - you will be always prepared for a talk with your mentor. By the time of the first session, I had quite a few that I wanted to discuss.

### Create A Shared Google Doc File

This was actually suggested by my mentor and I found it very useful. Now we both just keep populating the file with our notes. But apart from using the file strictly in a Q/A format I wrote several things about myself:

1. Who am I and where I come from
2. My background and how did I end up in web development
3. Reasons for learning coding
4. Short-term and long-term goals

That created a great context for our conversation as my mentor was able to read it before the call and had a good idea of his student.

### Ask About The Job Market

If you are lucky to have a mentor based in the same location as you do - talk about the jobs and opportunities. The mentor surely knows (if he has been long enough in the game) what companies are around, entry levels, demands, salaries etc. Don't go into the details of the interview process because it's just too early and it's not the optimal to use mentor's time for this type of questions at this time. Rather get the overall feel of the market that you are about to enter in a few months time. This information helps to manage your own expectations and set the right goals from the very start.

## Summary

Apart from the new aspects of RoR that I have learned this week, the two key take-aways are:

- Don't make silly mistakes when migrating database
- Be prepares and organised before each mentor session

This marks the end of my 2nd week at Firehose Project.

Happy Coding!

My Journey at Firehose Project: 15.38%

[<< Week 1](http://localhost/firehose-project-week-1/) === [Week 3 >>](http://localhost/firehose-project-week-3/)
