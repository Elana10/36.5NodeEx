const {MarkovMachine} = require('./markov');

describe("test constructors", ()=>{
    let text;
    let mm;
    beforeEach(function(){
        text = 'The cat in the hat. The rat with a bat.'
        mm = new MarkovMachine(text)
    })

    test('wordsArr tests', ()=>{
        expect(mm.wordsArr.length).toEqual(2)
        expect(mm.wordsArr[0].length).toEqual(5)
        expect(mm.wordsArr[1].length).toEqual(5)
    })


})

describe("test class methods", ()=>{
    let text;
    let mm;
    beforeEach(function(){
        text = 'The cat in the hat. The rat with a bat.'
        mm = new MarkovMachine(text)
    })

    test('static choice', ()=>{
        expect(mm.startWords).toContain(MarkovMachine.choice(mm.startWords))
    })

    test('makeText', ()=>{
        let resp = mm.makeText(4)
        let wordCount = resp.split(' ')
        expect(wordCount.length).toBeLessThan(5)
    })
})