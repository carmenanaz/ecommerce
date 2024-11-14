import CartWidget from "../CartWidget/CartWidget"

function NavBar(){
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="./index.html">Sempiterno</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="./index.html">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./pages/carrito.html">Productos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./pages/contacto.html">Contacto</a>
                        </li>
                        <li className="nav-item">
                            <CartWidget amount={3}/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar