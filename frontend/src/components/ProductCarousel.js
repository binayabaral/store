import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const productTopRated = useSelector(state => state.productTopRated);
	const { loading, error, products } = productTopRated;

	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>Our Top Rated Products:</h1>
			<Carousel pause="hover" className="bg-gradient mb-30">
				{products.map(product => (
					<Carousel.Item key={product._id}>
						<Link to={`/product/${product._id}`}>
							<div className="top-products-carousel--img">
								<div style={{ backgroundImage: `url(${product.image})` }}></div>
							</div>
							<Carousel.Caption className="carousel-caption">
								<h2>
									{product.name} (Rs {product.price})
								</h2>
							</Carousel.Caption>
						</Link>
					</Carousel.Item>
				))}
			</Carousel>
		</>
	);
};

export default ProductCarousel;
