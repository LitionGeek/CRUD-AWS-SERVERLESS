const AWS = require('aws-sdk');

const getTask = async(event)=>{
    const {id} = event.pathParameters;
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

   try {
    const result = await dynamoDB.get({
        TableName:"TaskTable",
        Key:{
            id
        }
    }).promise()

    const tarea = result.Item;
    console.log(tarea)
    return{
        stauts:200,
        body: tarea

    }
   } catch (error) {
       console.log(error)
   }
};

module.exports = {
    getTask
}