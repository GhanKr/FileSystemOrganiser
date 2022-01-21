const helpcommands=require('./commandfunctions/help')
const organisecommand=require('./commandfunctions/organise')
const treecommand=require('./commandfunctions/tree')
const fs=require("fs") //importing fs module
const path=require("path")  //importing path module
let input=process.argv.slice(2);         //taking input commands
switch(input[0]){                              //to run all the commands
    case "Tree":
        treecommand.tree(input[1])
        break;
    case "Organise":
        organisecommand.organise(input[1])
         break;
    case "help":
       helpcommands.help()
        break;
}

