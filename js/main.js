let deckId = localStorage.getItem('deckIdLocalStorage')

function newDeck(){
  console.log('newdeck')//show when newDeck is run
  fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        localStorage.setItem('deckIdLocalStorage', data.deck_id)
        deckId = localStorage.getItem('deckIdLocalStorage')
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}



document.querySelector('button').addEventListener('click',()=> drawTwo(deckId))

function drawTwo(deckId){
  console.log('existingdeckId',deckId) //will show when drawTwo will run
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  let remainingCards
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image 
        document.querySelector('#player2').src = data.cards[1].image
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)
        if(player1Val > player2Val){
          document.querySelector('h3').innerText = 'Player 1 Wins'
        }else if(player1Val < player2Val){
          document.querySelector('h3').innerText = 'Player 2 Wins'
        }else{
          document.querySelector('h3').innerText = 'Draw!'
        }
        document.querySelector('span').innerText=data.remaining
        remainingCards=data.remaining
        if(remainingCards===0){
          newDeck()
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
}
