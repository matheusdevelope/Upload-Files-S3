//utilities
const MapRegex = {
  á: /u00e1/g,
  à: /u00e0/g,
  â: /u00e2/g,
  ã: /u00e3/g,
  ä: /u00e4/g,
  Á: /u00c1/g,
  À: /u00c0/g,
  Â: /u00c2/g,
  Ã: /u00c3/g,
  Ä: /u00c4/g,
  é: /u00e9/g,
  è: /u00e8/g,
  ê: /u00ea/g,
  ê: /u00ea/g,
  É: /u00c9/g,
  È: /u00c8/g,
  Ê: /u00ca/g,
  Ë: /u00cb/g,
  í: /u00ed/g,
  ì: /u00ec/g,
  î: /u00ee/g,
  ï: /u00ef/g,
  Í: /u00cd/g,
  Ì: /u00cc/g,
  Î: /u00ce/g,
  Ï: /u00cf/g,
  ó: /u00f3/g,
  ò: /u00f2/g,
  ô: /u00f4/g,
  õ: /u00f5/g,
  ö: /u00f6/g,
  Ó: /u00d3/g,
  Ò: /u00d2/g,
  Ô: /u00d4/g,
  Õ: /u00d5/g,
  Ö: /u00d6/g,
  ú: /u00fa/g,
  ù: /u00f9/g,
  û: /u00fb/g,
  ü: /u00fc/g,
  Ú: /u00da/g,
  Ù: /u00d9/g,
  Û: /u00db/g,
  ç: /u00E7/g,
  Ç: /u00c7/g,
  ñ: /u00f1/g,
  Ñ: /u00d1/g,
  "&": /u0026/g,
  "'": /u0027/g,
};

function error(e) {
  console.error("Error:", e);
  return Promise.reject(e);
}
function HashUnique(size) {
  let dt = new Date().getTime();
  let base_size = "xxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxxxxx";
  let new_size = base_size.substring(0, Number(size) < 5 ? 5 : Number(size));
  let uuid = new_size.replace(/[xy]/g, function (c) {
    let r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
function round(n, multiplicador) {
  let N = n || "";
  let value = N.toString().replace(/\D/g, "");
  let a = Math.round(Number(value) / multiplicador) * multiplicador;
  if (a < 5) a = 5;
  return a;
}
function EncodeURI(text) {
  return encodeURIComponent(text).replace(/%/gm, "%%");
}
function OnlyNameDescription(name, sizeHash) {
  let newName = name.split(".").shift();
  newName = newName.substring(0, newName.length - (sizeHash + 4));
  newName = newName.replace(/_/gm, " ");
  return newName;
}
function MountMessageEncoded(message, files, sizeHash, footer_message) {
  let NewMessage = message || "";
  NewMessage = NewMessage.replace(/\[n\]/gm, "\n");
  if (NewMessage.length > 0) NewMessage += "\n\n";

  files.forEach((obj, i) => {
    const description =
      obj.description_name ||
      OnlyNameDescription(obj.name, sizeHash) ||
      "Link " + (i + 1);
    NewMessage += "-" + description + ":\n" + obj.url + "\n\n";
  });
  if (footer_message) {
    const footer = footer_message.replace(/\[n\]/gm, "\n");
    NewMessage += "\n" + footer;
  }

  return EncodeURI(NewMessage);
}
function Convert_Especial_Caracteres_in_Unicod_To_UTF8(value) {
  let string = value;
  for (let props in MapRegex) {
    string = string.replace(MapRegex[props], props);
  }
  string = string.replace(/%20/gm, " ");
  return string;
}
module.exports = {
  round,
  HashUnique,
  error,
  MountMessageEncoded,
  EncodeURI,
  OnlyNameDescription,
  Convert_Especial_Caracteres_in_Unicod_To_UTF8,
};
