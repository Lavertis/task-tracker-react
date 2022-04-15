import React, {FC} from 'react';


interface FooterProps {
}

const Footer: FC<FooterProps> = () => (
    <footer className="py-2 mt-5 bg-theme">
        <div className="container px-4 px-lg-5">
            <p className="m-0 text-center text-white">Copyright &copy; Rafał Kuźmiczuk 2022</p>
        </div>
    </footer>
);

export default Footer;