import React, { useState, useEffect } from 'react';
import styles from './Message.module.css';
import bus from '../../utils/bus';

function Message() {
	const [isVisible, setIsVisible] = useState(false);
	const [type, setType] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		bus.addListener('flash', ({ message, type }) => {
			setIsVisible(true);
			setMessage(message);
			setType(type);
		});

		setTimeout(() => {
			setIsVisible(false);
		}, 3000);
	}, []);

	return <>{isVisible && <div className={`${styles.message} ${styles[type]}`}>{message}</div>}</>;
}

export default Message;
