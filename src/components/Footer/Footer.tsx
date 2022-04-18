import React, {FC} from 'react';
import {Container} from "react-bootstrap";


interface FooterProps {
}

const Footer: FC<FooterProps> = () => (
    <Container fluid className="mt-5 py-2 bg-theme">
        <footer>
            <p className="m-0 text-center text-white">Copyright &copy; Rafał Kuźmiczuk 2022</p>
        </footer>
    </Container>
);

export default Footer;