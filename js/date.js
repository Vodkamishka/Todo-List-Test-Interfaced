const dateElement = document.querySelector("#date");

const options = {
    weekday: "long",
    month: "long",
    day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);