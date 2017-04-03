'use strict';
import { IfsReadStream } from './read_stream'
import { IfsWriteStream } from './write_stream'
import q = require('q')

export function ifs(connection) {
    return {
        createReadStream: function(fileName) {
            var javaStream = q.when(fileName).then(function(file) {
                return q.nfcall(connection.createIfsReadStream.bind(connection), file);
            });
            return new IfsReadStream({
                ifsReadStream: javaStream
            });
        },
        createWriteStream: function(fileName, options) {
            options = options || { append: false }
            var javaStream = q.when(fileName).then(function(file) {
                return q.nfcall(connection.createIfsWriteStream.bind(connection), file, options.append);
            });
            return new IfsWriteStream({
                ifsWriteStream: javaStream
            });
        },
        deleteFile: (fileName) => q.nfcall(connection.deleteIfsFile.bind(connection), fileName)
    };
}