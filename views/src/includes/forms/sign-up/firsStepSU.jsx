

const FrirstStep = ({formValues, users, handleChange, step})=>{
    return(
    <div>
        <fieldset>
            <div className="form__container">
                <legend id="log_in">
                    <span style={{ color: '#3D00B7' }}>Sign </span>
                    <span style={{ color: '#55ACEE' }}>Up</span>
                </legend>
                <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Paso</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={step+" de 3"} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFreelancer/client" className="form-label mt-4">Tipo de Usuario</label>
                    <select className="form-control" style={{ backgroundColor: 'rgb(236, 236, 236)' }} id="exampleFreelancer/client" name="user" onChange={handleChange}>
                        <option value={"0"}>{users[formValues.user]}</option>
                        <option value={"1"}>Freelancer</option>
                        <option value={"2"}>Cliente</option>
                        {formValues.user!=="0" && (
                        <option value={"0"}>...</option>
                        )}
                    </select>
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label mt-4">Dirección de Email</label>
            <input value={formValues.email} type="email" name="email" className="form-control" onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingrese Email" required />
            <small id="emailHelp" className="form-text text-muted">No compartiremos tu Email.</small>
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label mt-4 ">Contraseña</label>
            <input value={formValues.password1} type="password" name="password1" className="form-control" id="exampleInputPassword1" placeholder="Contraseña" autoComplete="off" required onChange={handleChange} />
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label mt-4">Confirmar Contraseña</label>
            <input value={formValues.password2}  type="password" name="password2" className="form-control" id="exampleInputPasswordConfirm1" placeholder="Confirmar Contraseña" autoComplete="off" onChange={handleChange}/>
            </div>
        </div>
        </fieldset>
    </div>
    );

}

export default FrirstStep;