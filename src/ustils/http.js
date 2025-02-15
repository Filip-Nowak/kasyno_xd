const questions = [
    {
      question: "Które miasto jest stolicą Polski?",
      answers: ["Kraków", "Warszawa", "Gdańsk", "Wrocław"],
      correctAnswer: 1
    },
    {
      question: "Który pierwiastek chemiczny ma symbol „O”?",
      answers: ["Wodór", "Tlen", "Węgiel", "Azot"],
      correctAnswer: 1
    },
    {
      question: "Ile nóg ma pająk?",
      answers: ["6", "8", "10", "12"],
      correctAnswer: 1
    },
    {
      question: "W którym roku wybuchła II wojna światowa?",
      answers: ["1914", "1939", "1945", "1960"],
      correctAnswer: 1
    },
    {
      question: "Jaka jest największa planeta w Układzie Słonecznym?",
      answers: ["Ziemia", "Saturn", "Jowisz", "Uran"],
      correctAnswer: 2
    },
    {
      question: "Kto namalował „Mona Lisę”?",
      answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Salvador Dalí"],
      correctAnswer: 2
    },
    {
      question: "Jak nazywa się bohater „Władcy Pierścieni”, który nosił Jedyny Pierścień?",
      answers: ["Frodo Baggins", "Aragorn", "Gandalf", "Samwise Gamgee"],
      correctAnswer: 0
    },
    {
      question: "Jakie zwierzę jest symbolem Australii?",
      answers: ["Koala", "Kangur", "Dingo", "Kakadu"],
      correctAnswer: 1
    },
    {
      question: "Jak nazywa się autor „Harry’ego Pottera”?",
      answers: ["Stephen King", "J.K. Rowling", "George R.R. Martin", "Suzanne Collins"],
      correctAnswer: 1
    },
    {
      question: "Który kontynent jest największy pod względem powierzchni?",
      answers: ["Afryka", "Azja", "Ameryka Północna", "Europa"],
      correctAnswer: 1
    }
  ];
  
export async function getQuestions(){
    // return fetchData("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
    return questions;

}
async function fetchData(url){
    const data = await fetch(url);
    return await  data.json();

}