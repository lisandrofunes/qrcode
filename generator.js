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
    const btn = document.getElementById('btn_download');
    const btnp = document.getElementById('btn_print');

    let qrimg = document.querySelector('img');
    let qrsrc = qrimg.getAttribute('src');   

    btn.removeAttribute('hidden');
    btnp.removeAttribute('hidden');
    
    btn.setAttribute('href', qrsrc);

    btn.setAttribute('style', 'display: block;');
    btnp.setAttribute('style', 'display: block;');
}

function imprimir(){
    const qr = document.getElementById('containerQR').innerHTML;
    const body = document.querySelector('body').innerHTML;
    document.querySelector('body').innerHTML = qr;
    window.print();
    document.querySelector('body').innerHTML = body;
}