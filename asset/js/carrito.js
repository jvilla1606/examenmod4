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

    agregarProducto(producto, cantidad) {
        const productoExistente = this.productos.find(p => p.nombre === producto.nombre);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            producto.cantidad = cantidad;
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

    actualizarCarrito() {
        this.mostrarDetalles();
        document.getElementById('total').innerText = this.calcularTotal();
    }
}

const carrito = new Carrito();

// Lista de productos disponibles
const productosDisponibles = [
    { id: 1, nombre: 'Leche', precio: 1000 },
    { id: 2, nombre: 'Pan', precio: 2000 },
    { id: 3, nombre: 'Queso', precio: 1200 },
    { id: 4, nombre: 'Mermelada', precio: 1000 },
    { id: 5, nombre: 'Azúcar', precio: 1500 }
];

function agregarProducto() {
    const idProducto = parseInt(prompt('Ingresa el número del producto que deseas agregar:'));
    const productoSeleccionado = productosDisponibles.find(p => p.id === idProducto);

    if (!productoSeleccionado) {
        alert('Producto no encontrado. Por favor, ingresa un número válido de la lista de productos.');
        return agregarProducto();
    }

    const cantidad = parseInt(prompt(`¿Cuántas unidades de ${productoSeleccionado.nombre} deseas agregar?`));
    if (isNaN(cantidad) || cantidad <= 0) {
        alert('Cantidad inválida. Por favor, ingresa un número mayor a 0.');
        return agregarProducto();
    }

    const producto = new Producto(productoSeleccionado.nombre, productoSeleccionado.precio);
    carrito.agregarProducto(producto, cantidad);
    alert(`${cantidad} unidad(es) de ${producto.nombre} agregado(s) al carrito.`);
    carrito.actualizarCarrito();

    const continuar = confirm('¿Deseas agregar otro producto?');
    if (continuar) {
        agregarProducto();
    }
}

function finalizarCompra() {
    if (carrito.productos.length === 0) {
        alert('El carrito está vacío. No puedes finalizar la compra.');
        return;
    }

    const total = carrito.calcularTotal();
    alert(`Compra finalizada. El total a pagar es $${total}. ¡Gracias por tu compra!`);
    carrito.productos = [];
    carrito.actualizarCarrito();
}
