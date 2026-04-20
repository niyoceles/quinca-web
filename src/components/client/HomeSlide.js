import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Link as ReactLink } from 'react-router-dom';
import constructionImage from '../../assets/images/home/construction1.jpg';
import constructionImage2 from '../../assets/images/home/construction2.jpg';
import constructionImage3 from '../../assets/images/home/construction3.jpg';

const useStyles = makeStyles(theme => ({
	slide: {
		height: '340px',
		width: '100%',
	},
	image: {
		height: '100%',
		width: '100%',
	},
	link: {
		height: '340px',
		width: '100%',
	},
}));

export const HomeSlide = () => {
	const classes = useStyles();
	return (
		<Carousel autoPlay={9000} infinite slidesPerPage={1} slidesPerScroll={1}>
			{[
				{
					image: constructionImage,
					title: 'profile image 1',
					link: '/footer1',
				},
				{
					image: constructionImage2,
					title: 'profile image 1',
					link: '/footer2',
				},
				{
					image: constructionImage3,
					title: 'profile image 1',
					link: '/footer2',
				},
			].map(i => (
				<div key={i.title} className={classes.slide}>
					<ReactLink to={i.link}>
						<img src={i.image} className={classes.image} alt={i.title} />
					</ReactLink>
				</div>
			))}
		</Carousel>
	);
};
