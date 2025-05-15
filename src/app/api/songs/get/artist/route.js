import { NextResponse } from "next/server";


export async function POST(req) {
    const data = await req.json();
    const artist = data.artist;
    if (!artist) {
        return NextResponse.json({ "response": "Missing Artist" });
    }


    const artistSearchUrl = `https://api.deezer.com/search/artist?q=${encodeURIComponent(artist)}`;
    const artistResponse = await fetch(artistSearchUrl);
    const artistData = await artistResponse.json();

    if (!artistData.data || artistData.data.length === 0) {
        return NextResponse.json({ "response": "Artist not found" });
    }


    const matchedArtist = artistData.data.find(e => e.name.toLowerCase() === artist.toLowerCase());
    const artistId = matchedArtist.id;
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