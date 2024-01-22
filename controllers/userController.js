const { User, Thought} = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      console.log('Users:',users);
      res.send(users);
    } catch (err) {
      console.log('error:',err);
      res.status(500).json({error: 'internal server error', err});
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts', 'friends')
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ username: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res){
    try{
      await User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true, runValidators: true});
      res.json({message: 'User updated!'});
    } catch(err){
      res.status(500).json(err);
    }
  },

  async createFriend(req, res){
    try{
      const friend = await User.findOne({_id: req.params.friendId});
      if(!friend){
        return res.status(404).json({message: 'No user with that ID! (friendId)'});
      }
      const user = await User.findOne({_id: req.params.userId});
      if(!user){
        return res.status(404).json({message:'No user with that ID! (userId)'});
      }
      user.friends.push(friend._id);
      await User.findOneAndUpdate({_id: req.params.userId}, user);
      res.json({message:"friend relation created!"});
    } catch(err){
      res.status(505).json(err);
    }
  },

  async deleteFriend(req, res){
    try{
      const friend = await User.findOne({_id: req.params.friendId});
      if(!friend){
        return res.status(404).json({message: 'No user with that ID! (friendId)'});
      }
      const user = await User.findOne({_id: req.params.userId});
      if(!user){
        return res.status(404).json({message:'No user with that ID! (userId)'});
      }
      const index = -1 || user.friends.indexOf(friend);
      if(index===-1){
        return res.status(404).json({message:'These users are not friends!'});
      }
      user.friends.splice(index, 1);
      User.findOneAndUpdate({_id: req.params.userId}, user);
    } catch(err){
      res.status(505).json(err);
    }
  }
};
