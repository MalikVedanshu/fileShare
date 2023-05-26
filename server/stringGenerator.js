function charGen(asci, til) {
    return String.fromCharCode(asci + (Math.random() * til))
}


function passwordGenerator() {
    let password = '';
    for (let i = 0; i < 4; i++) {
        password += (charGen(65, 26) + charGen(97, 26));
    }
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}
module.exports = passwordGenerator;