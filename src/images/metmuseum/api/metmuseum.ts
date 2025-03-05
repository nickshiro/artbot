import type { ArtObject } from "../types/response";

const MET_API_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

async function metmuseum() {
  try {
    const response = await fetch(`${MET_API_BASE}/objects?departmentIds=11`);
    const data = await response.json();

    if (!data.objectIDs || data.objectIDs.length === 0) {
      throw new Error("No paintings found.");
    }

    const randomId =
      data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];

    const paintingResponse = await fetch(`${MET_API_BASE}/objects/${randomId}`);
    const paintingData: ArtObject = await paintingResponse.json();

    if (!paintingData.primaryImage) return metmuseum();

    console.log(paintingData);

    const tags = () => {
      let string = "";
      for (const tag of paintingData.tags) {
        if (tag.term) {
          const term = tag.term.replace(/\s+/g, "").replace(/-/g, "");
          string = string + `#${term} `;
        }
      }
      return string;
    };

    const description = `**${paintingData.title}**, \n${
      paintingData.artistDisplayName
    } ${paintingData.objectDate && "—"} ${paintingData.objectDate} ${
      paintingData.objectDate && "."
    } \n\n${tags()}`;

    return {
      title: paintingData.title,
      image: paintingData.primaryImage,
      description,
    };
  } catch (error) {
    console.error("Error fetching painting:", error);
    return null;
  }
}

export { metmuseum };
