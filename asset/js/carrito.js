class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 1;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        const productoExistente = this.productos.find(p => p.nombre === producto.nombre);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            this.productos.push(producto);
        }
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    }

    mostrarDetalles() {
        const listaDetalles = document.getElementById('detalles');
        listaDetalles.innerHTML = '';

        this.productos.forEach(producto => {
            const item = document.createElement('li');
            item.classList.add('producto-item');
            item.innerHTML = `<strong>${producto.nombre}</strong> - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}`;
            listaDetalles.appendChild(item);
        });
    }
}

const carrito = new Carrito();

function agregarProducto() {
    const nombre = prompt('Ingresa el nombre del producto:');
    const precio = parseFloat(prompt('Ingresa el precio del producto:'));

    if (!nombre || isNaN(precio) || precio <= 0) {
        alert('Datos inválidos. Por favor, ingresa un nombre válido y un precio mayor a 0.');
        return agregarProducto();
    }

    const producto = new Producto(nombre, precio);
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

function mostrarDetalles() {
    carrito.mostrarDetalles();
    actualizarTotal();
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
