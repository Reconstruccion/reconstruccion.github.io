const { useState, useEffect } = React

const ContratoSelect = ( { contratista, contrato, setContrato} ) => {
	const [listaDeContratos, setListaDeContratos] = useState([]);

	const contratoHandleChange = (event) => {
    setContrato(event.target.value);
  }

	useEffect(() => {
    setContrato("");
		async function fetchContratos () {
      const response = await fetch("../../json/contratos.json")
      const json = await response.json()

      for (let i = 0; i < json.contratistas.length; i++) 
        if(json.contratistas[i].nombre == contratista) 
          setListaDeContratos(json.contratistas[i].contratos)
    }
    if(contratista)
      fetchContratos()
    else 
      setListaDeContratos([])
	}, [contratista])

	return (
		<div className="w-full flex flex-col gap-2">
			<label htmlFor="contrato">Seleccione numero del contrato:</label>
			<select id="contrato" className="px-3 py-2 border border-[#DEE2E6] rounded-[6px] custom-select focus:outline-none" value={contrato} onChange={contratoHandleChange} >
        <option value="" >Seleccione un contrato</option>
        {
          listaDeContratos.map((contrato, key) => 
            <option key={key}> { contrato } </option>
          )
        }
			</select>
		</div>
	)
  
}