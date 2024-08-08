const { useState, useEffect } = React;

const ContratistaSelect = ( { contratista, setContratista } ) => {
	const [listaContratistas, setListaContratistas] = useState([]);

	const contratistaHandleChange = (event) => {
		setContratista(event.target.value);
	}

	useEffect(() => {
		async function fetchContratistas () {
		  const response = await fetch("../../json/contratos.json")
		  const json = await response.json()
		  const contratistas = json.contratistas.map(contratista => contratista.nombre)
		  setListaContratistas(contratistas)
		}
	
		fetchContratistas()
	}, [setListaContratistas]) 

  return (
		<div className="w-full flex flex-col gap-2">
			<label htmlFor="contratista" className="">Seleccione una contratista:</label>
			<select id="contratista" className="px-3 py-2 border border-[#DEE2E6] rounded-[6px] custom-select focus:outline-none" onChange={ contratistaHandleChange } value={contratista}>
				<option value="">Seleccione una contratista</option>
					{
						listaContratistas.map((contratista, key) => 
							<option value={contratista} key={key}>{contratista}</option>    
						)
					}	
			</select>
		</div>  
  )
}