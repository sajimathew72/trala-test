let shot_score = new Map([
  ["green1",5],
  ["yellow1",4],
  ["gray1",3],
  ["gray2",3],
  ["blue1",2],
  ["blue2",2],
  ["red1",1],
  ["red2",1]
])

const cumulativeSum = (sum => value => sum += value)(0);


function calculateRoundScore(draftRound) {
  finalScore = []

  // Make sure the input data is valid for further processing.
  validationDraftRound(draftRound)

  //calculate score s for 1-9
  for(let i = 0; i < 9; i++){
    roundScore = calculateScoreForMadeShot(draftRound[i].attempted_shots,draftRound[i].made_shots)
    hc_bonus = upgradeHeatcheck(roundScore,draftRound[i].made_bonus_shots)
    goatScore = upgradeGoat(isaGoat(draftRound[i].made_shots), draftRound[i].made_bonus_shots)

    finalScore[i] = roundScore + hc_bonus + goatScore
  }

  // calculate score for 10th rounds
  roundScore_10 = calculateScoreForMadeShot(draftRound[9].attempted_shots,draftRound[9].made_shots)
  score_30 = finalScore.filter((shot) => shot > 30)
  hc_bonus_10 = upgradeHeatcheck(roundScore,draftRound[9].made_bonus_shots,score_30.length)
  goatScore_10 = upgradeGoat(isaGoat(draftRound[9].made_shots), draftRound[9].made_bonus_shots,true)
  finalScore[9] = roundScore_10 + hc_bonus_10 + goatScore_10

  // calculater cummulative value from scorecard.
  cumu_score = finalScore.map((sum => value => sum += value)(0))
  return cumu_score
}

// Calculate score from shorts made.
function calculateScoreForMadeShot(attempted_shots, made_shot){
  attempt_red = attempted_shots.filter((shot) => shot.startsWith('red'))
  made_shot_red = made_shot.filter((shot) => shot.startsWith('red'))
  
  // find the number of red short missed
  missed_red =  attempt_red.length - made_shot_red.length
  return  (made_shot_red.length > 2) ? 0 : calculateScore(made_shot) - (2 * missed_red) // for each missed short from red, deduct 2 points.

}

// common function to calculate scores.
function calculateScore(shots, multipler=1){
  let round_score = 0
  shots.forEach((shot) => { round_score += shot_score.get(shot) * multipler })
  return round_score
}

//Calculate scored for heatcheck upgrade bonus round. `finalround` attribute determines bonus calculations for the final round
function upgradeHeatcheck(roundScore,made_bonus_shots,bonus_shots=3,finalround=false){
  hcBonus = 0
  if(roundScore >= 45 ){
    if(finalround == true && Object.entries(made_bonus_shots).length > (bonus_shots * 2)){
        throw new Error("Final round Heatcheck bonus shots cannot be more than "+(bonus_shots * 2))
    }else if (finalround == false && Object.entries(made_bonus_shots).length > bonus_shots){
        throw new Error("Heatcheck bonus shots cannot be more than "+bonus_shots)
    }else{
        hcBonus = calculateScore(made_bonus_shots,bonus_shots)
    }
  }

  return hcBonus

}
//Check if the round is a goat
function isaGoat(shorts){
  var uniqueAndSorted = [...new Set(shorts)].sort()
  return (uniqueAndSorted.length == [...shot_score.keys()].length)
}


//Calculate score for goat bonus attempt.  `finalround` attribute determines bonus calucation for the final round
function upgradeGoat(isgoat, bonus_shots,finalround=false){
  goatscore = 0
  if (isgoat == true){
    max_count = [...shot_score.keys()].length
    if (finalround == true && Object.entries(bonus_shots).length <= max_count){
        throw new Error("Final round Goat upgrade can only have max attempt of "+max_count)
    }else if (finalround == false &&  Object.entries(bonus_shots).length > 4){
        throw new Error("Goat upgrade can only have 4 bonus shots.")
    }else{
        goatscore = calculateScore(bonus_shots)
    }
  }

  return goatscore
}

// Validation check for the input data.
function validationDraftRound(draftRound){

  let short_label_checker = function(labelList){
    labelList.forEach((label) => {
      if (shot_score.has(label) == false){
        throw new Error("One round contains invalid shot position "+label)
      }
    })
  }


  //check if there are data from 10 rounds.

  let draftLength = Object.entries(draftRound).length
  if (draftLength < 10 ){
    throw new Error('Hot shot round should have at least 10 rounds')
  }else if (draftLength > 10 ){
    throw new Error('Hot shot round should only have 10 rounds')
  }

  draftRound.forEach( (round) => {

    let made_shots_length = Object.entries(round.made_shots).length
    let attempted_shots_length = Object.entries(round.attempted_shots).length

    //Check if any round has more item in made_shorts than attempted shots.
    if (made_shots_length > attempted_shots_length){
      throw new Error('Shorts made cannot be more than attempted shorts')
    }

    //Check if short labels are valid
    short_label_checker(round.made_shots)
    short_label_checker(round.attempted_shots)
    if (round.made_bonus_shots){
      short_label_checker(round.made_bonus_shots)
    }
  })

}




module.exports = {
  calculateRoundScore,
  calculateScore,
  upgradeHeatcheck,
  isaGoat,
  upgradeGoat,
  calculateScoreForMadeShot

};
