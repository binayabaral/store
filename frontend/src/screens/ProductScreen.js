import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Form, Table } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector(state => state.productDetails);
	const { loading, error, product } = productDetails;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const productReviewCreate = useSelector(state => state.productReviewCreate);
	const { success: successProductReview, loading: loadingProductReview, error: errorProductReview } = productReviewCreate;

	useEffect(() => {
		if (successProductReview) {
			setRating(0);
			setComment('');
			dispatch(listProductDetails(match.params.id));
		}
		if (!product._id || product._id !== match.params.id) {
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
			dispatch(listProductDetails(match.params.id));
		}
	}, [dispatch, match, successProductReview, product._id]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitHandler = e => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment,
			})
		);
	};

	return (
		<>
			<Link className="btn btn-info mb-15" to="/">
				Back to Home
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row className="pb-15 align-items-center border-bottom">
						<Col md={6}>
							<div className="product-screen--product-img">
								<div style={{ backgroundImage: `url(${product.image})` }}></div>
							</div>
						</Col>
						<Col md={6}>
							<ListGroup variant="flush" className="no-borders">
								<ListGroup.Item>
									<h1>{product.name}</h1>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating value={product.rating} text={`${product.numReviews} ${product.numReviews > 1 ? 'reviews' : 'review'}`} />
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Brand: </strong>
									{product.brand}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Category: </strong>
									{product.category}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Price: </strong>Rs {product.price ? product.price.toLocaleString('en-IN') : 0}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Status: </strong>
									{product.countInStock > 0 ? `In Stock (Only ${product.countInStock} Items Remaining)` : 'Out of Stock'}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Released On: </strong>
									{product.releasedDate ? product.releasedDate.substring(0, 10) : ''}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Review: </strong>
									Do you want to read the review of this product before you buy?
									<a href={product.reviewLink} target="_blank" rel="noopener noreferrer" className="ml-3 text-underline">
										Click Here.
									</a>
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Description: </strong>
									{product.description}
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item className="d-flex align-items-center">
										<strong>Qty: </strong>
										<Form.Control as="select" value={qty} className="w-25 ml-10" onChange={e => setQty(e.target.value)}>
											{[...Array(product.countInStock).keys()].map(x => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button onClick={addToCartHandler} className="btn-block" type="button" disabled={product.countInStock === 0}>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6} className="py-15 border-bottom border-bottom-md-0">
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant="flush">
								{product.reviews.map(review => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{successProductReview && <Message variant="success">Review submitted successfully</Message>}
									{loadingProductReview && <Loader />}
									{errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId="rating">
												<Form.Label>Rating</Form.Label>
												<Form.Control as="select" value={rating} onChange={e => setRating(e.target.value)}>
													<option value="">Select...</option>
													<option value="1">1 - Poor</option>
													<option value="2">2 - Fair</option>
													<option value="3">3 - Good</option>
													<option value="4">4 - Very Good</option>
													<option value="5">5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId="comment">
												<Form.Label>Comment</Form.Label>
												<Form.Control as="textarea" row="3" value={comment} onChange={e => setComment(e.target.value)}></Form.Control>
											</Form.Group>
											<Button disabled={loadingProductReview} type="submit" variant="primary">
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to="/login">sign in</Link> to write a review{' '}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						{product.specifications ? (
							<Col md={6} className="py-15">
								<h2>Specifications</h2>
								<Table bordered responsive>
									<tbody>
										{Object.entries(product.specifications[0]).map(category => (
											<>
												<tr key={category[0]}>
													<th colSpan={3} className="bg-light">
														{category[0]}
													</th>
												</tr>
												{Object.entries(category[1]).map(row => (
													<tr>
														<td>{row[0]}</td>
														<td>{row[1]}</td>
													</tr>
												))}
											</>
										))}
									</tbody>
								</Table>
							</Col>
						) : (
							''
						)}
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
