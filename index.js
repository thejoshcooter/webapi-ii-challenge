const server = require('./server');
const port = 5000;

server.listen(port, () => console.log(`server magic happening on port ${port}`));