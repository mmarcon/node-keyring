module.exports = {
    readFile: jasmine.createSpy('fs.readFile'),
    readFileSync: jasmine.createSpy('fs.readFileSync'),
    writeFile: jasmine.createSpy('fs.writeFile'),
    writeFileSync: jasmine.createSpy('fs.writeFileSync')
};