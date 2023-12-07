/** Command-line tool to generate Markov text. */

const {MarkovMachine } = require('./markov');
const axios = require('axios');
const process = require('process');
const fs = require('fs');
const https = require('https');


function textFromFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading in textFromFile() path ${path}: ${err}`);
            process.exit(1)
        } else {
            try {
                const mm = new MarkovMachine(data);
                console.log(mm.makeText());
            } catch (err) {
                console.log('Error in MarkovMachine: ', err);
                process.exit(1)
            }
        }
    });
}

// async function textFromURL(path){
//     try{
//         let resp = await axios.get(path)
        
//         fs.readFile(resp.data, 'utf8', (err, data) =>{
//             if(err){
//                 console.log(`Error reading textFromURL() path ${path} : ${err}`)
//                 process.exit(1)
//             } else{
//                 try{
//                     const mm = new MarkovMachine(data);
//                     console.log(mm.makeText())
//                 } catch(err){
//                     console.log('Error in MarkovMachine: ', err)
//                     process.exit(1)
//                 }
//             }
//         })

//     } catch(err){
//         console.log('Error textFromURL Axios: ', err)
//         process.exit(1)
//     }
// }

function textFromURL(url) {
    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            // Process the retrieved data here
            const mm = new MarkovMachine(data);
            console.log(mm.makeText())
        });
    }).on('error', (error) => {
        console.error(`Error reading textFromURL() path ${url}: ${error}`);
    });
}



if(process.argv[2] === 'file'){
    textFromFile(process.argv[3])
}
else if(process.argv[2] === 'url'){
    textFromURL(process.argv[3])
}
else{
    console.log(`Can not understand command${process.argv[3]}. Please use an existing 'file' or 'url.'`)
    process.exit(1)
}


