# trala-test
## Description
This app implements the Hotshot Scoreboard Algorithm. It describes the application requirements in detail
Hotshot is a popular basketball skills game enjoyed by many basketball camp goers. It’s become so popular that it’s a newly offered game in this year's NBA All-star Weekend skills competition. User research has shown season long fan engagement increases when fans can actively follow along with the world’s best players in Hotshot competitions. The NBA commissioner wants us to update all NBA scoreboards to be Hotshot compatible. You are tasked with implementing the scorecard algorithm for the Hotshot scoreboard according to the provided rules.




The goal of hotshot is to make as many shots from the marked spots on the court in 1 minute. A single round consists of 1 minute of shots plus any earned bonus shots. A game consists of 10 rounds.



How to Score Hotshot

There are 8 spots on the court indicated by the colored circles and triangles in the above half court diagram. The number of points you earn from a made shot in each spot is as follows:

Green = 5 points

Yellow = 4 points

Gray = 3 points

Blue = 2 points

Red = 1 point

You can only earn 2 total points from baskets made in the red spots per round. A round is forfeited and given a 0 score if you forget this rule and make more than 2 layups in a round.

A heatcheck upgrade is when you score at least 45 points in a round (not including bonus points).

A GOAT round upgrade indicates you made at least one shot from each spot in a single round.

Scoring for each round is based on the number of points you accumulate in that round from made shots + bonus shots made points

Rounds 1-9 scoring:

For a heatcheck round, you get 3 bonus shot attempts, worth triple points.

Earning a GOAT round earns you 4 bonus shots for that round.

Final round (10th) scoring:

In a heatcheck final round, you get two bonus shot attempts for each round you made 30+ points (excludes bonus points) over the course of the entire game. These bonus shots are worth double points.

In a GOAT final round, you get one bonus shot from each of the 8 hotshot spots.

2 points are deducted for missed red shots. No points deducted for missed bonus red shots.

Upgrades are not mutually exclusive, meaning GOATs and heatchecks can both be earned in individual rounds. Upgrades are only earned with non-bonus shot makes.

Winner is determined by the player with the most points.



Your Tasks
Write a function to create the scorecard for a game of hotshot, and verify with automated tests that your function correctly generates the scorecard. Your function should expect a model describing a full Hotshot game’s worth of shot makes and attempts per round. The generated scorecard should be an array of 10 numbers showing the cumulative scores for each round as would appear on a complete scorecard.

In the code snippet below we've provided sample data from a drafted API model. Note for a professional league you can expect at least 20 shot attempts per round. The data here is shortened and simplified for brevity. The provided API model is in no way the optimal model to represent a played Hotshot game.  You are free to propose a refined game model to meet your needs to complete your tasks. If you decide to refine the model, make sure to explain your updates in your PR.


```
### Ingested API JSON
{[
    # Round 1
    {
        'made_shots': ['green1', 'gray2', 'red2'],
        'attempted_shots': ['green1', 'gray2', 'blue2', 'red2']
    },
    # Round 2
    {
        'made_shots': ['green1', 'yellow1', 'gray2', 'blue1'],
        'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red2']
    },
    # Round 3
    {
        'made_shots': ['green1', 'yellow1', 'blue2', 'red1', 'blue2', 'gray2', 'gray1', ’red2’, 'blue1'],
        'attempted_shots':  ['green1', 'yellow1', 'blue2', 'red1', 'blue2', 'gray2', 'gray1', ’red2’, 'blue1'],
        'made_bonus_shots': ['green1', 'yellow1', 'gray2']

    },
    # Round 4
    {
        'made_shots': ['green1', 'yellow1', 'blue2', 'red2'],
        'attempted_shots': ['green1', 'yellow1', 'blue2', 'red2']
    },
    # Round 5
    {
        'made_shots': ['green1', 'yellow1'],
        'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue2', 'red2']
    },
    # Round 6
    {
        'made_shots': ['red2', 'green1', 'blue1' 'red2' 'red1'],
        'attempted_shots': [ 'red2', 'green1', 'blue1', 'red2' ,'red1', 'green1']

    # Round 7
    {
        'made_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red1'],
        'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red1']
    },
    # Round 8
    {
        'made_shots': ['green1', 'yellow1', 'gray2'],
        'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red2']
    },
    # Round 9
    {
        'made_shots': ['green1', 'yellow1', 'gray2', 'blue2'],
        'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue2']
    },
    # Round 10 (Final Round)
    {
        'made_shots': ['green1', 'yellow1', 'gray1', 'blue2', 'red2'],
        'attempted_shots': ['green1', 'yellow1', 'gray1', 'blue2', 'red2'],
    },
]}

### Expected Output
scorecard = [9, 21, 56, 68, 75, 75, 90, 100, 114, 129]
```
## Installation and dependencies
To run the app locally please install the following
```
npm init
npm install --save express
npm install body-parser cors express helmet morgan mocha chai
```

## App Startup
This is a `Node` application.
Run the following command from the project folder.
```
  node src/index.js
```
The app runs on port 7070. To access the api please use `http://localhost:7070/hotshot/score/`

To test the API from CLI, use the following curl command.
```
curl --request POST 'http://localhost:7070/hotshot/score/' -H "Content-Type: application/json"  -d '[
    {
        "made_shots": ["green1", "gray2", "red2"],
        "attempted_shots": ["green1", "gray2", "blue2", "red2"]
    },
    {
        "made_shots": ["green1", "yellow1", "gray2", "blue1"],
        "attempted_shots": ["green1", "yellow1", "gray2", "blue1", "red2"]
    },
    {
        "made_shots": ["green1", "yellow1", "blue2", "red1", "blue2", "gray2", "gray1", "red2", "blue1"],
        "attempted_shots":  ["green1", "yellow1", "blue2", "red1", "blue2", "gray2", "gray1", "red2", "blue1"],
        "made_bonus_shots": ["green1", "yellow1", "gray2"]

    },
    {
        "made_shots": ["green1", "yellow1", "blue2", "red2"],
        "attempted_shots": ["green1", "yellow1", "blue2", "red2"]
    },
    {
        "made_shots": ["green1", "yellow1"],
        "attempted_shots": ["green1", "yellow1", "gray2", "blue2", "red2"]
    },
    {
        "made_shots": ["red2", "green1", "blue1", "red2", "red1"],
        "attempted_shots": [ "red2", "green1", "blue1", "red2" ,"red1", "green1"]
    },
    {
        "made_shots": ["green1", "yellow1", "gray2", "blue1", "red1"],
        "attempted_shots": ["green1", "yellow1", "gray2", "blue1", "red1"]
    },
    {
        "made_shots": ["green1", "yellow1", "gray2"],
        "attempted_shots": ["green1", "yellow1", "gray2", "blue1", "red2"]   
```  
