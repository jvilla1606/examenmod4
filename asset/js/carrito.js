class Producto {
    //constructor(nombre, precio, imagen) {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
       // this.imagen = imagen; // URL o base64 de la imagen.
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    mostrarDetalles() {
        const listaDetalles = document.getElementById('detalles');
        listaDetalles.innerHTML = '';

        this.productos.forEach(producto => {
            const item = document.createElement('li');
            item.classList.add('producto-item');

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;
            img.classList.add('producto-imagen');

            const info = document.createElement('div');
            info.classList.add('producto-info');
            info.innerHTML = `<strong>${producto.nombre}</strong> - $${producto.precio}`;

            item.appendChild(img);
            item.appendChild(info);
            listaDetalles.appendChild(item);
        });
    }
}

const carrito = new Carrito();

function agregarProducto() {
    const nombre = prompt('Ingresa el nombre del producto:');
    const precio = parseFloat(prompt('Ingresa el precio del producto:'));
    //const imagen = prompt('Ingresa la URL de la imagen del producto:');

    if (!nombre || isNaN(precio) || precio <= 0 || !imagen) {
        alert('Datos inválidos. Por favor, ingresa un nombre válido, un precio mayor a 0, y una URL de imagen.');
        return agregarProducto();
    }

    const producto = new Producto(nombre, precio, imagen);
    carrito.agregarProducto(producto);
    alert(`${nombre} agregado al carrito.`);
    actualizarTotal();

    const continuar = confirm('¿Deseas agregar otro producto?');
    if (continuar) {
        agregarProducto();
    }
}

function actualizarTotal() {
    document.getElementById('total').innerText = carrito.calcularTotal();
}

function finalizarCompra() {
    if (carrito.productos.length === 0) {
        alert('El carrito está vacío. No puedes finalizar la compra.');
        return;
    }

    const total = carrito.calcularTotal();
    alert(`Compra finalizada. El total a pagar es $${total}. ¡Gracias por tu compra!`);
    carrito.productos = [];
    actualizarTotal();
    document.getElementById('detalles').innerHTML = '';
}