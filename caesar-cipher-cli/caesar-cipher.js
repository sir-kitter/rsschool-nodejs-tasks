let configuration
try {
    configuration = require('./configuration')
}
catch(error) {
   console.error(error.message)
   process.exit(1)
}


const { pipeline } = require('stream');
const caesar_transform = require('./caesar-stream')

pipeline (
    configuration.input,
    new caesar_transform(configuration),
    configuration.output,
    err => {
        if(err) {
            console.log("Pipeline failed: " + err.message);
            process.exit(2)
        }
    }
)
