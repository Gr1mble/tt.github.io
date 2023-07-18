const mongoose = require('mongoose');
const UserModel = require('./user-model')

const url = "mongodb+srv://GrimbleTT:K1rkw00d!5409@nchq.bi3fqgw.mongodb.net/userdb?retryWrites=true&w=majority";

const gamesArray = [];

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB')

        UserModel.aggregate([
          {
            $match:
              {
                games: "true",
              },
          },
          {
            $project: {
              _id: 0,
              username: 1,
            },
          },
        ])
        .then(users => {

          for(let i = 0; i < users.length; i ++){
            gamesArray[i] = users[i].username;
            console.log(gamesArray[i]);
            buffer
          }

        })
    })
    .catch(() => {
        console.log('Failed to connect to MongoDB');
    });




    

