---
title: "Firehose Project Week 4"
date: "2016-05-23"
tags: ["coding_bootcamp"]
categories: ["cat"]
description: "Lo and Behold - JavaScript."
---

This week I got the first taste of JavaScript language and pretty much the whole week was spent in it. I barely touched Ruby or Rails. While I have worked with JS before a little as I watching Lynda.com's Programming Fundamentals course, it was not until now that I have tried to solve challenges with it and not following the tutorials.

This week I mainly was jumping around between three learning resources for JS: Firehose JS Deep Dive, FreeCodeCamp and an app - [SoloLearn](http://www.sololearn.com/).

## Enter The JavaScript

FFC is based mostly on JavsScript in general so I thought it would be a great start to go through everything that is there. They have a track which is said to take about 10 hours, but actually, you can complete it in half of that time. I then went on to complete the Firehose JS Deep Dive. I did not go through it all this week. There are a few more lessons left that are covering AJAX requests and how to make these. Luckily FFC also has a special section on it so I will complete them side by side later. Finally, SoloLearn - it's an app for iOS and Android, it has short intro courses on quite a few languages such as Python, Swift, PHP and...JS of course. I think it provided a useful exercise while I was commuting this week, but not more. Actually, it made some of the things a bit confusing. For instance, it teaches you that a Method and a Function are two different things in JS. Yes, while there is a slight difference between then, programmers are using these terms interchangeably, but the app explicitly explains it:

"A Javascript function is a block of code designed to perform a particular task". Ok here it is - a function that just pops an alert in the browser:

```javascript
function hello(name) {
  alert("May the Force be with you " + name "!");
}

hello("Aleks");  //alerts "May th Force be with you Aleks!"
```

Pretty straightforward, right?

What about the method? The app has a "little" more complicated definition (bear in mind - this app is for complete beginners).

"A function is a standalone unit of statements; a method is attached to an object and can be referenced using `this` keyword. Within a function, `this` is used to access object methods, as well as the properties of the object that invokes the method". If you understand it - great! If you found this bit confusing "a method is attached to an object and can be referenced using `this` keyword. Within a function, `this` is used to access object methods" I found a simpler explanation. It is best to show with an example.

```javascript
function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}

var myDog = new Dog("Leo", "Puddle"); // creates an object "Leo" and assignes it to variable

myDog.name; // returns "Leo"
// .name is a method to access the property "name" of the object
```

`function Dog(name, breed)` - is called constructor function, which is used to create a template for an object. You can think of it as sort of a class in JS (strictly speaking it isn't and shouldn't be treated as one, but it makes it easier to understand to start with).

`.name` and `.breed` - are both methods of the object. There is no function in this code (as in the function like in the first example).

If you really want to go deeper - here is a page that explains all these subtle [differences between functions, methods, subroutines and procedures](http://programmers.stackexchange.com/questions/20909/method-vs-function-vs-procedure).

Ok, this is just a definition fight you might say, but I think it does get people confused. I asked what's the difference between method and function during the weekly office hours, and even the mentor's response was "well there is none really", he was surprised that I said that this app says otherwise too.

That being said JS is a powerful language it seems, but it does have the bad parts as there got to be a reason, why there is a book called [JavaScript: The Good Parts](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) exists...

## Database Merge

Another cool thing I discovered this week is a DB merge method. It is native to Rails though and works through ActiveRecord and I am not sure how it works in other frameworks, but the idea is very simple. Here is a controller from an application:

```ruby
class CommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @place = Place.find(params[:place_id])
    @place.comments.create(comment_params.merge(user: current_user)) ### This Line!
    redirect_to place_path(@place)
  end

  private

  def comment_params
    params.require(:comment).permit(:message, :rating)
  end
end
```

I marked a line that has the merge command with `###`. Here is how it works. We are going to create an object `Comment` and store it in the database. Before creating it we need to validate it - comment_params method. It makes sure that the two values of Message and Rating parameters are not empty. These values will be the ones to be saved in the database. But before saving them we need to attach a `current_user` to it so we know who left the comment. This is where the merge command comes in. Effectively, it pushes one more parameter into the `comment_params`.

If we would send the command to the database without the merge, it would look like this:

```ruby
@place.comments.create(comment_params)
# would call a command Comment.create(message: 'some message', rating: 'some rating')

After merge:

@place.comments.create(comment_params.merge(user: current_user))
# calls Comment.create(message: 'some message', rating: 'some rating', user: <User1#>)
```

## Style Guides

I was wondering before how companies that have teams of developers make sure that the code style is consistent? Simple things as indentation, using tabs vs spaces etc. Turns out the answer is very simple - Style Guide. I guess most of the tech companies have them, those who don't might be using guides made by other companies, and I hope there are no companies that DON'T use these. It is very easy to appreciate them because if all teams follow the same set of styling rules, the code will look like it was written by a single entity. Here are a couple of examples of style guides.

[AirBnB Ruby Style Guide](https://github.com/airbnb/ruby)

[GitHub Ruby Guide](https://github.com/styleguide/ruby)

The differences are minimal, so either of them will be a great standard to stick with. I went with AirBnB as was advised by my mentor.

## Chrome Dev Tools Trick

Sometimes Heroku gives you this error:

![heroku-error](/images/heroku-error.png)

Right...helpful...let's see the error log...

```bash
Started DELETE "/places/11" for 90.200.44.195 at 2016-05-15 15:18:57 +0000
Started DELETE "/places/11" for 90.200.44.195 at 2016-05-15 15:18:57 +0000
Processing by PlacesController#destroy as HTML
Processing by PlacesController#destroy as HTML
  Parameters: {"authenticity_token"=>"kXGXYbArNAbptPH/NQwlAmBnx5JUsqB+1SIpzU9SSeY=", "id"=>"11"}
  Parameters: {"authenticity_token"=>"kXGXYbArNAbptPH/NQwlAmBnx5JUsqB+1SIpzU9SSeY=", "id"=>"11"}
Completed 500 Internal Server Error in 40ms
Completed 500 Internal Server Error in 40ms
NoMethodError (undefined method `name' for nil:NilClass):
  app/controllers/places_controller.rb:66:in `destroy'
NoMethodError (undefined method `name' for nil:NilClass):
  app/controllers/places_controller.rb:66:in `destroy'
```

So we know the mistake is on line 66 in "destroy" method, and there is an undefined method "name" that is being called on a NilClass. Sounds very helpful, let's have a look at our method:

```ruby
  def destroy
    @place = Place.find(params[:id])
      if @place.user != current_user
        return render text: "Not Allowed", status: :forbidden
      end

    @place.destroy # line 66
    redirect_to root_path
end
```

Hm...where is the "name" method called on a `NilClass`? There is none, ok but we know that somehow the whole "destroy" method failed to execute.

So I will share a useful way that my mentor showed me this week on how to get some more info to nail down the bug if you have these weird error messages that either don't make sense or just not giving you enough info. First - you open your app on Heroku server and navigate to the page 1 step before this vague error occurs. Open Chrome Dev Tools (Cmd+Option+I on a Mac), go to the Network tab and check the box "Preserve log":

![google-chrome-developer-tools-network](/images/google-chrome-developer-tools-network.png)

Refresh the page - you will get a long list of all files that are being loaded on the page. Scroll to the very top and open up the first file - it is normally the HTML header that is being loaded. There you could make sure that the server is getting the right HTTP type of request. in our case, it should be **DELETE**.

![http-header](/images/http-header.png)

So we have the right method...but it still doesn't work (Yes, I know that in the top part of the header I have a POST method - I have the same when I run a server on my local machine and it works like a charm). At this point - not me, neither my mentor were sure how to proceed. I have also got a feedback that the error is most likely due to some Gem incompatibility error or Heroku as the code itself is all correct. Sorry to disappoint if you expected a solution (damn, me too actually!), but my main point here was to show an additional way how to analyse errors when you are stuck and I hope you will find it handy when weird errors pop on your screen.

## Summary

They say 80% of the impression is made within the first 3 seconds. Perhaps it is true to say of a language - a couple of hours will get you a first impression. My first impression of JavaScript - I don't like it. Coming from a language like Ruby - many things don't really make sense. But once again - it is just a start and I hope soon enough I will know enough to appreciate the language more.

I keep learning new things about databases and I start thinking that actually knowing how to work with it properly and effectively (sending as few requests as possible while getting all the data you need) is a very powerful skill. Moreover, if you think about it -  applications without the data, or without the correct data are worthless. Corrupted data is worthless. Therefore taking a separate course on database management could prove very useful in the future. This is just an idea at this stage, but I will definitely revisit it once I am done with the Firehose Project.

Keep your code consistent at all times - style guides are there well, to guide you.

Knowing how to analyse errors is one of the most valuable skills a programmer can have - learn as many tactics of approaching error as you can.

Happy Coding!

My Journey at Firehose Project: 30.78%

[<< Week 3](/posts/firehose-project-week-3) === [Week 5 >>](/posts/firehose-project-week-5)

P.S my weekly articles are getting longer because there are more things to write about as the course progresses, and this one probably contained 60% of things that I wanted to write about. Initially, I decided to keep articles at around 1000 words, this one just to its 1800th. In future, I will aim to cut down and keep the volume within 1200 words. Parts that won't be covered could subjects for separate posts in the future.
