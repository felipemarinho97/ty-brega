import Axios from "axios";
import { Duration } from "moment";

const YT_API_KEY: string = "AIzaSyDlXLY_DOC82vcHqHz52u0uMv_1k6yaBWE"


export function genStartAt(iDur: Duration): string {
    return `${iDur.hours() !== 0 ? `${iDur.hours().toString().padStart(2,'0')}:` : ''}${iDur.minutes().toString().padStart(2,'0')}:${iDur.seconds().toString().padStart(2,'0')}`
}

function ISODateString(d: Date) {
    function pad(n: number) { return n < 10 ? '0' + n : n }
    return d.getUTCFullYear() + '-'
        + pad(d.getUTCMonth() + 1) + '-'
        + pad(d.getUTCDate()) + 'T'
        + pad(d.getUTCHours()) + ':'
        + pad(d.getUTCMinutes()) + ':'
        + pad(d.getUTCSeconds()) + 'Z'
}

export function getLast(criteria: 'Month' | 'Week' | 'Day', qtd: number): string {
    let d: Date = new Date();
    let n: number = d.getTime();

    switch (criteria) {
        case 'Day':
            n -= 86400000 * qtd;
            break;
        case 'Week':
            n -= 86400000 * 7 * qtd;
            break;
        case 'Month':
            n -= 86400000 * 31 * qtd;
            break;
        default:
            break;
    }

    return ISODateString(new Date(n));
}

export function getVideos(channel: ChannelConfig, pubAfter: string) {
    console.log(`https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${channel.id}&part=snippet,id&order=viewCount&maxResults=${channel.videoAmount}` +
    `&publishedAfter=${pubAfter}`);
    
    return Axios.get(`https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${channel.id}&part=snippet,id&order=viewCount&maxResults=${channel.videoAmount}` +
        `&publishedAfter=${pubAfter}`)
}

export enum Channel {
    TAO_FALANDO_POR_AI = "UCjqvc5zZD4x3l5xa8BW1QjA",
    E_A_TROPA_FILMES = "UC5IOhqLxOActH2osnJZSpcA",
    THIAGO_GRAVACAOES = "UCtvpfjk5BHBqdApLFe_Drlg",
    THIAGO_GRAVACAOES_APRESENTA = "UCRY0rGMiDRT9vG-bugHOrpA",
    MR_ALEMAO = "UCnLO-4lcGYyODy95AFQZ64w",
    BREGA_EXCLUSIVO = "UCv1yCDLbYIETo4YUSlJYSnA",
    MANO_DJHAY = "UCpP4WN0Sr8VAFuIb8vYnW5A",
    AUGUSTO_E_THIAGO = "UCyLSz2PE4-WnOUYnMYJKZTg"
}

export interface ChannelConfig {
    id: Channel,
    videoAmount: number
}

export const taoFalandoPorAi: ChannelConfig = {
    id: Channel.TAO_FALANDO_POR_AI,
    videoAmount: 5
}

export const thiagoGravacoes: ChannelConfig = {
    id: Channel.THIAGO_GRAVACAOES,
    videoAmount: 3
}

export const thiagoGravacoesApresenta: ChannelConfig = {
    id: Channel.THIAGO_GRAVACAOES_APRESENTA,
    videoAmount: 7
}

export const mrAlemao: ChannelConfig = {
    id: Channel.MR_ALEMAO,
    videoAmount: 5
}

export const manoDjhay: ChannelConfig = {
    id: Channel.MANO_DJHAY,
    videoAmount: 2
}

export const eATropaFilmes: ChannelConfig = {
    id: Channel.E_A_TROPA_FILMES,
    videoAmount: 5
}

export const bregaExclusivo: ChannelConfig = {
    id: Channel.BREGA_EXCLUSIVO,
    videoAmount: 5
}

export const augustoEThiago: ChannelConfig = {
    id: Channel.AUGUSTO_E_THIAGO,
    videoAmount: 3
}
