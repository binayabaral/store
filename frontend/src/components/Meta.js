import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keyword" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome To Baral Store',
	description: 'Best products, affordable rates',
	keywords: 'Online Shopping, E-commerce',
};

export default Meta;
