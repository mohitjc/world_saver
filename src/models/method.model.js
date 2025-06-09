import { orderBy } from 'lodash';

const userClick = () => {
    setTimeout(() => {
        let el = document.getElementById("getMemberDetail")
        if (el) el.click()
    }, 200);
}


const scrollById = (id) => {
    let element = document.getElementById(id)
    var headerOffset = 85;
    var elementPosition = element?.getBoundingClientRect().top;
    var offsetPosition = elementPosition - headerOffset;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}

const isNumber = (e) => {
    let key = e.target;
    let maxlength = key.maxLength ? key.maxLength : 1;

    key.value = key.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    let max = Number(key.max ? key.max : key.value);
    if (Number(key.value) > max) key.value = max;

    let min = key.min;
    if (min && Number(key.value) < Number(min)) key.value = min;
    if (key.value.length > maxlength) key.value = key.value.slice(0, maxlength);
    return key.value
}

function getEmbedUrl(youtubeUrl) {
  // Extract the video ID from various YouTube URL formats
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?\s]+)/;
  const match = youtubeUrl.match(regex);
  if (match && match[1]) {
    const videoId = match[1];
    return videoId;
  }
  return null; // Return null if no valid video ID found
}

const getYoutubeId = (p) => {
    if(getEmbedUrl(p)) return getEmbedUrl(p)
    let value = ''
    let ext = p.split('https://youtu.be/')
    if (ext.length == 2) value = ext[1]
    if (!value) {
        ext = p.split('https://www.youtube.com/shorts/')
        if (ext.length == 2) value = ext[1]
    }
    if (!value) {
        value = urlParams(p, 'v')
    }
    
    return `https://www.youtube.com/embed/${value}`
}


const getYoutubeId1 = (p) => {
    if(getEmbedUrl(p)) return getEmbedUrl(p)
    let value = ''
    let ext = p.split('https://youtu.be/')
    if (ext.length == 2) value = ext[1]
    if (!value) {
        ext = p.split('https://www.youtube.com/shorts/')
        if (ext.length == 2) value = ext[1]
    }
    if (!value) {
        value = urlParams(p, 'v')
    }
    return value
}


const addThread = (p) => {
    let list = []
    let data = ''
    let value = ''
    if (p.list) list = p.list
    if (p.data) data = p.data

    list.push(data)
    list = orderBy(list, 'updatedAt', 'desc');
    return value
}

const updateThread = (p) => {
    let list = []
    let index = -1
    let data = ''
    let value = ''
    if (p.list) list = p.list
    if (p.index > -1) index = p.index
    if (p.data) data = p.data
    if (list.length) {
        list[index].user_post = data.user_post
        list[index].images = data.images
    }

    if (p.type == 'update') {
        value = list
    }

    return value
}

const getParams = (key) => {
    const search = window.location.search
    const value = new URLSearchParams(search).get(key)||'';
    return value
}

const urlParams = (url, key) => {
    let ext = url.split('?')
    let prm = ''
    if (ext.length == 2) prm = ext[1]
    // const paramsString = 'app=desktop&v=59jKcZoPIgA';
    let searchParams = new URLSearchParams(prm);
    return searchParams.get(key)||''
}

const rebuildTooltip = () => {
    document.getElementById("rebuildTooltip").click()
}


const methodModel = { userClick, scrollById, getParams,updateThread, addThread, getYoutubeId, getYoutubeId1, urlParams, rebuildTooltip, isNumber }
export default methodModel