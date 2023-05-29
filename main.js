// Express server
const express = require('express');
const app = express();
const port = 3000;


const user = {
  name: 'aag',
  password: '1234'
}

const files = [
  { name: 'file1.txt' },
  { name: 'file2.jpg' },
  { name: 'file3.pdf' }
];




app.use(express.static('public'));
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));




app.get('/login', (req, res) => {
  res.render('index.ejs');
})

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username == user.name && password == user.password) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.get('/', (req, res) => {
  res.render('fb.ejs', {
    files
  });
})

app.get('/download', (req, res) => {
  let fileName = req.query.file;
  fileName = fileName.replace(/\n/g, '');

  // TODO: Add file search logic here
  const file = files.find(f => f.name === fileName);

  if (!file) {
    return res.status(404).send('File not found');
  }
  res.send(`Requested file: ${file.name}`);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
