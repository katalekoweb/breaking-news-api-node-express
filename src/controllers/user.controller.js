const soma = (req, res) => {
    const soma = 100 + 4
    res.send({soma:soma})
}

module.exports = {soma}