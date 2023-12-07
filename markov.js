/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")
    let wordsArr = []
    let startWords = []
    for(let s of sentences){
      let words = s.split(/[ \r\n]+/);
      words = words.filter(c => c !== "");
      wordsArr.push(words)
    }
    for(let i = 0; i < wordsArr.length; i++){
      startWords.push(wordsArr[i][0])
    }
    this.wordsArr = wordsArr 
    this.startWords = startWords
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for(let i = 0; i < this.wordsArr.length; i ++){
      for(let j= 0; j < this.wordsArr[i].length; j++){
        let word = this.wordsArr[i][j];
        let nextWord = this.wordsArr[i][j+1] || null;

        if(chains.has(word)){
          chains.get(word).push(nextWord);
        } else {
          chains.set(word, [nextWord])
        }
      }
    }
    this.chains = chains;
    }
  /** return random text from chains */
  static choice(ar){
    return ar[Math.floor(Math.random() * ar.length)];
  }

  makeText(numWords = 100) {
    // let keys = Array.from(this.chains.keys())
    let key = MarkovMachine.choice(this.startWords);
    let out = [];

    while(out.length < numWords && key !==null){
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ")

  }
}
 
module.exports = {MarkovMachine}