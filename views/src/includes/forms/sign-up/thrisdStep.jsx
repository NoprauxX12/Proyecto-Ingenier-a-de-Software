
const ThirdStep = ({formValues, handleChange, step})=>{
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
                            <label htmlFor="name" className="form-label mt-4">Nombre</label>
                            <input
                            required
                            className="form-control" 
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="idCard" className="form-label mt-4">Cedula</label>
                            <input
                            className="form-control" 
                            required
                            type="text"
                            name="idCard"
                            value={formValues.idCard}
                            onChange={handleChange}
                            placeholder="Cedula"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="adress" className="form-label mt-4">Dirección</label>
                            
                            <input
                            className="form-control" 
                            type="text"
                            required
                            name="adress"
                            value={formValues.adress}
                            onChange={handleChange}
                            placeholder="direccion"
                            />
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="termsCheckbox" required />
                        <label className="form-check-label" htmlFor="termsCheckbox">
                            Acepto los <a href="/files/termnsAndConditions.pdf" target="_blank" rel="noopener noreferrer">términos y condiciones</a>
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="termsCheckbox" required />
                        <label className="form-check-label" htmlFor="termsCheckbox">
                            Acepto la poltica de <a href="/files/dataPolicy.pdf" target="_blank" rel="noopener noreferrer">tratamiento de datos</a>
                        </label>
                        </div>
                    </div>
                </div>
    </>)

}
export default ThirdStep;
