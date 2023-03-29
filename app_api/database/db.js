const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1'
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

mongoose.set('useUnifiedTopology', true);
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI,{
    userNewUrlParser: true,
    useCreateIndex: true
  }), 1000);
}

mongoose.connection.on('connected', () => {
  console.log('connected');
});
mongoose.connection.on('error', err => {
  console.log('error: ' + err);
  return connect();
});
mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});

if(process.platform == 'win32'){
  const rl = readLine.createInterface({
    intput: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });

}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2',() => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

connect();
require('./models/travlr');