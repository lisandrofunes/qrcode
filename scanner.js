var scanner = new Instascan.Scanner({
    video: document.getElementById('preview'),
    scanPeriod: 5,
    mirror: false
});

var result;

Instascan.Camera.getCameras().then(function (cameras){

    if(cameras.length>1){
        const check = document.getElementById('changeCamera');
        check.removeAttribute('hidden');
        scanner.start(cameras[1]);
        cam = 1;

        check.addEventListener('click', function(){
            check.setAttribute('style', '-webkit-transform: rotatey(180deg); transition: 1s linear;');

            if(cam==0){
                scanner.stop();
                scanner.start(cameras[1]);
                cam = 1;
            }
            else{
                scanner.stop();
                scanner.start(cameras[0]);
                cam = 0;
            }
            check.removeAttribute('style');
        })

    }else{  
        if(cameras.length>0){
            scanner.start(cameras[0]);
        }
        else{
            console.error('No se encontraron cámaras.');
            alert('No se encontraron cámaras.');
        }
    }
}).catch(function(e){
    console.error(e);
    alert(e);
});

scanner.addListener('scan', function(response){
    const check = document.getElementById('changeCamera');
    result = response;
    scanner.stop();
    check.setAttribute('hidden', true);
    addElements();
})

function addElements(){
    const btn_copy = document.getElementById('btn_copy');
    const btn_go = document.getElementById('btn_go');
    const btn_refresh = document.getElementById('btn_refresh');
    const vid = document.getElementById('preview');
    const txt = document.getElementById('qrcontent');

    vid.setAttribute('style', 'display: none;');

    txt.removeAttribute('hidden');
    txt.innerHTML = result;

    btn_copy.removeAttribute('hidden');
    btn_copy.setAttribute('style', 'display: flex;');

    var aux = 0;
    for(var i=0; i < result.length; i++){
        if(result.charAt(i)==' '){
            aux+=1;
        }
    }

    if(aux == 0){
        btn_go.removeAttribute('hidden');
        btn_go.setAttribute('href', result);
        btn_go.setAttribute('style', 'display: flex;');
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
