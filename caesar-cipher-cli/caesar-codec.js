const shift_alphabet = require('./shift-latin-alphabet')

class monoalphabetic_processor {
	process(message) {
		const result = Array.from({ length: message.length })
			.map((_, index) => {
				const char = message[index]
				return this.map.has(char) ? this.map.get(char) : char
			})
			.join('')
		return result
	}
}

class encoder extends monoalphabetic_processor {
	constructor(shift) {
		super()
		this.map = shift_alphabet.map_forwards(shift)
	}
}

class decoder extends monoalphabetic_processor {
	constructor(shift) {
		super()
		this.map = shift_alphabet.map_backwards(shift)
	}
}

module.exports = {
	encoder: encoder,
	decoder: decoder,
}