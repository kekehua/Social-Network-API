const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetworkapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});





// routes users
// app.use(require("./routes/api.js"));
app.get('/api/users', (req, res) => {
  User.find({})
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.get('/api/users/:id', (req, res) => {
  User.findOne({})
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.post('/api/users', ({ body }, res) => {
  User.create(body)
    .then(dbUserData => {
      res.json(dbUserData);
    })
    .catch(err => {
      res.json(err);
    });
});
app.put('/api/users/:id', (req, res) => {
  User.findOneAndUpdate(
    { $addToSet: { user: req.body.user } },
    { runValidators: true, new: true })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.delete('/api/users/:id', ({ params }, res) => {
  User.findOneAndDelete({ _id: params.id })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.json({ message: 'No note found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.json(err);
    });
});
// routes thoughts
app.use(require("./routes/api.js"));
app.get('/api/thoughts', (req, res) => {
  thought.find({})
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.get('/api/thoughts/:id', (req, res) => {
  thought.findOne({})
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.post('/api/thoughts', ({ body }, res) => {
  thought.create(body)
    .then(dbThoughtData => {
      res.json(dbThoughtData);
    })
    .catch(err => {
      res.json(err);
    });
});
app.put('/api/thoughts/:id', (req, res) => {
  thought.findOneAndUpdate(
    { $addToSet: { Thought: req.body.thought } },
    { runValidators: true, new: true })
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.delete('/api/thoughts/:id', ({ params }, res) => {
  thought.findOneAndDelete({ _id: params.id })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      res.json(err);
    });
});

// user friends routes
app.put('/api/users/:userId/friends/:friendId', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.friendId },
    { $addToSet: { user: req.body.user } },
    { runValidators: true, new: true })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.delete('/api/users/:userId/friends/:friendId', ({ params }, res) => {
  User.findOneAndDelete({ _id: params.id })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.json({ message: 'No note found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.json(err);
    });
});

//reaction routes
app.put('/api/thoughts/:thoughtId/reactions', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { user: req.body.user } },
    { runValidators: true, new: true })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.delete('/api/thoughts/:thoughtId/reactions', ({ params }, res) => {
  User.findOneAndDelete({ _id: params.id })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.json({ message: 'No note found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.json(err);
    });
});
// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));