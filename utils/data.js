const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Grace',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const emails = names;

const thoughts = [
  'making toast',
  "i can't find my keys",
  'this homework is killing me',
  'i forgot what i was doing',
  'i need to go outside',
  'what time is it?',
  'what day is it?'
];


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)}`;

const getRandomEmail = ()=>{
  const name = getRandomArrItem(emails);
  const email = `${name}@gmail.com`;
  emails.splice(emails.indexOf(name),1);
  return email;
}

  const getRandomThought = ()=>
  `${getRandomArrItem(thoughts)}`;

// Function to generate random applications that we can add to the database. Includes application tags.
const getRandomUser = () => {
  const user = {
    username: getRandomName(),
    email: getRandomEmail(),
    thoughts: [],
    friends: []
  };
  names.splice(names.indexOf(user.username),1);
  return user;
};



// Export the functions for use in seed.js
module.exports = { getRandomArrItem, getRandomUser, getRandomThought};
