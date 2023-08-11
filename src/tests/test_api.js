const {calculateRoundScore,calculateScore, upgradeHeatcheck, isaGoat, upgradeGoat, calculateScoreForMadeShot} = require('../hotshot_algo');
const morerounds = require('./morerounds.json')
const lessrounds = require('./lessrounds.json')
const invalidround = require('./invalidround.json')
const invalidshort = require('./invalidshort.json')
const validround = require('./validround.json')

const chai = require('chai');


//var expect = chai.expect;
//import test_data from "./test.json" assert { type: 'json' };

describe('Testing calculateRoundScore', () => {
  describe('Test if draft round has more rounds', () => {
    it('calculateRoundScore', () => {
      chai.expect(() => calculateRoundScore(morerounds["draft"])).to.throw("Hot shot round should only have 10 rounds")
    });
  });
  describe('Test if draft round whould have atleast 10 rounds', () => {
    it('calculateRoundScore', () => {
      chai.expect(() => calculateRoundScore(lessrounds["draft"])).to.throw("Hot shot round should have at least 10 rounds")
    });
  });
  describe('Test if draft has invalid round', () => {
    it('calculateRoundScore', () => {
      chai.expect(() => calculateRoundScore(invalidround["draft"])).to.throw("Shorts made cannot be more than attempted shorts")
    });
  });
  describe('Test if draft has invalid shot', () => {
    it('calculateRoundScore', () => {
      chai.expect(() => calculateRoundScore(invalidshort["draft"])).to.throw("One round contains invalid shot position")
    });
  });
  describe('Test if draft has valid shot', () => {
    it('calculateRoundScore', () => {
      finalScore = calculateRoundScore(validround["draft"])
      chai.expect(finalScore).to.have.same.members([9, 21, 56, 68, 75, 75, 90, 100, 114, 129]);
    });
  });

});

describe('Testing calculateScore', () => {
  describe('Test if correct shots are in round', () => {
    it('calculateScore', () => {
      round = JSON.parse('["green1", "yellow1", "blue2", "red1", "blue2", "gray2", "gray1", "red2"]')
      score = calculateScore(round)
      chai.assert.equal(score, 21)
    });
  });
  describe('Test if short can be without red', () => {
    it('calculateScore', () => {
      round = JSON.parse('["green1", "yellow1", "blue2", "blue2", "gray2", "gray1"]')
      score = calculateScore(round)
      chai.assert.equal(score, 19)
    });
  });
});

describe('Testing upgradeHeatcheck', () => {
  describe('Test if should upgradeHeatcheck ', () => {
    it('upgradeHeatcheck', () => {
      round = JSON.parse('["green1", "yellow1", "blue2", "red1", "blue2", "gray2", "gray1", "red2", "red2"]')
      score = upgradeHeatcheck(40,round)
      chai.assert.equal(score, 0)
    });
  });
  describe('Test if bonus shot is more than 3 ', () => {
    it('upgradeHeatcheck', () => {
      round = JSON.parse('["green1", "yellow1", "blue2", "red1", "blue2", "gray2", "gray1", "red2", "red2"]')
      chai.expect(() => upgradeHeatcheck(45,round)).to.throw("Heatcheck bonus shots cannot be more than 3")
    });
  });
  describe('Test if bonus scores has muliplier', () => {
    it('upgradeHeatcheck', () => {
      round = JSON.parse('["green1", "yellow1", "red2"]')
      score = upgradeHeatcheck(45,round)
      chai.assert.equal(score, 30)
    });
  });
});

describe('Testing isaGoat', () => {
  describe('Test if short is a GOAT', () => {
    it('isaGoat', () => {
      round = JSON.parse('["green1", "yellow1", "blue1", "blue2", "gray2", "gray1", "red1", "red2"]')
      isgoat = isaGoat(round)
      chai.assert.equal(isgoat, true)
    });
  });
  describe('Test if short not a GOAT', () => {
    it('isaGoat', () => {
      round = JSON.parse('["green1", "yellow1", "blue1", "blue1", "gray2", "gray1", "red1", "red2"]')
      isgoat = isaGoat(round)
      chai.assert.equal(isgoat, false)
    });
  });
});
describe('Testing upgradeGoat', () => {
  describe('Test to calculate upgradeGoat', () => {
    it('upgradeGoat', () => {
      round = JSON.parse('["green1", "yellow1", "blue1", "gray2"]')
      score = upgradeGoat(true, round)
      chai.assert.equal(score, 14)
    });
  });
  describe('Test for not goat', () => {
    it('upgradeGoat', () => {
      round = JSON.parse('["green1", "yellow1", "blue1", "gray2"]')
      score = upgradeGoat(false, round)
      chai.assert.equal(score, 0)
    });
  });
  describe('Test for goat attempt more than 4', () => {
    it('upgradeGoat', () => {
      round = JSON.parse('["green1", "yellow1", "blue1", "gray2","red1"]')
      chai.expect(() => upgradeGoat(true, round)).to.throw("Goat upgrade can only have 4 bonus shots.")
    });
  });
});

describe('Testing calculateScoreForMadeShot', () => {
  describe('Test to calculate made shots', () => {
    it('upgradeGoat', () => {
      made_shots = JSON.parse('["green1", "yellow1", "blue2", "red1", "blue2", "gray2", "gray1", "red2", "blue1"]')
      attempted_shots = JSON.parse('["green1", "yellow1", "blue2", "red1", "blue2", "gray2", "gray1", "red2", "blue1"]')

      score = calculateScoreForMadeShot(attempted_shots, made_shots)
      chai.assert.equal(score, 23)
    });
  });
  describe('Test to calculate missed red  shots', () => {
    it('upgradeGoat', () => {
      made_shots = JSON.parse('["green1", "yellow1", "blue2", "red1", "blue2", "gray2", "gray1",  "blue1"]')
      attempted_shots = JSON.parse('["green1", "yellow1", "blue2", "red1", "blue2", "gray2", "gray1", "red2", "blue1"]')

      score = calculateScoreForMadeShot(attempted_shots, made_shots)
      chai.assert.equal(score, 20)
    });
  });
  describe('Test if more than 2 shots taken from  red', () => {
    it('calculateScore', () => {
      made_shots = JSON.parse('["green1", "yellow1", "blue2", "red1", "blue2", "gray2", "gray1", "red2", "red2"]')
      attempted_shots = JSON.parse('["green1", "yellow1", "blue2", "red1", "blue2", "gray2", "gray1", "red2", "red2"]')

      score = calculateScoreForMadeShot(attempted_shots, made_shots)
      chai.assert.equal(score, 0)
    });
  });

});
