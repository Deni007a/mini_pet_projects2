
function Footer() {
    return <footer className="page-footer green lighten-2">
        <div className="footer-copyright">
            <div className="container">
                © {new Date().getFullYear()} Denis Esipko
                <a className="grey-text text-lighten-4 right" href="https://github.com/Deni007a">
                    Denis Esipko</a>
            </div>
        </div>
    </footer>
}

export {Footer};