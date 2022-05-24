const seat = document.querySelectorAll('.seat');
const seatBtn = document.querySelectorAll('.fa-solid');
const position = document.querySelector('.positionSeat');
let currentActive = 1;
let Onclick = [false];
let positionSeat = [];

for( let i = 0 ; i < seat.length ; i++){
    seat[i].addEventListener( 'click', () => {
        if( !Onclick[i] ){
            positionSeat.push (seat[i].getAttribute('positionSeat'));
            Onclick[i] = true;
            position.textContent = positionSeat;

        } else {
            let a = positionSeat.indexOf(seat[i].getAttribute('positionSeat'));
            positionSeat.splice(a,1);
            Onclick[i] = false;
            position.textContent = positionSeat;
        }
    })
}
