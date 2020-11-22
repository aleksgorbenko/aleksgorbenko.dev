---
title: "Firehose Project Week 6"
date: "2016-06-06"
description: "More work on the third project."
tags: ["coding_bootcamp"]
---

I made some more progress with the 3rd project - [Flixter](http://flixter-aleks-gorbenko.herokuapp.com/) app _(Update 09.06.16: it is now finished)._ I deviated a bit from the original design just to experiment a bit more with Bootstrap and practice design skills in general, so I spent longer time playing with these things this week. Apart from that following the tradition I made a ton of mistakes and spent lots of time for solving them :)

## Short Intro to SASS

This week I have also touched upon SASS for the first time. SASS stands for Synthetically Awesome Style Sheets and it is a Pre-compiler of CSS. When it is installed in your app (as a gem if you are using Rails), it will compile the `.scss` file (that's the SASS file extension) into `.css` and then serve it to the browser, which in turn will render it on the page. Browsers cannot interpret .scss files. SASS really makes it easier to write your CSS and expands the functionality. So far I just used one of its functions - variables. Works pretty straightforward - you name the variable in your file starting with the `$` and then assign a value to that. Now you can use this variable anywhere in your file. For instance, let's set a couple variable:

```css
$navbar-height: 150px;
$mobile-navbar-height: 250px;
```

Then we could use them in media queries:

```css
.navbar {
  height: $navbar-height;
}

@media (max-width: 750px) {
  .navbar {
    height: $mobile-navbar-height;
  }
```

So to call the variables you also write them with the `$` sign. This is the only feature I have used, but one could immediately appreciate how much it could simplify writing the style sheets. With variables, you can set the value once and if you ever need to change it - there is only one place you need to do that. That makes your code DRY as well as maintainable. I will study SASS in more depth in the future - seems like [CodeCademy got a new course on it](https://www.codecademy.com/learn/learn-sass). Overall it seems that people are moving away from other popular pre-compiler LESS in favor of SASS. [Here](http://www.hongkiat.com/blog/sass-vs-less/) and [here](http://www.zingdesign.com/less-vs-sass-its-time-to-switch-to-sass/) are two comparisons which both conclude that SASS is generally better. Moreover, Bootstrap 4 is officially [moving from to LESS to SASS too](http://blog.getbootstrap.com/2015/08/19/bootstrap-4-alpha/), though it is still in Alpha. Anyway, just that makes learning SASS now even more valuable.

## A Few Good Mistakes I Have Learned From This Week

### The Sequence of Gem Installation Matters: a Case of devise and simple_form

Some gems integrate with one another, some are dependent on one another. While that sounds logical on its own, whether they **WILL** integrate with one another depends if you install them in a right sequence. While building Flixter I installed devise gem before the `simple_form`. `Devise` is responsible for user registration and logins, it creates lots of files during installation, sets the routes for you in the `routes.`rb file and...yes - creates the forms. **BUT** if it sees that the simple_form is absent, it will just fallback on default form styles. Even if you install simple_form **AFTER** - it won't work, the forms still will be broken. The solution is very simple, though - re-run the `devise` installation **AFTER** you have installed the `simple_form`. Just run:

`$ rails generate devise:views`

_Note: run the command without `$`. The `$`_ symbol _just indicates a command line prompt that is ready for the input._

If asked about the file conflicts - press `Y` and agree to overwrite them. That's all. If you run into more issues, check this [official simple_form post on GitHub](https://github.com/plataformatec/simple_form/wiki/Simple-Form-with-Devise).

### Be Careful With Authentications in ApplicationController

Devise gem by default gives you a method - `before_action :authenticate_user!`. It is very handy in controllers - if you are in a controller that is responsible for the actions of users who are logged in - just stick this line at the top and that's it. But don't do what I did by mistake - put it the `ApplicationController`, it is the main controller from which all other controllers inherit. If you put this authentication there users would have to be signed in to perform ANY action or click. So yeah - you can imagine me clicking on "Sign Up" button and seeing an error "You have to be signed in to perform this action" :) Speaking of devise - they have a handy default notifications that yo can use out of the box - Alert and Notice, best used with Bootstrap:

```ruby
  <% if notice.present? %>
    <p class="alert alert-info text-center"><%= notice %>
      <button class="close" data-dismiss="alert">×</button>
    </p>
  <% end %>

  <% if alert.present? %>
    <p class="alert alert-danger text-center"><%= alert %>
      <button class="close" data-dismiss="alert">×</button>
    </p>
  <% end %>
```

And of course you can add your custom `flash` notices the same way:

```ruby
  <% if flash[:success] %>
    <p class="alert alert-success text-center"><%= flash[:success] %>
      <button class="close" data-dismiss="alert">×</button>
    </p>
  <% end %>
```

### Correcting data type of the values in database

Ok, I am used by now that I make mistakes in a place which takes the most time to fix afterward - databases. Ironically, it brings me really good learning material... I will start with advice - if you use PostGres as your database adapter - make sure you create fields with the correct data type. I know it sounds silly, but I created fields with `string` type instead of the `integer`. You might say that ActiveRecord command `change_column` `:table_name``,` `:column``,` `:data_type` in the migration file should do it, but because of the PostGres - it won't. For the following reason:

Author: PostGres Documentation v9.5when there is no implicit or assignment cast from old to new type, `SET DATA TYPE` might fail to convert the default even though a `USING` clause is supplied. In such cases, drop the default with `DROP DEFAULT`, perform the `ALTER TYPE`, and then use SET `DEFAULT` to add a suitable new default.

This means that in order to change the data type of the field we need to explicitly execute SQL command in the migration file. Here is what I have used and it worked pretty well:

```ruby
class ChangeDataTypeMigrationName < ActiveRecord::Migration
  def up
    execute 'ALTER TABLE table_name ALTER COLUMN column_1 TYPE integer USING (course_id::integer)'
    execute 'ALTER TABLE table_name ALTER COLUMN column_2 TYPE integer USING (user_id::integer)'
  end

  def down
    execute 'ALTER TABLE table_name ALTER COLUMN column_1 TYPE string USING (course_id::string)'
    execute 'ALTER TABLE table_name ALTER COLUMN column_2 TYPE string USING (user_id::string)'
  end
end
```

## Using helper_methods and Memoization in Controllers

Helper methods - are quite simple and incredibly useful. In your controller you declare `helper_methods :method_name`. By convention, you should declare that either right before writing the actual method or right after. I guess it depends on the style standard each company follows. I find it easier if they are before. After the declaration, this method becomes available for you to use directly in your view files.

Helper methods often work in tandem with something called Memoization. It is a way to optimise the query requests to your database by sending just one request and storing the resulting value instead of many requests querying the same value. As [this SOF post](http://stackoverflow.com/questions/1988804/what-is-memoization-and-how-can-i-use-it-in-python) mentions - "think of it as a cache for the method results". Consider the following:

```ruby
  helper_method :current_user
  def current_user
      @current_user ||= User.find(params[:user_id])
  end
```

In the example above we have a conditional assignment - `||=`. This means that if the @current_user variable has a value the new value WILL NOT be assigned, but if the variable is not assigned - the new value will be assigned. Hence, if we receive the request that should get us the same User multiple times, the query won't be executed as the instance variable already has the value. And as it is a helper_method - we can call it directly in our view. For instance:

```ruby
<p class="text-center">Hello <%= current_user.first_name %>! Welcome back!</p>
```

_Note: `helper_methods` will be available in your views even if they are listed below `private` keyword in your controller._

## Summary

Make mistakes, but don't make mistakes with database migrations :)

Secure your app and authenticate user actions, but make sure you authenticate them in the right places so you are not blocking some essential action that prevents your user to do anything else in your app.

Check ruby gems for the compatibility and also if they have any issues integrating with each other if installed in a particular sequence. The best way to check that is to scan through the "Issues" section of the GitHub page of the gem.

Happy Coding!

My Journey at Firehose Project: 46.15%

[<< Week 5](/posts/firehose-project-week-5) === [Week 7 >>](/posts/firehose-project-week-7)
