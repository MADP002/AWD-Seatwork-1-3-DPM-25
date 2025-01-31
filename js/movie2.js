const NUMBER_OF_SEATS = 26;
const MINIMUM_RESERVATION = 10;

const seats = document.querySelector(".seats");

if (localStorage.getItem("2")) {
  seatsArr = JSON.parse(localStorage.getItem("2"));
  createSeats(seatsArr);
} else {
  createSeats(new Array(26).fill(0));
}

function createSeats(arr) {
  for (let i = 0; i < NUMBER_OF_SEATS; i++) {
    const seat = document.createElement("div");
    seat.textContent = i + 1;
    seat.classList.add("seat");
    if (arr[i] == 0) seat.classList.add("unreserved");
    else seat.classList.add("reserved");

    seats.appendChild(seat);
    seat.addEventListener("click", () => handleClick(seat, i, arr));
  }
}

function handleClick(seat, idx, arr) {
  if (arr[idx] == 0) {
    const isOverMinimumSeats = checkAvailableSeats(arr);
    if (isOverMinimumSeats) {
      alert("Max number of reservations achieved");
      return;
    }
    arr[idx] = 1;
    seat.classList.remove("unreserved");
    seat.classList.add("reserved");
  } else {
    arr[idx] = 0;
    seat.classList.remove("reserved");
    seat.classList.add("unreserved");
  }
  localStorage.setItem("2", JSON.stringify(arr));
}

function checkAvailableSeats(arr) {
  let counter = 0;
  const max = NUMBER_OF_SEATS - MINIMUM_RESERVATION;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 1) counter++;

    if (counter >= max) return true;
  }

  return false;
}
