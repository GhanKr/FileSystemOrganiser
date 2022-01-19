const fs=require("fs") //importing fs module
const path=require("path")  //importing path module
let input=process.argv.slice(2);         //taking input commands
let doctypes = {                                //creating objects of different files category to match
    media: ["mp4", "mkv", "mp3"],
    images: ["jpg","jpeg", "png"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
    app: ["exe", "dmg", "pkg", "deb"],};
switch(input[0]){                              //to run all the commands
    case "Tree":
        console.log('Tree used')
        break;
    case "Organise":
         Organise(input[1])
         break;
    case "help":
        help()
        break;
}
function help(){             //help function for user
    console.log(`List of all the commands to use-
                   1) Enter Tree command-> to show as Tree-> Tree 
                   2) Enter Organise command-> to organise all ur FileSystem-> Organise Filepath
                   3) Enter help ->to list out all possible commands`)
}
function Organise(dirpath){                //function to make organised directory
    if(dirpath==undefined){               // if invalid directory name entered
        console.log("Please Enter a Valid Directory")
    }
    else{
        let doesexist=fs.existsSync(dirpath)
        console.log(doesexist)
        if(doesexist==true){               // if directory existing in your system
            despath=path.join(dirpath, 'Organised_Files');
            if(fs.existsSync(despath)==false){    // to make new directory as organised_files
                fs.mkdirSync(despath);
            }
            else{
                console.log("This folder already exists, please make new directory")
            }
        }
        else{
            console.log("Please make a new directory")
        }
       
    }
    categorisefiles(dirpath, despath)    // calling categorise files
}
function categorisefiles(src, dest){   // function to  check extension of files and categorise it 
    let readfile=fs.readdirSync(src)     // storing all the files of source folder in array
    for(let i=0; i<readfile.length;i++){    // loop to extract all the files from array
        let checkfileordir=path.join(src, readfile[i])
        let isFile=fs.lstatSync(checkfileordir).isFile()  //discarding for all the folders and accepting only files
        if (isFile==true){
            let fileextension=getExtension(readfile[i])      //function to bring out the extension of that file
           console.log(readfile[i]+" extension type is "+fileextension)
           sendFiles(checkfileordir, dest, fileextension ) //function to send files in the categorised folder
        }
    }
}
function getExtension(filename){    //function to check the extension of a file and make directory according to it
    let extension=path.extname(filename)    //to get extension of the files
    extension = extension.slice(1)
    console.log(extension)
    for(let type in doctypes){        //using doctypes objects 
        let catarray= doctypes[type]
        for(let i=0; i<catarray.length;i++){
            if(extension== catarray[i]){
                return type
            }
        }
    }
    return 'other'
}
function sendFiles(src, dest, categorisefiles){  //function to send files in relevant folders
    let catpath=path.join(dest, categorisefiles)
    if(fs.existsSync(catpath)==false){
        fs.mkdirSync(catpath)
    }
    let files=path.basename(src)
    let filespath=path.join(catpath, files)
    fs.copyFileSync(src, filespath)
    console.log(files +" is copied to "+categorisefiles)
    fs.unlinkSync(src)
}