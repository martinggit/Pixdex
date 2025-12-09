import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { IGeneroContenidoAudiovisual } from "../data/generosContenidoAudiovisual";
import { ITipoContenidoAudiovisual } from "../data/tiposContenidoAudiovisual";
import { getContenidos, getGeneros, getTipos } from "./servicios";

export function getTiposConDemora(): Promise<ITipoContenidoAudiovisual[]> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const tipos = await getTipos();
        resolve(tipos);
      } catch (error) {
        reject(error);
      }
    }, 4000);
  });
}

export function getContenidosConDemora(): Promise<IContenidoAudiovisual[]> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const contenidos = await getContenidos();
        resolve(contenidos);
      } catch (error) {
        reject(error);
      }
    }, 8000);
  });
}

export function getGenerosConDemora(): Promise<IGeneroContenidoAudiovisual[]> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const generos = await getGeneros();
        resolve(generos);
      } catch (error) {
        reject(error);
      }
    }, 6000);
  });
}
