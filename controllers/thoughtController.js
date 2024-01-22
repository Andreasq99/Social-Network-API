const { User, Thought} = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      console.log('Thoughts:',thoughts);
      res.send(thoughts);
    } catch (err) {
      console.log('error:',err);
      res.status(500).json({error: 'internal server error', err});
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      await thought.save();
      const user = await User.findOne({username: thought.username});
      const thoughts = user.thoughts;
      thoughts.push(thought._id);
      await User.findOneAndUpdate({username: thought.username},
        {
            thoughts
        });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json({ message: 'Thought!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res){
    try{
      await Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body, {new: true, runValidators: true});
      res.json({message: 'Thought updated!'});
    } catch(err){
      res.status(500).json(err);
    }
  },

  async createReaction(req,res){
    try{
        const thought = await Thought.findOne({_id: req.params.thoughtId});
        console.log(thought);
        thought.reactions.push(req.body);
        console.log(thought);
        const newThought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, thought, {new: true});
        res.json(newThought);
    }catch(err){
        res.status(500).json(err);
    }
  },

  async deleteReaction(req,res){
    try{
        const thought = await Thought.findOne({_id: req.params.thoughtId});
        const reactionIds = thought.reactions.map((x)=>x._id);
        const index = reactionIds.indexOf(req.body.reactionId);
        thought.reactions.splice(index,1);
        const newThought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, thought,{new:true});
        res.json(newThought);
    }catch(err){
        res.status(500).json(err);
    }
  }
};
