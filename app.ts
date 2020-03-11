import Axios, { AxiosResponse } from "axios";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { stringify } from "circular-json";
import {
  getLast,
  getVideos,
  taoFalandoPorAi,
  eATropaFilmes,
  thiagoGravacoes,
  thiagoGravacoesApresenta,
  mrAlemao,
  bregaExclusivo,
  manoDjhay,
  genStartAt,
  augustoEThiago
} from "./util";
import { load } from "cheerio";
import { duration, Duration } from "moment";
import startCase from "lodash.startcase";
import { capitalize } from "lodash";

type SupportedTimings = "Month" | "Week" | "Day";

const TIMING: SupportedTimings = "Month";
const AMOUNT: number = 1;

const fileDate: string = new Date().toLocaleDateString();
const pubAfter: string = getLast(TIMING, AMOUNT);

async function main(): Promise<gapi.client.youtube.SearchResult[]> {
  const videos: gapi.client.youtube.SearchResult[] = [];

  await getVideos(taoFalandoPorAi, pubAfter)
    .then((res: AxiosResponse<gapi.client.youtube.SearchListResponse>) => {
      if (res.data.items) videos.push(...res.data.items);
    })
    .catch(console.log);

  await getVideos(eATropaFilmes, pubAfter)
    .then((res: AxiosResponse<gapi.client.youtube.SearchListResponse>) => {
      if (res.data.items) videos.push(...res.data.items);
    })
    .catch(console.log);

  await getVideos(thiagoGravacoes, pubAfter)
    .then((res: AxiosResponse<gapi.client.youtube.SearchListResponse>) => {
      if (res.data.items) videos.push(...res.data.items);
    })
    .catch(console.log);

  await getVideos(thiagoGravacoesApresenta, pubAfter)
    .then((res: AxiosResponse<gapi.client.youtube.SearchListResponse>) => {
      if (res.data.items) videos.push(...res.data.items);
    })
    .catch(console.log);

  await getVideos(mrAlemao, pubAfter)
    .then((res: AxiosResponse<gapi.client.youtube.SearchListResponse>) => {
      if (res.data.items) videos.push(...res.data.items);
    })
    .catch(console.log);

  await getVideos(bregaExclusivo, pubAfter)
    .then((res: AxiosResponse<gapi.client.youtube.SearchListResponse>) => {
      if (res.data.items) videos.push(...res.data.items);
    })
    .catch(console.log);

  await getVideos(manoDjhay, pubAfter)
    .then((res: AxiosResponse<gapi.client.youtube.SearchListResponse>) => {
      if (res.data.items) videos.push(...res.data.items);
    })
    .catch(console.log);

  await getVideos(augustoEThiago, pubAfter)
    .then((res: AxiosResponse<gapi.client.youtube.SearchListResponse>) => {
      if (res.data.items) videos.push(...res.data.items);
    })
    .catch(console.log);

  writeFileSync(
    `videos-${fileDate}-${AMOUNT}-${TIMING}.json`,
    stringify(videos)
  );
  return videos;
}

export function generateFinalJson() {
  let videos: Promise<gapi.client.youtube.SearchResult[]>;
  if (!existsSync(`videos-${fileDate}-${AMOUNT}-${TIMING}.json`))
    videos = main();
  else
    videos = Promise.resolve(
      JSON.parse(
        readFileSync(`videos-${fileDate}-${AMOUNT}-${TIMING}.json`).toString()
      )
    );

  videos.then(res => {
    const finalVideos = [];
    for (let i = 0; i < res.length; i++) {
      const searchResult: gapi.client.youtube.SearchResult = res[i];

      const videoURL =
        "https://www.youtube.com/watch?v=" + searchResult.id.videoId;
      Axios.get(videoURL).then((r: AxiosResponse) => {
        const $: CheerioStatic = load(r.data);

        const views: number = parseInt(
          $('meta[itemprop="interactionCount"]').attr("content")
        );
        const publishedAt: string = $('meta[itemprop="datePublished"]').attr(
          "content"
        );
        const duration: string = $('meta[itemprop="duration"]').attr("content");

        console.log(
          searchResult.snippet.title,
          videoURL,
          views,
          publishedAt,
          duration
        );

        finalVideos.push({
          videoURL,
          views,
          publishedAt,
          duration,
          title: searchResult.snippet.title,
          channel: searchResult.snippet.channelTitle
        });

        if (finalVideos.length == res.length) {
          const sortedFinalVideos = finalVideos.sort(
            (a, b) => b.views - a.views
          );
          console.log(sortedFinalVideos);
          writeFileSync(
            `final-videos-${fileDate}-${AMOUNT}-${TIMING}.json`,
            stringify(sortedFinalVideos)
          );

          generateDescription();
        }
      });
    }
  });
}

export function generateDescription() {
  const finalVideos = JSON.parse(
    readFileSync(`final-videos-${fileDate}-${AMOUNT}-${TIMING}.json`).toString()
  );

  const iDur = duration("PT0M");

  console.log(
    `\n\n\r=> TRACKLIST of Best Bregas of last ${AMOUNT} ${TIMING}.\n\n`
  );

  // iDur.subtract(duration("PT0M42S"));
  let i = 1;

  for (const videos of finalVideos) {
    const d: Duration = duration(videos.duration);

    const startAt = genStartAt(iDur);
    const exp: RegExp = new RegExp(
      "(CLIPE OFICIAL|(Á|A)UDIO OFICIAL)|\\(MrAllemão\\)",
      "gi"
    );

    console.log(
      `${i}. ` +
        videos.title
          .replace(exp, "")
          .toLowerCase()
          .replace(/\w+/g, capitalize),
      startAt,
      videos.videoURL
    );
    iDur.add(d);
    i++;
  }
}

export function generatePlaylist() {
  const finalVideos = JSON.parse(
    readFileSync(`final-videos-${fileDate}-${AMOUNT}-${TIMING}.json`).toString()
  );

  const ids: string[] = finalVideos.map(
    (videos: any) => videos.videoURL.split("v=")[1]
  );

  console.log(
    `\n\n\r=> Playlist link of the best Brega Funk for the last ${AMOUNT} ${TIMING}.\n\n`,
    "\rhttps://www.youtube.com/watch_videos?video_ids=" + ids.join(",") + "\n\n"
  );
}
