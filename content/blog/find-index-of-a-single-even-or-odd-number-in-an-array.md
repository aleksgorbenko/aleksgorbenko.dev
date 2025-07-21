---
title: "Finding The Index of a Single Even or Odd Number in An Array"
date: "2016-04-22"
coverImage: "karate.jpg"
description: "Solving Katas."
tags: ["ruby"]
---

[CodeWars](http://www.codewars.com/) is a really great place to practice your coding skills by solving different problems of increasing complexity. I just recently started to play around there and find it really challenging, but at the same time, you get to learn a lot.

So before we carry on, a quick reference to what is Kata:

Author: WikipediaKata (型 or 形 literally: "form"?), a Japanese word, are detailed choreographed patterns of movements practised either solo or in pairs. The term form is used for the corresponding concept in non-Japanese martial arts in general.

Dave Thomas, who is the co-author of the one of the classic books on programming [Pragmatic Programmer](http://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X) has introduced the term Kata to the programming world. He developed a series of 21 exercises called Kata which present different coding challenges. The reason behind its creation is to practice code and try to solve the same problem in new languages that you are learning right now or use the same language but different method.

Effectively it is a form of coding practice.

To find out more about Dave himself and how he came up with Katas, check [this](http://www.codenewbie.org/podcast/the-pragmatic-programmer-i) and [this](http://www.codenewbie.org/podcast/the-pragmatic-programmer-part-ii) podcast by CoderNewbie. Overall [CoderNewbie](http://www.codenewbie.org/) is a great podcast if you are looking for some inspiration, as it has many stories of people from random walks of life turning themselves into web-developers. Apart from that, they have also a couple of interview with seasoned experts such as Sandi Metz, the author of [Practical Object-Oriented Design in Ruby: An Agile Primer](https://www.amazon.co.uk/Practical-Object-Oriented-Design-Ruby-Addison-Wesley/dp/0321721330).

Back to CodeWars. Each challenge has a complexity level graded in "Kyū". There are 8 in total, going in descending order. So Kyū 8are challenges for the beginners while Kyū 1 tasks are quite advanced. So far I have been playing around with Kyū 8 and occasionally Kyū 7... but today I finally solved Kyū 6! While objectively it is not a huge achievement, feeling this incremental accomplishment was quite amazing when I saw all 10 tests turn green.

## The Task

Bob is preparing to pass IQ test. The most frequent task in this test is to find out which one of the given numbers differs from the others. Bob observed that one number usually differs from the others in **evenness**. Help Bob — to check his answers, he needs a program that among the given numbers finds one that is different in evenness, and return a position of this number.

Keep in mind that your task is to help Bob solve a `real IQ test`, which means indexes of the elements start from `(not 0)`

### Examples

```ruby
iq_test("2 4 7 8 10") => 3 # Third number is odd, while the rest of the numbers are even

iq_test("1 2 1 1") => 2 # Second number is even, while the rest of the numbers are odd
```

## My Solution

First, we split the string and use `space` as a separator. `#split` automatically gives us an array of strings. We then convert each string to the integer. After we count if there is only one odd number in the array, if we return the index of this number and adding `+1` (because index in an array is zero-based).

```ruby
def iq_test(string)
  array = string.split(" ").map { |n| n.to_i}
  if array.count{ |n| n.even? } == 1
    array.index{ |n| n.even? } + 1
  else array.count{ |n| n.odd? } == 1
    array.index{ |n| n.odd? } + 1
  end
end
```

I tried to make the method in 3 lines, combining each case, but it doesn't seem to work at the moment. If I find the way to shorten it - I will post it here. Or if any of the readers has any offers - I will be happy to post them here too :)
