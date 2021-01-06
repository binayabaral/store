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

				{product.brand ? (
					<Card.Text as="span" className="d-block mb-5">
						From{' '}
						<Link to={`/search/${product.brand}`} className="text-underline">
							{product.brand}
						</Link>
					</Card.Text>
				) : (
					''
				)}

				<Card.Text as="div" className="mb-8">
					<Rating value={product.rating} text={`${product.numReviews} reviews`} />
				</Card.Text>

				<Card.Text as="h2" className="text-warning">
					Rs {product.price.toLocaleString('en-IN')}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
