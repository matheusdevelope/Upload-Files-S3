// const MapRegex = {
//   á: "u00e1",
//   à: "u00e0",
//   â: "u00e2",
//   ã: "u00e3",
//   ä: "u00e4",
//   Á: "u00c1",
//   À: "u00c0",
//   Â: "u00c2",
//   Ã: "u00c3",
//   Ä: "u00c4",
//   é: "u00e9",
//   è: "u00e8",
//   ê: "u00ea",
//   ê: "u00ea",
//   É: "u00c9",
//   È: "u00c8",
//   Ê: "u00ca",
//   Ë: "u00cb",
//   í: "u00ed",
//   ì: "u00ec",
//   î: "u00ee",
//   ï: "u00ef",
//   Í: "u00cd",
//   Ì: "u00cc",
//   Î: "u00ce",
//   Ï: "u00cf",
//   ó: "u00f3",
//   ò: "u00f2",
//   ô: "u00f4",
//   õ: "u00f5",
//   ö: "u00f6",
//   Ó: "u00d3",
//   Ò: "u00d2",
//   Ô: "u00d4",
//   Õ: "u00d5",
//   Ö: "u00d6",
//   ú: "u00fa",
//   ù: "u00f9",
//   û: "u00fb",
//   ü: "u00fc",
//   Ú: "u00da",
//   Ù: "u00d9",
//   Û: "u00db",
//   ç: "u00e7",
//   Ç: "u00c7",
//   ñ: "u00f1",
//   Ñ: "u00d1",
//   "&": "u0026",
//   "'": "u0027",
// };

// function Convert_Especial_Caracteres_in_Unicod_To_UTF8(value) {
//   let string = value;
//   for (let props in MapRegex) {
//     let regex = MapRegex[props];
//     regex = new RegExp(regex, "g");
//     string = string.replace(regex, props);
//   }

//   for (let props in MapRegex) {
//     let regex = MapRegex[props];
//     regex = regex.toUpperCase().replace("U", "u").replace("G", "g");
//     regex = new RegExp(regex, "g");
//     string = string.replace(regex, props);
//   }
//   string = string.replace(/%20/gm, " ");
//   return string;
// }

// // console.log(
// //   Convert_Especial_Caracteres_in_Unicod_To_UTF8(
// //     "Autorizau00E7u00E3oRetiradu00ECReca-padora20220318_081543.pdf"
// //   )
// // );

// const text_emoji = "segue uD83DuDE43";

// function ConvertEmoji(string) {
//   let NewString = string;

//   console.log(NewString);
// }

// ConvertEmoji(text_emoji);

// function EncodeURI(text) {
//   return encodeURIComponent(text); //.replace(/%/gm, "%%");
// }

// console.log(EncodeURI("teste de emoji \uD83D\uDE43"));
