const validar = (name, lastName, email, country, comments) => {

    const errors = {};
    
    if (!name) {
      errors.name = "Nombre es requerido";
    }
    if (!lastName) {
      errors.lastName = "Apellido es requerido";
    }
    if (!email) {
      errors.email = "Email es requerido";
    } else if (! /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email)) {
      errors.email = "El email no es valido";
    }
    if(!country){
        errors.country = "Pais Requerido";
    }
    if (!comments) {
      errors.comments = "Comententario Requerido";
    }
    return errors;
};

module.exports = validar;
