import React from 'react';
import styles from 'styled-components';

const List = styles.ul`
    display: flex;
    &:hover{
        background-color: blue;
    }
`;

export default () => (
    <header className={styles.navList}>
        <List>
            <li>
                <a href='/'>Movies</a>
            </li>
            <li>
                <a href='/tv'>TV</a>
            </li>
            <li>
                <a href='/search'>Search</a>
            </li>
        </List>
    </header>
)