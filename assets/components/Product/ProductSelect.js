import React from 'react'
import { useQuery } from '@/context/hazumi/hooks';
import './ProductSelect.style.scss'
import { FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ProductSelect = ({ onChange }) => {
    const selectRef = React.useRef();
    const [trigger, setTrigger] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [value, setValue] = React.useState(null);
    const [show, setShow] = React.useState(false)

    const filters = {
        search: {
            fields: ["marque", "designation"],
            value: search
        },
        sort: {
            field: "marque",
            value: "ASC"
        },
        pagination: {
            current: 1,
            limit: 5
        }
    };

    const { data, loading } = useQuery('product/list', {
        variables: {
            filters
        }
    });

    const handleSearch = (event) => {
        if (trigger) clearInterval(trigger);

        setTrigger(
            setTimeout(function(){
                setSearch(event.target.value)
            }, 800)
        )
    }
    const selectProduct = (product) => {
        setValue(product);
        setShow(false);
        setSearch("");

        if (typeof onChange === "function") onChange(product);
    }

    const products = data?.products ?? [];
      
    
    
    React.useEffect(() => {
        document.addEventListener('click', function(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setShow(false);
            }
        })

        return () => {
            document.removeEventListener('click', null);
        }
    }, [])

    return (
        <div className="produit-select" ref={selectRef}>
            <div className="produit-input" onClick={() => setShow(true)}>
                { value ? (
                    <>
                        <div className="flex-auto">
                            { value.marque } { value.designation } 
                        </div> <FaTimes onClick={() => setValue(null)}/>
                    </>) : 
                <input type="text" className="flex-auto" placeholder="Recherche produit..." onChange={handleSearch} />}

                { !value && (<>{ show ? <FaChevronUp /> : <FaChevronDown /> }</>) }
            </div>
            

            <div className={`produit-list ${show ? 'show' : 'hide'}`}>
                { products.map((product, key) => 
                <div key={product.id} className="produit-item" onClick={() => selectProduct(product)}>
                    { product.marque } { product.designation } 
                </div>)}
            </div>
        </div>
    )
}

export default ProductSelect




