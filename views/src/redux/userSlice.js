import { createSlice } from "@reduxjs/toolkit";

const initialState={
        tipo: "",
        name: "",
        idCard: "",
        telphone: "",
        cellphone: "",
        adress: "",
        email: "",
        password: "",
        idCity: "",
        profilePhoto: null,
        description: "",
};

export const userSlice= createSlice({
    name: "user", //este nombre es con el cual se llamara la variable despues
    initialState: initialState,
    reducers:{ //state es basicamente la referencia al objeto de estado inicial, action es quien recibe los parametros
         addUser_1:(state, action)=>{
            const{password, email, tipo} =action.payload;
            state.password=password;
            state.tipo = tipo;
            state.email= email;
         },
         addUser_2: (state, action)=>{
            const {idCity, adress, cellphone} = action.payload;
            state.adress=adress;
            state.idCity=idCity;
            state.cellphone= cellphone;
         },
         addUser_3: (state, action)=>{
            const {name, description, idCard} = action.payload;
             state.name=name;
             state.description=description;
             state.idCard = idCard;
         },
         addPhoto:(state, action)=>{
            state.profilePhoto= action.payload;
         }
    }
});

export const {addUser_1, addUser_2, addUser_3, addPhoto} = userSlice.actions;

export default userSlice.reducer;