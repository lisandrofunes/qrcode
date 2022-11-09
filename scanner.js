var scanner = new Instascan.Scanner({
    video: document.getElementById('preview'),
    scanPeriod: 5,
    mirror: false
});

var result;

Instascan.Camera.getCameras().then(function (cameras){
    if(cameras.length>1){
        changeCamera();
        scanner.start(cameras[1]);
    }else{  
        if(cameras.length>0){
            scanner.start(cameras[0]);
        }else{
            console.error('No se encontraron cámaras.');
            alert('No se encontraron cámaras.');
        }
    }
}).catch(function(e){
    console.error(e);
    alert(e);
});

scanner.addListener('scan', function(response){
    result = response;
    scanner.stop();
    addElements();
})

function addElements(){
    const btn_copy = document.getElementById('btn_copy');
    const btn_go = document.getElementById('btn_go');
    const btn_refresh = document.getElementById('btn_refresh');
    const vid = document.getElementById('preview');
    let txt = document.getElementById('qrcontent');

    vid.setAttribute('style', 'display: none;');

    txt.removeAttribute('hidden');
    txt.innerHTML = result;

    btn_copy.removeAttribute('hidden');

    var aux = 0;
    for(var i=0; i < result.length; i++){
        if(result.charAt(i)==' '){
            aux+=1;
        }
    }

    if(aux == 0){
        btn_go.removeAttribute('hidden');
        btn_go.setAttribute('href', result);
    }

    btn_refresh.removeAttribute('hidden');
}

function copy(){
    navigator.clipboard.writeText(result);

    const imput = document.createElement('imput');
    const cont = document.getElementsByClassName('container');

    imput.innerHTML = "Texto copiado";
    imput.className = "message";

    cont[0].appendChild(imput);

    setTimeout(function(){
        imput.style.opacity = 1;
    }, 1);

    setTimeout(function(){
        imput.style.opacity = 0;
    }, 2500);

    setTimeout(function(){
        imput.remove();
    }, 3000)
}

function changeCamera(){
    const check = document.getElementById('changeCamera');
    check.removeAttribute('hidden');

    check.addEventListener('change', function(){
        if(this.checked){
            scanner.stop();
            scanner.start(cameras[0]);
        }else{
            scanner.stop();
            scanner.start(cameras[1]);
        }
    })

}