import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { inputDateFormat } from './constants';
import { API } from "./config";

let getHeroes = async function(){
  try {
    const response = await axios.get(`${API}/heroes.json`);
    let data = parseList(response);
    const heroesData = data.map((h) => {
      h.originDate = format(parseISO(h.originDate), inputDateFormat);
      return h;
      });
    console.log(`formatted heroes data: ${heroesData}`);
    return heroesData;
  } 
  catch (error) {
    console.error(error);
    return [];
  }
}

let parseList = (response) => {
  if (response.status != 200) throw Error(response.message);
  if (!response.data) return []; 
  let list = response.data;
  if (typeof list != 'object') {
      list = [];
  }
  return list;

}

export const data = {
  getHeroes,
}