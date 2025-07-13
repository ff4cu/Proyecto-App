document.addEventListener("DOMContentLoaded", function () {
    const botones = document.querySelectorAll('.btn')
    const secciones = document.querySelectorAll('.seccion-producto')
    const titulo = document.querySelector('.conteiner-titulo')
    botones.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            secciones.forEach(sec => {
                sec.classList.add('hidden')
            });
            secciones[index].classList.remove('hidden')
            titulo.innerHTML = botones[index].innerHTML
        })
    });
});
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then((data) => {
        const secciones = document.querySelectorAll('.seccion-producto')
        data.forEach(card => {
            secciones[0].innerHTML +=
                `
               <div class="card-productos">
                    <img src="${card.image}" alt="${card.title}" class="card-img"/>
                    <div class="detalles-productos">
                        <h2 class="nombre-producto">${card.title}</h2>
                        <p class="descripcion-productos">${card.category}</p>
                        <p class="precio-productos">Precio :$${card.price}</p>
                        <button class="agregar-producto pointer circular" id="${card.id}" onclick=modalCompra()>+
                        </button>
                    </div>
                </div>
           `;
            secciones[1].innerHTML +=
                `
               <div class="card-productos">
                    <img src="${card.image}" alt="${card.title}" class="card-img"/>
                    <div>
                        <h2 class="nombre-producto">${card.title}</h2>
                    </div>
                    <div class="hoja-reseñas">
                        <div class="usuario">
                            <p class="nombre-usuario">Pedro Pascal</p>
                            <p class="comm-usuario">Me encantaron</p>
                            <p class="comm-fecha">hace 3 semanas</p>
                        </div>
                    </div>
                </div>
           `;
        });
    });
function modalCompra() {
    const btnAgrgar = document.querySelectorAll(".agregar-producto")
    btnAgrgar.forEach(btn => {
        btn.addEventListener("click", () => {
            let conteinerBtn = document.getElementById(btn.id).parentElement
            let precioProducto = conteinerBtn.children[2].innerHTML
            let nombreProducto = conteinerBtn.children[0].innerHTML
            let producto = {
                id: btn.id,
                title: nombreProducto,
                price: precioProducto
            }
            let modalCompra = document.getElementById('modal-compra')
            modalCompra.style.display = "flex"
            let carrito = JSON.parse(sessionStorage.getItem("carrito")) || []
            carrito.push(producto)
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
        })
    });
}
function carrito() {
    let modalCarrito = document.getElementById('modal-carrito')
    modalCarrito.style.display = "flex"
    var carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    var listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var li = document.createElement('li');
        li.innerHTML = `
                    <p>
                        ${producto.title}
                    </p>
                    <p>
                        ${producto.price}
                    </p>`;
        listaCarrito.appendChild(li);
    }
}
function actualizarCarrito() {
    document.getElementById('modal-compra').style.display = 'none'
    var carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    var listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var li = document.createElement('li');
        li.innerHTML = `
                    <p>
                        ${producto.title}
                    </p>
                    <p>
                        ${producto.price}
                    </p>`;
        listaCarrito.appendChild(li);
    }
}
function borrarProducto() {
    sessionStorage.removeItem("carrito")
    var listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
}
