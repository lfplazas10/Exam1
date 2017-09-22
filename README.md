# Exam 1

This test can be seen live at: [https://test1web.herokuapp.com/]

# Way of working

## Simple backend on NodeJS + Express. It has 3 end points for:
* Getting an user's followers, by default the github api limits it to 30.
* Saving the amount of followers a given user has
* Retreiving the top 10 users (that have been queried before) based on their amount of followers.

## ReactJS app with 3 main components (found in client/src/views:
* Search followers: Displays the main search bar and the main action buttons.
* Popular Followers: Displays a table with the top 10 followers that have been queried before.
* AddFollower: Component in charge of adding a single card object that represents a follower.

## Mongo database running on mLab:
Used for saving the queried users and their amount of followers. Later it is used to extract the top 10.

As it can be noted, my secret sauce is the ability to note which are the best users over time. You can also check the best user's followers and github profile.
