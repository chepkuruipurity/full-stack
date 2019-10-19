const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
//RrWs8bKSsOhTgv9p

const app = express();
//setting headers to prevent cors errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();

  });

app.use(bodyParser.json());
//connecting to mongoose cluster
mongoose.connect('mongodb+srv://purity:RrWs8bKSsOhTgv9p@backend-i5epy.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });


//get request for all recipes
app.get('/api/recipes',(req,res,next)=>{

    Recipe.find().then(
        (recipes)=>{
            res.status(200).json(recipes);
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error: error
            });
        }
    )
});
//get request for one recipe
app.get('/api/recipes/:id',(req,res,next)=>{

    Recipe.findOne({
        _id: req.params.id
    }).then(
        (recipe)=>{
            res.status(200).json(recipe);
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error: error
            });
        }
    )
});

// creating new recipe
app.post('/api/recipes',(req,res,next)=>{

    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    });
    recipe.save().then(()=>{
        res.status(201).json({
            message: 'Post saved successfully'
        });
    }).catch(
        (error)=>{
res.status(400).json({
    error:error
});
        }
    );

});
// updating/modifying a recipe
app.put('/api/recipes/:id',(req,res,next)=>{

    const recipe = new Recipe({
        _id: req.params.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    });
    Recipe.updateOne({ _id: req.params.id}, recipe).then(()=>{
        res.status(201).json({
            message: 'Recipe updated successfully'
        });
    }).catch(
        (error)=>{
res.status(400).json({
    error:error
});
        }
    );

});

// deleting a recipe
app.delete('/api/recipes/:id', (req, res, next) => {
    Recipe.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

module.exports = app;