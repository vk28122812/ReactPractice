import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
function ProductDetail() {
    const params = useParams();
  return (
    <>
     <div>ProductDetail for {params.productId}</div>
        <p><Link to=".." relative="route">Back to Absolute Parent Route</Link></p>
        <p><Link to=".." relative="path">Back to Relative Parent Route</Link></p>
    </>
  )
}

export default ProductDetail