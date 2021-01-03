import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer className="py-10">
			<Container>
				<Row>
					<Col className="text-center py-3">Copyright &copy; Baral Store</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
