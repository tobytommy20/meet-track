import axios from "axios";

const API = "/api/Staff";

export const getStaff = () => axios.get(API);

export const createStaff = (data: any) => axios.post(API, data);

export const deleteStaff = (id: number) => axios.delete(`${API}/${id}`);
