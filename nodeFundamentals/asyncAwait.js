const { readFile, writeFile} = require('fs').promises;
// const util = require('util');
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)

const start = async() => {
    try {
        const test =  await readFile('./content/test.txt', 'utf8')
        const secondTest =  await readFile('./content/secondTest.txt','utf8')
        await writeFile('./content/result-mind-grenade.txt', 
            `THIS IS AWESOME: ${test}. ${secondTest}`)
    }
    catch(error){
        console.log(error)
    }
}

start()


// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf8', (error, data) => {
//             if(error) {
//                 reject(error);
//             }
//             resolve(data)
//         })
//     })
// }

// getText('./content/test.txt')
//     .then(result => console.log(result))
//     .catch(error => (console.log(error)))
