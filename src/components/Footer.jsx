import { Button } from 'primereact/button';

function Footer() {
    return (
        <>
            <footer className="text-white bg-primary">
  <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium tracking-widest text-sm mb-3">A propos de Freedocteur</h2>
        <nav className="list-none mb-10">
          <li>
            <a href="/" className=" hover:text-gray-800">Accueil</a>
          </li>
          <li>
            <a href="/conditions" target="_blank" className="hover:text-gray-800">Conditions générales d'utilisation</a>
          </li>
          <li>
            <a href="/mentions" target="_blank"  className="hover:text-gray-800">Mentions Légales</a>
          </li> 
          <li>
            <a href="/policonf" target="_blank"  className="hover:text-gray-800">Politique de confidentialité</a>
          </li>
          <li>
            <a href="/faq" target="_blank" className="hover:text-gray-800">FAQ</a>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium tracking-widest text-sm mb-3">Trouver un spécialiste</h2>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium tracking-widest text-sm mb-3">Recherches frequentes</h2>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium tracking-widest text-sm mb-3">Contactez-nous</h2>
        <nav className="list-none mb-10">
          <li>
            <a href="/" className=" hover:text-gray-800">Contact@freedocteur.sn</a>
          </li>
          <li>
            <a href="/" className=" hover:text-gray-800">(+221) 77 357 56 61</a>
          </li>
          <div className="flex space-x-1 my-2">
           <Button className="facebook p-0" aria-label="Facebook">
                        <i className="pi pi-facebook px-2"></i>
                    </Button>
                    <Button className="twitter p-0" aria-label="Twitter">
                        <i className="pi pi-twitter px-2"></i>
                    </Button>
                    <Button className="instagram p-0" aria-label="Google">
                        <i className="pi pi-instagram px-2"></i>
                </Button>
                <Button className="linkedin p-0" aria-label="Google">
                        <i className="pi pi-linkedin px-2"></i>
                </Button>
          </div>
         
        </nav>
      </div>
    </div>
  </div>
  <div>
    <div className="container mx-auto py-4 px-5 flex flex-wrap items-center justify-center">
      <p className="text-sm text-center sm:text-left">Copyright © 2022 freedocteur, all right reserved     </p>
    </div>
  </div>
</footer>
        </>
    )
}

export default Footer
