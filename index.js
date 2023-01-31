const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
let inputStream = Fs.createReadStream('info.csv', 'utf8');
let count = 0;
let json = {};
let attr = [];
let obj = {};

inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        if (count == 0) {
            attr = row;
            json['persons'] = [];
        }
        else {
            obj = {};
            for (let key in row) {
                if (key == 0) {
                    obj[attr[key]] = row[key];
                    obj['details'] = {};
                }
                else {
                    obj['details'][attr[key]] = row[key];
                }
            }
            json['persons'].push(obj);
        }
        count++;
    });

exports.handler = async (event) => {
    const response = json;
    return response;
};
