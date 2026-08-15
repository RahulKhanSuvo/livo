const EditProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id);
  return (
    <div>
      <h1>Edit Product {id}</h1>
    </div>
  );
};

export default EditProductPage;
