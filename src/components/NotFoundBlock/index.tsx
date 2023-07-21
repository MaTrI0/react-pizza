import React from 'react'

import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => (
	<h1 className={styles.root}>
		<span>🤔</span>
		<br />
		404 Page Not Found!
	</h1>
)

export default NotFoundBlock
