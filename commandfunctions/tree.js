const fs=require("fs") //importing fs module
const path=require("path")  //importing path module
function TreeFn(dirpath){
    if (dirpath==undefined){
        console.log("Please enter a valid directory")
    }
    else{
        let doesexist=fs.existsSync(dirpath)
        if (doesexist == true){
            treeHelper(dirpath, " ")
        }
    }
}
function treeHelper(targetpath, indent){
    let isFile=fs.lstatSync(targetpath).isFile()
    let fileName=path.basename(targetpath)
     if (isFile == true){
         console.log(indent +"├──"+fileName)
     }
     else{
         dirName=path.basename(targetpath)
         console.log(indent +"├──"+fileName) 
         let child=fs.readdirSync(targetpath)
         for(let i=0;i<child.length;i++){
             let childpath=path.join(targetpath, child[i])
             treeHelper(childpath, indent+"\t")
         }
     }
}
module.exports={
    tree:TreeFn
}