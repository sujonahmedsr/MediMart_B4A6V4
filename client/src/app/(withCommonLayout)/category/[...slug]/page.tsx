type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const page = async ({
    searchParams,
  }: {
    searchParams: SearchParams;
  }) => {
    const query = await searchParams
    console.log(query.id);
    
    return (
        <div>
            category product
        </div>
    );
};

export default page;