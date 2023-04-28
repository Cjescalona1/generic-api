module.exports =   (request, response)=>{
    response.status(404).send('<h1> Cant find nothing here! </h1>');
}