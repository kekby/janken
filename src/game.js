import readlineSync from 'readline-sync';
import capitalize from './capitalize.js';

const CHOICES = ['камень', 'ножницы', 'бумага'];

const winConditionsMap = {
  бумага: 'камень',
  камень: 'ножницы',
  ножницы: 'бумага',
};

const winConditionsExplain = {
  бумага: 'Бумага обертывает камень',
  камень: 'Камень ломает ножницы',
  ножницы: 'Ножницы режут бумагу',
};

const getWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return 'draw';
  }

  return winConditionsMap[playerChoice] === computerChoice
    ? 'player'
    : 'computer';
};

const getComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
};

const play = () => {
  const playerChoice = readlineSync.question(`\nВыберите вашу фигуру:
1. Камень
2. Ножницы
3. Бумага\n\n`).toLowerCase();

  if (!CHOICES.includes(playerChoice)) {
    console.log('Некорректный ввод. Выход из игры.');
    return;
  }

  console.log(`Ваш выбор: ${capitalize(playerChoice)}\n`);

  const computerChoice = getComputerChoice();
  console.log(`Компьютер выбирает: ${capitalize(computerChoice)}\n`);

  const winner = getWinner(playerChoice, computerChoice);

  if (winner === 'draw') {
    console.log('Результат: Ничья');
  } else if (winner === 'computer') {
    console.log(`Результат: Вы проиграли! ${winConditionsExplain[computerChoice]}`);
  } else if (winner === 'player') {
    console.log(`Результат: Вы победили! ${winConditionsExplain[playerChoice]}`);
  }

  const playAgain = readlineSync.question('Хотите сыграть еще раз? (да/нет) ').toLowerCase();

  if (playAgain === 'да') play();
};

const startGame = () => {
  console.log('Добро пожаловать в игру "Камень, ножницы, бумага"');

  play();

  console.log('\nСпасибо за игру! До встречи!');
};

export default startGame;
