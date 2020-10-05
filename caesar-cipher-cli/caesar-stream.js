const { Transform } = require('stream')
const codec = require('./caesar-codec')

class transform_content extends Transform {
    constructor(config, options) {
        super(options)
        this.codec = config.action === 'encode' ?
            new codec.encoder(config.shift)
            : new codec.decoder(config.shift)
    }
    _transform(chunk, encoding, callback) {
        callback(null, this.codec.process(chunk.toString()))
    }
}

module.exports = transform_content