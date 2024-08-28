// import to modules
const http =require('http');
const app = require('./app');
const server = http.createServer(app);
const mongoose =require('mongoose');
mongoose.set('strictQuery', false);





// connect mongodb to live atlas
const url ="mongodb+srv://shubhamlogicalsofttech:aJoPQUvRsc4VgJUy@cluster0.temmbf3.mongodb.net/Tameenik?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
    

    
    
// connect to browser 
const port = process.env.port ||3097;
server.listen(port, function(error){
	if(error){
		console.log(error)
	}else{
		console.log("The server is running at port"+port);
	}
});