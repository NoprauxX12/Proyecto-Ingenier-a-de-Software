import React from "react"

const EstimateContainer =()=>{
    return (<>
        <div style={{
            position: 'absolute',
            backgroundSize: 'cover',
            minHeight: '100vh',
            display: 'flex',
            height: '100%',
            maxWidth: '71.4%',
            width: '100%',
            }}>
            <div style={{ position: 'absolute', top: '0',  width: '100%', maxWidth: '100', backgroundColor: '#ffffff', padding: '1.16rem', borderBottom: '1px solid #ddd', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: '999', float: "left" }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', marginRight: '15px', display: 'inline-block' }}>        
                    <img src="/images/defaultUser.png" alt="Not" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />                            
                </div>
                <span style={{ fontSize: '1.8rem', color: '#333', fontFamily: 'Comfortaa, sans-serif', marginRight: 'auto' }}>santiago</span>
                <span><i className="bx bx-message-dots" style={{color: '#4f4f4f', fontSize: "2.5em"}} /></span>
                <span><i class='bx bx-dots-vertical-rounded' style={{color: '#4f4f4f', fontSize: "2.5em", marginLeft: "1em"}}></i></span>
            </div>
            <div className="contentBox">
                <p style={{float: "right"}}>1 de mayo</p>
                <h5 style={{marginBottom: "2em"}}>Medellin -  barrio laureles</h5>
                <h3>Descripción:</h3>
                <p className="textDescriptio">Anim voluptate dolor excepteur ipsum mollit incididunt deserunt deserunt. Ea cupidatat sit culpa nisi non incididunt et id sunt ex voluptate velit consequat est. Nostrud veniam reprehenderit reprehenderit ea sint sunt proident. Ut consectetur culpa magna ullamco reprehenderit anim occaecat mollit. Irure consectetur laboris velit dolore. Ipsum officia tempor proident nostrud excepteur dolore anim consequat. Ex pariatur magna labore commodo amet.</p>
                <h3>Fecha inicio:</h3>
                <p className="textDescriptio">No espeificada</p>
                <h3>Foto:</h3>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDcdFBcZWFO_lMPIUCjtQT75VopMSYsu4pG-t89B3cA&s" alt="" />
                <a className="btne_dark" style={{display: "block", width: "max-content", marginTop: "3em", fontSize: "1.1em"}} href="/">Aceptar Cotizacion</a>
            </div>
        </div>
        </>)
}

export default EstimateContainer;