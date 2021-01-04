import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
	return (
		<Card className="rounded h-100">
			<Link to={`/product/${product._id}`}>
				{/* <Card.Img src={product.image} variant="top" /> */}
				<div className="card-img-top">
					<div style={{ backgroundImage: `url(${product.image})` }}></div>
				</div>
			</Link>

			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as="div">
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as="div" className="mb-8">
					<Rating value={product.rating} text={`${product.numReviews} reviews`} />
				</Card.Text>

				<Card.Text as="h3">Rs {product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
