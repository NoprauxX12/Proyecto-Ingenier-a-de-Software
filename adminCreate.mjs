const {AdminData} = require("../Proyecto-Ingenieria-de-Software/views/src/services/admin"); 

const data = {
    id_admin: "1033256590",
    name: "Juan Rua",
    email: "juanprc2017@gmail.com",
    password: "pekitas352004"
};

async function signUpAdmin(data) {
    try {
        const response = await AdminData.verifySignUpAdminSignUpAdmin(data);

        // Manejar la respuesta
        console.log("Respuesta del servidor:", response);

        // Devolver la respuesta o realizar otras operaciones según sea necesario
        return response;
    } catch (error) {
        // Manejar errores
        console.error("Error al llamar a SignUpAdmin:", error);
        throw error; // Opcional: relanzar el error para que el código que llamó a esta función pueda manejarlo
    }
}

// Llamar a la función signUpAdmin con los datos proporcionados
signUpAdmin(data)