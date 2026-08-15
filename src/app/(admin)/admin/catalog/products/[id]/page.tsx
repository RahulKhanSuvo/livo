const EditProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);
  return (
    <div>
      <h1>Edit Product {id}</h1>
    </div>
  );
};

export default EditProductPage;
