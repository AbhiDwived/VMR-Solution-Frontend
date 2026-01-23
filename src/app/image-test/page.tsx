export default function ImageTest() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Image Test</h1>
      <div>
        <h2>Direct Image Tags:</h2>
        <img src="/assets/products/85.jpg" alt="Product 85" width="200" />
        <img src="/assets/products/86.jpg" alt="Product 86" width="200" />
        <img src="/assets/products/87.jpg" alt="Product 87" width="200" />
      </div>
      <div>
        <h2>Images with spaces:</h2>
        <img src="/assets/products/bucket (1).jpg" alt="Bucket 1" width="200" />
        <img src="/assets/products/vmr (5).jpg" alt="VMR 5" width="200" />
      </div>
    </div>
  )
}