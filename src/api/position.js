import axios from "axios";

const DOMAIN = "https://hicru-assessment-backend.onrender.com";
const API_BASE_POSITION_ENDPOINT =  `${DOMAIN}/api/positions`;
const API_KEY = "8qLP7pS52L36SwcykStk40WlJCfsEH4AHH9TlhnFVuw28AEWnYeCpoYO1ETLEFFJgZSltW9CENdey2vVWFEuDtBRHm5wWYyAqiWAYG7GIVL7MByUC4nQpj6rHMXcCH0U";

const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
    "X-Api-Key": API_KEY
}

export const getAllPositions = async() => {

    const response = await axios
                        .get(API_BASE_POSITION_ENDPOINT, {
                            headers: {
                                ...DEFAULT_HEADERS 
                            }
                        })
                        .then(response => {
                            return response;
                        })
                        .catch(error => {
                            return error.response;
                        });
    
    if(response.status === 200) {
        return response.data;
    }

    return null;
}

export const savePosition = async(position) => {

    const response = await axios
                            .post(API_BASE_POSITION_ENDPOINT, position, {
                                headers: {
                                    ...DEFAULT_HEADERS 
                                }
                            })
                            .then(response => {
                                return response;
                            })
                            .catch(error => {
                                return error.response;
                            });

    if(response.status === 200) {
        return response.data;
    }

    return null;
}

export const editPosition = async(positionId, position) => {

    const response = await axios
                            .put(`${API_BASE_POSITION_ENDPOINT}/${positionId}`, position, {
                                headers: {
                                    ...DEFAULT_HEADERS 
                                }
                            })
                            .then(response => {
                                return response;
                            })
                            .catch(error => {
                                return error.response;
                            });

    if(response.status === 200) {
        return response.data;
    }

    return null;
}

export const deletePosition = async(positionId) => {

    const response = await axios
                            .delete(`${API_BASE_POSITION_ENDPOINT}/${positionId}`, {
                                headers: {
                                    ...DEFAULT_HEADERS 
                                }
                            })
                            .then(response => {
                                return response;
                            })
                            .catch(error => {
                                return error.response;
                            });

    if(response.status === 200) {
        return true;
    }

    return false;
}
