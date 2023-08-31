const containerQR = document.getElementById('containerQR');
const form = document.getElementById('form');
const btn_download = document.getElementById('btn_download');
const btn_share = document.getElementById('btn_share');
const btnReload = document.getElementById('btnReload');
const result = document.getElementById('result');

const QR = new QRCode(containerQR);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    QR.makeCode(form.link.value);

    // Añadir un borde blanco al código QR
    const qrCanvas = containerQR.querySelector('canvas');
    const totalSize = qrCanvas.width + 2 * 10; //10 representa el tamaño del borde

    const canvasWithBorder = document.createElement('canvas');
    canvasWithBorder.width = canvasWithBorder.height = totalSize;
    const context = canvasWithBorder.getContext('2d');

    // Llenar el canvas con píxeles blancos
    context.fillStyle = 'white';
    context.fillRect(0, 0, totalSize, totalSize);

    // Dibujar el código QR en el centro del nuevo canvas
    context.drawImage(qrCanvas, 10, 10);

    // Reemplazar el contenido del contenedor con el nuevo canvas
    containerQR.innerHTML = '';
    containerQR.appendChild(canvasWithBorder);

    form.setAttribute('hidden', true)
    result.removeAttribute('hidden');
    result.style.animation = 'fadeIn 1s';
    btn_download.removeAttribute('hidden');

    if (navigator.share){
        btn_share.removeAttribute('hidden');
    }

    btnReload.removeAttribute('hidden')
})

btn_download.addEventListener('click', () => {
    const qrCanvasWithBorder = containerQR.querySelector('canvas');
    const qrSrc = qrCanvasWithBorder.toDataURL('image/png');
    btn_download.setAttribute('href', qrSrc);
    btn_download.setAttribute('download', 'qrcode.png');
});

btn_share.addEventListener('click', () => {
    const qrCanvasWithBorder = containerQR.querySelector('canvas');
    const qrSrc = qrCanvasWithBorder.toDataURL('image/png');
    navigator.share({
        title: 'QR Code',
        text: 'Check out this QR code!',
        url: qrSrc,
    })
});

btnReload.addEventListener('click', () =>{
    location.reload();
})