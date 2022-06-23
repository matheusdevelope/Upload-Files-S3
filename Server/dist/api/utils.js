"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenererateNameFileUnique = exports.Convert_UTF16_To_Emoji = exports.Convert_Especial_Caracteres_in_Unicod_To_UTF8 = exports.OnlyNameDescription = exports.EncodeURI = exports.MountMessageEncoded = exports.error = exports.HashUnique = exports.round = void 0;
var path = require("path");
//utilities
var MapRegex = {
    á: "u00e1",
    à: "u00e0",
    â: "u00e2",
    ã: "u00e3",
    ä: "u00e4",
    Á: "u00c1",
    À: "u00c0",
    Â: "u00c2",
    Ã: "u00c3",
    Ä: "u00c4",
    é: "u00e9",
    è: "u00e8",
    ê: "u00ea",
    É: "u00c9",
    È: "u00c8",
    Ê: "u00ca",
    Ë: "u00cb",
    í: "u00ed",
    ì: "u00ec",
    î: "u00ee",
    ï: "u00ef",
    Í: "u00cd",
    Ì: "u00cc",
    Î: "u00ce",
    Ï: "u00cf",
    ó: "u00f3",
    ò: "u00f2",
    ô: "u00f4",
    õ: "u00f5",
    ö: "u00f6",
    Ó: "u00d3",
    Ò: "u00d2",
    Ô: "u00d4",
    Õ: "u00d5",
    Ö: "u00d6",
    ú: "u00fa",
    ù: "u00f9",
    û: "u00fb",
    ü: "u00fc",
    Ú: "u00da",
    Ù: "u00d9",
    Û: "u00db",
    ç: "u00e7",
    Ç: "u00c7",
    ñ: "u00f1",
    Ñ: "u00d1",
    "&": "u0026",
    "'": "u0027",
};
//utilities
function error(e) {
    return Promise.reject(e);
}
exports.error = error;
function HashUnique(size) {
    var dt = new Date().getTime();
    var base_size = "xxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxxxxx";
    var new_size = base_size.substring(0, Number(size) < 5 ? 5 : Number(size));
    var uuid = new_size.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
exports.HashUnique = HashUnique;
function round(n, multiplicador) {
    var N = n || "";
    var value = N.toString().replace(/\D/g, "");
    var a = Math.round(Number(value) / multiplicador) * multiplicador;
    if (a < 5)
        a = 5;
    return a;
}
exports.round = round;
function EncodeURI(text) {
    return encodeURIComponent(text).replace(/%/gm, "%%");
}
exports.EncodeURI = EncodeURI;
function OnlyNameDescription(name, sizeHash) {
    var newName = name.split(".").shift();
    newName = newName.substring(0, newName.length - (sizeHash + 3));
    newName = newName.replace(/_/gm, " ");
    return newName;
}
exports.OnlyNameDescription = OnlyNameDescription;
function GenererateNameFileUnique(name_file, hash_size, expires) {
    var name = path.basename(name_file).split(".")[0] +
        " " +
        HashUnique(hash_size) +
        "_" +
        expires +
        path.extname(name_file);
    return name.replace(/\s/g, "_");
}
exports.GenererateNameFileUnique = GenererateNameFileUnique;
function Convert_Especial_Caracteres_in_Unicod_To_UTF8(value) {
    var string = value;
    for (var props in MapRegex) {
        var regex = MapRegex[props];
        regex = new RegExp(regex, "g");
        string = string.replace(regex, props);
    }
    for (var props in MapRegex) {
        var regex = MapRegex[props];
        regex = regex.toUpperCase().replace("U", "u").replace("G", "g");
        regex = new RegExp(regex, "g");
        string = string.replace(regex, props);
    }
    string = string.replace(/%20/gm, " ");
    return string;
}
exports.Convert_Especial_Caracteres_in_Unicod_To_UTF8 = Convert_Especial_Caracteres_in_Unicod_To_UTF8;
function Convert_UTF16_To_Emoji(string) {
    return string.replace(/\u[0-9a-fA-F]{4}/gi, function (match) {
        return String.fromCharCode(parseInt(match.replace(/\u/g, ""), 16));
    });
}
exports.Convert_UTF16_To_Emoji = Convert_UTF16_To_Emoji;
function MountMessageEncoded(message, files, sizeHash, footer_message) {
    var NewMessage = message || "";
    NewMessage = NewMessage.replace(/\[n\]/gm, "\n");
    if (NewMessage.length > 0)
        NewMessage += "\n";
    files.forEach(function (obj, i) {
        var description = obj.description_name ||
            OnlyNameDescription(obj.name, sizeHash) ||
            "Link " + (i + 1) + ':\n';
        var description_after_link = obj.description_after_link || '';
        if (obj.disable_auto_format === true) {
            NewMessage += description + obj.url + description_after_link;
        }
        else {
            NewMessage += "-" + description + ":\n" + obj.url + "\n\n";
        }
    });
    if (footer_message) {
        var footer = footer_message.replace(/\[n\]/gm, "\n");
        NewMessage += footer;
    }
    return EncodeURI(Convert_UTF16_To_Emoji(NewMessage));
}
exports.MountMessageEncoded = MountMessageEncoded;
