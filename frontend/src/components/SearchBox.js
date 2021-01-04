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
	};

	return (
		<Form onSubmit={submitHandler} inline className="d-flex justify-content-center">
			<Form.Control type="text" name="q" onChange={e => setKeyword(e.target.value)} placeholder="Search Products..." className="mb-5 mb-sm-0"></Form.Control>
			<Button type="submit" variant="outline-light py-4">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
