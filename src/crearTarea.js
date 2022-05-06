const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const jsonBodyParser = require("@middy/http-json-body-parser");

const crearTarea = async(event)=>{
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const { title, description } =event.body; 
    const createAt = new Date();
    const id = v4();
    const nuevaTarea = {
        id,
        title,
        description,
        createAt,
        done:false
    }

    await dynamoDB.put({
        TableName:"TaskTable",
        Item:nuevaTarea
    }).promise()
    return { 
        status:200,
        body:JSON.stringify(nuevaTarea)
    }
}

module.exports = {
    crearTarea: middy(crearTarea).use(jsonBodyParser())
}