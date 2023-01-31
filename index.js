const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
let inputStream = Fs.createReadStream('info.csv', 'utf8');
let count = 0;
let json = {};

inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        let attr = [];
        if (count == 0) {
            attr = row;
            json['persons'] = []
        }
        else {
            let obj1 = {};
            for (let key in row) {
                if (key == 0) {
                    obj1[attr[key]] = row[key];
                    obj1['details'] = {};
                }
                else {
                    obj1['details'][attr[key]] = row[key];
                }
            }
            json['persons'].push(obj1);
        }
        count++;
    });

exports.handler = async (event) => {
    const response = json;
    return response;
};
