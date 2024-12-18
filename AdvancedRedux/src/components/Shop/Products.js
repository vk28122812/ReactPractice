import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_DATA = [
  {
    id:'p1',
    title:'My first book',
    description: 'The first book i ever wrote',
    price: 5
  },
  {
    id:'p2',
    title:'My second book',
    description: 'The second book i ever wrote',
    price: 10
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_DATA.map(product => {
            return <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          })
        }
      </ul>
    </section>
  );
};

export default Products;
