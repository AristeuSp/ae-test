// In a client React component
import {useEffect, useState} from 'react';

export default function MyClientData() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('../../../iso639_english.json')
            // file lives in the public/static root at build
            .then((r) => r.json())
            .then(setItems)
            .catch(console.error);
    }, []);
    return (
        <ul>
        {items.map((it) => <li key={it.id}>{it.name}</li>)}
        </ul>
    );
}