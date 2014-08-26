var express         = require('express'),
    app             = express(),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override')

// App config =============================================
mongoose.connect('mongodb://localhost:27017/todo');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser());
app.use(methodOverride());

// Setup DB model =========================================
var Todo = mongoose.model('Todo', {
    text: String,
    done: Boolean
});

// routes =================================================

    // api -----------------------------------------------
    app.get('/api/todo', function (req, res) {
        Todo.find(function (err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos); // send back a list of all todos
        });
    });

    app.post('/api/todo', function (req, res) {
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err) {
                res.send(err);
            }
            res.json(todo); // send back the todo we just created
        });
    });

    app.put('/api/todo/:todo_id', function (req, res) {
        Todo.findByIdAndUpdate(req.params.todo_id,
            {
                text: req.body.text,
                done: req.body.done
            }, function (err, todo) {
                if (err) {
                    res.send(err);
                }
            });
    });

    app.delete('/api/todo/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err) {
                res.send(err);
            }

            Todo.find(function (err, todos) {
                if (err) {
                    res.send(err);
                }
                res.json(todos); // send back all todos after deleting so we don't have to make a second call
            })
        });
    });

// application ============================================
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/client/views/index.html');
});

// listen =================================================
app.listen(3000, function() {
    console.log('App listening on port 3000');
});
