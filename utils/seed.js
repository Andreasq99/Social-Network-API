const connection = require('../config/connection');
const {User, Thought} = require('../models');
const { getRandomUser, getRandomThought, getRandomArrItem } = require('./data');



connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let collections = await connection.db.listCollections({name: 'thoughts'}).toArray();
  console.log(collections);
  let applicationCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (applicationCheck.length) {
    await connection.dropCollection('thoughts');
  }
  
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }


  var users = [];
  var thoughts = [];
  var friendIndices = [];

  for(i=0; i<20; i++){
    users.push(getRandomUser());
    thoughts.push({
      thoughtText: getRandomThought(),
      username: users[i].username,
      reactions: []
    });
  }

  for(i=0; i<20; i++){
    for(j=0; j<Math.floor(Math.random()*6); j++){
      var index = j;
      if (j===i){
        if(j===19){
          index = 0;
        } else {
          index +=1;
        }
      }
      friendIndices.push(index);
    }
    let reaction = {
      reactionBody: getRandomThought(),
      username: getRandomArrItem(users)
    }
    thoughts[i].reactions.push(reaction);
  }

  await Thought.collection.insertMany(thoughts);
  await User.collection.insertMany(users);

  const userIds = users.map((x)=>x._id);
  const thoughtIds = thoughts.map((x)=>x._id);
  console.log(userIds);
  console.log(thoughtIds);
  for(i=0;i<20;i++){
    const user = await User.findOneAndUpdate({_id: userIds[i]},
    {
      friends: [userIds[friendIndices[i]]],
      thoughts: [thoughtIds[i]]
    });
    await user.save();
  }


  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
