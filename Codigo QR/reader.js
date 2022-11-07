var scanner = new Instascan.Scanner({
    video: document.getElementById('preview'),
    scanPeriod: 5,
    mirror: false
});

var result;

Instascan.Camera.getCameras().then(function (cameras){
    if(cameras.length>0){
        scanner.start(cameras[0]);

    }else{
        console.error('No cameras found.');
        alert('No cameras found.');

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
    btn_copy.addEventListener('click',function(){
        navigator.clipboard.writeText(result);
    })

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
