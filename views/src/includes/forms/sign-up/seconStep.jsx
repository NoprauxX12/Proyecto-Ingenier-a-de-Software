
const SecondStep = ({formValues, cityes, handleChange, step})=>{
    return(<>
    <div>
                    <div className="form__container">
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Paso</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={step+" de 3"} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cityes" className="form-label mt-4">Ciudad residencia:</label>
                            <select className="form-control" style={{ backgroundColor: 'rgb(236, 236, 236)' }} id="cityes" name="idCity" onChange={handleChange}>
                            <option value={""}>Seleccione una ciudad</option>
                            {cityes.length>0 && (
                                <>
                                { cityes.map((city)=>(
                                <option value={city.idCity}>{city.name}</option>
                                ))}
                                </>
                            )}
                                
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cellphone" className="form-label mt-4">Celular</label>
                            <input
                            className="form-control" 
                            type="text"
                            name="cellphone"
                            required
                            value={formValues.cellphone}
                            onChange={handleChange}
                            placeholder="celular"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telphone" className="form-label mt-4">Teléfono</label>
                            <input
                            className="form-control" 
                            type="text"
                            name="telphone"
                            value={formValues.telphone}
                            onChange={handleChange}
                            placeholder="telefono"
                            />
                        </div>
                            
                        </div>
                    
                </div>
    </>)

}
export default SecondStep;