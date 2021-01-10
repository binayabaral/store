import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');
	const [searchActive, setSearchActive] = useState(false);

	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [brands, setBrands] = useState([]);
	const [categories, setCategories] = useState([]);

	const dropContainer = useRef();

	const submitHandler = e => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
		setSearchActive(false);
	};

	useEffect(() => {
		let source = axios.CancelToken.source();

		const getSuggestions = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(`https://baralstore.herokuapp.com/api/products/autocomplete?keyword=${keyword}`, {
					cancelToken: source.token,
				});
				setProducts(data.products);
				setBrands(data.brands);
				setCategories(data.categories);
				setLoading(false);
			} catch (error) {
				if (axios.isCancel(error)) {
					console.log('request cancelled');
				} else {
					throw error;
				}
			}
		};
		getSuggestions();

		return () => {
			source.cancel();
		};
	}, [keyword]);

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	});

	const handleClick = e => {
		if (dropContainer.current.contains(e.target)) {
			return;
		}
		setSearchActive(false);
	};

	const handleDropClick = e => {
		setSearchActive(false);
		setKeyword(e.target.innerText.split(' in')[0]);
	};

	return (
		<Form onSubmit={submitHandler} inline className="d-flex justify-content-center flex-grow-1 header-search-form">
			<div className={searchActive ? 'input-holder search-active' : 'input-holder'} ref={dropContainer}>
				<Form.Control type="text" name="q" value={keyword} onFocus={() => setSearchActive(true)} onChange={e => setKeyword(e.target.value)} className="search-input" placeholder="Search Products..."></Form.Control>
				<Button type="submit" variant="primary">
					<i className="fa fa-search"></i>
				</Button>
				{loading ? (
					<Spinner animation="border" role="status" variant="primary" style={{ width: '20px', height: '20px', margin: 'auto', display: 'block' }} className="header-search-loader">
						<span className="sr-only">Loading...</span>
					</Spinner>
				) : (
					<div className="suggested-products">
						{products.length ? (
							<ul className="products">
								{products.map(product => (
									<li key={product}>
										<Link to={`/search/${product.split('(')[0]}`} onClick={handleDropClick}>
											{product.split('(')[0]}
										</Link>
									</li>
								))}
							</ul>
						) : (
							''
						)}
						{brands.length ? (
							<ul className="brands">
								{brands.map(brand => (
									<li key={brand}>
										<Link to={`/search/${brand.split('(')[0]}`} onClick={handleDropClick}>
											<strong>{brand.split('(')[0]}</strong> in Brands
										</Link>
									</li>
								))}
							</ul>
						) : (
							''
						)}
						{categories.length ? (
							<ul className="categories">
								{categories.map(category => (
									<li key={category}>
										<Link to={`/search/${category.split('(')[0]}`} onClick={handleDropClick}>
											<strong>{category.split('(')[0]}</strong> in Category
										</Link>
									</li>
								))}
							</ul>
						) : (
							''
						)}
					</div>
				)}
			</div>
		</Form>
	);
};

export default SearchBox;
