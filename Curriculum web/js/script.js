//Scroll Reveal
window.sr = ScrollReveal();

sr.reveal('.barra-header', {
    duration: 1500,
    origin: 'top',
    distance: '300px'
});

sr.reveal('.side-bar', {
    duration: 1000,
    origin: 'rigth',
    distance: '300px',
    viewFactor: 0.2
});

sr.reveal('.contenedor', {
    duration: 500,
    origin: 'left',
    distance: '300px',
    viewFactor: 0.2
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
        });
    });
});



//VALIDAR CAMPOS
let nombreCompleto = document.getElementById('nombre');
let razonSocial = document.getElementById('razonSocial');
let mensaje = document.getElementById('mensaje');
let enviar = document.getElementById('btnContacto');
enviar.disabled = true;

function validarCampos(){

    if(this.value == ''){
        this.style.border = '1px solid red';
        this.style.backgroud = 'rgb(255, 226, 226)';
    }
    else{
        this.style.border = '1px solid green';
        this.style.backgroud = 'rgb(226, 255, 229)';
    }


    if(nombreCompleto.value != '' & razonSocial.value != '' & mensaje.value != ''){
        
        enviar.disabled = false;
        enviar.classList.remove("disabled");          
    }
    else{
        enviar.disabled = true;
        enviar.classList.add("disabled");
    }

}

nombreCompleto.addEventListener('blur', validarCampos);
razonSocial.addEventListener('blur', validarCampos);
mensaje.addEventListener('blur', validarCampos);



//MODO OSCURO

modoOscuro();

function modoOscuro(){

    document.querySelector('#switch').addEventListener('change', () => {

        document.querySelector('#barra-header').classList.toggle('oscuro-barra');
        document.querySelector('.side-bar').classList.toggle('oscuro-side-bar');
        document.querySelector('body').classList.toggle('body-oscuro');
        document.querySelector('button').classList.toggle('oscuro-btn');
        document.querySelector('#btnContacto').classList.toggle('oscuro-btn');
        document.querySelector('#footer').classList.toggle('oscuro-footer');



        var iconos = document.querySelectorAll('i');
        for(var i = 0; i < iconos.length; i++){
            iconos[i].classList.toggle('iconos-oscuro');
        }
        
        var section = document.querySelectorAll('section');
        for(var i = 0; i < section.length; i++){
            section[i].classList.toggle('oscuro-section');
        }

        var box_shadow = document.querySelectorAll('.box-shadow');
        for(var i = 0; i < box_shadow.length; i++){
            box_shadow[i].classList.toggle('oscuro-section');
        }

        var target = document.querySelectorAll('.hab');
        for(var i = 0; i < target.length; i++){
            target[i].classList.toggle('hab-oscuro');
        }

        var nav = document.querySelectorAll('.nav a');
        for(var i = 0; i < nav.length; i++){
            nav[i].classList.toggle('oscuro-nav');
        }


    });
}


//BOTON VER MAS

mostrarInfo();

function mostrarInfo(){

    document.querySelector('#btn-mas').addEventListener('click', () => {

        var info = document.querySelectorAll('div.conoc p');

        for(var i = 0; i < info.length; i++){

            if (info[i].classList.contains("mostrar-info")){

                info[i].classList.remove('mostrar-info');
                info[i].classList.add('esconder-info');

                document.querySelector('#boton').innerText = 'ver más';

            }

            else if(info[i].classList.contains("esconder-info")){
                info[i].classList.remove('esconder-info');
                info[i].classList.add('mostrar-info');

                document.querySelector('#boton').innerText = 'ver menos';

            }
        }

    });

}
