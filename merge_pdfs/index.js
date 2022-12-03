const PDFMerger = require("pdf-merger-js");

//requiring path and fs modules
const path = require("path");
const fs = require("fs");

//joining path of directory
const directoryPath = path.join(__dirname, "input_pdfs");
const outputDirectoryPath = path.join(__dirname, "output");
const filesWithPaths = getAllFilesFromDirectory(directoryPath)[0];
const files = getAllFilesFromDirectory(directoryPath)[1];
// console.log(filesWithPaths);

for (let i = 0; i < filesWithPaths.length; i++) {
  const filePath = filesWithPaths[i];
  const file = files[i];

  //   const filePath = path.join(directoryPath, file);
  const isDirectory = fs.lstatSync(filePath).isDirectory();
  if (isDirectory) {
    // console.log(filePath, isDirectory);
    const dirPath = filePath;

    // get pdf files from this directory
    const pdfFilesWithPath = getAllFilesFromDirectory(dirPath)[0];
    // TODO filter pdf files

    const outputFile = path.join(outputDirectoryPath, file + "_combined.pdf");
    // console.log(pdfFilesWithPath, outputFile);
    mergePdfs(pdfFilesWithPath, outputFile);
  }
}

async function mergePdfs(inputFiles, outputPath) {
  if (inputFiles && inputFiles.length) {
    var merger = new PDFMerger();

    for (let index = 0; index < inputFiles.length; index++) {
      const file = inputFiles[index];
      await merger.add(file);
    }
    await merger.save(path.join(outputPath)); //save under given name and reset the internal document
    console.log(outputPath);
  }
}

function getAllFilesFromDirectory(directoryPath) {
  //passsing directoryPath and callback function
  const files = fs.readdirSync(directoryPath);
  const filesWithPath = [];
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    filesWithPath.push(path.join(directoryPath, file));
  }
  return [filesWithPath, files];
}
