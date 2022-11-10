const containerQR = document.getElementById('containerQR');
const form = document.getElementById('form');

const QR = new QRCode(containerQR);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    QR.makeCode(form.link.value);
    setTimeout(() => {
        addBtn();
    }, 300)
})

function addBtn(){
    const btn_download = document.getElementById('btn_download');
    const btn_share = document.getElementById('btn_share');

    let qrimg = document.querySelector('img');
    let qrsrc = qrimg.getAttribute('src');

    btn_download.removeAttribute('hidden');
    btn_share.removeAttribute('hidden');
    
    btn_download.setAttribute('href', qrsrc);

    btn_download.setAttribute('style', 'display: flex;');
    btn_share.setAttribute('style', 'display: flex;');
}

async function share(){
    let qrimg = document.querySelector('img');
    let qrsrc = qrimg.getAttribute('src');
    const response = await fetch(qrsrc);
    const blob = await response.blob();
    const filesArray = [
        new File(
            [blob],
            'meme.jpg',
            {
              type: "image/jpeg",
              lastModified: new Date().getTime()
            }
         )
    ];
    const shareData = {
        files: filesArray,
    };
    navigator.share(shareData);

}