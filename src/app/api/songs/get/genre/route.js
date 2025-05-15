import { NextResponse } from "next/server";


export async function POST(req) {
    const data = await req.json();
    const genre = data.genre;
    if (!genre) {
        return NextResponse.json({ "response": "Missing Genre" });
    }


    const genresUrl = `https://api.deezer.com/genre`;
    const genresResponse = await fetch(genresUrl);
    const genresData = await genresResponse.json();

    if (!genresData.data || genresData.data.length === 0) {
        return NextResponse.json({ "response": "No genres found" });
    }

    const matchedGenre = genresData.data.find(e => e.name.toLowerCase() === genre.toLowerCase());
    if (!matchedGenre) {
        return NextResponse.json({ "response": "Genre not found" });
    }
    const genreId = matchedGenre.id;


    const artistsUrl = `https://api.deezer.com/genre/${genreId}/artists`;
    const artistsResponse = await fetch(artistsUrl);
    const artistsData = await artistsResponse.json();

    if (!artistsData.data || artistsData.data.length === 0) {
        return NextResponse.json({ "response": "No artists found for this genre" });
    }


    const randomArtist = artistsData.data[Math.floor(Math.random() * artistsData.data.length)];
    const artistId = randomArtist.id;

    const tracksUrl = `https://api.deezer.com/artist/${artistId}/top?limit=50`;
    const tracksResponse = await fetch(tracksUrl);
    const tracksData = await tracksResponse.json();

    if (!tracksData.data || tracksData.data.length === 0) {
        return NextResponse.json({ "response": "No songs found for this artist" });
    }
    const randomIndex = Math.floor(Math.random() * tracksData.data.length);
    const randomSong = tracksData.data[randomIndex];
    const song = {
        title: randomSong.title,
        artist: randomSong.artist.name,
        album: randomSong.album.title,
        preview: randomSong.preview,
        cover: randomSong.album.cover_medium,
    };
    return NextResponse.json({ song });
}