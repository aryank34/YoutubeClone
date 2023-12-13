const videoCardContainer = document.querySelector('.video-wrapper');


let api_key = "AIzaSyASFCxVlh9Vy5EyipLgVTPEcnF0HxtmXXc";
let video_http = "https://www.googleapis.com/youtube/v3/videos?" //since we need alot of videos, add ? at the end of url
let channel_http = "https://www.googleapis.com/youtube/v3/channels?" //since we need alot of channels, add ? at the end of url

fetch(
    video_http + new URLSearchParams({
        part: "snippet, contentDetails, statistics, player",
        chart: "mostPopular",
        maxResults: 20,
        regionCode: "IN",
        key: api_key,
    })
)
    .then((res) => res.json())
    .then((data) => {
        //channel icon
        data.items.forEach((item) => {
            getChannelIcon(item);
        });
    })
    .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(
        channel_http + new URLSearchParams({
            key: api_key,
            part: "snippet",
            id: video_data.snippet.channelId,
        })
    )
        .then((res) => res.json())
        .then((data) => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        });

};

const playVideo = (embedHtml) => {
    sessionStorage.setItem("videoEmbedHtml", embedHtml);

    window.location.href = "video-page.html";
}


const makeVideoCard = (data) => {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video");
    videoCard.innerHTML = `
        <div class="video-content">
            <img src="${data.snippet.thumbnails.high.url}" alt="thumbnail" class="thumbnail">
        </div>
        <div class="video-details">
            <div class="channel-logo">
                <img src="${data.channelThumbnail}" alt="channel-logo" class="channel-icon">
            </div>
            <div class="detail">
                <h3 class="title">${data.snippet.title}</h3>
                <div class="channel-name">${data.snippet.channelTitle}</div>
            </div>
        </div>
    `;

    videoCard.addEventListener("click", () => {
        playVideo(data.player.embedHtml);
        document.querySelector(".video-wrapper").innerHTML = "";
    })

    videoCardContainer.appendChild(videoCard);
}








