import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');

	const submitHandler = e => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
		setKeyword('');
	};

	return (
		<Form onSubmit={submitHandler} inline className="d-flex justify-content-center flex-grow-1 header-search-form">
			<div className="input-holder">
				<Form.Control type="text" name="q" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search Products..."></Form.Control>
				<Button type="submit" variant="primary">
					<i className="fa fa-search"></i>
				</Button>
			</div>
		</Form>
	);
};

export default SearchBox;
