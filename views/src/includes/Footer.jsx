import React from "react";

const Footer=()=>{
    return(
        <>
        <footer className="bg-primary text-light py-4 custom-footer">
            <div className="container ">
                <div className="row ">
                <div className="col-md-4 ">
                    <h5>El Que Sabe</h5>
                    <p>El Que Sabe es un producto único, diseñado para usuarios que necesitan ofrecer o tomar servicios para abordar necesidades específicas, a menudo difíciles de descubrir en línea.Síguenos:</p>
                    <img src="/images/iconFacebook.jpg" alt="Facebook icon" className="icons"/>
                    <img src="/images/instagramLogo.png" alt="Instagram icon" className="icons"/>
                </div>
                <div className="col-md-4">
                    <h5>Buscador</h5>
                    <p>Todos los freelancers</p>
                    <p>Tecnologia</p>
                    <p>Hogar</p>
                </div>
                <div className="col-md-4">
                    <h5>Suscripción</h5>
                    <form>
                    <div className="input-group mb-3">
                        <p>Únete a nuestra lista de correos para mantenerte informado sobre nuestros lanzamientos de funciones más recientes, nuevos freelancers u ofertas, consejos y trucos para navegar por El Que Sabe.</p>
                        <input type="email" className="form-control" placeholder="Ingresa tu correo electrónico" aria-label="Ingresa tu correo electrónico" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                        <button className="btn btn-light" type="button" id="button-addon2">Suscribirse</button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
                <div className="row">
                <div className="col">
                    <p className="text-center">copyright © 2024 El Que Sabe.</p>
                </div>
                </div>
            </div>
            </footer>
        </>
    );
}

export default Footer;