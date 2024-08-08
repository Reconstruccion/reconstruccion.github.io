const ArchivoSelect = ({ fileName, setFile, setFileName }) => {

	const handleFileChange = (event) => {
    console.log("Hola")
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    } else {
      setFileName('No file chosen');
    }
    event.target.value = null;
  }
	
	return (
		<div className="w-full flex flex-col">
      <label htmlFor="fileInput" className="block">Seleccione el archivo:</label>
      <div className="flex items-center">
        <label className="flex items-center bg-white rounded-l-md border border-gray-300 cursor-pointer hover:bg-blue-50">
          <span className="w-[100px] px-2 py-2">Choose File</span>
          <input type="file" className="hidden" id="fileInput" onChange={handleFileChange} accept=".pdf" />
        </label>
        <span id="fileName" className="px-4 py-2 w-full bg-white border border-l-0 border-gray-300 rounded-r-md text-gray-700">{fileName}</span>
      </div>
    </div>
	)
}