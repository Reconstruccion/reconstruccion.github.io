const { useState, useEffect } = React;

const Form = () => {
  const [contratista, setContratista] = useState("")
  const [fileName, setFileName] = useState('No file chosen')
  const [file, setFile] = useState(null);
	const [contrato, setContrato] = useState("")
  const [isDiabled, setIsDisabled] = useState(false)

  const buttonBgColor = isDiabled ? "bg-[#D8D8D8]" : "bg-[#00afaa]"

  const cleanForm = () => {
    setContratista("");
    setContrato("");
    setFile(null);
  }

  const verificarNombreArchivo = (nombreArchivo) => {
    const expresionRegular = /[\\/:"*?<>|#%]/;
    return expresionRegular.test(nombreArchivo);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!contratista || !contrato) 
      mostrarModal("warning", "Advertencia", "Por favor, selecciona una contratista y un contrato.")
    
    else if(!file) 
      mostrarModal("warning", "Advertencia", "Por favor, selecciona un archivo.")

    else {
      if(verificarNombreArchivo(fileName)) {
        mostrarModal(
          "error", 
          "Nombre de archivo no válido", 
          'El nombre del archivo contiene caracteres especiales que no están permitidos (\/:*?"<>|#%). Por favor, cambie el nombre del archivo.'
        )
        setFile(null)
        setFileName("No filen chosen")
        return
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileContent = e.target.result.split(',')[1];
        const data = {
          "file": fileContent,
          "filename": fileName,
          "contratista": contratista,
          "contratocontratista": contrato
        };

        try {
          setIsDisabled(true);

          Swal.fire({
            title: 'Por favor, espere...',
            text: 'El archivo se está enviando.',
            icon: 'info',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
            confirmButtonText: 'Ok'
          });

          const response = await fetch(
            "https://prod-210.westeurope.logic.azure.com:443/workflows/81495889d16c43fdb53c8221ff17978a/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hfNzZY2E_GOwLigbjvrcqEhEWeZjX0pyG0y_OqVSej4", { 
              method:"POST",
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify(data) 
            },
          )

          if (response.ok) 
            mostrarModal("success", "Éxito", `Archivo enviado correctamente a la carpeta del contrato ${contrato} de la contratista ${contratista}.`)
          
          else 
            mostrarModal("Error", "Error", `Error al enviar el archivo.`)
          
          setFile(null)
          setFileName("No file chosen")
          cleanForm()
          setIsDisabled(false)

        } catch (error) {
          console.error('Error subiendo los datos:', error);
          mostrarModal("Error", "Error", `Error al enviar el archivo.`)
        }
      }
      reader.readAsDataURL(file);
    }
  }


	return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <ContratistaSelect contratista={contratista} setContratista={setContratista} />
      <ContratoSelect contratista={contratista} contrato={contrato} setContrato={setContrato} />
      <ArchivoSelect fileName={fileName} setFile={setFile} setFileName={setFileName} />
      <button className={ `px-32 py-2 text-white rounded-3xl ${buttonBgColor}` } disabled={isDiabled} type="submit">Enviar</button>
    </form>
  )
}