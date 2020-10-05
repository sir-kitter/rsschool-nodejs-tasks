const cc = require('./char-code')

const latin_alphabet_length = 26

const shifted_index = (index, shift) => (index + shift + latin_alphabet_length) % latin_alphabet_length

const map_forwards = shift => {
    const map = new Map(
        Array.from({ length: latin_alphabet_length }).map((_, index) =>
            [ cc.code_to_char('A', index), cc.code_to_char('A', shifted_index(index, shift)) ]) 
        .concat(Array.from({length: latin_alphabet_length}).map((_, index) =>
            [ cc.code_to_char('a', index), cc.code_to_char('a', shifted_index(index, shift)) ]) 
        )
    )
    return map
}

const map_backwards = shift => {
    const map = new Map(
        Array.from({ length: latin_alphabet_length}).map((_, index) =>
            [ cc.code_to_char('A', shifted_index(index, shift)), cc.code_to_char('A', index) ]) 
        .concat(Array.from({ length: latin_alphabet_length}).map((_, index) =>
            [ cc.code_to_char('a', shifted_index(index, shift)), cc.code_to_char('a', index) ])
        )
    )
    return map
}

module.exports = {
    map_forwards:   map_forwards,
    map_backwards:  map_backwards
}